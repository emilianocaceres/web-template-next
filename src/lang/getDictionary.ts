import type { PathInto } from '@/types/UtilityTypes.type';

const DEFAULT_LANG: TSupportedLangs = 'es';

const dictionaries = {
    es: () => import('./es.json').then((module) => module.default),
};

export const supportedLangs = Object.keys(dictionaries) as TSupportedLangs[];

export const getDictionary = async (lang: TSupportedLangs = DEFAULT_LANG): Promise<TDictionary> => {
    const dictionary = await dictionaries[lang]();

    return dictionary;
};

//
// Helper types
//

export type TSupportedLangs = keyof typeof dictionaries;

export type TDictionary = Awaited<ReturnType<(typeof dictionaries)[typeof DEFAULT_LANG]>>;

export type TDictionaryKeys = PathInto<TDictionary>;
