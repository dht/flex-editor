import {connect} from 'react-redux'
import FlexEditor from './FlexEditor'

import editor_thunks from '../reducers/editor_thunks';

import * as treeOperations from '../_utils/operations/tree-operations';

import {getFlexState} from '../reducers/utils';

const mapStateToProps = (state, ownProps) => {

    state = getFlexState(state);
    const {elementSelection} = state;

    const {drawerOpen} = state.appState;

    const selectedElement = treeOperations.getItem(state.elements.present, elementSelection.id) || {};
    const selectedElementParent = treeOperations.getItem(state.elements.present, selectedElement.parent_id) || {};
    const screenHeight = treeOperations.getRootHeight(state) || ownProps.height;

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
