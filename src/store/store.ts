import createRematchPersist from '@rematch/persist';
import { models } from './models';
import { init, RematchRootState } from '@rematch/core';
// tslint:disable-next-line:no-submodule-imports
import storage from 'redux-persist/lib/storage';

const persistPlugin = createRematchPersist({
    whitelist: ['sharks'],
    throttle: 2000,
    version: 1,
    storage,
});

export const store = init({
    plugins: [persistPlugin],
    models,
});

export type Store = typeof store;
export type Dispatch = typeof store.dispatch;
export type iRootState = RematchRootState<typeof models>;
