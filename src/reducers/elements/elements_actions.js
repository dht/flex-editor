import {ActionTypes} from './elements'

import * as Config from '../../constants/Config';
import actionOperations from '../../_utils/operations/action-operations';
import * as treeOperations from '../../_utils/operations/tree-operations';
import ElementTypes from '../../constants/ElementTypes'
import clone from 'clone';

import {getFlexState} from '../utils';
import {getSelection, getMaxOrder, getModeId,} from './utils/elements_utils';
// import {setComponentRoot} from '../../../voice/reducers/voiceState/actions_voiceState';
import {setSelectedElement, refreshSelector} from '../elementSelection/elementSelection_actions';
import {showDataFieldModal, showStyleFieldModal, addUIMessage} from '../appState/appState_actions';
import {filterCopy as filter, firstChild} from '../../_utils/map'
import {transform_sketch} from '../../_utils/sketch'
import {setCopiedStyle} from '../appState/appState_actions'
import {setCopiedElementTree} from '../appState/appState_actions'

/*
 ADD_ELEMENT
 REPLACE_ELEMENT
 CLEAR_ELEMENTS
 SET_ELEMENTS
 APPLY_DATA
 PREVIEW_DATA
 PREVIEW_STYLE
 APPLY_STYLE
 SWITCH_ELEMENTS_ORDER
 DELETE_ELEMENT
 RENAME_TAG
 TOGGLE_VISIBILITY
 };
 */

let _id = 1;

export const nextId = () => {
    return _id;
}

export const bumpId = () => {
    _id++;
}

export const resetId = () => {
    _id = 1;
}

export const setId = (id) => {
    _id = id;
}

export const addElement = (elementType, parent_id, style, data) => {

    let id = _id++;

    data = data || {}

    return {
        type: ActionTypes.ADD_ELEMENT,
        id,
        parent_id,
        elementType,
        style,
        data
    }
}

export const replaceElement = (target_id, elementType, parent_id, style, data) => {

    data = data || {}

    return {
        type: ActionTypes.REPLACE_ELEMENT,
        id: target_id,
        parent_id,
        elementType,
        style,
        data
    }
}

export const clearElements = () => {

    return {
        type: ActionTypes.CLEAR_ELEMENTS,
    }
}

export const _setElements = (value) => {

    return {
        type: ActionTypes.SET_ELEMENTS,
        value,
        silent: true,
    }
}

export const _applyStyle = (id, style, resolution) => {

    return {
        type: ActionTypes.APPLY_STYLE,
        id,
        style,
        resolution
    }
}

export const applyData = (id, data) => {

    return {
        type: ActionTypes.APPLY_DATA,
        id,
        data
    }
}

export const applyDataField = (id, fieldName, fieldType) => {

    return {
        type: ActionTypes.APPLY_DATA_FIELD,
        id,
        fieldName,
        fieldType
    }
}

export const applyStyleField = (id, fieldName, cssKey) => {

    return {
        type: ActionTypes.APPLY_STYLE_FIELD,
        id,
        fieldName,
        cssKey
    }
}

export const applyRole = (id, role) => {

    return {
        type: ActionTypes.APPLY_ROLE,
        id,
        role
    }
}

export const applyClass = (id, value) => {

    return {
        type: ActionTypes.APPLY_CLASS,
        id,
        value
    }
}

export const applyVars = (id, key, value) => {

    return {
        type: ActionTypes.APPLY_VARS,
        id,
        key,
        value
    }
}

export const clearVars = (id, key) => {

    return {
        type: ActionTypes.CLEAR_VARS,
        id,
        key
    }
}

export const deleteElement = (id) => {

    return {
        type: ActionTypes.DELETE_ELEMENT,
        id,
    }
}


export const switchElementsOrder = (id1, id2) => {
    return {
        type: ActionTypes.SWITCH_ELEMENTS_ORDER,
        id1,
        id2
    }
}

export const previewData = (id, data) => {

    return {
        type: ActionTypes.PREVIEW_DATA,
        id,
        data,
        silent: true,
    }
}

export const previewStyle = (id, style) => {

    return {
        type: ActionTypes.PREVIEW_STYLE,
        id,
        style,
        silent: true,
    }
}

export const removeElements = (ids) => {

    return {
        type: ActionTypes.REMOVE_ELEMENTS,
        ids,
    }
}


export const renameTag = (id, value) => {
    return {
        type: ActionTypes.RENAME_TAG,
        id,
        value,
    }
}

