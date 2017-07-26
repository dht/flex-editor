import {ActionTypesElements} from 'lpm-core';
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
    setDataField,
    setStyleField,
} from './reducers/elements/elements_actions';

import {
    addView,
    addElement,
    setElements,
    resetScreen,
    loadResolution,
    applyClass,
    applyVars,
    applyData,
    addSnippet,
} from 'lpm-core';

import {
    refreshSelector,
    setSelectedElement,
} from 'lpm-core';

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