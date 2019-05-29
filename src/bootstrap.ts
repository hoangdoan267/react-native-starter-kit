import { registerModules } from './modules';
import { initializeI18Next, configureGoogleSignIn, checkUpdate, recordError } from './core';
export const bootstrap = async () => {
    try {
        await initializeI18Next();
        registerModules();
        await configureGoogleSignIn();
        await checkUpdate();
    } catch (error) {
        recordError(error);
    }
};
