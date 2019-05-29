import React from 'react';
import { Text, TextField, View } from 'react-native-ui-lib';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { catchAndLog, showNotification } from '../../../../../core';
import { screenNames } from '../../../..';
import firebase from 'react-native-firebase';

interface Props {
  setFormSubmit: (submitForm: () => void) => void;
  setIsBusy: (isBusy: boolean) => void;
  navigateTo: (screen: string) => void;
}

interface FormData {
  email: string;
  password: string;
}

export const EmailLoginForm = ({ setFormSubmit, setIsBusy, navigateTo }: Props) => {
  const { t } = useTranslation();
  const initialValues = {
    email: '',
    password: '',
  };
  const fieldNames = {
    email: 'email',
    password: 'password',
  };

  const validationSchema = Yup.object().shape(
    {
      email: Yup.string()
        .email(t('error.invalid'))
        .required(t('error.required')),
      password: Yup.string()
        .required(t('error.required')),
    });

  const onSubmit = catchAndLog(
    async (values: FormData) => {
      setIsBusy(true);
      try {
        await firebase.auth().signInWithEmailAndPassword(values.email, values.password);
        firebase.analytics().logEvent('LOGIN_EMAIL');
        navigateTo(screenNames.AppLoaderScreen);
      } catch (error) {
        if (error.message === 'There is no user record corresponding to this identifier. The user may have been deleted.') {
          showNotification({ type: 'warning', message: t('error.emailIsNotRegistered') });
        } else if (error.message === 'The password is invalid or the user does not have a password.') {
          showNotification({ type: 'warning', message: t('error.passwordIncorrect') });
        } else {
          throw error;
        }
      }
    },
    async () => setIsBusy(false),
  );

  return <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
  >
    {({ values, errors, touched, handleBlur, handleSubmit, handleChange }) => {
      setFormSubmit(handleSubmit);
      return (
        <View>
          <TextField text50 placeholder={t('login.email')} dark10 floatingPlaceholder
            onChangeText={handleChange(fieldNames.email)}
            onBlur={handleBlur(fieldNames.email)}
            value={values.email}
          />
          {touched.email && errors.email &&
            <Text red50 text90>{errors.email}</Text>
          }
          <TextField text50 placeholder={t('login.password')} secureTextEntry dark10 floatingPlaceholder
            onChangeText={handleChange(fieldNames.password)}
            onBlur={handleBlur(fieldNames.password)}
            value={values.password}
          />
          {(touched.password && errors.password) &&
            <Text red50 text90>{errors.password}</Text>
          }
        </View>
      );
    }}
  </Formik>;
};
