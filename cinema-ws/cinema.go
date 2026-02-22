package main

import (
	"log"
	"sync"
	"time"
)

// CinemaState holds the current live movie state.
type CinemaState struct {
	MovieID      int       `json:"movieId"`
	Title        string    `json:"movieTitle"`
	StartTime    time.Time `json:"startTime"`
	EndTime      time.Time `json:"endTime"`
	IsLive       bool      `json:"isLive"`
	VideoUrl     string    `json:"videoUrl"`
	IsPaused     bool      `json:"isPaused"`
	PausedOffset float64   `json:"pausedOffset"`
}

// CinemaSync runs a 500ms ticker that broadcasts cinema:sync events.
type CinemaSync struct {
	hub   *Hub
	state CinemaState
	mu    sync.RWMutex
}

func newCinemaSync(hub *Hub) *CinemaSync {
	return &CinemaSync{hub: hub}
}

// SetState is called by the internal HTTP handler when admin changes the schedule.
func (cs *CinemaSync) SetState(state CinemaState) {
	cs.mu.Lock()
	// Maintain pause state if switching movies? No, reset for new movie
	cs.state = state
	cs.mu.Unlock()

	// Immediately broadcast the full state change to all clients
	cs.hub.Broadcast("cinema:state", state)
}

// Pause toggles the pause state and adjusts StartTime to maintain sync upon resume.
func (cs *CinemaSync) Pause(isPaused bool) {
	cs.mu.Lock()
	defer cs.mu.Unlock()

	if cs.state.MovieID == 0 {
		return
	}

	now := time.Now()
	if isPaused && !cs.state.IsPaused {
		// PAUSING: Capture current offset
		offset := now.Sub(cs.state.StartTime).Seconds()
		if offset < 0 {
			offset = 0
		}
		cs.state.PausedOffset = offset
		cs.state.IsPaused = true
		log.Printf("[CINEMA] Paused at %.2fs", offset)
	} else if !isPaused && cs.state.IsPaused {
		// RESUMING: Shift StartTime so that (now - StartTime) == PausedOffset
		cs.state.StartTime = now.Add(-time.Duration(cs.state.PausedOffset * float64(time.Second)))
		// Also shift EndTime if we want to be precise about schedule length extensions
		// For now, let's just resume
		cs.state.IsPaused = false
		log.Printf("[CINEMA] Resumed at %.2fs", cs.state.PausedOffset)
	}

	// Immediate sync pulse after pause/resume
	cs.hub.Broadcast("cinema:sync", map[string]interface{}{
		"movieId":       cs.state.MovieID,
		"movieTitle":    cs.state.Title,
		"offsetSeconds": cs.state.PausedOffset,
		"isLive":        cs.state.IsLive,
		"isPaused":      cs.state.IsPaused,
		"serverTimeMs":  now.UnixMilli(),
		"videoUrl":      cs.state.VideoUrl,
	})
}

// GetState returns the current cinema state (used when new clients connect).
func (cs *CinemaSync) GetState() CinemaState {
	cs.mu.RLock()
	defer cs.mu.RUnlock()
	return cs.state
}

// run is the sync ticker — broadcasts exact playback position every 500ms.
func (cs *CinemaSync) run() {
	ticker := time.NewTicker(500 * time.Millisecond)
	defer ticker.Stop()

	for t := range ticker.C {
		cs.mu.RLock()
		state := cs.state
		cs.mu.RUnlock()

		now := t
		var offsetSeconds float64
		isActuallyLive := false

		if state.MovieID != 0 {
			if state.IsPaused {
				offsetSeconds = state.PausedOffset
			} else {
				offsetSeconds = now.Sub(state.StartTime).Seconds()
			}

			if offsetSeconds < 0 {
				offsetSeconds = 0
			}

			// Auto-detect isLive (with 2s lead buffer)
			isActuallyLive = now.Add(2*time.Second).After(state.StartTime) && now.Before(state.EndTime)

			cs.mu.Lock()
			if cs.state.IsLive != isActuallyLive {
				cs.state.IsLive = isActuallyLive
			}
			cs.mu.Unlock()
		}

		pres := cs.hub.Presence()
		cs.hub.Broadcast("cinema:sync", map[string]interface{}{
			"movieId":       state.MovieID,
			"movieTitle":    state.Title,
			"offsetSeconds": offsetSeconds,
			"isLive":        isActuallyLive,
			"isPaused":      state.IsPaused,
			"serverTimeMs":  now.UnixMilli(),
			"videoUrl":      state.VideoUrl,
			"viewerCount":   pres.Count,
			"viewers":       pres.Viewers,
		})
	}
}
