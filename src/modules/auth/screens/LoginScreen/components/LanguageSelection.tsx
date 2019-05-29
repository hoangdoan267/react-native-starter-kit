import React from 'react';
import { View, Text } from 'react-native-ui-lib';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';
import { Language } from '../../../../../core';

export const LanguageSelection = () => {
    const { i18n } = useTranslation();
    return <View marginT-10 center row>
        <TouchableOpacity onPress={() => i18n.changeLanguage(Language.en)}>
            <Text orange30={i18n.language === Language.en} text60={i18n.language === Language.en} text80={i18n.language !== Language.en}>
                {Language.en.toUpperCase()}
            </Text>
        </TouchableOpacity>
        <Text padding-30 orange30 text80>
            {'     |     '}
        </Text>
        <TouchableOpacity onPress={() => i18n.changeLanguage(Language.vi)}>
            <Text orange30={i18n.language === Language.vi} text60={i18n.language === Language.vi} text80={i18n.language !== Language.vi}>
                {Language.vi.toUpperCase()}
            </Text>
        </TouchableOpacity>
    </View>;
};
