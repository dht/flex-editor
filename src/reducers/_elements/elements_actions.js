import {ActionTypes} from 'lpm-core/reducers/elements/elements'

import * as Config from '../../constants/Config';
import treeOperations from 'lpm-core';
import actions from 'lpm-core/reducers/elements/elements_actions';
import ElementTypes from '../../constants/ElementTypes'
import clone from 'clone';

import {getFlexState} from '../utils';
import {getSelection, getMaxOrder, getModeId,} from './utils/elements_utils';
// import {setComponentRoot} from '../../../voice/reducers/voiceState/actions_voiceState';
import {setSelectedElement, refreshSelector} from '../elementSelection/elementSelection_actions';
import {showDataFieldModal, showStyleFieldModal, addUIMessage} from '../appState/appState_actions';
import {filterCopy as filter, firstChild} from '../../_utils/map'
import {parseLoremPixel} from '../../_utils/loremPixel'
import {transform_sketch} from '../../_utils/sketch'
import {setCopiedStyle} from '../appState/appState_actions'
import {setCopiedElementTree} from '../appState/appState_actions'


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
            return actions.replaceElement(selected_element_id, elementType, parent_id, style, data);
        default:
            return actions.addElement(elementType, parent_id, style, data);
    }
}

const getParentId = (selection) => {

    if (selection.parent_id === 0) {
        return selection.selected_element_id;
    }

    return selection.parent_id;
}

export const applyStyleToSelected = (style) => {
    return (dispatch, getState) => {

        const state = getFlexState(getState());
        const {appState} = state;

        let selection = getSelection(state);

        let action = actions.applyStyle(selection.parent_id, style);

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

        let action = actions.addElement(ElementTypes.PLACEHOLDER, parent_id, {
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
            action = actions.addElement(ElementTypes.PLACEHOLDER, root_id, {
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


            action = actions.addElement(ElementTypes.PLACEHOLDER, root_id, style, {modeId: modeId})
            dispatch(action);

            if (row === 0) {
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
            action = actions.addElement(ElementTypes.PLACEHOLDER, root_id, {
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


            action = actions.addElement(ElementTypes.PLACEHOLDER, root_id, style, {modeId: modeId})

            dispatch(action);

            if (col === 0) {
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

export const pasteCopiedStyle = (element) => {
    return (dispatch, getState) => {

        const {appState} = getFlexState(getState()),
            {copiedStyle, resolution} = appState;

        if (copiedStyle) {
            dispatch(actions.applyStyle(element.id, copiedStyle, resolution));
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

        dispatch(actions.applyStyle(id, style, resolution));
    }
}

export const resetScreen = () => {
    return (dispatch, getState) => {

        const modeId = getModeId(getFlexState(getState()));

        dispatch(setSelectedElement(1, 0, 'VIEW'));
        dispatch(actions.clearElements());
        actions.resetId();

        let action;

        // 1
        action = dispatch(actions.addElement(ElementTypes.VIEW, 0, {
            order: 1,
            flex:1,
            display:'flex',
            flexDirection:'column',
        }, {modeId: modeId}));

        const root_id = action.id;

        // 2 [1]
        const selected_action = actions.addElement(ElementTypes.PLACEHOLDER, root_id, {
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

        if (selectedElement.elementType === 'PLACEHOLDER') {
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

export const applyDataContentForCurrentElement = (data) => {
    return (dispatch, getState) => {

        const state = getFlexState(getState());
        const {elementSelection} = state,
            {id, rect} = elementSelection;

        const selectedElement = treeOperations.getItem(state.elements.present, elementSelection.id) || {},
            {elementType} = selectedElement;

        if (elementType ===  ElementTypes.IMAGE) {
            data.content = parseLoremPixel(data.content, Math.ceil(rect.width), Math.ceil(rect.height));
        }

        dispatch(applyData(id, data));
        dispatch(refreshSelector(20));
        dispatch(refreshSelector(500));
    }
}

export const applyDataFieldForCurrentElement = (fieldName, fieldType) => {
    return (dispatch, getState) => {

        const state = getFlexState(getState());
        const {elementSelection} = state;

        dispatch(actions.applyDataField(elementSelection.id, fieldName, fieldType));
    }
}


export const applyStyleFieldForCurrentElement = (fieldName, cssKey) => {
    return (dispatch, getState) => {

        const state = getFlexState(getState());
        const {elementSelection} = state;

        dispatch(actions.applyStyleField(elementSelection.id, fieldName, cssKey));
    }
}

export const setElements = (value) => {
    return (dispatch, getState) => {

        dispatch(actions.setElements(value));

        const maxId = treeOperations.getMaxId(getFlexState(getState()).elements.present);
        actions.setId(maxId + 1);
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

export default {
    ...actions,
    addOrReplace,
    getParentId,
    applyStyleToSelected,
    addPlaceholder,
    manipulateState,
    addText,
    addImage,
    addVerticalView,
    addVerticalViewBySizes,
    addHorizontalView,
    addHorizontalViewBySizes,
    addView,
    addDivider,
    addSnippet,
    selectRoot,
    addPlaceholderToRoot,
    pasteCopiedStyle,
    pasteCopiedElement,
    applyStyle,
    resetScreen,
    copy,
    copyStyle,
    paste,
    pasteSketch,
    applyDataContentForCurrentElement,
    applyDataFieldForCurrentElement,
    applyStyleFieldForCurrentElement,
    setElements,
    setDataField,
    setStyleField,
};