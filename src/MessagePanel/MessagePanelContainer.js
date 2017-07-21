import { connect } from 'react-redux'
import MessagePanel from './MessagePanel'
import {getFlexState} from '../reducers/utils';

const mapStateToProps = (state, ownProps) => {
    const {appState} = getFlexState(state),
        {uiMessages = []} = appState;

    return {
        uiMessages,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MessagePanel)