export const renameLayer = (id, value) => {
    return {
        type: ActionTypes.RENAME_LAYER,
        id,
        value,
    }
}

export const expandView = (id, isClosed) => {
    return {
        type: ActionTypes.EXPAND_VIEW,
        id,
        isClosed,
    }
}

export const loadResolution = (value) => {
    return {
        type: ActionTypes.LOAD_RESOLUTION,
        value,
    }
}

export const toggleVisibility = (element_id) => {
    return {
        type: ActionTypes.TOGGLE_VISIBILITY,
        element_id,
    }
}

//@formatter:off
/*
  _____ _  _ _   _ _  _ _  _____
 |_   _| || | | | | \| | |/ / __|
   | | | __ | |_| | .` | ' <\__ \
   |_| |_||_|\___/|_|\_|_|\_\___/

 */
//@formatter:on

const addOrReplace = (selected_element_type, selected_element_id, elementType, parent_id, style, data = {}) => {


    switch (selected_element_type) {
        case ElementTypes.PLACEHOLDER:
            return replaceElement(selected_element_id, elementType, parent_id, style, data);
        default:
            return addElement(elementType, parent_id, style, data);
    }
}


const getParentId = (selection) => {

    if (selection.parent_id == 0) {
        return selection.selected_element_id;
    }

    return selection.parent_id;
}

export const applyStyleToSelected = (style) => {
    return (dispatch, getState) => {

        const state = getFlexState(getState());
        const {appState} = state;

        let selection = getSelection(state);

        let action = applyStyle(selection.parent_id, style);

        dispatch(action);
    }
}

export const addPlaceholder = () => {

    return (dispatch, getState) => {

        let flexState = getFlexState(getState());
        let selection = getSelection(flexState);
        let parent_id = getParentId(selection);
        const maxOrder = getMaxOrder(flexState, parent_id);
        const state = flexState;
        const {modeId} = state.appState;

        let action = addElement(ElementTypes.PLACEHOLDER, parent_id, {
            order: maxOrder + 1, flex: 1, backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
        }, {modeId: modeId});
        dispatch(action);


        dispatch(setSelectedElement(action.id, parent_id, action.elementType))

        return {id: action.id, parent_id, elementType: action.elementType};
    }
}

export const manipulateState = (state) => {
    return Object.keys(state).reduce((output, key) => {
        let element = state[key];
        //console.log('element -> ', element);
        element.data = element.data || {};
        element.data.modeId = 0;

        output[key] = element;

        return output;
    }, {});
}

