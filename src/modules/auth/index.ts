import { Navigation } from 'react-native-navigation';
import { LoginScreen, RegisterScreen, ForgotPasswordScreen, AppLoaderScreen, EmailVerificationScreen, LoginWithPhoneNoScreen } from './screens';

const screenNames = {
  LoginScreen: 'LoginScreen',
  RegisterScreen: 'RegisterScreen',
  ForgotPasswordScreen: 'ForgotPasswordScreen',
  AppLoaderScreen: 'AppLoaderScreen',
  EmailVerificationScreen: 'EmailVerificationScreen',
  LoginWithPhoneNoScreen: 'LoginWithPhoneNoScreen',
};

const registerScreens = () => {
  Navigation.registerComponent(screenNames.LoginScreen, () => LoginScreen);
  Navigation.registerComponent(screenNames.RegisterScreen, () => RegisterScreen);
  Navigation.registerComponent(screenNames.ForgotPasswordScreen, () => ForgotPasswordScreen);
  Navigation.registerComponent(screenNames.AppLoaderScreen, () => AppLoaderScreen);
  Navigation.registerComponent(screenNames.EmailVerificationScreen, () => EmailVerificationScreen);
  Navigation.registerComponent(screenNames.LoginWithPhoneNoScreen, () => LoginWithPhoneNoScreen);
};

export default {
  screenNames,
  registerScreens,
};
