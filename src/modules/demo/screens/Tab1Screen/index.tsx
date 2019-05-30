import React from 'react';
import { View, Text, Button } from 'react-native-ui-lib';
import { BaseLayout } from '../../../../components';
import { catchAndLog, ScreenProps } from '../../../../core';
import { navigationService } from '../../../../services';
import { screenNames } from '../../..';

export const Tab1Screen = ({ componentId }: ScreenProps) => {
    const gotoTab2 = catchAndLog(
        async () => {
            navigationService.navigateTo({ componentId, screenName: screenNames.Tab2Screen });
        }
    );

    return <BaseLayout>
        <Text bg-red30 blue50 text50>Tab1</Text>
        <View marginT-50 center>
            <Button text200 white background-orange30 label={'Go to tab2'} onPress={gotoTab2} />
        </View>
    </BaseLayout>;
};
