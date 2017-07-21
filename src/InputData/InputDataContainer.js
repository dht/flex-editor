import {connect} from 'react-redux'
import InputData from './InputData'
import {applyData, previewData} from '../reducers/elements/elements_actions'
import {showAttributePopover, showDataFieldModal} from '../reducers/appState/appState_actions'
import { refreshSelector } from '../reducers/elementSelection/elementSelection_actions'
import {getFlexState} from '../reducers/utils';
import * as treeOperations from '../_utils/operations/tree-operations';

const mapStateToProps = (state, ownProps) => {

    state = getFlexState(state);

	const {elementSelection } = state;

	const { appState } = state;
	const { showDataButtons } = appState;

    const selectedElement = treeOperations.getItem(state.elements.present, elementSelection.id) || {};

	const {data = {}} = selectedElement;
	return {
		selectedElement,
		data,
        showDataButtons,
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {

	return {
		applyDataToSelected: (data) => {
			const {elementId} = ownProps;

			dispatch(applyData(elementId, data));
			dispatch(refreshSelector(20));
			dispatch(refreshSelector(500));
		},
		previewDataInSelected: (data) => {
			const {elementId} = ownProps;

			dispatch(previewData(elementId, data));
		},
		onDone: () => {
			dispatch(showAttributePopover(false));
		},
        showDataFieldModal:() => {
			dispatch(showDataFieldModal(true));
		}
	}
}

const InputDataContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(InputData)

export default InputDataContainer
