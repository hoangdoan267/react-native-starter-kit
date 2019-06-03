import React, { useState } from 'react';
import { View, TextField, Text, Button } from 'react-native-ui-lib';
import { screenNames } from '../../..';
import { useTranslation } from 'react-i18next';
import { BaseLayout, ErrorText } from '../../../../components';
import { navigationService } from '../../../../services';
import firebase from 'react-native-firebase';
import * as Yup from 'yup';
import * as _ from 'lodash-es';
import { Formik, FormikProps } from 'formik';
import { catchAndLog, ScreenProps } from '../../../../core';
import { Navigation } from 'react-native-navigation';

interface FormData {
    email: string;
    isEmailRegistered: boolean;
    password: string;
    confirmPassword: string;
}

export const Screen = ({ componentId }: ScreenProps) => {
    const { t } = useTranslation();
    const [isBusy, setIsBusy] = useState<boolean>(false);

    const navigateTo = (screenName: string) => {
        navigationService.navigateTo({ screenName, componentId });
    };

    const initialValues: FormData = {
        email: '',
        isEmailRegistered: false,
        password: '',
        confirmPassword: '',
    };
    const fieldNames = {
        email: 'email',
        isEmailRegistered: 'isEmailRegistered',
        password: 'password',
        confirmPassword: 'confirmPassword',
    };
    const validationSchema = Yup.object().shape({
        [fieldNames.email]: Yup.string()
            .email(t('error.invalid'))
            .required(t('error.required')),
        [fieldNames.isEmailRegistered]: Yup.boolean()
            .oneOf([false], t('error.emailHasBeenAlreadyRegistered')),
        [fieldNames.password]: Yup.string()
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/, t('error.passwordIsInvalid'))
            .required(t('error.required')),
        [fieldNames.confirmPassword]: Yup.string()
            .oneOf([Yup.ref('password'), null], t('error.confirmPasswordDoesNotMatched'))
            .required(t('error.required')),
    });

    let formikProps: FormikProps<FormData>;

    const validateUniqueEmail = catchAndLog(
        async (email: string) => {
            if (formikProps.errors.email) {
                return;
            }
            const providers = await firebase.auth().fetchSignInMethodsForEmail(email);
            const isEmailRegistered = providers && providers.length > 0;
            const message = isEmailRegistered
                ? t('error.emailHasBeenAlreadyRegistered')
                : undefined;
            formikProps.setFieldValue('isEmailRegistered', isEmailRegistered);
            formikProps.setFieldError('isEmailRegistered', message as any);
        },
        async () => setIsBusy(false)
    );
    const debounceValidateUniqueEmail = _.debounce(validateUniqueEmail, 500);
    const handleChangeEmail = (email: string) => {
        formikProps.handleChange(fieldNames.email)(email);
        debounceValidateUniqueEmail(email);
    };

    const handleBlurEmail = (email: string) => {
        formikProps.handleBlur(fieldNames.email)(email);
        // issue when rendering, remove logic for now
        // validateUniqueEmail(email);
    };

    const onSubmit = catchAndLog(
        async (values: FormData) => {
            setIsBusy(true);
            await validateUniqueEmail(values.email);
            if (!formikProps.isValid) {
                return;
            }
            const credential = await firebase.auth().createUserWithEmailAndPassword(values.email, values.password);
            credential.user.sendEmailVerification();
            navigateTo(screenNames.EmailVerificationScreen);
        },
        async () => setIsBusy(false)
    );

    return <BaseLayout screenOrientation="PORTRAIT">
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {(props) => {
                formikProps = props;
                const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;
                return (
                    <View paddingH-25>
                        <Text blue50 text20 center marginT-50>{t('register.register')}</Text>
                        <TextField text50 placeholder={t('register.email')} dark10 floatingPlaceholder
                            onChangeText={handleChangeEmail}
                            onBlur={handleBlurEmail}
                            value={values.email}
                        />
                        {touched.email && errors.email &&
                            <ErrorText>{errors.email}</ErrorText>
                        }
                        {!(touched.email && errors.email) && errors.isEmailRegistered &&
                            <ErrorText>{errors.isEmailRegistered}</ErrorText>
                        }
                        <TextField text50 placeholder={t('register.password')} secureTextEntry dark10 floatingPlaceholder
                            onChangeText={handleChange(fieldNames.password)}
                            onBlur={handleBlur(fieldNames.password)}
                            value={values.password}
                        />
                        {touched.password && errors.password &&
                            <ErrorText>{errors.password}</ErrorText>
                        }
                        <TextField text50 placeholder={t('register.confirmPassword')} secureTextEntry dark10 floatingPlaceholder
                            onChangeText={handleChange(fieldNames.confirmPassword)}
                            onBlur={handleBlur(fieldNames.confirmPassword)}
                            value={values.confirmPassword}
                        />
                        {touched.confirmPassword && errors.confirmPassword &&
                            <ErrorText>{errors.confirmPassword}</ErrorText>
                        }
                        <View marginT-50 center>
                            <Button text200 white label={t('register.register')} style={{ width: 200 }}
                                onPress={handleSubmit}
                                disabled={isBusy} />
                            <Button text200 outline marginT-20 label={t('register.back')} style={{ width: 200 }}
                                onPress={() => Navigation.pop(componentId)}
                                disabled={isBusy} />
                        </View>
                    </View>
                );
            }}
        </Formik>
    </BaseLayout>;
};
