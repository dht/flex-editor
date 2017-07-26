    import {connect} from 'react-redux'
import Tree from './Tree'
import treeOperations from 'lpm-core'
import actions, {setSelectedElement, refreshSelector} from 'lpm-core'

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

                dispatch(actions.applyStyle(element.id, {display: 'block'}));

            } else {

                dispatch(actions.applyStyle(element.id, {display: 'none'}));

            }

        },
        onHighlight: (id) => {
            ownProps.onHighlight(id);
        },
        rename: (elementId, name) => {
            dispatch(actions.renameLayer(elementId, name));
        },
        renameTag: (elementId, name) => {
            dispatch(actions.renameTag(elementId, name));
        },
        applyClass: (elementId, name) => {
            dispatch(actions.applyClass(elementId, name));
        },
        expand: (elementId, isClosed) => {
            dispatch(actions.expandView(elementId, isClosed));
        },
        toggleVisibility: (elementId) => {
            dispatch(actions.toggleVisibility(elementId));
        }
    }
}

const TreeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Tree)

export default TreeContainer