export const addText = () => {
    return (dispatch, getState) => {

        let flexState = getFlexState(getState());
        let selection = getSelection(flexState);
        let parent_id = getParentId(selection);
        const maxOrder = getMaxOrder(flexState, parent_id);
        const modeId = getModeId(flexState);

        let action = addOrReplace(selection.selected_element_type, selection.selected_element_id, ElementTypes.TEXT, parent_id, {
            order: maxOrder + 1,
            flex: 'none',
        }, {content: "Lorem ipsum", modeId: modeId});

        dispatch(action);

        dispatch(setSelectedElement(action.id, parent_id, action.elementType))
    }
}
export const addImage = () => {
    return (dispatch, getState) => {

        let flexState = getFlexState(getState());
        let selection = getSelection(flexState);
        let parent_id = getParentId(selection);
        const maxOrder = getMaxOrder(flexState, parent_id);
        const modeId = getModeId(flexState);

        let action = addOrReplace(selection.selected_element_type, selection.selected_element_id, ElementTypes.IMAGE, parent_id, {
            order: maxOrder + 1,
            backgroundImage: "url('https://rnbin.com/images/image.png')",
            backgroundSize: "cover",
            width: "80px",
            height: "80px",
            flex: "none"
        }, {modeId: modeId});

        dispatch(action);

        dispatch(setSelectedElement(action.id, parent_id, action.elementType))
    }
}
export const addVerticalView = (rows) => {
    return (dispatch, getState) => {

        let flexState = getFlexState(getState());
        let selection = getSelection(flexState);
        let parent_id = getParentId(selection);
        const maxOrder = getMaxOrder(flexState, parent_id);
        const modeId = getModeId(flexState);

        //console.log('onAddVerticalView rows -> ', rows);
        let action = addOrReplace(selection.selected_element_type, selection.selected_element_id, ElementTypes.VIEW, parent_id, {
            order: maxOrder + 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch'
        }, {modeId: modeId})
        let root_id = action.id;

        dispatch(action);

        for (let row = 0; row < parseInt(rows, 10); row++) {
            action = addElement(ElementTypes.PLACEHOLDER, root_id, {
                order: row + 1,
                flex: 1,
                backgroundSize: 'cover'
            }, {modeId: modeId})
            dispatch(action);

            if (row === 0) {
                dispatch(setSelectedElement(action.id, root_id, action.elementType))
                dispatch(refreshSelector(20));
            }
        }
    }
}
export const addVerticalViewBySizes = (sizes) => {
    return (dispatch, getState) => {

        let flexState = getFlexState(getState());
        let selection = getSelection(flexState);
        let parent_id = getParentId(selection);
        const maxOrder = getMaxOrder(flexState, parent_id);
        const modeId = getModeId(flexState);

        //console.log('onAddVerticalView rows -> ', rows);
        let action = addOrReplace(selection.selected_element_type, selection.selected_element_id, ElementTypes.VIEW, parent_id, {
            order: maxOrder + 1,
            flexDirection: 'column',
            alignItems: 'stretch',
            display: 'flex',
            backgroundSize: 'cover',
        }, {modeId: modeId})
        let root_id = action.id;

        dispatch(action);

        for (let row = 0; row < sizes.length; row++) {
            let size = sizes[row];

            let style = {order: row + 1};

            if (sizes[row] < 10) {
                style.flex = size;
            } else {
                style.height = size + 'px';
            }


            action = addElement(ElementTypes.PLACEHOLDER, root_id, style, {modeId: modeId})
            dispatch(action);

            if (row == 0) {
                dispatch(setSelectedElement(action.id, root_id, action.elementType))
                dispatch(refreshSelector(20));
            }
        }
    }
}
export const addHorizontalView = (columns) => {
    return (dispatch, getState) => {

        let flexState = getFlexState(getState());
        let selection = getSelection(flexState);
        let parent_id = getParentId(selection);
        const maxOrder = getMaxOrder(flexState, parent_id);
        const modeId = getModeId(flexState);

        let action = addOrReplace(selection.selected_element_type, selection.selected_element_id, ElementTypes.VIEW, parent_id, {
            order: maxOrder + 1,
            flexDirection: 'row',
            minHeight: '30px',
            display: 'flex',
            alignItems: 'stretch',
            backgroundSize: 'cover',
        }, {modeId: modeId})
        let root_id = action.id;

        dispatch(action);

        for (let col = 0; col < parseInt(columns, 10); col++) {
            action = addElement(ElementTypes.PLACEHOLDER, root_id, {
                flex: 1,
                order: col + 1
            }, {modeId: modeId})
            dispatch(action);

            if (col === 0) {
                dispatch(setSelectedElement(action.id, root_id, action.elementType))
                dispatch(refreshSelector(20));
            }
        }
    }
}

export const addHorizontalViewBySizes = (sizes) => {
    return (dispatch, getState) => {

        let flexState = getFlexState(getState());
        let selection = getSelection(flexState);
        let parent_id = getParentId(selection);
        const maxOrder = getMaxOrder(flexState, parent_id);
        const modeId = getModeId(flexState);

        let action = addOrReplace(selection.selected_element_type, selection.selected_element_id, ElementTypes.VIEW, parent_id, {
            order: maxOrder + 1,
            flexDirection: 'row',
            minHeight: '30px',
            display: 'flex',
            alignItems: 'stretch'
        }, {modeId: modeId})

        let root_id = action.id;

        dispatch(action);

        for (let col = 0; col < sizes.length; col++) {
            let style = {order: col + 1};
            let size = sizes[col];

            if (size < 10) {
                style.flex = size;
            } else {
                style.width = size + 'px';
            }

            size.height = '50px';


            action = addElement(ElementTypes.PLACEHOLDER, root_id, style, {modeId: modeId})

            dispatch(action);

            if (col == 0) {
                dispatch(setSelectedElement(action.id, root_id, action.elementType))
                dispatch(refreshSelector(20));
            }
        }
    }
}

export const addView = (data) => {
    return (dispatch, getState) => {

        let flexState = getFlexState(getState());
        let selection = getSelection(flexState);
        let parent_id = getParentId(selection);
        const maxOrder = getMaxOrder(flexState, parent_id);
        const modeId = getModeId(flexState);

        let action = addOrReplace(selection.selected_element_type, selection.selected_element_id, ElementTypes.VIEW, parent_id, {
            order: maxOrder + 1,
        }, {modeId: modeId, ...data})
        let root_id = action.id;

        dispatch(action);

        return Promise.resolve(root_id);
    }
}

