import React from 'react';
import { mapStateToProps } from './map_state_to_props';
import { mapDispatchToProps } from './map_dispatch_to_props';
import { ScreenProps, catchAndLog } from '@app/core';
import { Text, View, Button } from 'react-native-ui-lib';
import { BaseLayout, Icon } from '@app/components';
import { auth } from 'react-native-firebase';
import { useTranslation } from 'react-i18next';
import { GoogleSignin } from 'react-native-google-signin';
import { navigationService } from '@app/services';
import { Navigation } from 'react-native-navigation';
import { config } from '@app/config';

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & ScreenProps;

export const Screen = ({ componentId, sharks, dolphins }: Props) => {
    const { t } = useTranslation();

    const logout = catchAndLog(
        async () => {
            if (auth().currentUser) {
                const user = auth().currentUser!;
                if (user.providerData
                    && user.providerData.length > 0
                    && user.providerData[0].providerId === 'google.com'
                    && await GoogleSignin.isSignedIn()) {
                    await GoogleSignin.revokeAccess();
                    await GoogleSignin.signOut();
                }
                await auth().signOut();
            }
            navigationService.navigateToLogin();
        }
    );

    const userName = auth().currentUser
        ? auth().currentUser!.displayName
        : '';

    const gotoTab2 = catchAndLog(
        async () => {
            Navigation.mergeOptions(componentId, {
                bottomTabs: {
                    currentTabIndex: 1,
                },
            });
        }
    );

    return <BaseLayout>
        <Text bg-red30 blue50 text50>{t('home.hello')}, {userName}</Text>
        <Text bg-red30 blue50 text80>Android Version: {config.android.version}</Text>
        <Text bg-red30 blue50 text80>iOS Version: {config.ios.version}</Text>
        <Text bg-red30 blue50 text80>Sharks: {sharks ? sharks.count : -1}</Text>
        <Text bg-red30 blue50 text80>Dolphins: {dolphins ? dolphins.count : -1}</Text>
        <Icon name="google-home" size={30} />
        <View marginT-50 center>
            <Button text200 white label={'Go to tab2'} onPress={gotoTab2} />
        </View>
        <View marginT-50 center>
            <Button text200 white label={t('home.logout')} onPress={logout} />
        </View>
    </BaseLayout>;
};
