import React, { useState, useEffect } from 'react';
import { View, TextField, Text, Button, Picker } from 'react-native-ui-lib';
import { catchAndLog, sleep, countryCodes } from '../../../../core';
import { useTranslation } from 'react-i18next';
import { BaseLayout, ErrorText } from '../../../../components';
import { navigationService } from '../../../../services';
import * as Yup from 'yup';
import { FormikProps, Formik } from 'formik';
import firebase from 'react-native-firebase';
import { Navigation } from 'react-native-navigation';

interface Props {
    componentId: string;
}

interface FormData {
    countryCode: string;
    phoneNo: string;
    otp: string;
}

interface Verification {
    codeSent: boolean;
    timeToWait: number;
}

export const LoginWithPhoneNoScreen = ({ componentId }: Props) => {
    const { t } = useTranslation();

    const [isBusy, setIsBusy] = useState<boolean>(false);

    const [verification, setVerification] = useState<Verification>({ codeSent: false, timeToWait: 0 });
    const [confirmResult, setConfirmationResult] = useState<any>(undefined);

    const initialValues = {
        countryCode: '+84',
        phoneNo: '',
        otp: '',
    };
    const fieldNames = {
        countryCode: 'countryCode',
        phoneNo: 'phoneNo',
        otp: 'otp',
    };

    const validationSchema = Yup.object().shape({
        phoneNo: Yup.string()
            .matches(/^[-\s\./0-9]*$/, t('error.invalid'))
            .required(t('error.required')),
        otp: Yup.string()
            .required(t('error.required')),
    });

    let formikProps: FormikProps<FormData>;

    const countryLookupList = countryCodes.map((countryCode) =>
        ({ value: countryCode.dialCode, label: `${countryCode.name} (${countryCode.dialCode})` }));
    const defaultCountry = countryLookupList.find(countryLookup => countryLookup.value === initialValues.countryCode)!;
    const [country, setCountry] = useState(defaultCountry);

    const changeCountryCode = (newCountry: { label: string; value: string }) => {
        setCountry(newCountry);
        formikProps.setFieldValue(fieldNames.countryCode, newCountry.value);
    };

    let countDownInterval: any;
    useEffect(
        () => {
            return () => {
                if (countDownInterval) {
                    clearInterval(countDownInterval);
                }
            };
        },
        []
    );

    const sendOTP = catchAndLog(
        async () => {
            setIsBusy(true);
            const phoneNo = `${formikProps.values.countryCode}${formikProps.values.phoneNo.trim()}`;
            const result = await firebase.auth().signInWithPhoneNumber(phoneNo);
            setConfirmationResult(result);
            setVerification({ codeSent: true, timeToWait: 30 });
            await sleep(1000);
            countDownInterval = setInterval(
                () => {
                    setVerification(prevState => {
                        if (prevState.timeToWait <= 1) {
                            clearInterval(countDownInterval);
                            countDownInterval = undefined;
                        }
                        return {
                            ...prevState,
                            timeToWait: prevState.timeToWait - 1
                        };
                    });
                },
                1000
            );
        },
        async () => setIsBusy(false)
    );

    const onSubmit = catchAndLog(
        async (values: FormData) => {
            if (!verification.codeSent) {
                return;
            }
            setIsBusy(true);
            await confirmResult.confirm(values.otp);
            await firebase.auth().currentUser!.updateProfile({ displayName: `user${values.phoneNo}` });
            firebase.analytics().logEvent('LOGIN_PHONE');
            navigationService.navigateToHome();
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
                const { values, errors, touched, handleBlur, handleSubmit, handleChange } = props;
                return (
                    <View paddingH-25>
                        <Text blue50 text20 center marginT-50>{t('login.welcome')}</Text>
                        <Picker
                            value={country}
                            title={t('loginWithPhoneNo.country')}
                            onChange={changeCountryCode}
                            enableModalBlur
                            showSearch
                        >
                            {countryLookupList.map(countryLookup =>
                                <Picker.Item key={countryLookup.value} value={countryLookup} isSelected={countryLookup === country} />)}
                        </Picker>
                        <TextField text50 placeholder={t('loginWithPhoneNo.phoneNo')} dark10 floatingPlaceholder style={{ width: 30, height: 30 }}
                            onChangeText={handleChange(fieldNames.phoneNo)}
                            onBlur={handleBlur(fieldNames.phoneNo)}
                            value={values.phoneNo}
                            keyboardType="number-pad"
                        />
                        {touched.phoneNo && errors.phoneNo &&
                            <ErrorText>{errors.phoneNo}</ErrorText>
                        }
                        <View center marginT-10>
                            <Button text200 white style={{ width: 300 }}
                                label={t('loginWithPhoneNo.sendOTP')
                                    + ((verification.codeSent && verification.timeToWait > 0) ? `(${verification.timeToWait})` : '')}
                                onPress={sendOTP}
                                disabled={isBusy || !values.phoneNo || !!errors.phoneNo || verification.timeToWait > 0} />
                        </View>
                        {verification.codeSent && <TextField text50 placeholder={t('loginWithPhoneNo.otp')} dark10 floatingPlaceholder
                            onChangeText={handleChange(fieldNames.otp)}
                            onBlur={handleBlur(fieldNames.otp)}
                            value={values.otp}
                        />}
                        {(touched.otp && errors.otp) &&
                            <ErrorText>{errors.otp}</ErrorText>
                        }
                        <View center marginT-10>
                            <Button text200 white marginT-20 label={t('loginWithPhoneNo.verify')} style={{ width: 300 }}
                                onPress={handleSubmit}
                                disabled={isBusy || !verification.codeSent} />
                            <Button text200 outline marginT-20
                                label={t('loginWithPhoneNo.back')} style={{ width: 300 }}
                                onPress={() => Navigation.pop(componentId)}
                                disabled={isBusy} />
                        </View>
                    </View>
                );
            }}
        </Formik>
    </BaseLayout >;
};
