import expect from 'expect'
import * as actions from '../../src/_utils/IO/compareStates'
import * as mocks from '../mocks/compareStates';

describe('compareStates', function () {

	it('should find removed properties', function () {

		const before = mocks.before1,
			after = mocks.after1;

		const output = actions.compare(after, before);

		//@formatter:off
		const expectedOutput =  {};
		//@formatter:on

		expect(output).toEqual({
			removedProperties: {color: true},
			changedProperties: {},
			addedProperties: {},
		});
	});

	it('should find added properties', function () {

		const before = mocks.before2,
			after = mocks.after2;

		const output = actions.compare(after, before);

		//@formatter:off
		const expectedOutput =  {};
		//@formatter:on

		expect(output).toEqual({
			removedProperties: {},
			changedProperties: {},
			addedProperties: {color: 'green'},
		});
	});

	it('should find changed properties', function () {

		const before = mocks.before3,
			after = mocks.after3;

		const output = actions.compare(after, before);

		//@formatter:off
		const expectedOutput =  {};
		//@formatter:on

		expect(output).toEqual({
			removedProperties: {},
			changedProperties: {color: 'orange'},
			addedProperties: {},
		});
	});

	it('should find diff of complex structures', function () {

		const before = mocks.before4,
			after = mocks.after4;

		const output = actions.compareElements(after, before);

		//@formatter:off
		const expectedOutput =  [ { path: 'A6', value: { data: { modeId: 0, role: 'LIST_ACTION' }, elementType: 'IMAGE', id: 6, parent_id: 2, style: { backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/hologui-212f6.appspot.com/o/user%2Fy5eh9OesOmhONzZ5Q58rPPKWsFP2%2Fimages%2F50.png?alt=media)', backgroundSize: 'cover', dimensions: '', flex: '', height: '30px', marginLeft: '10px', order: 3, width: '30px' } }, verb: 'SET_VALUE' }, { path: 'A2/childIds', value: [ 6, 7, 8, 9 ], verb: 'SET_VALUE' }, { path: 'A2/elementType', value: 'TEXT', verb: 'SET_VALUE' }, { path: 'A2/data/modeId', value: 1, verb: 'SET_VALUE' }, { path: 'A10/parent_id', value: 8, verb: 'SET_VALUE' }, { path: 'A10/style/flex', verb: 'REMOVE' }, { path: 'A10/style/color', value: '#fff', verb: 'SET_VALUE' }, { path: 'A10/style/fontSize', value: '15px', verb: 'SET_VALUE' }, { path: 'A10/data/role', value: 'LIST_ROW', verb: 'SET_VALUE' } ];
		//@formatter:on

		expect(output).toEqual(expectedOutput);
	});
});


