import { iRootState } from '../../../../store';

export const mapStateToProps = (state: iRootState) => ({
    sharks: state.sharks,
});
