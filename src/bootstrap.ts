import { registerModules } from './modules';
import { initializeI18Next, configureGoogleSignIn, checkUpdate, catchAndLog } from './core';
export const bootstrap = catchAndLog(async () => {
    await initializeI18Next();
    registerModules();
    await configureGoogleSignIn();
    await checkUpdate();
});
