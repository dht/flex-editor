import * as actions_appState from '../reducers/appState/appState_actions'
import  actions from 'lpm-core'
import actions_selection  from 'lpm-core'

import {ActionCreators as UndoActionCreators} from 'redux-undo'

import * as Config from '../constants/Config';

import treeOperations from 'lpm-core';

import {getFlexState} from '../reducers/utils';

const toggleDrawer = (e) => {
    return (dispatch) => {
        e.preventDefault();
        dispatch(actions_appState.toggleDrawer());
    }
}

const toggleTreeMode = () => {
    return (dispatch) => {
        dispatch(actions_appState.toggleTreeMode());
    }
}

const toggleDataButtons = (on) => {
    return (dispatch) => {
        dispatch(actions_appState.showDataButtons(on));
    }
}

const setZoom = (zoom) => {
    return (dispatch) => {
        dispatch(actions_appState.setZoom(zoom));
    }
}

const remove = (e) => {
    return (dispatch, getState) => {
        e.preventDefault();
        const state = getFlexState(getState());
        const selectedElementId = state.elementSelection.id;

        if (selectedElementId === 1) {
            return;
        }

        dispatch(actions_selection.setSelectedElement(1, 0, 'VIEW'));
        dispatch(actions.deleteElement(selectedElementId))
        dispatch(actions_selection.refreshSelector());
    }
}

const refreshSelector = () => {
    return (dispatch) => {
        dispatch(actions_selection.refreshSelector(50));
    }
}

const undo = (e) => {
    return (dispatch) => {

        e.preventDefault();

        if (e.metaKey && e.ctrlKey) {

            dispatch(UndoActionCreators.redo())
            dispatch(actions_selection.refreshSelector(300));

        } else if (e.metaKey) {

            dispatch(UndoActionCreators.undo());
            dispatch(actions_selection.refreshSelector(300));

        }
    }
}
const checkCopy = (e) => {
    return (dispatch) => {

        if (e.metaKey) {
            dispatch(actions.copy());
            dispatch(actions.copyStyle());
            dispatch(actions_selection.refreshSelector());
        }
    }
}

const checkPaste = (e) => {
    return (dispatch) => {
        if (e.clipboardData && e.clipboardData.getData('text')) {
            dispatch(actions.pasteSketch(e.clipboardData.getData('text')));
            dispatch(actions_selection.refreshSelector());
            return;
        }

        if (e.metaKey) {
            dispatch(actions.paste());
            dispatch(actions_selection.refreshSelector());
        }
    }
}

const nudgeDown = () => {
    return (dispatch, getState) => {
        const state = getFlexState(getState());
        const selectedElementId = state.elementSelection.id;
        const firstChild = treeOperations.firstChild(state, selectedElementId);

        if (firstChild) {
            dispatch(actions_selection.setSelectedElement(firstChild.id, firstChild.parent_id, firstChild.elementType))
            dispatch(actions_selection.refreshSelector());
        }
    }
}

const nudgeUp = () => {
    return (dispatch, getState) => {
        const state = getFlexState(getState());
        const selectedElementId = state.elementSelection.id;
        const parentElement = treeOperations.parent(state, selectedElementId);

        if (parentElement) {
            dispatch(actions_selection.setSelectedElement(parentElement.id, parentElement.parent_id, parentElement.elementType));
            dispatch(actions_selection.refreshSelector());
        }
    }
}

const moveUp = () => {
    return (dispatch, getState) => {
        const state = getFlexState(getState());
        const selectedElementId = state.elementSelection.id;
        const above = treeOperations.aboveItem(state, selectedElementId);

        if (above) {
            dispatch(actions.switchElementsOrder(selectedElementId, above.id))
            dispatch(actions_selection.refreshSelector(100));
        }
    }
}

const moveDown = () => {
    return (dispatch, getState) => {
        const state = getFlexState(getState());
        const selectedElementId = state.elementSelection.id;
        const below = treeOperations.belowItem(state, selectedElementId);

        if (below) {
            dispatch(actions.switchElementsOrder(selectedElementId, below.id))
            dispatch(actions_selection.refreshSelector(100));
        }
    }
}
const moveOverlayDown = () => {
    return (dispatch) => {
        dispatch(actions_appState.changeOverlayVerPosition(10));
    }
}

