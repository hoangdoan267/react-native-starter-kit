import React, { useEffect } from 'react';
import { View, Text } from 'react-native-ui-lib';
import { Navigation } from 'react-native-navigation';
import { screenNames } from '../../..';
import { ScreenProps } from '../../../../core';
import { auth } from 'react-native-firebase';
import { navigationService } from '../../../../services';
import SplashScreen from 'react-native-splash-screen';

export const AppLoaderScreen = (props: ScreenProps) => {
    useEffect(
        () => {
            // check firebase to see if user is logged in or not
            const unsubscriber = auth().onAuthStateChanged((user) => {
                let targetScreen = screenNames.LoginScreen;
                if (user) {
                    targetScreen = screenNames.HomeScreen;
                    const userInfo = user.providerData.find(u => u.providerId === 'password');
                    if (userInfo && !user.emailVerified) {
                        targetScreen = screenNames.EmailVerificationScreen;
                    } else {
                        navigationService.navigateToHome();
                        SplashScreen.hide();
                        return;
                    }
                }
                SplashScreen.hide();
                Navigation.setStackRoot(props.componentId, {
                    component: {
                        name: targetScreen,
                    }
                });
            });

            return () => {
                unsubscriber();
            };
        },
        []);
    return <View flex centerH centerV>
        <Text blue50 text20>Loading...</Text>
    </View>;
};
