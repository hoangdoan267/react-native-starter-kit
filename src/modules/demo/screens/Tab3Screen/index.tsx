import React from 'react';
import { Text, View, Button } from 'react-native-ui-lib';
import { BaseLayout } from '../../../../components';
import { iRootState, Dispatch } from '../../../../store';
import { connect } from 'react-redux';
import { ScreenProps, catchAndLog } from '../../../../core';
import firebase from 'react-native-firebase';

const mapState = (state: iRootState) => ({
    dolphins: state.dolphins,
});

const mapDispatch = (dispatch: Dispatch) => ({
    incrementDolphins: () => dispatch.dolphins.increment(1),
    incrementDolphinsAsync: () => dispatch.dolphins.incrementAsync(1),
});

type Props = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & ScreenProps;

export const Tab3Screen = ({ dolphins, incrementDolphins, incrementDolphinsAsync }: Props) => {
    const testCrash = () => {
        firebase.crashlytics().crash();
    };

    const testCrashCatch = catchAndLog(() => {
        const a = null;
        const b = (a as any).crash;
        return b;
    });

    return <BaseLayout>
        <Text bg-red30 blue50 text50>Tab3 - dolphins</Text>
        <Text bg-red30 blue50 text80>dolphins: {dolphins.count}</Text>
        <View marginT-50 center>
            <Button text200 white background-orange30 label={'Increase'} onPress={incrementDolphins} />
        </View>
        <View marginT-50 center>
            <Button text200 white background-orange30 label={'Increase Async'} onPress={incrementDolphinsAsync} />
        </View>
        <View marginT-50 center>
            <Button text200 white background-orange30 label={'Test Firebase Crash'} onPress={testCrash} />
        </View>
        <View marginT-50 center>
            <Button text200 white background-orange30 label={'Test Firebase Crash Catch'} onPress={testCrashCatch} />
        </View>
    </BaseLayout>;
};

export const Tab3ScreenContainer = connect(mapState, mapDispatch as any)(Tab3Screen);
