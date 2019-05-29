import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { language as languageEn } from './locales/en';
import { language as languageVi } from './locales/vi';

export const Language = {
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
            debug: true,
            resources: {
                en: languageEn,
                vi: languageVi,
            },
        });

};
