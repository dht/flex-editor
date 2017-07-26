import {showDataFieldModal, showStyleFieldModal} from '../appState/appState_actions';
import {applyDataFieldForCurrentElement, applyStyleFieldForCurrentElement} from 'lpm-core';

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