import createRematchPersist from '@rematch/persist';
import { dolphins } from './models/dolphins';
import { sharks } from './models/sharks';
import { init, RematchRootState } from '@rematch/core';
// tslint:disable-next-line:no-submodule-imports
import storage from 'redux-persist/lib/storage';
import * as models from './models';

const persistPlugin = createRematchPersist({
    whitelist: ['sharks'],
    throttle: 2000,
    version: 1,
    storage,
});

export const store = init({
    plugins: [persistPlugin],
    models: {
        sharks,
        dolphins,
    },
});

export type Store = typeof store;
export type Dispatch = typeof store.dispatch;
export type iRootState = RematchRootState<typeof models>;
