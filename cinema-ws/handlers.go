package main

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	// Allow all origins — Next.js frontend is on a different port in dev
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

// ─── WebSocket Upgrade Handler ────────────────────────────────────────────────

// serveWs upgrades an HTTP connection to WebSocket, verifies the auth token,
// and registers the client with the hub.
func serveWs(hub *Hub, cinema *CinemaSync, w http.ResponseWriter, r *http.Request, secret string) {
	// CORS headers for preflight
	w.Header().Set("Access-Control-Allow-Origin", "*")

	token := r.URL.Query().Get("token")
	if token == "" {
		http.Error(w, "missing token", http.StatusUnauthorized)
		return
	}

	info, err := verifyToken(token, secret)
	if err != nil {
		log.Printf("WS auth fail: %v", err)
		http.Error(w, "invalid token", http.StatusUnauthorized)
		return
	}

	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Printf("WS upgrade error: %v", err)
		return
	}

	client := &Client{
		hub:    hub,
		conn:   conn,
		send:   make(chan []byte, 256),
		UserID: info.UserID,
		Name:   info.Name,
		Role:   info.Role,
		Image:  info.Image,
	}

	hub.register <- client

	// Send current presence and cinema state immediately so the new client syncs right away
	go func() {
		time.Sleep(100 * time.Millisecond) // small delay so register completes first
		state := cinema.GetState()
		pres := hub.Presence()

		// 1. Always send presence first
		presMsg := WSMessage{
			Type: "presence:update",
			Payload: map[string]interface{}{
				"count":   pres.Count,
				"viewers": pres.Viewers,
			},
		}
		presData, _ := json.Marshal(presMsg)
		select {
		case client.send <- presData:
		default:
		}

		// 2. If a movie is live, send sync info
		if state.IsLive && state.MovieID != 0 {
			offsetSeconds := time.Since(state.StartTime).Seconds()
			if offsetSeconds < 0 {
				offsetSeconds = 0
			}
			syncMsg := WSMessage{
				Type: "cinema:sync",
				Payload: map[string]interface{}{
					"movieId":       state.MovieID,
					"movieTitle":    state.Title,
					"offsetSeconds": offsetSeconds,
					"isLive":        true,
					"isPaused":      state.IsPaused,
					"serverTimeMs":  time.Now().UnixMilli(),
					"videoUrl":      state.VideoUrl,
					"viewerCount":   pres.Count,
					"viewers":       pres.Viewers,
				},
			}
			syncData, _ := json.Marshal(syncMsg)
			select {
			case client.send <- syncData:
			default:
			}
		}
	}()

	// Start pumps
	go client.writePump()
	go client.readPump()
}

// ─── Internal HTTP Handlers (Next.js → Go) ────────────────────────────────────

// internalBroadcast receives a message from Next.js and broadcasts it to all WS clients.
// Used for: chat:message, gift:received, etc.
func internalBroadcast(hub *Hub, w http.ResponseWriter, r *http.Request, secret string) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}
	if !checkInternalAuth(r, secret) {
		http.Error(w, "forbidden", http.StatusForbidden)
		return
	}

	var msg WSMessage
	if err := json.NewDecoder(r.Body).Decode(&msg); err != nil {
		http.Error(w, "bad body", http.StatusBadRequest)
		return
	}

	hub.Broadcast(msg.Type, msg.Payload)

	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{"ok":true}`))
}

// internalSetCinema receives cinema state from Next.js (when admin adds/removes schedule).
func internalSetCinema(cinema *CinemaSync, w http.ResponseWriter, r *http.Request, secret string) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}
	if !checkInternalAuth(r, secret) {
		http.Error(w, "forbidden", http.StatusForbidden)
		return
	}

	var state CinemaState
	if err := json.NewDecoder(r.Body).Decode(&state); err != nil {
		http.Error(w, "bad body", http.StatusBadRequest)
		return
	}

	cinema.SetState(state)
	log.Printf("🎬 Cinema state updated: movieId=%d isLive=%v", state.MovieID, state.IsLive)

	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{"ok":true}`))
}

// internalPause handles pause/resume commands from Next.js.
func internalPause(cinema *CinemaSync, w http.ResponseWriter, r *http.Request, secret string) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}
	if !checkInternalAuth(r, secret) {
		http.Error(w, "forbidden", http.StatusForbidden)
		return
	}

	var req struct {
		IsPaused bool `json:"isPaused"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "bad body", http.StatusBadRequest)
		return
	}

	cinema.Pause(req.IsPaused)

	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{"ok":true}`))
}

// ─── Auth Helpers ─────────────────────────────────────────────────────────────

type tokenInfo struct {
	UserID int    `json:"userId"`
	Name   string `json:"name"`
	Role   string `json:"role"`
	Image  string `json:"image"`
	Exp    int64  `json:"exp"`
}

// verifyToken validates an HMAC-signed token issued by Next.js.
// Format: base64(payload).signature
func verifyToken(token, secret string) (*tokenInfo, error) {
	parts := strings.SplitN(token, ".", 2)
	if len(parts) != 2 {
		return nil, fmt.Errorf("malformed token")
	}

	payloadBytes, err := base64.RawURLEncoding.DecodeString(parts[0])
	if err != nil {
		return nil, fmt.Errorf("decode error: %w", err)
	}

	// Verify HMAC
	mac := hmac.New(sha256.New, []byte(secret))
	mac.Write(payloadBytes)
	expectedSig := fmt.Sprintf("%x", mac.Sum(nil))

	if !hmac.Equal([]byte(parts[1]), []byte(expectedSig)) {
		// Log detailed mismatch for debugging (only in this diagnostic phase)
		log.Printf("❌ Auth Sig Mismatch!")
		log.Printf("   Payload: %s", string(payloadBytes))
		log.Printf("   Secret prefix: %s...", secret[:2])
		log.Printf("   Expected hex: %s", expectedSig)
		log.Printf("   Provided hex: %s", parts[1])
		return nil, fmt.Errorf("invalid signature")
	}

	var info tokenInfo
	if err := json.Unmarshal(payloadBytes, &info); err != nil {
		return nil, fmt.Errorf("unmarshal: %w", err)
	}

	// Check expiry
	if time.Now().UnixMilli() > info.Exp {
		return nil, fmt.Errorf("token expired")
	}

	return &info, nil
}

// checkInternalAuth validates the Bearer secret on internal endpoints.
func checkInternalAuth(r *http.Request, secret string) bool {
	auth := r.Header.Get("Authorization")
	return auth == "Bearer "+secret
}
