'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Gem, AlertCircle, Tv, Volume2, VolumeX } from 'lucide-react';
import Link from 'next/link';
import { useAnalytics } from '@/hooks/use-analytics';

interface VideoServer {
    id: number;
    name: string;
    url: string;
    order: number;
}

function isDirectVideoFile(url: string): boolean {
    return /\.(mp4|webm|ogg|m3u8|mkv)(\?|$)/i.test(url);
}

function isYouTubeUrl(url: string): boolean {
    return url.includes('youtube.com') || url.includes('youtu.be');
}

/** Build a YouTube embed URL with optional sync params */
function buildYouTubeEmbedUrl(url: string, offset: number, cinemaMode: boolean): string {
    let videoId = '';
    if (url.includes('youtube.com/watch?v=')) {
        videoId = url.split('v=')[1]?.split('&')[0] ?? '';
    } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1]?.split('?')[0] ?? '';
    } else if (url.includes('youtube.com/embed/')) {
        videoId = url.split('/embed/')[1]?.split('?')[0] ?? '';
    }

    const params = new URLSearchParams();
    params.set('autoplay', cinemaMode ? '1' : '0');
    params.set('rel', '0');
    if (cinemaMode) {
        params.set('controls', '0');
        params.set('disablekb', '1');
        params.set('modestbranding', '1');
        params.set('iv_load_policy', '3'); // hide annotations
    }
    if (offset > 0) {
        params.set('start', String(offset));
    }

    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

/** For non-YouTube iframes, just append start param best-effort */
function buildGenericEmbedUrl(url: string, offset: number): string {
    const separator = url.includes('?') ? '&' : '?';
    return offset > 0 ? `${url}${separator}t=${offset}` : url;
}

interface DirectVideoPlayerProps {
    url: string;
    offset: number;
    isPaused?: boolean;
    cinemaMode: boolean;
    onEnded?: () => void;
}

