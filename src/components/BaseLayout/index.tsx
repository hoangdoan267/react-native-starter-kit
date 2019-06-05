import React, { ReactNode, useEffect } from 'react';
import { View } from 'react-native-ui-lib';
import Orientation from 'react-native-orientation-locker';
import { ErrorBoundary } from '@app/components';

interface Props {
    children?: ReactNode;
    screenOrientation?: 'PORTRAIT' | 'LANDSCAPE' | 'LANDSCAPE-LEFT' | 'LANDSCAPE-RIGHT';
}
export const BaseLayout = ({ children, screenOrientation }: Props) => {
    useEffect(() => {
        switch (screenOrientation) {
            case 'PORTRAIT':
                Orientation.lockToPortrait();
                break;
            case 'LANDSCAPE-LEFT':
                Orientation.lockToLandscapeLeft();
                break;
            case 'LANDSCAPE-RIGHT':
                Orientation.lockToLandscapeRight();
                break;
            case 'LANDSCAPE':
                Orientation.lockToLandscape();
                break;
            default:
                break;
        }
        return () => {
            if (screenOrientation) {
                Orientation.unlockAllOrientations();
            }
        };
    });
    return <View useSafeArea flex>
        <ErrorBoundary>
            {children}
        </ErrorBoundary>
    </View>;
};
