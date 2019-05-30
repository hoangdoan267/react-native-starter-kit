import Toast from 'react-native-root-toast';
import { Colors } from 'react-native-ui-lib';

export const showNotification = ({ type, message }: { type: 'success' | 'warning' | 'error', message: string }) => {
    const backgroundColor = type === 'error'
        ? Colors.red30
        : type === 'warning'
            ? Colors.yellow30
            : Colors.green30;
    Toast.show(message, {
        position: Toast.positions.TOP,
        backgroundColor,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        duration: type === 'success' ? 1000 : Toast.durations.LONG,
    });
};
