    import {connect} from 'react-redux'
import {setSelectedElement, refreshSelector} from '../reducers/elementSelection/elementSelection_actions'
import {applyStyle} from '../reducers/elements/elements_actions'
import Tree from './Tree'
import * as treeOperations from '../_utils/operations/tree-operations'
import {renameTag, renameLayer, expandView, applyClass} from '../reducers/elements/elements_actions'
import {toggleVisibility} from '../reducers/elements/elements_actions'

import {getFlexState} from '../reducers/utils';

const mapStateToProps = (state, ownProps) => {

    state = getFlexState(state);
    const {appState} = state;

    const present = state.elements.present,
        {modeId, roles, treeMode, resolution} = appState;

    if (!present[ownProps.id]) {
        return {};
    }

    let childIds = treeOperations.filterOtherModes(present, ownProps.id, modeId);
    childIds = treeOperations.childIdsOrder(present, childIds);

    return {
        roles,
        treeMode,
        resolution,
        highlighted: ownProps.highlighted,
        focusElementId: ownProps.focusElementId,
        id: ownProps.id,
        parent_id: present[ownProps.id].parent_id,
        elementType: present[ownProps.id].elementType,
        style: present[ownProps.id].style,
        data: present[ownProps.id].data,
        selected: state.elementSelection.id === ownProps.id,
        selectedParent: state.elementSelection.parent_id === ownProps.id,
        childIds: childIds
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: (ev, elementId, elementParentId, elementType) => {

            dispatch(setSelectedElement(elementId, elementParentId, elementType));
            dispatch(refreshSelector(20));

            ev.stopPropagation();
        },
        onVisibiliyToggle: (element) => {


            if (element && element.style && element.style.display === 'none') {

                dispatch(applyStyle(element.id, {display: 'block'}));

            } else {

                dispatch(applyStyle(element.id, {display: 'none'}));

            }

        },
        onHighlight: (id) => {
            ownProps.onHighlight(id);
        },
        rename: (elementId, name) => {
            dispatch(renameLayer(elementId, name));
        },
        renameTag: (elementId, name) => {
            dispatch(renameTag(elementId, name));
        },
        applyClass: (elementId, name) => {
            dispatch(applyClass(elementId, name));
        },
        expand: (elementId, isClosed) => {
            dispatch(expandView(elementId, isClosed));
        },
        toggleVisibility: (elementId) => {
            dispatch(toggleVisibility(elementId));
        }
    }
}

const TreeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Tree)

export default TreeContainer
