import React from 'react';
import { View, TextInput, Text, Button } from 'react-native-ui-lib';

export const Screen = () => {
    return <View flex paddingH-25 paddingT-120>
        <Text blue50 text20>Forgot password</Text>
        <TextInput text50 placeholder="username" dark10 floatingPlaceholder />
        <TextInput text50 placeholder="password" secureTextEntry dark10 floatingPlaceholder />
        <View marginT-100 center>
            <Button text70 white label="Login" />
            <Button link text70 orange30 label="Sign Up" marginT-20 />
        </View>
    </View>;
};
