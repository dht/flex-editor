import expect from 'expect'
import reducer, {ActionTypes as types} from '../../src/reducers/elementSelection/elementSelection';
import deepFreeze from 'deep-freeze';

describe('element selection reducer', function () {
	it('should return initial state for undefined', function () {
		expect(
			reducer(undefined, {})
		).toEqual({
			id: 0,
			parent_id: 0,
			elementType: '',
            rect: {}
		})
	})

	it('should handle SET_SELECTED_ELEMENT', function () {

		let state = {
			id: 0,
			parent_id: 0,
			elementType: ''
		};

		deepFreeze(state);

		expect(
			reducer(state, {
				type: types.SET_SELECTED_ELEMENT,
				id: 2,
				parent_id: 1,
				elementType: 'VIEW',
			})
		).toEqual(
			{
				id: 2,
				parent_id: 1,
				elementType: 'VIEW',
			}
		)
	})

})




