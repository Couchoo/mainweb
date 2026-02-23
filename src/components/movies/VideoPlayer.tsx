'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Gem, AlertCircle, Volume2, VolumeX, Maximize } from 'lucide-react';
import Link from 'next/link';
import { useAnalytics } from '@/hooks/use-analytics';
import { getTranslation, Locale, TranslationKey } from '@/lib/i18n';

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
    const [isAutoplayBlocked, setIsAutoplayBlocked] = useState(false);
    const [isBuffering, setIsBuffering] = useState(true);
    const playerRef = useRef<HTMLDivElement>(null);

    const toggleFullscreen = () => {
        const elem = playerRef.current;
        if (!elem) return;

        const rfs = (elem as any).requestFullscreen ||
            (elem as any).webkitRequestFullscreen ||
            (elem as any).mozRequestFullScreen ||
            (elem as any).msRequestFullscreen;

        if (!document.fullscreenElement && !(document as any).webkitFullscreenElement &&
            !(document as any).mozFullScreenElement && !(document as any).msFullscreenElement) {
            if (rfs) {
                const promise = rfs.call(elem);
                if (promise !== undefined) {
                    promise.catch((err: any) => {
                        console.error('[CINEMA] Fullscreen error:', err);
                    });
                }
            }
        } else {
            const efs = document.exitFullscreen ||
                (document as any).webkitExitFullscreen ||
                (document as any).mozCancelFullScreen ||
                (document as any).msExitFullscreen;
            if (efs) efs.call(document);
        }
    };

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
                // Wrap in setTimeout to avoid synchronous setState during render/effect
                setTimeout(() => setIsLocallyPaused(true), 0);
            }
        } else {
            // 🛡️ GUARD: If the user is locally paused, DON'T let the server sync pulses
            // auto-resume the video. Only resume if the user isn't locally paused.
            if (video.paused && cinemaMode && !isLocallyPaused) {
                video.currentTime = offset;
                video.play().then(() => {
                    setIsAutoplayBlocked(false);
                }).catch(err => {
                    console.log('[CINEMA] Autoplay prevented:', err);
                    setIsAutoplayBlocked(true);
                });
                // Wrap in setTimeout to avoid synchronous setState
                setTimeout(() => setIsLocallyPaused(false), 0);
            }
        }
    }, [isPaused, cinemaMode, offset, isLocallyPaused]);

    // User unpausing -> jump to live immediately
    const handlePlay = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;

        console.log('[CINEMA] User resumed, jumping to live:', offset);
        video.currentTime = offset;
        video.play().then(() => {
            setIsAutoplayBlocked(false);
        }).catch(() => { });
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
        <div ref={playerRef} className="relative w-full h-full group/player overflow-hidden bg-black">
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
                    setIsBuffering(false);
                }}
                onWaiting={() => setIsBuffering(true)}
                onPlaying={() => setIsBuffering(false)}
                style={cinemaMode ? { pointerEvents: 'none' } : {}}
            />

            {cinemaMode && (
                <>
                    {/* Central Play/Pause Overlay */}
                    <div
                        onClick={() => isLocallyPaused ? handlePlay() : handlePause()}
                        className={`absolute inset-0 flex items-center justify-center cursor-pointer transition-all duration-300 z-10 
                            ${(isLocallyPaused || isAutoplayBlocked) ? 'bg-black/60' : 'bg-transparent hover:bg-black/10'}`}
                    >
                        {(isLocallyPaused || isAutoplayBlocked) && (
                            <div className="text-center animate-in zoom-in duration-300">
                                <div className="w-24 h-24 rounded-full bg-primary/20 backdrop-blur-3xl border border-primary/30 flex items-center justify-center shadow-2xl mx-auto mb-4 relative">
                                    {isBuffering && (
                                        <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                                    )}
                                    <Play className="w-10 h-10 text-white fill-white ml-1" />
                                </div>
                                <p className="text-white font-display uppercase tracking-[0.3em] text-sm drop-shadow-lg">
                                    {isAutoplayBlocked ? 'КЛИКНИ ЗА ГЛЕДАНЕ' : 'ПАУЗА'}
                                </p>
                            </div>
                        )}

                        {!isLocallyPaused && !isAutoplayBlocked && (
                            <div className="transition-all duration-300 transform scale-50 opacity-0 group-hover/player:scale-100 group-hover/player:opacity-100">
                                <div className="w-24 h-24 rounded-full bg-primary/20 backdrop-blur-3xl border border-primary/30 flex items-center justify-center shadow-2xl">
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-10 bg-white rounded-full shadow-lg" />
                                        <div className="w-2.5 h-10 bg-white rounded-full shadow-lg" />
                                    </div>
                                </div>
                            </div>
                        )}
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
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleFullscreen();
                            }}
                            className="p-1.5 hover:bg-white/10 rounded-xl transition-colors text-white/70 hover:text-white"
                            title="Fullscreen"
                        >
                            <Maximize className="w-5 h-5" />
                        </button>
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
    posterUrl?: string;
    backdropUrl?: string;
    locale: Locale;
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
    posterUrl,
    backdropUrl,
    locale,
}: VideoPlayerProps) {
    const { data: session } = useSession();
    const t = (key: TranslationKey) => getTranslation(key, locale);

    const [showVideo, setShowVideo] = useState(false);
    const [adStep, setAdStep] = useState(0);
    const [countdown, setCountdown] = useState(5);
    const [selectedServerIndex, setSelectedServerIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const toggleGlobalFullscreen = () => {
        const elem = containerRef.current;
        if (!elem) return;

        const rfs = (elem as any).requestFullscreen ||
            (elem as any).webkitRequestFullscreen ||
            (elem as any).mozRequestFullScreen ||
            (elem as any).msRequestFullscreen;

        if (!document.fullscreenElement && !(document as any).webkitFullscreenElement &&
            !(document as any).mozFullScreenElement && !(document as any).msFullscreenElement) {
            if (rfs) {
                const promise = rfs.call(elem);
                if (promise !== undefined) {
                    promise.catch((err: any) => {
                        console.error('[CINEMA] Global Fullscreen error:', err);
                    });
                }
            }
        } else {
            const efs = document.exitFullscreen ||
                (document as any).webkitExitFullscreen ||
                (document as any).mozCancelFullScreen ||
                (document as any).msExitFullscreen;
            if (efs) efs.call(document);
        }
    };
    const { track: trackEvent } = useAnalytics();

    const role = (session?.user as { role?: string })?.role;
    const isVIP = role === 'VIP' || role === 'ADMIN' || role === 'SUPER_ADMIN';

    // Auto-play immediately in cinema mode
    useEffect(() => {
        if (isCinemaMode && !showVideo && (videoServers?.length || videoUrl)) {
            setTimeout(() => setShowVideo(true), 0);
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
            if (adStep === 3) {
                // Wrap in setTimeout to avoid synchronous setState
                setTimeout(() => setShowVideo(true), 0);
            }
            else {
                setAdStep(s => s + 1);
                setCountdown(5);
            }
        }
        return () => clearTimeout(timer);
    }, [adStep, countdown]);

    const handlePlay = useCallback(() => {
        if (isVIP) setShowVideo(true);
        else setAdStep(1);
    }, [isVIP]);

    const isVIPOnly = (videoServers as { isVIPOnly?: boolean }[])?.[0]?.isVIPOnly || false;

    if (isVIPOnly && !isVIP) {
        return (
            <div className="aspect-video bg-secondary rounded-[3rem] flex flex-col items-center justify-center border-2 border-primary/20 overflow-hidden relative">
                {posterUrl && (
                    <img src={posterUrl} className="absolute inset-0 w-full h-full object-cover opacity-10 blur-xl" alt="" />
                )}
                <Gem className="h-12 w-12 text-amber-400 mb-4 relative z-10" />
                <h3 className="text-2xl font-black uppercase italic relative z-10">VIP Ексклузивно</h3>
                <p className="text-muted-foreground text-sm mt-2 text-center px-8 relative z-10">Надстройте сега за неограничен достъп!</p>
                <Button asChild size="lg" className="mt-6 rounded-2xl relative z-10 bg-brand-cinemaGold text-brand-midnight hover:bg-brand-cinemaGold/90">
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
                <div ref={containerRef} className="aspect-video bg-black rounded-[3rem] overflow-hidden border border-brand-royalPurple/30 shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative h-full group/mainplayer">
                    {/* Fullscreen Button for No-Controls Mode / Cinema Mode */}
                    {isCinemaMode && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleGlobalFullscreen();
                            }}
                            className="absolute top-8 right-8 z-50 p-3 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xl opacity-0 group-hover/mainplayer:opacity-100 transition-all hover:bg-brand-cinemaGold hover:text-brand-midnight text-white"
                            title="Fullscreen"
                        >
                            <Maximize className="w-6 h-6" />
                        </button>
                    )}
                    {isDirectVideoFile(url) ? (
                        // 🎬 Direct file — 100% precise seeking
                        <DirectVideoPlayer
                            key={`direct-${movieId}`}
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
                            key={`yt-${movieId}-${selectedServerIndex}`}
                            src={buildYouTubeEmbedUrl(url, playbackOffset, isCinemaMode)}
                            className="w-full h-full"
                            allowFullScreen
                            // @ts-ignore
                            webkitallowfullscreen="true"
                            // @ts-ignore
                            mozallowfullscreen="true"
                            allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write;"
                        />
                    ) : (
                        // 🌐 Generic embed
                        // FIX: Remove playbackOffset from key
                        <iframe
                            key={`gen-${movieId}-${selectedServerIndex}`}
                            src={buildGenericEmbedUrl(url, playbackOffset)}
                            className="w-full h-full"
                            allowFullScreen
                            // @ts-ignore - legacy support
                            webkitallowfullscreen="true"
                            // @ts-ignore - legacy support
                            mozallowfullscreen="true"
                            allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write;"
                        />
                    )}

                    {isCinemaMode && !isDirectVideoFile(url) && (
                        // Invisible overlay to intercept right-click / seek attempts on iframe
                        // Only for non-direct files (direct files have their own internal overlay logic)
                        <div className="absolute inset-x-0 bottom-0 h-16 cursor-default pointer-events-none" />
                    )}
                </div>

                {!isCinemaMode && servers.length > 1 && (
                    <div className="flex flex-wrap gap-3 justify-center pt-2">
                        {servers.map((server, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setSelectedServerIndex(index);
                                    setShowVideo(false);
                                    setTimeout(() => setShowVideo(true), 100);
                                }}
                                className={`px-6 py-2 rounded-xl font-display uppercase tracking-widest text-[11px] transition-all ${selectedServerIndex === index
                                    ? 'bg-brand-cinemaGold text-brand-midnight shadow-lg'
                                    : 'bg-brand-royalPurple/20 text-brand-softLavender hover:bg-brand-royalPurple/40 border border-brand-royalPurple/10'
                                    }`}
                            >
                                {server.name}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    // ── Ad countdown ──
    if (adStep > 0 && adStep <= 3) {
        return (
            <div className="aspect-video bg-brand-deepNight rounded-[3rem] flex items-center justify-center border border-brand-royalPurple/20 relative overflow-hidden">
                {posterUrl && (
                    <img src={posterUrl} className="absolute inset-0 w-full h-full object-cover opacity-10 blur-2xl" alt="" />
                )}
                <div className="text-center space-y-4 relative z-10">
                    <div className="text-8xl font-black text-brand-playRed animate-pulse drop-shadow-[0_0_30px_rgba(229,57,53,0.5)]">{countdown}</div>
                    <p className="text-xl font-display uppercase tracking-widest text-white">
                        {t('ad_text')?.replace('%d', adStep.toString()) || `Реклама ${adStep} от 3`}
                    </p>
                    <Button asChild variant="outline" size="sm" className="rounded-2xl border-brand-royalPurple/30 text-brand-softLavender">
                        <Link href="/vip">{t('upgradeToVip') || "Премахни рекламите"}</Link>
                    </Button>
                </div>
            </div>
        );
    }

    // ── No servers ──
    if (servers.length === 0) {
        return (
            <div className="aspect-video bg-brand-deepNight rounded-[3rem] flex items-center justify-center border border-brand-royalPurple/20 p-8 text-center relative overflow-hidden">
                {posterUrl && (
                    <img src={posterUrl} className="absolute inset-0 w-full h-full object-cover opacity-5 blur-3xl" alt="" />
                )}
                <div className="space-y-4 relative z-10">
                    <div className="w-16 h-16 rounded-full bg-brand-royalPurple/20 flex items-center justify-center mx-auto">
                        <AlertCircle className="h-8 w-8 text-brand-softLavender opacity-40" />
                    </div>
                    <p className="text-brand-softLavender/40 italic font-display uppercase tracking-widest text-sm">
                        {t('no_server_available') || "Няма наличен сървър"}
                    </p>
                </div>
            </div>
        );
    }

    // ── Play button ──
    return (
        <div className="space-y-4 h-full">
            <div className="group relative aspect-video bg-brand-deepNight rounded-[3rem] flex items-center justify-center overflow-hidden border border-brand-royalPurple/30 hover:border-brand-cinemaGold/40 transition-all duration-700 shadow-[0_40px_100px_rgba(0,0,0,0.8)] h-full">
                {/* Enhanced Player Placeholder Background */}
                {(backdropUrl || posterUrl) && (
                    <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110">
                        <img
                            src={backdropUrl || posterUrl}
                            className="w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity"
                            alt=""
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-midnight via-brand-midnight/20 to-transparent" />
                        <div className="absolute inset-0 backdrop-blur-[2px]" />
                    </div>
                )}

                {/* Cinematic Logo Overlay */}
                <div className="absolute top-10 flex items-center gap-3 opacity-20 pointer-events-none">
                    <img src="/brand/couchoo-icon-32.png" className="w-6 h-6 animate-pulse" alt="" />
                    <span className="font-display uppercase tracking-[0.5em] text-xs">CHOUCHOO CINEMA</span>
                </div>

                {/* Enhanced Play Button */}
                <div className="relative z-10 group/play cursor-pointer" onClick={handlePlay}>
                    <div className="relative">
                        {/* Outer Glow */}
                        <div className="absolute inset-0 bg-brand-cinemaGold/30 blur-[40px] rounded-full scale-150 opacity-0 group-hover/play:opacity-100 transition-opacity duration-500" />

                        {/* Shimmer Border */}
                        <div className="p-[2px] rounded-full bg-gradient-to-br from-brand-cinemaGold/50 via-white/50 to-brand-cinemaGold/50 shadow-2xl transition-transform group-hover/play:scale-110 duration-500">
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-brand-midnight/80 backdrop-blur-2xl flex items-center justify-center border border-white/5 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/play:animate-shimmer" />
                                <Play className="h-10 w-10 md:h-14 md:h-14 fill-brand-cinemaGold text-brand-cinemaGold ml-2 drop-shadow-[0_0_20px_rgba(240,192,64,0.5)]" />
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                        <p className="text-white font-display uppercase tracking-[0.4em] text-sm group-hover/play:text-brand-cinemaGold transition-colors">
                            {session ? (t('watch_now_player') || "ГЛЕДАЙ СЕГА") : (t('login_to_watch_player') || "ВЛЕЗ И ГЛЕДАЙ")}
                        </p>
                        <div className="h-[2px] w-0 bg-brand-cinemaGold mx-auto mt-2 transition-all duration-500 group-hover/play:w-20" />
                    </div>
                </div>
            </div>
        </div>
    );
}
