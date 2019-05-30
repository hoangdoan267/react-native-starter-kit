import { overrideConfig } from './override.config';

export const config = {
  appName: 'mobile',
  android: {
    version: '0.1.1',
    versionCode: 2,
  },
  ios: {
    version: '0.1.1',
    build: 2,
  },
  i18n: {
    vn: 'vn',
    en: 'en',
    defaultLang: 'en',
  },
  signInOptions: [
    'email',
    'phone',
    'facebook',
    'google',
  ],
  regex: {
    password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
    email: /^[a-z][a-z0-9_\.]{5,40}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/,
    phone: /^([+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*){8,}$/,
  },
  codePush: {
    android: {
      stagingKey: '',
      productionKey: ''
    },
    ios: {
      stagingKey: '',
      productionKey: ''
    },
  },
  ...overrideConfig,
};
