import React from 'react';
import { View, Text } from 'react-native-ui-lib';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';
import { languages } from '@app/core';

export const LanguageSelection = () => {
    const { i18n } = useTranslation();
    return <View marginT-10 center row>
        <TouchableOpacity onPress={() => i18n.changeLanguage(languages.en)}>
            <Text orange30={i18n.language === languages.en}
                text60={i18n.language === languages.en}
                text80={i18n.language !== languages.en}>
                {languages.en.toUpperCase()}
            </Text>
        </TouchableOpacity>
        <Text padding-30 orange30 text80>
            {'     |     '}
        </Text>
        <TouchableOpacity onPress={() => i18n.changeLanguage(languages.vi)}>
            <Text orange30={i18n.language === languages.vi}
                text60={i18n.language === languages.vi}
                text80={i18n.language !== languages.vi}>
                {languages.vi.toUpperCase()}
            </Text>
        </TouchableOpacity>
    </View>;
};
