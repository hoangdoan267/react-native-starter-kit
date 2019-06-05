import React from 'react';
import { mapStateToProps } from './map_state_to_props';
import { mapDispatchToProps } from './map_dispatch_to_props';
import { ScreenProps } from '@app/core';
import { Text, View, Button } from 'react-native-ui-lib';
import { BaseLayout } from '@app/components';

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & ScreenProps;

export const Screen = ({ sharks, incrementSharks, incrementSharksAsync }: Props) => {
    return <BaseLayout>
        <Text>Tab2 - Sharks</Text>
        <Text>Sharks: {sharks.count}</Text>
        <View marginT-50 center>
            <Button label={'Increase'} onPress={incrementSharks} />
        </View>
        <View marginT-50 center>
            <Button label={'Increase Async'} onPress={incrementSharksAsync} />
        </View>
    </BaseLayout>;
};
