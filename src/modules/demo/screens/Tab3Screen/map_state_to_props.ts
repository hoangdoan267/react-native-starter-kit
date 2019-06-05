import { iRootState } from '@app/store';

export const mapStateToProps = (state: iRootState) => ({
    dolphins: state.dolphins,
});
