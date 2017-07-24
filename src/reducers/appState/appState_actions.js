import {ActionTypes} from './appState';

import treeOperations from 'lpm-core/utils';
import clone from 'clone';
import {getFlexState} from '../utils';


export const setStage = (value) => {

    return {
        type: ActionTypes.SET_STAGE,
        value,
    }
}

export const setVersionsInfo = (value) => {

    return {
        type: ActionTypes.SET_VERSIONS_INFO,
        value,
    }
}

export const addVersionInfo = (id, value) => {

    return {
        type: ActionTypes.ADD_VERSION_INFO,
        id,
        value,
    }
}

export const setResolution = (value) => {

    return {
        type: ActionTypes.SET_RESOLUTION,
        value,
    }
}

export const showAttributePopover = (value) => {

    return {
        type: ActionTypes.SHOW_ATTRIBUTE_POPOVER,
        value,
    }
}

export const showPlaceholderPopover = (value) => {

    return {
        type: ActionTypes.SHOW_PLACEHOLDER_POPOVER,
        value,
    }
}

export const showSelection = (value) => {

    return {
        type: ActionTypes.SHOW_SELECTION,
        value,
    }
}


export const showDataButtons = (value) => {

    return {
        type: ActionTypes.SHOW_DATA_BUTTONS,
        value,
    }
}

export const setCopiedStyle = (value) => {

    return {
        type: ActionTypes.SET_COPIED_STYLE,
        value,
        silent: true,
    }
}


export const setCopiedElement = (value) => {

    return {
        type: ActionTypes.SET_COPIED_ELEMENT,
        value,
        silent: true,
    }
}

export const showDataFieldModal = (value) => {

    return {
        type: ActionTypes.SHOW_DATA_FIELD_MODAL,
        value,
    }
}

export const showStyleFieldModal = (value, cssField) => {

    return {
        type: ActionTypes.SHOW_STYLE_FIELD_MODAL,
        value,
        cssField,
    }
}

export const clearFieldModal = () => {

    return {
        type: ActionTypes.CLEAR_FIELD_MODAL,
    }
}

export const openDrawer = (value) => {

    return {
        type: ActionTypes.OPEN_DRAWER,
        value,
    }
}


export const configOverlay = (json) => {

    return {
        type: ActionTypes.CONFIG_OVERLAY,
        value: json,
    }
}

export const setTreeMode = (value) => {

    return {
        type: ActionTypes.SET_TREE_MODE,
        value,
    }
}

export const setLastImageDrop = (value) => {

    return {
        type: ActionTypes.SET_LAST_IMAGE_DROP,
        value,
    }
}

export const setZoom = (value) => {

    return {
        type: ActionTypes.SET_ZOOM,
        value,
    }
}

export const setColors = (value) => {

    return {
        type: ActionTypes.SET_COLORS,
        value,
    }
}

export const setFonts = (value) => {

    return {
        type: ActionTypes.SET_FONTS,
        value,
    }
}

export const addUIMessage = (message, isSticky) => {

    return {
        type: ActionTypes.ADD_UI_MESSAGE,
        message,
        isSticky,
    }
}

export const clearUIMessages = () => {

    return {
        type: ActionTypes.CLEAR_UI_MESSAGES,
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


export const setCopiedElementTree = (element) => {
    return (dispatch, getState) => {

        const state = getFlexState(getState());
        let elements = treeOperations.treeElements(state, element.id);

        if (!elements || Object.keys(elements).length == 0) {
            return Promise.resolve(false);
        }

        let value = clone(elements);

        dispatch(setCopiedElement(value));
        return Promise.resolve(true);
    }
}

export const toggleDrawer = () => {

    return (dispatch, getState) => {

        const drawerOpen = getFlexState(getState()).appState.drawerOpen;
        dispatch(openDrawer(!drawerOpen));
    }
}

export const toggleTreeMode = () => {

    return (dispatch, getState) => {

        const treeModeTags = getFlexState(getState()).appState.treeModeTags;
        dispatch(setTreeModeByTags(!treeModeTags));
    }
}



export const changeOverlayOpacity = (delta) => {

    return (dispatch, getState) => {

        const {overlay = {}} = getFlexState(getState()).appState;
        let {opacity = 0} = overlay;

        opacity = Math.min(Math.max(opacity + delta, 0), 1);

        dispatch(configOverlay({opacity}));
    }
}



export const changeOverlayVerPosition = (deltaTop) => {

    return (dispatch, getState) => {

        const {overlay = {}} = getFlexState(getState()).appState;
        let {top = 0} = overlay;

        dispatch(configOverlay({top: top + deltaTop}));
    }
}



export const changeOverlayHorPosition = (deltaLeft) => {

    return (dispatch, getState) => {

        const {overlay = {}} = getFlexState(getState()).appState;
        let {left = 0} = overlay;

        dispatch(configOverlay({left: left + deltaLeft}));
    }
}



export const toggleOverlay = () => {

    return (dispatch, getState) => {

        const {overlay = {}} = getFlexState(getState()).appState;
        let {show = true} = overlay;

        dispatch(configOverlay({show: !show}));
    }
}

export const resetOverlay = () => {

    return (dispatch, getState) => {

        dispatch(configOverlay({
            show: true,
            url: '',
            width: -1,
            height: -1,
            top: 0,
            left: 0,
            opacity: 0.3
        }));
    }
}
