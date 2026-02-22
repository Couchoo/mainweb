package main

import (
	"encoding/json"
	"log"
	"sync"
)

// WSMessage is the envelope for all WebSocket messages
type WSMessage struct {
	Type    string      `json:"type"`
	Payload interface{} `json:"payload"`
}

// Hub maintains all active client connections and broadcasts messages.
// All mutations happen in a single goroutine (run), so no mutexes needed
// for the clients map itself.
type Hub struct {
	clients    map[*Client]bool
	broadcast  chan []byte
	register   chan *Client
	unregister chan *Client
	mu         sync.RWMutex // only used for Presence() reads
}

func newHub() *Hub {
	return &Hub{
		clients:    make(map[*Client]bool),
		broadcast:  make(chan []byte, 256),
		register:   make(chan *Client, 64),
		unregister: make(chan *Client, 64),
	}
}

// run is the hub's event loop — must be called in its own goroutine.
func (h *Hub) run() {
	for {
		select {

		case client := <-h.register:
			h.mu.Lock()
			h.clients[client] = true
			h.mu.Unlock()
			log.Printf("▶ Client connected: %s (total: %d)", client.Name, len(h.clients))
			// Broadcast updated presence to everyone
			h.broadcastPresence()

		case client := <-h.unregister:
			h.mu.Lock()
			if _, ok := h.clients[client]; ok {
				delete(h.clients, client)
				close(client.send)
			}
			h.mu.Unlock()
			log.Printf("◀ Client disconnected: %s (total: %d)", client.Name, len(h.clients))
			// Broadcast updated presence to everyone
			h.broadcastPresence()

		case message := <-h.broadcast:
			h.mu.RLock()
			for client := range h.clients {
				select {
				case client.send <- message:
				default:
					// Slow client — drop and clean up
					close(client.send)
					delete(h.clients, client)
				}
			}
			h.mu.RUnlock()
		}
	}
}

// Broadcast encodes and sends a message to all connected clients.
func (h *Hub) Broadcast(msgType string, payload interface{}) {
	msg := WSMessage{Type: msgType, Payload: payload}
	data, err := json.Marshal(msg)
	if err != nil {
		log.Printf("Broadcast marshal error: %v", err)
		return
	}
	h.broadcast <- data
}

// ConnectionCount returns the total number of physical connections (tabs open)
func (h *Hub) ConnectionCount() int {
	h.mu.RLock()
	defer h.mu.RUnlock()
	return len(h.clients)
}

// PresenceInfo holds both total count and the list of identified users
type PresenceInfo struct {
	Count   int                      `json:"count"`
	Viewers []map[string]interface{} `json:"viewers"`
}

// Presence returns total connection count and a list of identified viewers.
func (h *Hub) Presence() PresenceInfo {
	h.mu.RLock()
	defer h.mu.RUnlock()

	seen := make(map[int]bool)
	identified := make([]map[string]interface{}, 0)
	totalCount := 0

	for client := range h.clients {
		if client.UserID == 0 {
			// Count guests per connection
			totalCount++
			continue
		}

		if !seen[client.UserID] {
			// Count unique logged-in users only once
			seen[client.UserID] = true
			totalCount++
			identified = append(identified, map[string]interface{}{
				"id":    client.UserID,
				"name":  client.Name,
				"role":  client.Role,
				"image": client.Image,
			})
		}
	}

	return PresenceInfo{
		Count:   totalCount,
		Viewers: identified,
	}
}

// broadcastPresence pushes an updated viewer list to all clients.
func (h *Hub) broadcastPresence() {
	pres := h.Presence()
	h.Broadcast("presence:update", map[string]interface{}{
		"count":   pres.Count,
		"viewers": pres.Viewers,
	})
}
