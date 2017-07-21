// import expect from 'expect'
// import { remoteStateIds, filterOnlyChangedItems, findNewItems, compare} from '../../src/_utils/StateParser';
// import * as mocks from '../mocks/all';
//
// describe('StateParser', function () {
//
// 	it('should extract remote item ids', ()=> {
//
// 		const output = remoteStateIds(mocks.stateRoot);
// 		const expectedOutput = [1, 2, 3]
//
// 		expect(output).toEqual(expectedOutput);
// 	})
//
// 	it('should return changed and deleted items', ()=> {
//
// 		const output = filterOnlyChangedItems(mocks.stateRoot, mocks.stateObj2);
// 		const expectedOutput =  { '-JOqvmqmKK81t0p09tJ2': { status: 'CHANGED', to: { childIds: [ 2 ], data: { mode_id: 0 }, elementType: 'view', id: 1, parent_id: 0, style: { color: 'blue', order: 1 } } }, '-JOqvmqmKK81t0p09tJ3': { status: 'CHANGED', to: { data: { mode_id: 0 }, elementType: 'placeholder', id: 2, parent_id: 1, style: { color: 'white', order: 1 } } }, '-JOqvmqmKK81t0p09tJ4': { status: 'DELETED' } };
//
// 		expect(output).toEqual(expectedOutput);
// 	})
//
// 	it('should return new items', ()=> {
//
// 		const output = findNewItems(mocks.stateRoot, mocks.stateObj2);
// 		const expectedOutput =  { 4: { data: { mode_id: 0 }, elementType: 'placeholder', id: 4, parent_id: 1, style: { color: 'white', order: 2 } } };
//
// 		expect(output).toEqual(expectedOutput);
// 	})
//
// 	it('should return comparison report', ()=> {
//
// 		const output = compare(mocks.stateRoot, mocks.stateObj2);
// 		const expectedOutput = { changedItems: { '-JOqvmqmKK81t0p09tJ2': { status: 'CHANGED', to: { childIds: [ 2 ], data: {mode_id:0}, elementType: 'view', id: 1, parent_id: 0, style: { color: 'blue', order: 1 } } }, '-JOqvmqmKK81t0p09tJ3': { status: 'CHANGED', to: { data: {mode_id: 0}, elementType: 'placeholder', id: 2, parent_id: 1, style: { color: 'white', order: 1 } } }, '-JOqvmqmKK81t0p09tJ4': { status: 'DELETED' } }, newItems: { 4: { data: {mode_id:0}, elementType: 'placeholder', id: 4, parent_id: 1, style: { color: 'white', order: 2 } } } };
//
// 		expect(output).toEqual(expectedOutput);
// 	})
// })
//
//
//
//
// /*
//
//  stateObj = {
//  	'1': {
//  	childIds: [2],
//  	elementType: 'view',
//  	id: 1,
//  	parent_id: 0,
//  	style: {color: 'green', order: 1},
//  	data: {}
//  },
//
//  "-JOqvmqmKK81t0p09tJ2": {
//  "id": 1,
//  "parent_id": 0,
//  "elementType": "view",
//  "style": {"color": "green", order: 1},
//  "childIds": [2]
//  },
//
//  */