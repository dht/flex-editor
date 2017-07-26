import { connect } from 'react-redux'
import Phone from './Phone'
import {Stages} from '../reducers/appState/appState';
import {getFlexState} from '../reducers/utils';
import treeOperations from 'lpm-core';
import {
    setSelectedElement,
    setElementRect
} from 'lpm-core'
import {showAttributePopover, showPlaceholderPopover} from '../reducers/appState/appState_actions'

const mapStateToProps = (state, ownProps) => {

    state = getFlexState(state);
    const { appState } = state;
    const { direction, appType, stage } = appState;

    const screenHeight = treeOperations.getRootHeight(state, ownProps.screenHeight);

    return {
        direction,
        appType,
        isLoading: stage === Stages.LOADING_SNIPPET,
        screenHeight,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onElementClick: (element_id, parent_id, element_type, ev) => {

            ev.stopPropagation();
            ev.preventDefault();

            let element = ev.target;

            if (element.className === 'material-icons') {
                element = element.parentElement;
            }

            if (element.className === 'inner') {
                element = element.parentElement;
            }

            const rect = element.getBoundingClientRect();

            dispatch(setSelectedElement(element_id, parent_id, element_type));
            dispatch(setElementRect(rect));
            dispatch(showAttributePopover(false));
        },
        onDoubleClick: (element_id, parent_id, element_type, ev) => {
            if (element_type === 'TEXT' || element_type === 'IMAGE') {
                dispatch(showAttributePopover(true));
            }
            if (element_type === 'PLACEHOLDER') {
                dispatch(showPlaceholderPopover(true));
            }
        }
    }
}

const PhoneContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Phone)

export default PhoneContainer
