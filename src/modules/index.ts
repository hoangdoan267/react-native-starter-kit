import auth from './auth';
import demo from './demo';
import { Navigation } from 'react-native-navigation';

export const screenNames = {
  ...auth.screenNames,
  ...demo.screenNames,
};

export const registerModules = () => {
  // register screens & set root
  const modules = [auth, demo];
  for (const module of modules) {
    module.registerScreens();
  }

  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setDefaultOptions(
      {
        topBar: {
          drawBehind: true,
          visible: false,
          height: 0,
        },
      });
    Navigation.setRoot(
      {
        root: {
          stack: {
            options: {
              topBar: {
                visible: false,
              },
            },
            children: [
              {
                component: {
                  name: screenNames.AppLoaderScreen,
                },
              },
            ],
          },
        },
      });
  });
};