function DirectVideoPlayer({ url, offset, isPaused = false, cinemaMode, onEnded }: DirectVideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const lastSyncOffset = useRef(offset);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [duration, setDuration] = useState(0);
    const [isLocallyPaused, setIsLocallyPaused] = useState(false);

    // Initial seek and periodic drift compensation
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // 🎬 IMPORTANT: If server offset is beyond video duration, terminate now!
        if (duration > 0 && offset >= duration - 0.5) {
            console.log(`[CINEMA] Offset (${offset.toFixed(1)}s) exceeds duration (${duration.toFixed(1)}s). Terminating.`);
            onEnded?.();
            return;
        }

        // 🚫 FIX: Don't sync if user is locally paused!
        if (isLocallyPaused || video.paused) return;

        // Only sync if drift is > 3 seconds to avoid stutter
        const drift = Math.abs(video.currentTime - offset);
        if (drift > 3) {
            console.log(`[CINEMA] Drift detected: ${drift.toFixed(2)}s. Syncing...`);
            video.currentTime = offset;
        }

        lastSyncOffset.current = offset;
    }, [offset, duration, onEnded, isLocallyPaused]);

    // Handle play/pause from server (Admin global pause)
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (isPaused) {
            if (!video.paused) {
                video.pause();
                setIsLocallyPaused(true);
            }
        } else {
            // 🛡️ GUARD: If the user is locally paused, DON'T let the server sync pulses
            // auto-resume the video. Only resume if the user isn't locally paused.
            if (video.paused && cinemaMode && !isLocallyPaused) {
                video.currentTime = offset;
                video.play().catch(err => console.log('[CINEMA] Autoplay prevented:', err));
                setIsLocallyPaused(false);
            }
        }
    }, [isPaused, cinemaMode, offset, isLocallyPaused]);

    // User unpausing -> jump to live immediately
    const handlePlay = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;

        console.log('[CINEMA] User resumed, jumping to live:', offset);
        video.currentTime = offset;
        video.play().catch(() => { });
        setIsLocallyPaused(false);
    }, [offset]);

    const handlePause = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;
        video.pause();
        setIsLocallyPaused(true);
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Prevent seeking in cinema mode
        const preventSeek = () => {
            if (cinemaMode && video.seeking) {
                // If they try to seek, force them back to the server offset
                video.currentTime = lastSyncOffset.current;
            }
        };

        if (cinemaMode) {
            video.addEventListener('seeking', preventSeek);
        }

        return () => {
            if (cinemaMode) video.removeEventListener('seeking', preventSeek);
        };
    }, [cinemaMode]);

    // Handle volume changes
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = isMuted ? 0 : volume;
        }
    }, [volume, isMuted]);

    return (
        <div className="relative w-full h-full group/player overflow-hidden">
            <video
                ref={videoRef}
                src={url}
                className="w-full h-full object-contain bg-black"
                autoPlay={cinemaMode}
                controls={!cinemaMode}
                playsInline
                onEnded={onEnded}
                onLoadedMetadata={(e) => {
                    setDuration(e.currentTarget.duration);
                    // 🎬 Instant sync once metadata is here
                    if (offset > 0) e.currentTarget.currentTime = offset;
                }}
                style={cinemaMode ? { pointerEvents: 'none' } : {}}
            />

            {cinemaMode && (
                <>
                    {/* Central Play/Pause Overlay */}
                    <div
                        onClick={() => isLocallyPaused ? handlePlay() : handlePause()}
                        className={`absolute inset-0 flex items-center justify-center cursor-pointer transition-all duration-300 z-10 ${isLocallyPaused ? 'bg-black/40' : 'bg-transparent hover:bg-black/10'}`}
                    >
                        <div className={`transition-all duration-300 transform ${isLocallyPaused ? 'scale-100 opacity-100' : 'scale-50 opacity-0 group-hover/player:scale-100 group-hover/player:opacity-100'}`}>
                            <div className="w-24 h-24 rounded-full bg-primary/20 backdrop-blur-3xl border border-primary/30 flex items-center justify-center shadow-2xl">
                                {isLocallyPaused ? (
                                    <Play className="w-10 h-10 text-white fill-white ml-1" />
                                ) : (
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-10 bg-white rounded-full shadow-lg" />
                                        <div className="w-2.5 h-10 bg-white rounded-full shadow-lg" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Volume Controls */}
                    <div className="absolute bottom-8 right-8 flex items-center gap-3 bg-black/60 backdrop-blur-xl p-3 rounded-2xl border border-white/10 opacity-0 group-hover/player:opacity-100 transition-all duration-300 pointer-events-auto shadow-2xl translate-y-2 group-hover/player:translate-y-0 z-20">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsMuted(!isMuted);
                            }}
                            className="p-1.5 hover:bg-white/10 rounded-xl transition-colors text-white/70 hover:text-white"
                        >
                            {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </button>
                        <div className="w-24 flex items-center">
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={isMuted ? 0 : volume}
                                onChange={(e) => {
                                    setVolume(parseFloat(e.target.value));
                                    setIsMuted(false);
                                }}
                                onClick={(e) => e.stopPropagation()}
                                className="w-full h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer accent-primary hover:accent-primary-foreground focus:outline-none transition-all"
                                style={{
                                    backgroundImage: `linear-gradient(to right, rgb(var(--primary)) ${(isMuted ? 0 : volume) * 100}%, rgba(255, 255, 255, 0.2) ${(isMuted ? 0 : volume) * 100}%)`
                                }}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

interface VideoPlayerProps {
    movieId: number;
    videoUrl?: string;
    videoServers?: VideoServer[];
    playbackOffset?: number;   // How many seconds into the movie we are (for live sync)
    isPaused?: boolean;        // Server pause state
    isCinemaMode?: boolean;    // Disables controls, auto-plays, locks seeking
    onEnded?: () => void;      // Callback when movie finishes
}

// ─────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────
export function VideoPlayer({
    movieId,
    videoUrl,
    videoServers,
    playbackOffset = 0,
    isPaused = false,
    isCinemaMode = false,
    onEnded,
}: VideoPlayerProps) {
    const { data: session } = useSession();
    const [showVideo, setShowVideo] = useState(false);
    const [adStep, setAdStep] = useState(0);
    const [countdown, setCountdown] = useState(5);
    const [selectedServerIndex, setSelectedServerIndex] = useState(0);
    const { track: trackEvent } = useAnalytics();

    const role = (session?.user as any)?.role;
    const isVIP = role === 'VIP' || role === 'ADMIN' || role === 'SUPER_ADMIN';

    // Auto-play immediately in cinema mode
    useEffect(() => {
        if (isCinemaMode && !showVideo && (videoServers?.length || videoUrl)) {
            setShowVideo(true);
        }
    }, [isCinemaMode, videoServers, videoUrl, showVideo]);

    const servers = useMemo(() => {
        return videoServers && videoServers.length > 0
            ? videoServers.map(vs => ({ name: vs.name, url: vs.url }))
            : videoUrl
                ? [{ name: 'Сървър 1', url: videoUrl }]
                : [];
    }, [videoServers, videoUrl]);

    const currentServer = servers[selectedServerIndex];

    useEffect(() => {
        if (showVideo && currentServer) {
            trackEvent('movie_view_start', {
                movieId,
                metadata: { movieUrl: currentServer.url, serverName: currentServer.name },
            });
            fetch(`/api/movies/${movieId}/view`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ movieId }),
            }).catch(() => { });

            if (session?.user) {
                fetch('/api/movies/history', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ movieId, lastPosition: 0 }),
                }).catch(() => { });
            }
        }
    }, [showVideo, movieId, currentServer, trackEvent, session]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (adStep > 0 && adStep <= 3 && countdown > 0) {
            timer = setTimeout(() => setCountdown(c => c - 1), 1000);
        } else if (adStep > 0 && adStep <= 3 && countdown === 0) {
            if (adStep === 3) setShowVideo(true);
            else { setAdStep(s => s + 1); setCountdown(5); }
        }
        return () => clearTimeout(timer);
    }, [adStep, countdown]);

    const handlePlay = useCallback(() => {
        if (isVIP) setShowVideo(true);
        else setAdStep(1);
    }, [isVIP]);

    const isVIPOnly = (videoServers as any)?.[0]?.isVIPOnly || false;

    if (isVIPOnly && !isVIP) {
        return (
            <div className="aspect-video bg-secondary rounded-lg flex flex-col items-center justify-center border-2 border-primary/20">
                <Gem className="h-10 w-10 text-amber-400 mb-4" />
                <h3 className="text-xl font-black uppercase italic">VIP Ексклузивно</h3>
                <p className="text-muted-foreground text-sm mt-2 text-center px-8">Надстройте сега за неограничен достъп!</p>
                <Button asChild size="lg" className="mt-4 rounded-xl">
                    <Link href="/vip">Стани VIP</Link>
                </Button>
            </div>
        );
    }

    // ── Render video ──
    if (showVideo && currentServer) {
        const url = currentServer.url;

        return (
            <div className="space-y-3 h-full">
                <div className="aspect-video bg-black rounded-lg overflow-hidden border border-secondary shadow-2xl relative h-full">
                    {isDirectVideoFile(url) ? (
                        // 🎬 Direct file — 100% precise seeking
                        <DirectVideoPlayer
                            url={url}
                            offset={playbackOffset}
                            isPaused={isPaused}
                            cinemaMode={isCinemaMode}
                            onEnded={onEnded}
                        />
                    ) : isYouTubeUrl(url) ? (
                        // 📺 YouTube — ?start= approximate sync
                        // FIX: Remove playbackOffset from key to prevent reload every sync pulse
                        <iframe
                            key={`yt-${selectedServerIndex}`}
                            src={buildYouTubeEmbedUrl(url, playbackOffset, isCinemaMode)}
                            className="w-full h-full"
                            allowFullScreen
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        />
                    ) : (
                        // 🌐 Generic embed
                        // FIX: Remove playbackOffset from key
                        <iframe
                            key={`gen-${selectedServerIndex}`}
                            src={buildGenericEmbedUrl(url, playbackOffset)}
                            className="w-full h-full"
                            allowFullScreen
                            allow="autoplay; fullscreen"
                        />
                    )}

                    {isCinemaMode && !isDirectVideoFile(url) && (
                        // Invisible overlay to intercept right-click / seek attempts on iframe
                        // Only for non-direct files (direct files have their own internal overlay logic)
                        <div className="absolute inset-x-0 bottom-0 h-16 cursor-default pointer-events-none" />
                    )}
                </div>

                {!isCinemaMode && servers.length > 1 && (
                    <div className="flex flex-wrap gap-2 justify-center">
                        {servers.map((server, index) => (
                            <Button
                                key={index}
                                variant={selectedServerIndex === index ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => {
                                    setSelectedServerIndex(index);
                                    setShowVideo(false);
                                    setTimeout(() => setShowVideo(true), 100);
                                }}
                                className="min-w-[100px]"
                            >
                                {server.name}
                            </Button>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    // ── Ad countdown ──
    if (adStep > 0 && adStep <= 3) {
        return (
            <div className="aspect-video bg-secondary rounded-lg flex items-center justify-center border border-primary/20">
                <div className="text-center space-y-4">
                    <div className="text-7xl font-black text-primary animate-pulse">{countdown}</div>
                    <p className="text-xl font-bold">Реклама {adStep} от 3</p>
                    <Button asChild variant="outline" size="sm" className="rounded-xl">
                        <Link href="/vip">Премахни рекламите</Link>
                    </Button>
                </div>
            </div>
        );
    }

    // ── No servers ──
    if (servers.length === 0) {
        return (
            <div className="aspect-video bg-secondary rounded-lg flex items-center justify-center border border-secondary p-8 text-center">
                <div className="space-y-2">
                    <AlertCircle className="h-10 w-10 text-muted-foreground mx-auto opacity-20" />
                    <p className="text-muted-foreground italic">В момента няма наличен видео сървър за този филм.</p>
                </div>
            </div>
        );
    }

    // ── Play button ──
    return (
        <div className="space-y-4 h-full">
            <div className="group relative aspect-video bg-secondary rounded-lg flex items-center justify-center overflow-hidden border border-secondary hover:border-primary/50 transition-all shadow-lg h-full">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <Button
                    size="lg"
                    onClick={handlePlay}
                    className="relative z-10 gap-3 px-8 h-14 text-lg font-bold shadow-xl transition-transform group-hover:scale-110"
                >
                    <Play className="h-6 w-6 fill-white" />
                    Гледай сега
                </Button>
            </div>
        </div>
    );
}
