'use client';

import dynamic from 'next/dynamic';

const DynamicVideoPlayer = dynamic(() => import('@/components/movies/VideoPlayer').then(mod => mod.VideoPlayer), {
    ssr: false,
});

interface VideoServer {
    id: number;
    name: string;
    url: string;
    order: number;
}

interface MoviePlayerWrapperProps {
    movieId: number;
    videoUrl?: string;
    videoServers?: VideoServer[];
    initialPosition?: number;
    posterUrl?: string;
    backdropUrl?: string;
}

export function MoviePlayerWrapper({ movieId, videoUrl, videoServers, posterUrl, backdropUrl }: MoviePlayerWrapperProps) {
    return <DynamicVideoPlayer
        movieId={movieId}
        videoUrl={videoUrl}
        videoServers={videoServers}
        posterUrl={posterUrl}
        backdropUrl={backdropUrl}
    />;
}
