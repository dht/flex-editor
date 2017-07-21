const initialState = {
	key: '',
	original_value: '',
	attributeType: '',
	element_id: -1
}

const prefix = 'FLEX_';

export const ActionTypes = {
    SET_SELECTED_ATTRIBUTE: `${prefix}SET_SELECTED_ATTRIBUTE`,
    SET_SELECTED_ATTRIBUTE_VALUE: `${prefix}SET_SELECTED_ATTRIBUTE_VALUE`,
    SET_SELECTED_ATTRIBUTE_ORIGINAL_VALUE: `${prefix}SET_SELECTED_ATTRIBUTE_ORIGINAL_VALUE`,
};

const attributeSelection = (state = initialState, action) => {

	switch (action.type) {
		case ActionTypes.SET_SELECTED_ATTRIBUTE:
			return {
				...state,
				key: action.key,
				attributeType: action.attributeType,
				original_value: action.original_value,
				element_id: action.element_id,
				value: action.original_value
			};

		case ActionTypes.SET_SELECTED_ATTRIBUTE_VALUE:
			return {...state, value: action.value};

		case ActionTypes.SET_SELECTED_ATTRIBUTE_ORIGINAL_VALUE:
			return {...state, original_value: action.value};

		default:
			return state
	}
}

export default attributeSelection