export const addDivider = (data) => {
    return (dispatch, getState) => {

        let flexState = getFlexState(getState());
        let selection = getSelection(flexState);
        let parent_id = getParentId(selection);
        const maxOrder = getMaxOrder(flexState, parent_id);
        const modeId = getModeId(flexState);

        let action = addOrReplace(selection.selected_element_type, selection.selected_element_id, ElementTypes.VIEW, parent_id, {
            order: maxOrder + 1,
            backgroundColor: '#333',
            margin: '10px 0',
            width: '200px',
            height: '3px',
        }, {modeId: modeId, ...data})
        let root_id = action.id;

        dispatch(action);

        dispatch(setSelectedElement(action.id, parent_id, action.elementType))

        return Promise.resolve(root_id);
    }
}

export const addSnippet = (data) => {
    return (dispatch, getState) => {

        let flexState = getFlexState(getState());
        let selection = getSelection(flexState);
        let parent_id = getParentId(selection);
        const maxOrder = getMaxOrder(flexState, parent_id);
        const modeId = getModeId(flexState);

        let action = addOrReplace(selection.selected_element_type, selection.selected_element_id, ElementTypes.SNIPPET, parent_id, {
            order: maxOrder + 1,
        }, {modeId: modeId, ...data})
        let root_id = action.id;

        dispatch(action);

        dispatch(setSelectedElement(action.id, parent_id, action.elementType))

        return Promise.resolve(root_id);
    }
}

export const selectRoot = () => {
    return (dispatch, getState) => {
        const rootElement = treeOperations.root(getState());
        // console.log('rootElement -> ', rootElement);
        dispatch(setSelectedElement(rootElement.id, rootElement.parent_id, rootElement.elementType));
    }
}

export const addPlaceholderToRoot = () => {
    return (dispatch, getState) => {
        dispatch(selectRoot());
        dispatch(addPlaceholder());
    }
}

export const injectSnippet = (rootId, rootParentId, rootOrder, snippet) => {
    return (dispatch, getState) => {

        const state = getFlexState(getState());
        let action, reIndexMap = {}, actions = [];

        // for voice
        // dispatch(setComponentRoot(rootId));

        const ids = treeOperations.treeElementIds(state, rootId);

        dispatch(removeElements(ids));

        const maxId = treeOperations.getMaxId(getFlexState(getState()).elements.present);
        setId(maxId + 1);

        let snippetState = clone(snippet.state);

        let elementsToAddIds = Object.keys(snippetState);

        let index = 0;
        let promises = [];

        while (elementsToAddIds.length) {

            const id = elementsToAddIds.shift();
            let element = snippetState[id];

            if (index === 0) {
                element.id = rootId;
                element.parent_id = rootParentId;
                element.style.order = rootOrder;
            } else {
                const newParentId = reIndexMap[element.parent_id];

                element.parent_id = newParentId;
            }

            action = addElement(element.elementType, element.parent_id, element.style, element.data);
            const promise = dispatch(action);

            actions.push(action);
            promises.push(promise);

            reIndexMap[id] = action.id;

            index++;
        }

        return Promise.all(promises)
            .then(() => {
                return actions;
            });
    }
}

export const injectSnippetToSelected = (snippet) => {
    return (dispatch, getState) => {

        const state = getFlexState(getState());
        const {elementSelection} = state;
        const {id, parent_id} = elementSelection;
        const order = treeOperations.getElementsOrder(state, id);

        dispatch(injectSnippet(id, parent_id, order, snippet))

    }
};

export const pasteCopiedStyle = (element) => {
    return (dispatch, getState) => {

        const {appState} = getFlexState(getState()),
            {copiedStyle, resolution} = appState;

        if (copiedStyle) {
            dispatch(applyStyle(element.id, copiedStyle, resolution));
        }
    }
}

export const pasteCopiedElement = (element) => {
    return (dispatch, getState) => {

        if (element.elementType !== 'PLACEHOLDER') {
            dispatch(addUIMessage('Must paste element within a placeholder'))
            return;
        }

        const copiedElement = getFlexState(getState()).appState.copiedElement;

        if (!copiedElement || Object.keys(copiedElement).length === 0) {
            dispatch(addUIMessage('Nothing to paste'))
            return;
        }

        dispatch(injectSnippet(element.id, element.parent_id, element.style.order, {state: copiedElement}));
    }
}

export const applyStyle = (id, style) => {
    return (dispatch, getState) => {

        const state = getFlexState(getState());
        const {appState} = state;
        const {resolution} = appState;

        dispatch(_applyStyle(id, style, resolution));
    }
}

