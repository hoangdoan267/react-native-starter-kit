import React, { Component, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { persistStore } from 'redux-persist';
// tslint:disable-next-line:no-submodule-imports
import { PersistGate } from 'redux-persist/lib/integration/react';

const persistor = persistStore(store);

export const withStore = (WrappedComponent: any) => {
    return class extends Component {
        render(): ReactNode {
            // ... and renders the wrapped component with the fresh data!
            // Notice that we pass through any additional props
            return <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <WrappedComponent {...this.props} />
                </PersistGate>
            </Provider>;
        }
    };
};
