import {connect} from 'react-redux'
import InputSectionFlex from './InputSectionFlex'
import {previewStyle, applyStyle} from '../reducers/elements/elements_actions'
import {refreshSelector} from '../reducers/elementSelection/elementSelection_actions'

import * as treeOperations from '../_utils/operations/tree-operations';

import {getFlexState} from '../reducers/utils';

const mapStateToProps = (state, ownProps) => {

    state = getFlexState(state);

    const selectedElement = treeOperations.selectedElement(state, state.elementSelection) || {style: {}};
    const parent_id = parseInt(selectedElement.parent_id, 10) || 0;
    const parent = state.elements.present[parent_id] || {style: {}};
    const isParentRow = !(parent && parent.style && parent.style.flexDirection && parent.style.flexDirection === 'column');

    return {
        isParentRow,
        parentId: parent_id,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {

    return {
        previewStyleParent: (parentId, style) => {
            // console.log('previewStyle -> ', parentId, style);
            dispatch(previewStyle(parentId, style))
            dispatch(refreshSelector(20));
        },
        applyStyleParent: (parentId, style) => {
            // console.log('applyStyle -> ', parentId, style);
            dispatch(applyStyle(parentId, style))
            dispatch(refreshSelector(20));
        },
        previewStyle: (elementId, style) => {
            // console.log('previewStyle -> ', elementId, style);
            dispatch(previewStyle(elementId, style))
            dispatch(refreshSelector(20));
        },
        applyStyle: (elementId, style) => {
            // console.log('applyStyle -> ', elementId, style);
            dispatch(applyStyle(elementId, style))
            dispatch(refreshSelector(20));
        },
    }
}

const InputSectionDimensionsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(InputSectionFlex)

export default InputSectionDimensionsContainer