export const resetScreen = () => {
    return (dispatch, getState) => {

        const modeId = getModeId(getFlexState(getState()));

        dispatch(setSelectedElement(1, 0, 'VIEW'));
        dispatch(clearElements());
        resetId();

        let action;

        // 1
        action = dispatch(addElement(ElementTypes.VIEW, 0, {
            order: 1,
            flex:1,
            display:'flex',
            flexDirection:'column',
        }, {modeId: modeId}));

        const root_id = action.id;

        // 2 [1]
        const selected_action = addElement(ElementTypes.PLACEHOLDER, root_id, {
            order: 1,
            flex:1,
            height: "50px",
        }, {modeId: modeId});

        dispatch(selected_action);

        dispatch(setSelectedElement(selected_action.id, selected_action.parent_id, selected_action.elementType));

        return Promise.resolve(true);
    }
}

export const copy = () => {
    return (dispatch, getState) => {

        const state = getFlexState(getState());
        const {elementSelection} = state;

        const selectedElement = firstChild(filter(state.elements.present, element => element.id === elementSelection.id));

        dispatch(setCopiedElementTree(selectedElement))
            .then(result => {
                if (!result) {
                    dispatch(addUIMessage('Nothing to copy'))
                } else {
                    dispatch(addUIMessage('Element copied to clipboard'))
                }
            });

    }
}

export const copyStyle = () => {
    return (dispatch, getState) => {

        const state = getFlexState(getState());
        const {elementSelection} = state;

        const selectedElement = firstChild(filter(state.elements.present, element => element.id === elementSelection.id));
        const style = {...selectedElement.style};

        delete style['order'];

        dispatch(setCopiedStyle(style));

    }
}

export const paste = () => {
    return (dispatch, getState) => {

        const state = getFlexState(getState());
        const {elementSelection} = state;

        const selectedElement = firstChild(filter(state.elements.present, element => element.id === elementSelection.id));

        if (selectedElement.elementType == 'PLACEHOLDER') {
            dispatch(pasteCopiedElement(selectedElement));
            dispatch(addUIMessage('Element pasted'));
        } else {
            dispatch(pasteCopiedStyle(selectedElement));
            dispatch(addUIMessage('Style pasted'));
        }

    }
}

export const pasteSketch = (clipboardText) => {
    return (dispatch, getState) => {

        const style = transform_sketch(clipboardText);
        const state = getFlexState(getState());
        const {elementSelection, appState} = state;

        if (state) {
            dispatch(applyStyle(elementSelection.id, style));
        }
    }
}


export const runActions = (snippet, targetParentId, maxOrder) => {
    return (dispatch, getState) => {

        const maxId = nextId();


        //console.log('selection -> ', selection);
        //console.log('maxOrder -> ', maxOrder);
        //console.log('maxId -> ', maxId);

        let shiftedActions = actionOperations.shiftActions(snippet, maxId, targetParentId);

        shiftedActions.forEach((action, index) => {

            if (index === 0) {
                action.style.order = maxOrder + 1;
            }

            setTimeout(() => {
                dispatch(action);
            }, index * 100);

            bumpId();
        });

        bumpId();
    }

}

export const applyDataFieldForCurrentElement = (fieldName, fieldType) => {
    return (dispatch, getState) => {

        const state = getFlexState(getState());
        const {elementSelection} = state;

        dispatch(applyDataField(elementSelection.id, fieldName, fieldType));
    }
}


export const applyStyleFieldForCurrentElement = (fieldName, cssKey) => {
    return (dispatch, getState) => {

        const state = getFlexState(getState());
        const {elementSelection} = state;

        dispatch(applyStyleField(elementSelection.id, fieldName, cssKey));
    }
}

export const setElements = (value) => {
    return (dispatch, getState) => {

        dispatch(_setElements(value));

        const maxId = treeOperations.getMaxId(getFlexState(getState()).elements.present);
        setId(maxId + 1);
    }
}

export const setDataField = (fieldName, fieldType) => {
    return (dispatch, getState) => {

        dispatch(applyDataFieldForCurrentElement(fieldName, fieldType));
        dispatch(showDataFieldModal(false));

    }
}
export const setStyleField = (fieldName, cssKey) => {
    return (dispatch, getState) => {

        dispatch(applyStyleFieldForCurrentElement(fieldName, cssKey));
        dispatch(showStyleFieldModal(false, ''));

    }
}

