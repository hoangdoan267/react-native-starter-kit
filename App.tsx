/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 *
 * @format
 */

import React, { Component } from 'react';
import { Platform } from 'react-native';
import { View, TextInput, Text, Button } from 'react-native-ui-lib';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

interface Props { }

export default class App extends Component<Props> {
  render(): JSX.Element {
    return (
      <View flex paddingH-25 paddingT-120>
        <Text blue50 text20>Welcome</Text>
        <Text>{instructions}</Text>
        <TextInput text50 placeholder="username" dark10 floatingPlaceholder />
        <TextInput text50 placeholder="password" secureTextEntry dark10 floatingPlaceholder />
        <View marginT-100 center>
          <Button text70 white background-orange30 label="Login" />
          <Button link text70 orange30 label="Sign Up" marginT-20 />
        </View>
      </View>
    );
  }
}
