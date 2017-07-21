import {ActionTypes} from './modal';

export const modalTypes = {
    CONFIRMATION_MODAL: 'CONFIRMATION_MODAL',
    PUBLISH_MODAL: 'PUBLISH_MODAL',
    LOAD_VERSION_MODAL: 'LOAD_VERSION_MODAL',
}

export const showModal = (modalType, props) => {
	return {
		type: ActionTypes.SHOW_MODAL,
		modalType,
		modalProps: props
	}
}
export const closeModal = () => {
	return {
		type: ActionTypes.CLOSE_MODAL,
	}
}