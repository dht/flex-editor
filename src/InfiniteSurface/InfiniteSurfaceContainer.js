import { connect } from 'react-redux'
import InfiniteSurface from 'infinite-surface/InfiniteSurfaceWithDrop'
import {setLastImageDrop} from '../reducers/appState/appState_actions';

import {getFlexState} from '../reducers/utils';

const mapStateToProps = (state, ownProps) => {
    state = getFlexState(state);
    const {appState} = state;
    const {overlay} = appState;

    return {
        overlay
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        imageDrop: (url) => {
            dispatch(setLastImageDrop(url));
        },
        setZoom: (zoom) => {
            if (ownProps.setZoom) {
                ownProps.setZoom(zoom);
            }
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InfiniteSurface)
