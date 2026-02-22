import bg from '@/locales/bg.json';
import en from '@/locales/en.json';

export type Locale = 'bg' | 'en';

export const translations = {
    bg,
    en
} as const;

export type TranslationKey = keyof typeof bg;

export function getTranslation(key: TranslationKey, locale: Locale = 'bg') {
    return (translations[locale] as any)[key] || (translations.bg as any)[key];
}

export function getLocalizedMovie(movie: any, locale: Locale = 'bg') {
    if (!movie) return null;

    const isEN = locale === 'en';
    return {
        ...movie,
        displayTitle: isEN ? (movie.titleEN || movie.titleBG) : movie.titleBG,
        displayDescription: isEN ? (movie.descriptionEN || movie.description) : movie.description,
    };
}

export function getLocalizedCategory(category: any, locale: Locale = 'bg') {
    if (!category) return null;
    const isEN = locale === 'en';
    return {
        ...category,
        displayName: isEN ? (category.nameEN || category.name) : category.name,
    };
}
