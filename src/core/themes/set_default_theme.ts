import { ThemeManager, Typography } from 'react-native-ui-lib';
import { ComponentStyles, colors } from '..';

export const setDefaultTheme = () => {

    Typography.loadTypographies({
        // h1: { fontSize: 58, fontWeight: '300', lineHeight: 80 },
        // h2: { fontSize: 46, fontWeight: '300', lineHeight: 64 },
    });

    const theme: ComponentStyles = {
        Text: {
            fontSize: 14,
            color: colors.black,
        },
        Button: {
            fontSize: 14,
            color: colors.white,
            backgroundColor: colors.primary,
        }
    };

    ThemeManager.setComponentTheme('Text', (_props: any, _context: any) => {
        const style = _props.style ? _props.style : {};
        return {
            ...theme.Text,
            ...style,
        };
    });
    ThemeManager.setComponentTheme('Button', (props: any, _context: any) => {
        return {
            ...theme.Button,
            color: props.outline
                ? props.outlineColor
                    ? props.outlineColor
                    : colors.primary
                : colors.white
        };
    });
};
