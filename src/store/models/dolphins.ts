import { createModel, ModelConfig } from '@rematch/core';
import { sleep } from '../../core';
import produce from 'immer';

export interface DolphinsState {
    count: number;
}

export const dolphins: ModelConfig<DolphinsState> = createModel({
    state: { count: 0 },
    reducers: {
        increment: produce((draftState: DolphinsState, payload: number) => {
            draftState.count += payload;
        }),
    },
    effects: {
        // TODO: Optional args breaks TypeScript autocomplete (e.g. payload: number = 1)
        async incrementAsync(payload: number): Promise<void> {
            await sleep(500);
            this.increment(payload || 1);
        },
    },
});
