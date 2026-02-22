
export const GENRE_MAPPING: Record<string, string> = {
    'Action': 'Екшън',
    'Comedy': 'Комедия',
    'Sci-Fi': 'Фантастика',
    'Horror': 'Ужаси',
    'Adventure': 'Приключенски',
    'Drama': 'Драма',
    'Thriller': 'Трилър',
    'Animation': 'Анимация',
    'Western': 'Уестърн',
    'War': 'Военни',
    'Romance': 'Романтичен',
    'Fantasy': 'Фентъзи',
    'Mystery': 'Мистерия',
    'Crime': 'Криминален',
    'Biography': 'Биография',
    'History': 'Исторически',
    'Documentary': 'Документален',
    'Family': 'Семеен',
    'Musical': 'Мюзикъл',
    'Sport': 'Спорт',
    'Music': 'Музикален',
    'Film-Noir': 'Филм-Ноар',
    'Short': 'Късометражен',
    'Adult': 'Еротичен',
    'Reality-TV': 'Риалити',
    'Talk-Show': 'Токшоу',
    'Game-Show': 'Гейм шоу',
    'News': 'Новини',
    'Indian': 'Индийски'
};

export const NAVBAR_ORDER = [
    'Action',
    'Comedy',
    'Sci-Fi',
    'Horror',
    'Adventure',
    'Drama'
];

/**
 * Returns the Bulgarian name for an English IMDB genre.
 * Falls back to the original name if no mapping exists.
 */
export function getBulgarianGenre(englishGenre: string): string {
    return GENRE_MAPPING[englishGenre] || englishGenre;
}
