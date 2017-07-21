import { connect } from 'react-redux'
import Tabs from './Tabs'
import {setTreeMode} from '../../reducers/appState/appState_actions';

import {getFlexState} from '../../reducers/utils';

const mapStateToProps = (state, ownProps) => {

    const {appState} = getFlexState(state),
        {treeMode} = appState;

    return {
        treeMode
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        select: (treeMode) => {
            dispatch(setTreeMode(treeMode));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Tabs)
