import {connect} from 'react-redux'
import App from './App'

import * as flexEditor from '../../src/index';

import Actions from '../data/Actions';

const mapStateToProps = (state, ownProps) => {

    return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {

    return {
        resetScreen: () => {
            dispatch(flexEditor.resetScreen());
        },
        runActions: () => {
            // Actions.forEach(Action => {
            //     dispatch(Action);
            // })
        }
    }
}

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

export default AppContainer
