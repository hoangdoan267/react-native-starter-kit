import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native-ui-lib';
import { Navigation } from 'react-native-navigation';
import { screenNames } from '../../..';
import { useTranslation } from 'react-i18next';
import { BaseLayout } from '../../../../components';
import { catchAndLog, showNotification } from '../../../../core';
import firebase from 'react-native-firebase';

interface Props {
    componentId: string;
}

export const Screen = (props: Props) => {
    const { t } = useTranslation();
    const [isBusy, setIsBusy] = useState<boolean>(false);
    const [email, setEmail] = useState<string | null>('');

    useEffect(() => {
        setEmail(firebase.auth().currentUser ? firebase.auth().currentUser!.email : '');
    });

    const reload = catchAndLog(
        async () => {
            setIsBusy(true);
            if (firebase.auth().currentUser) {
                await firebase.auth().currentUser!.reload();
            }
            const isEmailVerified = firebase.auth().currentUser!.emailVerified;
            if (isEmailVerified) {
                Navigation.setStackRoot(props.componentId, {
                    component: {
                        name: screenNames.HomeScreen,
                    }
                });
            } else {
                showNotification({ type: 'warning', message: t('emailVerification.emailNotVerified') });
            }
        },
        async () => setIsBusy(false)
    );

    const resendEmailVerification = catchAndLog(
        async () => {
            setIsBusy(true);
            if (firebase.auth().currentUser) {
                await firebase.auth().currentUser!.sendEmailVerification();
            }
            showNotification({ type: 'success', message: t('emailVerification.emailVerificationSent') });
        },
        async () => setIsBusy(false)
    );

    const logout = catchAndLog(
        async () => {
            if (!firebase.auth().currentUser) {
                return;
            }
            setIsBusy(true);
            await firebase.auth().signOut();
            Navigation.setStackRoot(props.componentId, {
                component: {
                    name: screenNames.LoginScreen,
                }
            });
        },
        async () => setIsBusy(false)
    );

    return <BaseLayout screenOrientation="PORTRAIT">
        <View paddingH-25>
            <Text blue50 text70 center marginT-50>{t('emailVerification.notification', { email })}</Text>
            <View marginT-50 center>
                <Button text200 white label={t('emailVerification.reload', { email })} style={{ width: 200 }}
                    onPress={reload}
                    disabled={isBusy} />
                <Button text200 outline marginT-20
                    label={t('emailVerification.resendEmailVerification')} style={{ width: 200 }}
                    onPress={resendEmailVerification}
                    disabled={isBusy} />
                <Button text200 outline marginT-20 label={t('emailVerification.logout')} style={{ width: 200 }}
                    onPress={logout}
                    disabled={isBusy} />
            </View>
        </View>
    </BaseLayout>;
};
