import React, { Component } from 'react';
import { Text } from 'react-native-ui-lib';
import { useTranslation } from 'react-i18next';
import { recordError } from '../../core';

interface State {
    hasError: boolean;
}

const ErrorMessage = () => {
    const { t } = useTranslation();
    return <Text red50 text50>{t('error.somethingWentWrong')}</Text>;
};

export class ErrorBoundary extends Component<{}, State> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_error: any): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: any, _info: any): void {
        recordError(error);
    }

    render(): React.ReactNode {
        if (this.state.hasError) {
            return <ErrorMessage />;
        }

        return this.props.children;
    }
}
