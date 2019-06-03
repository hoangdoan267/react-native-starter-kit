import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native-ui-lib';
import { EmailLoginForm, SocialLogin, LanguageSelection } from './components';
import { useTranslation } from 'react-i18next';
import { BaseLayout } from '../../../../components';
import { screenNames } from '../../..';
import { navigationService } from '../../../../services';
import { config } from '../../../../config';

interface Props {
    componentId: string;
}

export const Screen = ({ componentId }: Props) => {
    const { t } = useTranslation();

    const navigateTo = (screenName: string) => {
        navigationService.navigateTo({ screenName, componentId });
    };

    const [isBusy, setIsBusy] = useState<boolean>(false);

    // tslint:disable-next-line:no-empty
    let submitForm = () => { };
    const setFormSubmit = (submitFormInput: () => void) => {
        submitForm = submitFormInput;
    };

    const loginWithPhoneNo = () => {
        navigateTo(screenNames.LoginWithPhoneNoScreen);
    };

    return <BaseLayout screenOrientation="PORTRAIT">
        <View paddingH-25>
            <Text blue50 text20 center>{t('login.welcome')}</Text>
            <EmailLoginForm
                setFormSubmit={setFormSubmit}
                setIsBusy={setIsBusy}
                navigateTo={navigateTo} />
            <View marginT-20 center>
                <Button text200 white label={t('login.login')} style={{ width: 300 }}
                    onPress={() => submitForm()}
                    disabled={isBusy} />
                <Button text200 white label={t('login.loginWithPhoneNo')} marginT-20 style={{ width: 300 }}
                    onPress={loginWithPhoneNo}
                    disabled={isBusy} />
                <SocialLogin isBusy={isBusy} setIsBusy={setIsBusy} />
                <View center row marginT-30 marginB-20>
                    <TouchableOpacity onPress={() => navigateTo(screenNames.RegisterScreen)}>
                        <Text orange30 text200 >
                            {t('login.register')}
                        </Text>
                    </TouchableOpacity>
                    <Text orange30 text200 padding-30>
                        {'     /     '}
                    </Text>
                    <Text orange30 text200 >
                        {t('login.forgotPassword')}
                    </Text>
                </View>
            </View>
            <LanguageSelection />
            <View center>
                <Text text200 marginT-20>
                    {t('login.version')} Android: {config.android.version}, iOS: {config.ios.version}
                </Text>
            </View>
        </View>
    </BaseLayout >;
};
