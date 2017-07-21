import { filterCopy, forEach, mapCopy } from './../map';
import {ActionTypes} from '../../reducers/elements/elements';

class actionOperations {

	shiftId(element, deltaId, rootParentId, targetParentId) {

		if (!element) {
			return;
		}

		element.id += deltaId;

		if (element.parent_id == rootParentId) {
			element.parent_id = targetParentId;
		} else if (element.parent_id) {
			element.parent_id += deltaId;
		}

		return element;
	}

	shiftSwitch(action, deltaId) {

		if (action.type === ActionTypes.SWITCH_ELEMENTS_ORDER) {
			action.id1 += deltaId;
			action.id2 += deltaId;
		}

	}

	shiftActions(snippet, maxId, targetParentId) {

		if (!snippet.actions || !snippet.actions.length > 0) {
			return [];
		}

		const rootAction = snippet.actions[0],
			rootId = rootAction.id,
			rootParentId = rootAction.parent_id,
			deltaId = maxId - rootId + 2;

			return snippet.actions.map(action => {
				//console.log('action -> ', action);

				this.shiftId(action, deltaId, rootParentId, targetParentId);
				this.shiftId(action.newElement, deltaId, rootParentId, targetParentId);
				this.shiftSwitch(action, deltaId);

				return action;
			});
	}


}


export default new actionOperations();
