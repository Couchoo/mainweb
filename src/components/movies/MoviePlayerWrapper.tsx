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
}

export function MoviePlayerWrapper({ movieId, videoUrl, videoServers }: MoviePlayerWrapperProps) {
    return <DynamicVideoPlayer
        movieId={movieId}
        videoUrl={videoUrl}
        videoServers={videoServers}
    />;
}