const moveOverlayUp = () => {
    return (dispatch) => {
        dispatch(actions_appState.changeOverlayVerPosition(-10));
    }
}

const moveOverlayOpacityDown = () => {
    return (dispatch) => {
        dispatch(actions_appState.changeOverlayOpacity(-0.1));
    }
}

const moveOverlayOpacityUp = () => {
    return (dispatch) => {
        dispatch(actions_appState.changeOverlayOpacity(0.1));
    }
}

const arrowDown = (e) => {
    return (dispatch, getState) => {
        e.preventDefault();

        if (e.ctrlKey && e.metaKey) {
            dispatch(moveOverlayDown());
            return;
        }

        if (e.metaKey) {
            dispatch(nudgeDown());
            return;
        }

        if (e.altKey) {
            dispatch(moveDown());
            return;
        }

        const state = getFlexState(getState());
        const selectedElementId = state.elementSelection.id;
        const below = treeOperations.belowItem(state, selectedElementId);

        if (below) {
            dispatch(actions_selection.setSelectedElement(below.id, below.parent_id, below.elementType))
            dispatch(actions_selection.refreshSelector());
        }
    }

}

const arrowUp = (e) => {
    return (dispatch, getState) => {

        const state = getFlexState(getState());

        if (e.ctrlKey && e.metaKey) {
            dispatch(moveOverlayUp());
            return;
        }

        if (e.metaKey) {
            dispatch(nudgeUp());
            return;
        }

        if (e.altKey) {
            dispatch(moveUp());
            return;
        }

        const selectedElementId = state.elementSelection.id;
        const above = treeOperations.aboveItem(state, selectedElementId);

        if (above) {
            dispatch(actions_selection.setSelectedElement(above.id, above.parent_id, above.elementType))
            dispatch(actions_selection.refreshSelector());
        }
    }
}
const arrowLeft = (e) => {
    return (dispatch) => {

        if (e.ctrlKey && e.metaKey) {
            dispatch(moveOverlayOpacityDown());
            return;
        }

        if (Config.isRTL) {
            dispatch(arrowDown(e));
        } else {
            dispatch(arrowUp(e));
        }
    }
}

const arrowRight = (e) => {
    return (dispatch) => {

        if (e.ctrlKey && e.metaKey) {
            dispatch(moveOverlayOpacityUp());
            return;
        }

        if (Config.isRTL) {
            dispatch(arrowUp(e));
        } else {
            dispatch(arrowDown(e));
        }
    }
}

const showSelection = (show) => {
    return (dispatch) => {
        dispatch(actions_selection.refreshSelector());

        if (show) {
            setTimeout(() => {
                dispatch(actions_appState.showSelection(true));
            }, 100);
        } else {
            dispatch(actions_appState.showSelection(false));
        }
    }

}

const applyStyle = (element, style) => {
    return (dispatch) => {
        dispatch(actions.applyStyle(element.id, style))
        dispatch(actions_selection.refreshSelector(100));
    }
}

const setColors = (colors) => {
    return (dispatch) => {

        dispatch(actions_appState.setColors(colors));
    }
}

const setFonts = (fonts) => {
    return (dispatch) => {
        dispatch(actions_appState.setFonts(fonts));
    }
}

export default {
    toggleDrawer,
    toggleTreeMode,
    toggleDataButtons,
    setZoom,
    remove,
    refreshSelector,
    undo,
    checkCopy,
    checkPaste,
    nudgeDown,
    nudgeUp,
    moveUp,
    moveDown,
    moveOverlayDown,
    moveOverlayUp,
    moveOverlayOpacityDown,
    moveOverlayOpacityUp,
    arrowDown,
    arrowUp,
    arrowLeft,
    arrowRight,
    showSelection,
    applyStyle,
    setColors,
    setFonts
}