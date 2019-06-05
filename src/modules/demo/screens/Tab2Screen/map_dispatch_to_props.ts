import { Dispatch } from '@app/store';

export const mapDispatchToProps = (dispatch: Dispatch) => ({
    incrementSharks: () => dispatch.sharks.increment(1),
    incrementSharksAsync: () => dispatch.sharks.incrementAsync(1),
});
