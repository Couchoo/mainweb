import { Metadata } from 'next';
import { requireAdmin } from '@/lib/auth-helpers';
import { AdvancedScraperPanel } from '@/components/admin/AdvancedScraperPanel';
import { SingleMovieImportPanel } from '@/components/admin/SingleMovieImportPanel';

export default function ScraperPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Movie Scraper</h1>
                <p className="text-muted-foreground">
                    Import movies from IMDB with automatic vidsrc validation
                </p>
            </div>

            {/* Single Movie Import - Test Panel */}
            <SingleMovieImportPanel />

            {/* Mass Import Panel */}
            <AdvancedScraperPanel />
        </div>
    );
}
