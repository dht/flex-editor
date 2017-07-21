import {ActionTypes} from './attributeSelection';

/*
 SET_SELECTED_ATTRIBUTE
 SET_SELECTED_ATTRIBUTE_VALUE
 SET_SELECTED_ATTRIBUTE_ORIGINAL_VALUE
 */

export const setSelectedAttribute = (key, attributeType, original_value, element_id) => {

	return {
		type: ActionTypes.SET_SELECTED_ATTRIBUTE,
		key,
		attributeType,
		original_value,
		element_id,
	}
}

export const setSelectedAttributeOriginalValue = (value) => {

	return {
		type: ActionTypes.SET_SELECTED_ATTRIBUTE_ORIGINAL_VALUE,
		value,
	}
}


export const setSelectedValue = (value) => {

	return {
		type: ActionTypes.SET_SELECTED_ATTRIBUTE_VALUE,
		value,
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