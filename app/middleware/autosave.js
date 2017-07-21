import {ActionTypes} from '../../src/reducers/elements/elements';
import { getInstructions } from '../../src/_utils/IO/compareStates';
import { executeInstructions } from '../utils/elements_api';

const acceptActions = [...Object.keys(ActionTypes), '@@redux-undo/UNDO', '@@redux-undo/REDO'];
const ignoreActions = [ActionTypes.SET_ELEMENTS];

export let actions = [];

const autosave = store => next => action => {

	let result = next(action);

	const state = store.getState().flexState;

	if (action.type &&
		acceptActions.indexOf(action.type) >= 0 &&
		ignoreActions.indexOf(action.type) == -1) {

		const instructions = getInstructions(state, action);
		executeInstructions(instructions);
	}

	return result
}

export default autosave;
