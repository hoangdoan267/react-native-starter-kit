
import React from 'react';
import { View, Button } from 'react-native-ui-lib';
import { useTranslation } from 'react-i18next';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';
import firebase from 'react-native-firebase';
import { LoginType, catchAndLog, LOGIN_TYPE_FACEBOOK } from '../../../../../../core';
import { navigationService } from '../../../../../../services';

interface Props {
    isBusy: boolean;
    setIsBusy: (isBusy: boolean) => void;
}

export const SocialLogin = ({ isBusy, setIsBusy }: Props) => {
    const { t } = useTranslation();

    const loginFacebookAndGetCredential =
        async () => {
            const result = await LoginManager.logInWithReadPermissions(['public_profile']);
            if (result.isCancelled) {
                throw new Error('User cancelled signin');
            }

            // get the access token
            const data = await AccessToken.getCurrentAccessToken();

            if (!data) {
                // handle this however suites the flow of your app
                throw new Error('Something went wrong obtaining the users access token');
            }

            return firebase.auth.FacebookAuthProvider.credential(data.accessToken);
        };

    const loginGoogleAndGetCredential = async () => {
        await GoogleSignin.signIn();
        const { idToken, accessToken } = await GoogleSignin.getTokens();

        return firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
    };

    const login = catchAndLog(
        async (loginType: LoginType) => {
            setIsBusy(true);

            const credential = loginType === LOGIN_TYPE_FACEBOOK
                ? await loginFacebookAndGetCredential()
                : await loginGoogleAndGetCredential();
            // login with credential
            await firebase.auth().signInWithCredential(credential);
            firebase.analytics().logEvent(loginType === LOGIN_TYPE_FACEBOOK ? 'LOGIN_FACEBOOK' : 'LOGIN_GOOGLE');

            navigationService.navigateToHome();
        },
        async () => setIsBusy(false)
    );

    return <View>
        <Button text200 white backgroundColor="#4267B2" marginT-20 label={t('login.continueWithFacebook')} style={{ width: 300 }}
            onPress={() => login('facebook')}
            disabled={isBusy} />
        <Button text400 white backgroundColor="#EA4334" marginT-20 label={t('login.continueWithGoogle')} style={{ width: 300 }}
            onPress={() => login('google')}
            disabled={isBusy} />
    </View>;
};
