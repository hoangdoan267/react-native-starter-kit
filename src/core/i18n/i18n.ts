import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import vi from './locales/vi.json';

export const languages = {
    en: 'en',
    vi: 'vi',
};

export const initializeI18Next = async () => {
    const languageDetector = {
        type: 'languageDetector',
        async: true,
        detect: (cb: any) => cb('en'),
        // tslint:disable-next-line:no-empty
        init: () => { },
        // tslint:disable-next-line:no-empty
        cacheUserLanguage: () => { },
    };

    await i18next
        .use(languageDetector)
        .use(initReactI18next)
        .init({
            fallbackLng: 'en',
            debug: __DEV__,
            resources: {
                en: { translation: en },
                vi: { translation: vi },
            },
        });

};
