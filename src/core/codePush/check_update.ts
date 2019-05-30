import firebase from 'react-native-firebase';
import codePush from 'react-native-code-push';
import { Platform } from 'react-native';
import { config } from '../../config';
import { showNotification } from '..';
import { recordError } from '../helpers/record_error';

let isTester = false;

const onSyncStatusChange = (syncStatus: any) => {
    let status = '';
    switch (syncStatus) {
        case codePush.SyncStatus.AWAITING_USER_ACTION:
            status = 'AWAITING_USER_ACTION';
            break;
        case codePush.SyncStatus.CHECKING_FOR_UPDATE:
            status = 'CHECKING_FOR_UPDATE';
            break;
        case codePush.SyncStatus.DOWNLOADING_PACKAGE:
            status = 'DOWNLOADING_PACKAGE';
            break;
        case codePush.SyncStatus.INSTALLING_UPDATE:
            status = 'INSTALLING_UPDATE';
            break;
        case codePush.SyncStatus.SYNC_IN_PROGRESS:
            status = 'SYNC_IN_PROGRESS';
            break;
        case codePush.SyncStatus.UNKNOWN_ERROR:
            status = 'UNKNOWN_ERROR';
            break;
        case codePush.SyncStatus.UPDATE_IGNORED:
            status = 'UPDATE_IGNORED';
            break;
        case codePush.SyncStatus.UPDATE_INSTALLED:
            status = 'UPDATE_INSTALLED';
            break;
        case codePush.SyncStatus.UP_TO_DATE:
            status = 'UP_TO_DATE';
            break;
        default:
            break;
    }
    showNotification({ type: 'success', message: `${isTester ? '(Tester) ' : ''}code-push: ${status}` });
};

const checkIsTester = async () => {
    try {
        if (!firebase.auth().currentUser) {
            return false;
        }
        const tester = await firebase.firestore().collection('testers').doc(firebase.auth().currentUser!.uid).get();
        if (tester.exists) {
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
};

export const checkUpdate = async () => {
    try {
        const useStagingKey = await checkIsTester();
        isTester = useStagingKey;
        const deploymentKey = Platform.OS === 'android'
            ? useStagingKey
                ? config.codePush.android.stagingKey
                : config.codePush.android.productionKey
            : useStagingKey
                ? config.codePush.ios.stagingKey
                : config.codePush.ios.productionKey;
        await codePush.sync(
            {
                deploymentKey,
                installMode: codePush.InstallMode.ON_NEXT_RESUME
            },
            onSyncStatusChange,
        );
    } catch (error) {
        recordError(error);
    }
};
