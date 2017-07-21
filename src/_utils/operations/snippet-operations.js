import { filterCopy, forEach, map, mapCopy, reduceCopy, firstChild } from './../map';

class snippetOperations {

	shiftId(element, deltaId) {

		if (!element) {
			return element;
		}

		element.id += deltaId;

		if (element.parent_id) {
			element.parent_id += deltaId;
		}

		if (element.childIds) {
			element.childIds = element.childIds.map(id => id + deltaId);
		}

		return element;
	}

	shiftSnippet(state, maxId) {

		if (!state) {
			return {};
		}

		const rootElement = firstChild(state),
			rootId = rootElement.id,
			deltaId = maxId - rootId + 2;

		return reduceCopy(state, (output, element) => {
			let el = this.shiftId(element, deltaId);
			if (el.childIds) {
				el.childIds = [...el.childIds];
			}
			if (el.style) {
				el.style = {...el.style};
			}
			if (el.data) {
				el.data = {...el.data};
			}
			output[el.id] = el;
			return output;
		}, {});
	}

	changeElementId(state, fromId, toId) {
		let element = state[fromId];

		if (!element || fromId == toId) {
			return state;
		}

		element.id = toId;
		state[toId] = {...element};
		delete state[fromId];

		return map(state, element => {
			if (element.parent_id == fromId) {
				element.parent_id = toId;
			}

			if (element.childIds) {
				element.childIds = [...element.childIds].map(id => {
					return (id != fromId) ? id : toId;
				});
			}

			return element;
		});
	}

	fixSnippetRoot(state, root) {
		let id = firstChild(state).id;

		state[id].parent_id = root.parent_id;
		state[id].style.order = root.style.order;

		return this.changeElementId(state, id, root.id);
	}
}


export default new snippetOperations();
