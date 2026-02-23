/**
 * Bi-directional transliteration between Bulgarian Cyrillic and Latin.
 * Allows searching "Спайдър" and finding "Spider-Man" (BG→EN phonetic mapping)
 * and searching "Spider" and finding "Спайдърмен" via reverse (EN typed, BG stored).
 */

// Bulgarian Cyrillic → Latin (phonetic, based on BG standard transliteration)
const BG_TO_EN: Record<string, string> = {
    а: 'a', б: 'b', в: 'v', г: 'g', д: 'd',
    е: 'e', ж: 'zh', з: 'z', и: 'i', й: 'y',
    к: 'k', л: 'l', м: 'm', н: 'n', о: 'o',
    п: 'p', р: 'r', с: 's', т: 't', у: 'u',
    ф: 'f', х: 'h', ц: 'ts', ч: 'ch', ш: 'sh',
    щ: 'sht', ъ: 'a', ь: '', ю: 'yu', я: 'ya',
    А: 'A', Б: 'B', В: 'V', Г: 'G', Д: 'D',
    Е: 'E', Ж: 'Zh', З: 'Z', И: 'I', Й: 'Y',
    К: 'K', Л: 'L', М: 'M', Н: 'N', О: 'O',
    П: 'P', Р: 'R', С: 'S', Т: 'T', У: 'U',
    Ф: 'F', Х: 'H', Ц: 'Ts', Ч: 'Ch', Ш: 'Sh',
    Щ: 'Sht', Ъ: 'A', Ь: '', Ю: 'Yu', Я: 'Ya',
};

// Latin → Bulgarian Cyrillic (approximate phonetic reverse)
// Longer sequences must come first (order matters)
const EN_TO_BG_PAIRS: [string, string][] = [
    ['sht', 'щ'], ['zh', 'ж'], ['ts', 'ц'],
    ['ch', 'ч'], ['sh', 'ш'], ['yu', 'ю'],
    ['ya', 'я'], ['yo', 'йо'],
    ['a', 'а'], ['b', 'б'], ['v', 'в'],
    ['g', 'г'], ['d', 'д'], ['e', 'е'],
    ['z', 'з'], ['i', 'и'], ['y', 'й'],
    ['k', 'к'], ['l', 'л'], ['m', 'м'],
    ['n', 'н'], ['o', 'о'], ['p', 'п'],
    ['r', 'р'], ['s', 'с'], ['t', 'т'],
    ['u', 'у'], ['f', 'ф'], ['h', 'х'],
    ['j', 'й'], ['w', 'в'], ['x', 'кс'],
    ['q', 'к'],
];

/** Returns true if the string contains Cyrillic characters */
export function isCyrillic(text: string): boolean {
    return /[а-яА-ЯъЪьЬёЁ]/.test(text);
}

/** Transliterate Bulgarian Cyrillic → Latin */
export function bgToLatin(text: string): string {
    return text.split('').map(ch => BG_TO_EN[ch] ?? ch).join('');
}

/** Transliterate Latin → Bulgarian Cyrillic (reverse, approximate) */
export function latinToBG(text: string): string {
    let result = text.toLowerCase();
    for (const [lat, cyrl] of EN_TO_BG_PAIRS) {
        result = result.replaceAll(lat, cyrl);
    }
    return result;
}

/**
 * Generate all search variants for a given query.
 * Always returns an array with at least the original query.
 * If Cyrillic → also adds Latin transliteration.
 * If Latin → also adds Cyrillic transliteration.
 */
export function searchVariants(query: string): string[] {
    const variants = new Set<string>([query]);
    if (isCyrillic(query)) {
        // User typed Cyrillic, also search with Latin transliteration
        const latinVersion = bgToLatin(query);
        if (latinVersion !== query) variants.add(latinVersion);
    } else {
        // User typed Latin, also search with Cyrillic transliteration
        const cyrillicVersion = latinToBG(query);
        if (cyrillicVersion !== query) variants.add(cyrillicVersion);
    }
    return Array.from(variants);
}
