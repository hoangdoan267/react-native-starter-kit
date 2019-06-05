import { Navigation } from 'react-native-navigation';
import { Tab2Screen, Tab3Screen, HomeScreen } from './screens';
import { withLazyLoad, withStore } from '@app/core';

const screenNames = {
  HomeScreen: 'HomeScreen',
  Tab1Screen: 'Tab1Screen',
  Tab2Screen: 'Tab2Screen',
  Tab3Screen: 'Tab3Screen',
};

const registerScreens = () => {
  Navigation.registerComponent(screenNames.HomeScreen, () => withLazyLoad(withStore(HomeScreen)));
  Navigation.registerComponent(screenNames.Tab2Screen, () => withLazyLoad(withStore(Tab2Screen)));
  Navigation.registerComponent(screenNames.Tab3Screen, () => withLazyLoad(withStore(Tab3Screen)));
};

export default {
  screenNames,
  registerScreens,
};
