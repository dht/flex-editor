import ElementTypes from '../../../constants/ElementTypes'
import treeOperations from 'lpm-core/utils';

export const getSelection = (state) => {

	const parent_id = parseInt(state.elementSelection.parent_id, 10) || 0;
	const selected_element_id = parseInt(state.elementSelection.id, 10);
	const selected_element_type = state.elementSelection.elementType;
	const isPlaceholder = (selected_element_type === ElementTypes.PLACEHOLDER);

	return {
		parent_id,
		selected_element_id,
		selected_element_type,
		isPlaceholder
	}
}

export const getMaxOrder = (state, parent_id) => {
	return treeOperations.findMaxOrderForParentId(state.elements.present, parent_id);

}

export const getModeId = state => {
	return state.appState.modeId;
}

