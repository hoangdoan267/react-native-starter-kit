import { registerModules } from './modules';
import { initializeI18Next, configureGoogleSignIn, checkUpdate, catchAndLog, setDefaultTheme } from './core';
export const bootstrap = catchAndLog(async () => {
    await initializeI18Next();
    setDefaultTheme();
    registerModules();
    await configureGoogleSignIn();
    await checkUpdate();
});
