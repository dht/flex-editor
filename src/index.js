import {ActionTypes as ActionTypesElements} from './reducers/elements/elements';
import {ActionTypes as ActionTypesAppState} from './reducers/appState/appState';
import flexState from './reducers/index';
import ElementTypes from './constants/ElementTypes';

import {
    clearFieldModal,
    configOverlay,
    changeOverlayVerPosition,
    changeOverlayHorPosition,
    changeOverlayOpacity,
    toggleOverlay,
    resetOverlay,
    addUIMessage,
    clearUIMessages,
    setResolution,
    showSelection,
} from './reducers/appState/appState_actions';


import {
    addView,
    addElement,
    setElements,
    resetScreen,
    setDataField,
    setStyleField,
    loadResolution,
    applyClass,
    applyVars,
    applyData,
    addSnippet,
} from './reducers/elements/elements_actions';

import {
    refreshSelector,
    setSelectedElement,
} from './reducers/elementSelection/elementSelection_actions';

export default {
    ActionTypesElements,
    ActionTypesAppState,
    flexState,
    ElementTypes,
    clearFieldModal,
    configOverlay,
    changeOverlayVerPosition,
    changeOverlayHorPosition,
    changeOverlayOpacity,
    toggleOverlay,
    resetOverlay,
    addUIMessage,
    clearUIMessages,
    setResolution,
    showSelection,
    addView,
    addElement,
    addSnippet,
    setElements,
    resetScreen,
    setDataField,
    setStyleField,
    loadResolution,
    applyClass,
    applyVars,
    applyData,
    refreshSelector,
    setSelectedElement,
}