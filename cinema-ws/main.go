package main

import (
	"bufio"
	"log"
	"net/http"
	"os"
	"strings"
)

func loadEnv() {
	file, err := os.Open("../.env")
	if err != nil {
		log.Println("No .env file found in parent directory, using environment variables")
		return
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()
		if strings.HasPrefix(line, "WS_INTERNAL_SECRET=") || strings.HasPrefix(line, "WS_PORT=") {
			parts := strings.SplitN(line, "=", 2)
			if len(parts) == 2 {
				key := parts[0]
				val := strings.Trim(parts[1], `"' `) // Strip quotes and spaces
				os.Setenv(key, val)
			}
		}
	}
}

func main() {
	loadEnv()
	secret := os.Getenv("WS_INTERNAL_SECRET")
	if secret == "" {
		secret = "cinema-ws-secret-change-in-production"
	}

	// Safe debug log (first 3 chars)
	secLen := len(secret)
	mask := "***"
	if secLen > 3 {
		mask = secret[:3] + "..."
	}
	log.Printf("🔑 Secret loaded: %s (len: %d)", mask, secLen)

	hub := newHub()
	go hub.run()

	cinema := newCinemaSync(hub)
	go cinema.run()

	mux := http.NewServeMux()

	// WebSocket endpoint — browsers connect here
	mux.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		serveWs(hub, cinema, w, r, secret)
	})

	// Internal endpoints — only called by Next.js server (not browser)
	mux.HandleFunc("/internal/broadcast", func(w http.ResponseWriter, r *http.Request) {
		internalBroadcast(hub, w, r, secret)
	})
	mux.HandleFunc("/internal/cinema", func(w http.ResponseWriter, r *http.Request) {
		internalSetCinema(cinema, w, r, secret)
	})
	mux.HandleFunc("/internal/cinema/pause", func(w http.ResponseWriter, r *http.Request) {
		internalPause(cinema, w, r, secret)
	})

	// Health check
	mux.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"status":"ok","service":"cinema-ws"}`))
	})

	port := os.Getenv("WS_PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("🎬 Cinema WebSocket Server listening on :%s", port)
	log.Fatal(http.ListenAndServe(":"+port, mux))
}
