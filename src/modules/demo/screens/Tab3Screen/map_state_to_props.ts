import { iRootState } from '../../../../store';

export const mapStateToProps = (state: iRootState) => ({
    dolphins: state.dolphins,
});
