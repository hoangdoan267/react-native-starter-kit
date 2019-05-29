import firebase from 'react-native-firebase';

export const recordError = (error: Error) => {
    try {
        // tslint:disable-next-line:no-console
        console.log(error.message);
        // tslint:disable-next-line:no-console
        console.log(error.stack);
        firebase.crashlytics().setStringValue('stack', `${error.stack}`);
        firebase.crashlytics().setStringValue('message', `${error.message}`);
        firebase.crashlytics().recordError(0, `RN Fatal: ${error.message}`);
    } catch {
        // do nothing
    }
};
