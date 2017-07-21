import {connect} from 'react-redux'
import OverlayControls from './OverlayControls'
import {
    changeOverlayOpacity,
    changeOverlayVerPosition,
    changeOverlayHorPosition,
    toggleOverlay,
    resetOverlay
}from '../reducers/appState/appState_actions';

const mapStateToProps = (state) => {
    const {flexState} = state,
        {overlay} = flexState.appState,
        {show} = overlay;

    return {
        show,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeOverlayOpacity: (opacityDelta) => {
            dispatch(changeOverlayOpacity(opacityDelta));
        },
        changeOverlayVerPosition: (topDelta) => {
            dispatch(changeOverlayVerPosition(topDelta));
        },
        changeOverlayHorPosition: (leftDelta) => {
            dispatch(changeOverlayHorPosition(leftDelta));
        },
        toggleOverlay: () => {
            dispatch(toggleOverlay());
        },
        resetOverlay: () => {
            dispatch(resetOverlay());

            if (ownProps.resetOverlay) {
                ownProps.resetOverlay();
            }
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OverlayControls)
