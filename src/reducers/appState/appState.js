import Default_fonts from '../../constants/Fonts_latin';

export const Stages = {
    LOADING_SNIPPET: 'LOADING_SNIPPET',
    LOADING_COMPLETED: 'LOADING_COMPLETED',
};

export const TreeModes = {
    MODE_ELEMENTS: 'Elements',
    MODE_CLASSES: 'Classes',
    MODE_TAGS: 'Tags',
    MODE_TOGGLE: 'Toggle',
};

const initialState = {
    resolution: 1,
    stage: null,
    showAttributePopover: false,
    showPlaceholderPopover: false,
    showDataButtons: false,
    showSelection: true,
    modeId: 0,
    treeMode: TreeModes.MODE_ELEMENTS,
    versionsInfo: {},
    copiedElement: {},
    copiedStyle: {},
    dataFieldModalOn: false,
    styleFieldModalOn: false,
    styleFieldModalCssField: '',
    drawerOpen: true,
    lastImageDrop: '',
    overlay: {
        show: true,
        url: '',
        width: -1,
        height: -1,
        top: 0,
        left: 0,
        opacity: 0.3
    },
    zoom: 1.1,
    uiMessages: [],
    colors: [],
    fonts: Default_fonts,
};

const prefix = 'FLEX_';

export const ActionTypes = {
    SET_STAGE: `${prefix}SET_STAGE`,
    SET_RESOLUTION: `${prefix}SET_RESOLUTION`,
    SET_VERSIONS_INFO: `${prefix}SET_VERSIONS_INFO`,
    ADD_VERSION_INFO: `${prefix}ADD_VERSION_INFO`,
    SHOW_ATTRIBUTE_POPOVER: `${prefix}SHOW_ATTRIBUTE_POPOVER`,
    SHOW_PLACEHOLDER_POPOVER: `${prefix}SHOW_PLACEHOLDER_POPOVER`,
    SHOW_SELECTION: `${prefix}SHOW_SELECTION`,
    SET_COPIED_STYLE: `${prefix}SET_COPIED_STYLE`,
    SET_COPIED_ELEMENT: `${prefix}SET_COPIED_ELEMENT`,
    SHOW_DATA_BUTTONS: `${prefix}SHOW_DATA_BUTTONS`,
    SHOW_DATA_FIELD_MODAL: `${prefix}SHOW_DATA_FIELD_MODAL`,
    SHOW_STYLE_FIELD_MODAL: `${prefix}SHOW_STYLE_FIELD_MODAL`,
    CLEAR_FIELD_MODAL: `${prefix}CLEAR_FIELD_MODAL`,
    OPEN_DRAWER: `${prefix}OPEN_DRAWER`,
    CONFIG_OVERLAY: `${prefix}CONFIG_OVERLAY`,
    SET_TREE_MODE: `${prefix}SET_TREE_MODE`,
    SET_LAST_IMAGE_DROP: `${prefix}SET_LAST_IMAGE_DROP`,
    SET_ZOOM: `${prefix}SET_ZOOM`,
    ADD_UI_MESSAGE: `${prefix}ADD_UI_MESSAGE`,
    CLEAR_UI_MESSAGES: `${prefix}CLEAR_UI_MESSAGES`,
    SET_COLORS: `${prefix}SET_COLORS`,
    SET_FONTS: `${prefix}SET_FONTS`,
};

export const overlay = (state, action) => {

    switch (action.type) {

        case ActionTypes.CONFIG_OVERLAY:
            return {...state, ...action.value};

        default:
            return state;
    }
}

export const versionsInfo = (state, action) => {
    let nexState;

    switch (action.type) {
        case ActionTypes.ADD_VERSION_INFO:
            nexState = {...state};
            nexState[action.id] = action.value;

            return nexState;

        default:
            return state;
    }
}


let message_id = 0;

export const uiMessages = (state, action) => {
    switch (action.type) {
        case ActionTypes.ADD_UI_MESSAGE:
            return [
                ...state,
                {
                    id: message_id++,
                    date: new Date(),
                    message: action.message,
                    isSticky: action.isSticky
                }
            ]

        case ActionTypes.CLEAR_UI_MESSAGES:
            return []

        default:
            return state
    }
}

export const appState = (state = initialState, action) => {
    let output;

    switch (action.type) {

        case ActionTypes.SET_COLORS:
            return {
                ...state,
                colors: action.value
            }

        case ActionTypes.SET_FONTS:
            return {
                ...state,
                fonts: action.value
            }

        case ActionTypes.SET_STAGE:
            return {
                ...state,
                stage: action.value
            }

        case ActionTypes.SET_VERSIONS_INFO:
            return {
                ...state,
                versionsInfo: action.value
            }

        case ActionTypes.ADD_VERSION_INFO:
            return {
                ...state,
                versionsInfo: versionsInfo(state.versionsInfo, action)
            }

        case ActionTypes.SHOW_ATTRIBUTE_POPOVER:
            return {
                ...state,
                showAttributePopover: action.value
            }

        case ActionTypes.SHOW_PLACEHOLDER_POPOVER:
            return {
                ...state,
                showPlaceholderPopover: action.value
            }

        case ActionTypes.SHOW_DATA_BUTTONS:
            return {
                ...state,
                showDataButtons: action.value
            }

        case ActionTypes.SHOW_SELECTION:
            return {
                ...state,
                showSelection: action.value
            }

        case ActionTypes.SET_COPIED_STYLE:

            output = {
                ...state,
            };

            output.copiedStyle = action.value;

            return output;

        case ActionTypes.SET_COPIED_ELEMENT:

            output = {
                ...state,
            };

            output.copiedElement = action.value;

            return output;

        case ActionTypes.SHOW_DATA_FIELD_MODAL:

            return {
                ...state,
                dataFieldModalOn: action.value
            }

        case ActionTypes.SHOW_STYLE_FIELD_MODAL:

            return {
                ...state,
                styleFieldModalOn: action.value,
                styleFieldModalCssField: action.cssField
            }

        case ActionTypes.CLEAR_FIELD_MODAL:
            return {
                ...state,
                dataFieldModalOn: null,
                styleFieldModalOn: null,
                styleFieldModalCssField: '',
                showPlaceholderPopover: null,
            }

        case ActionTypes.OPEN_DRAWER:
            return {
                ...state,
                drawerOpen: action.value,
            }

        case ActionTypes.CONFIG_OVERLAY:
            return {
                ...state,
                overlay: overlay(state.overlay, action)
            }

        case ActionTypes.SET_TREE_MODE:
            return {
                ...state,
                treeMode: action.value
            }

        case ActionTypes.SET_LAST_IMAGE_DROP:
            return {
                ...state,
                lastImageDrop: action.value
            }

        case ActionTypes.SET_RESOLUTION:
            return {
                ...state,
                resolution: action.value
            }

        case ActionTypes.SET_ZOOM:
            return {
                ...state,
                zoom: action.value
            }

        case ActionTypes.ADD_UI_MESSAGE:
            return {
                ...state,
                uiMessages: uiMessages(state.uiMessages, action)
            }

        case ActionTypes.CLEAR_UI_MESSAGES:
            return {
                ...state,
                uiMessages: uiMessages(state.uiMessages, action)
            }

        default:
            return state
    }
}

export default appState
