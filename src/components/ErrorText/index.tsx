import React, { ReactNode } from 'react';
import { Text } from 'react-native-ui-lib';
import { TextStyle } from 'react-native';

interface Props {
    children: ReactNode;
    style?: TextStyle;
}

export const ErrorText = (props: Props) => {
    const style = props.style ? props.style : {};
    return <Text style={{ color: 'red', fontSize: 12, ...style }}>
        {props.children}
    </Text>;
};
