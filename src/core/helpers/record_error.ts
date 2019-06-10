import firebase from 'react-native-firebase';
import { Client } from 'bugsnag-react-native';
import { config } from '@app/config';
const bugsnag = new Client(config.bugsnagAPIKey);
export const recordError = (error: Error) => {
    try {
        if (__DEV__) {
            // tslint:disable-next-line:no-console
            console.log(error.message);
            // tslint:disable-next-line:no-console
            console.log(error.stack);
        } else {
            if (firebase.auth().currentUser) {
                firebase.crashlytics().setStringValue('userId', `${firebase.auth().currentUser!.uid}`);
            }
            firebase.crashlytics().setStringValue('stack', `${error.stack}`);
            firebase.crashlytics().setStringValue('message', `${error.message}`);
            firebase.crashlytics().recordError(0, `RN Fatal: ${error.message}`);
            bugsnag.notify(error);
        }
    } catch {
        // do nothing
    }
};
