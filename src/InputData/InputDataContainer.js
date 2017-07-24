import {connect} from 'react-redux'
import InputData from './InputData'
import actions from '../reducers/elements/elements_actions'
import {showAttributePopover, showDataFieldModal} from '../reducers/appState/appState_actions'
import {getFlexState} from '../reducers/utils';
import treeOperations from 'lpm-core/utils';

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
		applyDataToSelected: (content) => {
			dispatch(actions.applyDataContentForCurrentElement(content));
		},
		previewDataInSelected: (data) => {
			const {elementId} = ownProps;

			dispatch(actions.previewData(elementId, data));
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
