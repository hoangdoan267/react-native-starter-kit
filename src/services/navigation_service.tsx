import { Navigation } from 'react-native-navigation';
import { screenNames } from '@app/modules';
import { icons } from '@app/core';
import { getI18n } from 'react-i18next';

const navigateTo = ({ screenName, componentId }: { screenName: string, componentId: string }) => {
    setTimeout(
        () => {
            switch (screenName) {
                case screenNames.AppLoaderScreen:
                    Navigation.setStackRoot(componentId, {
                        component: {
                            name: screenName,
                        }
                    });
                    break;
                default:
                    Navigation.push(componentId, {
                        component: {
                            name: screenName,
                        }
                    });
                    break;
            }
        },
        100);
};

const navigateToLogin = () => {
    Navigation.setRoot({
        root: {
            stack: {
                children: [
                    {
                        component: {
                            name: screenNames.LoginScreen,
                        }
                    },
                ],
            },
            bottomTabs: undefined,
            topTabs: undefined,
        },
    });
};

const navigateToHome = () => {
    const i18n = getI18n();
    Navigation.setRoot({
        root: {
            bottomTabs: {
                children: [
                    {
                        stack: {
                            children: [
                                {
                                    component: {
                                        name: screenNames.HomeScreen,
                                        passProps: {
                                        }
                                    }
                                }
                            ],
                            options: {
                                bottomTab: {
                                    text: i18n.t('common.tab1'),
                                    icon: icons.about,
                                    selectedIconColor: 'red',
                                    testID: 'FIRST_TAB_BAR_BUTTON'
                                },
                                topBar: {
                                    drawBehind: true,
                                    visible: false,
                                    height: 0,
                                },
                            }
                        }
                    },
                    {
                        component: {
                            name: screenNames.Tab2Screen,
                            passProps: {
                            },
                            options: {
                                bottomTab: {
                                    text: i18n.t('common.tab2'),
                                    icon: icons.air_play,
                                    selectedIconColor: 'red',
                                    testID: 'SECOND_TAB_BAR_BUTTON'
                                }
                            }
                        }
                    },
                    {
                        component: {
                            name: screenNames.Tab3Screen,
                            passProps: {
                            },
                            options: {
                                bottomTab: {
                                    text: i18n.t('common.tab3'),
                                    icon: icons.airdrop,
                                    selectedIconColor: 'red',
                                    testID: 'THIRD_TAB_BAR_BUTTON'
                                }
                            }
                        }
                    }
                ]
            }
        }
    });
};

export const navigationService = {
    navigateTo,
    navigateToHome,
    navigateToLogin,
};
