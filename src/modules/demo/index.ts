import { Navigation } from 'react-native-navigation';
import { Tab1Screen, Tab2ScreenContainer, Tab3ScreenContainer, HomeScreenContainer } from './screens';
import { withLazyLoad, withStore } from '../../core';

const screenNames = {
  HomeScreen: 'HomeScreen',
  Tab1Screen: 'Tab1Screen',
  Tab2Screen: 'Tab2Screen',
  Tab3Screen: 'Tab3Screen',
};

const registerScreens = () => {
  Navigation.registerComponent(screenNames.HomeScreen, () => withLazyLoad(withStore(HomeScreenContainer)));
  Navigation.registerComponent(screenNames.Tab1Screen, () => Tab1Screen);
  Navigation.registerComponent(screenNames.Tab2Screen, () => withLazyLoad(withStore(Tab2ScreenContainer)));
  Navigation.registerComponent(screenNames.Tab3Screen, () => withLazyLoad(withStore(Tab3ScreenContainer)));
};

export default {
  screenNames,
  registerScreens,
};
