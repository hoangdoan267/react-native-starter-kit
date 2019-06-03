import { Dispatch } from '../../../../store';

export const mapDispatchToProps = (dispatch: Dispatch) => ({
    incrementDolphins: () => dispatch.dolphins.increment(1),
    incrementDolphinsAsync: () => dispatch.dolphins.incrementAsync(1),
});
