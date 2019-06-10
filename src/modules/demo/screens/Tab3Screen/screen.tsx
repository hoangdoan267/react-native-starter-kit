import React from 'react';
import { mapStateToProps } from './map_state_to_props';
import { mapDispatchToProps } from './map_dispatch_to_props';
import { ScreenProps, catchAndLog } from '@app/core';
import { Text, View, Button } from 'react-native-ui-lib';
import { BaseLayout } from '@app/components';
import firebase from 'react-native-firebase';

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & ScreenProps;

export const Screen = ({ dolphins, incrementDolphins, incrementDolphinsAsync }: Props) => {
    const testCrash = () => {
        firebase.crashlytics().crash();
    };

    const testCrashCatch = catchAndLog(() => {
        const a = null;
        const b = (a as any).crash;
        return b;
    });

    const testBugSnagCrash = () => {
        const a = null;
        const b = (a as any).crash;
        return b;
    };

    return <BaseLayout>
        <Text bg-red30 blue50 text50>Tab3 - dolphins</Text>
        <Text bg-red30 blue50 text80>dolphins: {dolphins.count}</Text>
        <View marginT-50 center>
            <Button text200 white label={'Increase'} onPress={incrementDolphins} />
        </View>
        <View marginT-50 center>
            <Button text200 white label={'Increase Async'} onPress={incrementDolphinsAsync} />
        </View>
        <View marginT-50 center>
            <Button text200 white label={'Test Firebase Crash'} onPress={testCrash} />
        </View>
        <View marginT-50 center>
            <Button text200 white label={'Test Firebase Crash Catch'} onPress={testCrashCatch} />
        </View>
        <View marginT-50 center>
            <Button text200 white label={'Test BugSnag Crash Catch'} onPress={testBugSnagCrash} />
        </View>
    </BaseLayout>;
};
