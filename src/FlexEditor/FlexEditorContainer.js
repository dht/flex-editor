import {connect} from 'react-redux'
import FlexEditor from './FlexEditor'

import editor_thunks from '../reducers/editor_thunks';

import {getItem, getRootHeight} from 'lpm-core';

import {getFlexState} from '../reducers/utils';

const mapStateToProps = (state, ownProps) => {

    state = getFlexState(state);
    const {elementSelection} = state;

    const {drawerOpen} = state.appState;


    const selectedElement = getItem(state.elements.present, elementSelection.id) || {};
    const selectedElementParent = getItem(state.elements.present, selectedElement.parent_id) || {};
    const screenHeight = getRootHeight(state) || ownProps.height;

    return {
        screenHeight,
        selectedElement,
        selectedElementParent,
        drawerOpen,
    }
}

export default connect(
    mapStateToProps,
    editor_thunks
)(FlexEditor)
