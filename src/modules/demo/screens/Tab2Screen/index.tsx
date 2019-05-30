import React from 'react';
import { Text, View, Button } from 'react-native-ui-lib';
import { BaseLayout } from '../../../../components';
import { iRootState, Dispatch } from '../../../../store';
import { connect } from 'react-redux';
import { ScreenProps } from '../../../../core';

const mapState = (state: iRootState) => ({
    sharks: state.sharks,
});

const mapDispatch = (dispatch: Dispatch) => ({
    incrementSharks: () => dispatch.sharks.increment(1),
    incrementSharksAsync: () => dispatch.sharks.incrementAsync(1),
});

type Props = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & ScreenProps;

export const Tab2Screen = ({ sharks, incrementSharks, incrementSharksAsync }: Props) => {
    return <BaseLayout>
        <Text bg-red30 blue50 text50>Tab2 - Sharks</Text>
        <Text bg-red30 blue50 text80>Sharks: {sharks.count}</Text>
        <View marginT-50 center>
            <Button text200 white background-orange30 label={'Increase'} onPress={incrementSharks} />
        </View>
        <View marginT-50 center>
            <Button text200 white background-orange30 label={'Increase Async'} onPress={incrementSharksAsync} />
        </View>
    </BaseLayout>;
};

export const Tab2ScreenContainer = connect(mapState, mapDispatch as any)(Tab2Screen);
