import React from 'react';
import { View, Text, Button } from 'react-native-ui-lib';
import { useTranslation } from 'react-i18next';
import { auth } from 'react-native-firebase';
import { connect } from 'react-redux';
import { GoogleSignin } from 'react-native-google-signin';
import { BaseLayout, Icon } from '../../../../components';
import { catchAndLog, ScreenProps } from '../../../../core';
import { navigationService } from '../../../../services';
import { Navigation } from 'react-native-navigation';
import { iRootState } from '../../../../store';
import { config } from '../../../../config';

const mapState = (state: iRootState) => ({
    sharks: state.sharks,
    dolphins: state.dolphins,
});

type Props = ReturnType<typeof mapState> & ScreenProps;

export const HomeScreen = ({ componentId, sharks, dolphins }: Props) => {
    const { t } = useTranslation();

    const logout = catchAndLog(
        async () => {
            if (auth().currentUser) {
                const user = auth().currentUser!;
                if (user.providerData
                    && user.providerData.length > 0
                    && user.providerData[0].providerId === 'google.com'
                    && await GoogleSignin.isSignedIn()) {
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
            <Button text200 white background-orange30 label={'Go to tab2'} onPress={gotoTab2} />
        </View>
        <View marginT-50 center>
            <Button text200 white background-orange30 label={t('home.logout')} onPress={logout} />
        </View>
    </BaseLayout>;
};

export const HomeScreenContainer = connect(mapState)(HomeScreen);
