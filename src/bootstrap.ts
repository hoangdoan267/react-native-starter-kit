import { registerModules } from '@app/modules';
import { initializeI18Next, configureGoogleSignIn, checkUpdate, catchAndLog, setDefaultTheme } from '@app/core';
import firebase from 'react-native-firebase';
export const bootstrap = catchAndLog(async () => {
    firebase.perf().setPerformanceCollectionEnabled(true);
    await initializeI18Next();
    setDefaultTheme();
    registerModules();
    await configureGoogleSignIn();
    await checkUpdate();
});
