// import expect from 'expect'
// import {element as reducer, elements as reducerMany, ActionTypes as types} from '../../src/reducers/elements/elements';
// import deepFreeze from 'deep-freeze';
// import * as mocks from '../mocks/all';
//
// describe('element reducer', function () {
//     it('should return null for undefined', function () {
//         expect(
//             reducer(undefined, {})
//         ).toEqual(null)
//     })
//
//     it('should handle ADD_ELEMENT', function () {
//
//         let state = undefined;
//
//         expect(
//             reducer(state, {
//                 type: types.ADD_ELEMENT,
//                 id: 2,
//                 parent_id: 1,
//                 elementType: 'view',
//                 style: {color: 'green'},
//             })
//         ).toEqual(
//             {
//                 id: 2,
//                 parent_id: 1,
//                 elementType: 'view',
//                 style: {color: 'green'},
//
//                 childIds: [],
//                 "data": {
//                     "vars": {
//                         "r1": {
//                             "color": "green"
//                         },
//                         "r2": {
//                             "order": 1
//                         },
//                         "r3": {
//                             "order": 1
//                         },
//                         "r4": {
//                             "order": 1
//                         }
//                     }
//                 }
//             }
//         )
//
//     })
//
//     it('should invoke APPLY_STYLE for multiple attributes', function () {
//
//         let state = {
//             id: 2,
//             parent_id: 1,
//             elementType: 'view',
//             style: {color: 'green'},
//             childIds: []
//         };
//
//         deepFreeze(state);
//
//         expect(
//             reducer(state,
//                 {
//                     id: 2,
//                     type: types.APPLY_STYLE,
//                     style: {color: 'red', padding: '15px'}
//                 })
//         ).toEqual(
//             {
//                 id: 2,
//                 parent_id: 1,
//                 elementType: 'view',
//                 style: {color: 'red', padding: '15px'},
//                 childIds: []
//             }
//         )
//
//     })
//
// })
//
//
// describe('elements (many) reducer', function () {
//     it('should return {} for undefined', function () {
//         expect(
//             reducerMany(undefined, {})
//         ).toEqual({})
//     })
//
//     //it('should handle INJECT SNIPPET', function () {
//     //
//     //	let state = mocks.stateObj3;
//     //
//     //	deepFreeze(state);
//     //
//     //	let output = reducerMany(state, mocks.actionInjectSnippet);
//     //
//     //	console.log('output -> ', output);
//     //
//     //	expect(
//     //		reducerMany(state, mocks.actionInjectSnippet)
//     //	).toEqual({})
//     //
//     //})
//
//     it('should handle ADD_ELEMENT first', function () {
//
//         let state = undefined;
//
//         expect(
//             reducerMany(state, {
//                 type: types.ADD_ELEMENT,
//                 id: 1,
//                 parent_id: 0,
//                 elementType: 'view',
//                 style: {color: 'green'},
//                 data: {}
//             })
//         ).toEqual(
//             {
//                 '1': {
//                     id: 1,
//                     parent_id: 0,
//                     elementType: 'view',
//                     style: {color: 'green'},
//                     childIds: [],
//                     data: {}
//                 }
//             }
//         )
//
//     })
//
//     it('should handle ADD_ELEMENT second', function () {
//
//         let state = {
//             1: {
//                 id: 1,
//                 parent_id: 0,
//                 elementType: 'view',
//                 style: {color: 'green'},
//                 childIds: [],
//                 data: {}
//             }
//         };
//
//         deepFreeze(state);
//
//         expect(
//             reducerMany(state, {
//                 type: types.ADD_ELEMENT,
//                 id: 2,
//                 parent_id: 0,
//                 elementType: 'text',
//                 style: {color: 'green'},
//             })
//         ).toEqual(
//             {
//                 '1': {
//                     id: 1,
//                     parent_id: 0,
//                     elementType: 'view',
//                     style: {color: 'green'},
//                     childIds: [],
//                     data: {}
//                 },
//                 '2': {
//                     id: 2,
//                     parent_id: 0,
//                     elementType: 'text',
//                     style: {color: 'green'},
//                     childIds: [],
//                     data: {}
//                 }
//             }
//         )
//
//     })
//
//     it('should handle ADD_ELEMENT child', function () {
//
//         let state = {
//             1: {
//                 id: 1,
//                 parent_id: 0,
//                 elementType: 'view',
//                 style: {color: 'green'},
//                 childIds: []
//             }
//         };
//
//         deepFreeze(state);
//
//         expect(
//             reducerMany(state, {
//                 type: types.ADD_ELEMENT,
//                 id: 2,
//                 parent_id: 1,
//                 elementType: 'text',
//                 style: {color: 'green'},
//             })
//         ).toEqual(
//             {
//                 '1': {
//                     id: 1,
//                     parent_id: 0,
//                     elementType: 'view',
//                     style: {color: 'green'},
//                     childIds: [2],
//                     data: {}
//                 },
//                 '2': {
//                     id: 2,
//                     parent_id: 1,
//                     elementType: 'text',
//                     style: {color: 'green'},
//                     childIds: [],
//                     data: {}
//                 }
//             }
//         )
//
//     })
//
//     it('should handle ADD_ELEMENT parent does not exist', function () {
//
//         let state = {
//             1: {
//                 id: 1,
//                 parent_id: 0,
//                 elementType: 'view',
//                 style: {color: 'green'},
//                 childIds: []
//             }
//         };
//
//         deepFreeze(state);
//
//         expect(
//             reducerMany(state, {
//                 type: types.ADD_ELEMENT,
//                 id: 4,
//                 parent_id: 3,
//                 elementType: 'text',
//                 style: {color: 'green'},
//             })
//         ).toEqual(
//             {
//                 1: {
//                     id: 1,
//                     parent_id: 0,
//                     elementType: 'view',
//                     style: {color: 'green'},
//                     childIds: []
//                 }
//             }
//         )
//
//     })
//
//     it('should handle DELETE_ELEMENT', function () {
//
//         let state = {
//             '1': {
//                 id: 1,
//                 parent_id: 0,
//                 elementType: 'view',
//                 style: {color: 'green'},
//                 childIds: [2]
//             },
//             '2': {
//                 id: 2,
//                 parent_id: 1,
//                 elementType: 'text',
//                 style: {color: 'green'},
//                 childIds: []
//             },
//             '3': {
//                 id: 3,
//                 parent_id: 0,
//                 elementType: 'text',
//                 style: {color: 'green'},
//                 childIds: []
//             }
//         }
//
//         deepFreeze(state);
//
//         expect(
//             reducerMany(state, {
//                 type: types.DELETE_ELEMENT,
//                 id: 3
//             })
//         ).toEqual({
//             '1': {
//                 id: 1,
//                 parent_id: 0,
//                 elementType: 'view',
//                 style: {color: 'green'},
//                 childIds: [2],
//                 data: {}
//             },
//             '2': {
//                 id: 2,
//                 parent_id: 1,
//                 elementType: 'text',
//                 style: {color: 'green'},
//                 childIds: [],
//                 data: {}
//             },
//         })
//
//     })
//
//     it('should handle DELETE_ELEMENT and clean childIds array', function () {
//
//         let state = {
//             '1': {
//                 id: 1,
//                 parent_id: 0,
//                 elementType: 'view',
//                 style: {color: 'green'},
//                 childIds: [2]
//             },
//             '2': {
//                 id: 2,
//                 parent_id: 1,
//                 elementType: 'text',
//                 style: {color: 'green'},
//                 childIds: []
//             }
//         }
//
//         deepFreeze(state);
//
//         expect(
//             reducerMany(state, {
//                 type: types.DELETE_ELEMENT,
//                 id: 2
//             })
//         ).toEqual({
//             '1': {
//                 id: 1,
//                 parent_id: 0,
//                 elementType: 'view',
//                 style: {color: 'green'},
//                 childIds: [],
//                 data: {}
//             }
//         })
//
//     })
//
//     it('should handle DELETE_ELEMENT and remove children', function () {
//
//         let state = {
//             '1': {
//                 id: 1,
//                 parent_id: 0,
//                 elementType: 'view',
//                 style: {color: 'green'},
//                 childIds: [2]
//             },
//             '2': {
//                 id: 2,
//                 parent_id: 1,
//                 elementType: 'text',
//                 style: {color: 'green'},
//                 childIds: []
//             }
//         }
//
//         deepFreeze(state);
//
//         expect(
//             reducerMany(state, {
//                 type: types.DELETE_ELEMENT,
//                 id: 1
//             })
//         ).toEqual({})
//
//     })
//
//     it('should handle DELETE_ELEMENT and remove grandchildren', function () {
//
//         let state = {
//             '1': {
//                 id: 1,
//                 parent_id: 0,
//                 elementType: 'view',
//                 style: {color: 'green'},
//                 childIds: [2]
//             },
//             '2': {
//                 id: 2,
//                 parent_id: 1,
//                 elementType: 'text',
//                 style: {color: 'green'},
//                 childIds: [3]
//             },
//             '3': {
//                 id: 3,
//                 parent_id: 2,
//                 elementType: 'text',
//                 style: {color: 'green'},
//                 childIds: []
//             }
//         }
//
//         deepFreeze(state);
//
//         expect(
//             reducerMany(state, {
//                 type: types.DELETE_ELEMENT,
//                 id: 1
//             })
//         ).toEqual({})
//
//     })
//
//     it('should handle DELETE_ELEMENT and remove grand-grandchildren', function () {
//
//         let state = {
//             '1': {
//                 id: 1,
//                 parent_id: 2,
//                 elementType: 'view',
//                 style: {color: 'green'},
//                 childIds: []
//             },
//             '2': {
//                 id: 2,
//                 parent_id: 3,
//                 elementType: 'text',
//                 style: {color: 'green'},
//                 childIds: [1]
//             },
//             '3': {
//                 id: 3,
//                 parent_id: 4,
//                 elementType: 'text',
//                 style: {color: 'green'},
//                 childIds: [2]
//             },
//             '4': {
//                 id: 4,
//                 parent_id: 0,
//                 elementType: 'text',
//                 style: {color: 'green'},
//                 childIds: [3]
//             }
//         }
//
//         deepFreeze(state);
//
//         expect(
//             reducerMany(state, {
//                 type: types.DELETE_ELEMENT,
//                 id: 4
//             })
//         ).toEqual({})
//
//     })
//
//     it('should handle DELETE_ELEMENT on a non existing child', function () {
//
//         let state = {
//             '1': {
//                 id: 1,
//                 parent_id: 2,
//                 elementType: 'view',
//                 style: {color: 'green'},
//                 childIds: []
//             },
//             '2': {
//                 id: 2,
//                 parent_id: 3,
//                 elementType: 'text',
//                 style: {color: 'green'},
//                 childIds: [1]
//             },
//             '3': {
//                 id: 3,
//                 parent_id: 4,
//                 elementType: 'text',
//                 style: {color: 'green'},
//                 childIds: [2]
//             },
//             '4': {
//                 id: 4,
//                 parent_id: 0,
//                 elementType: 'text',
//                 style: {color: 'green'},
//                 childIds: [3]
//             }
//         }
//
//         deepFreeze(state);
//
//         expect(
//             reducerMany(state, {
//                 type: types.DELETE_ELEMENT,
//                 id: 5
//             })
//         ).toEqual({
//             '1': {
//                 id: 1,
//                 parent_id: 2,
//                 elementType: 'view',
//                 style: {color: 'green'},
//                 childIds: []
//             },
//             '2': {
//                 id: 2,
//                 parent_id: 3,
//                 elementType: 'text',
//                 style: {color: 'green'},
//                 childIds: [1]
//             },
//             '3': {
//                 id: 3,
//                 parent_id: 4,
//                 elementType: 'text',
//                 style: {color: 'green'},
//                 childIds: [2]
//             },
//             '4': {
//                 id: 4,
//                 parent_id: 0,
//                 elementType: 'text',
//                 style: {color: 'green'},
//                 childIds: [3]
//             }
//         })
//
//     })
//
//     it('should handle DELETE_ELEMENT on complex structures', function () {
//
//         let state = {
//             "0": {
//                 "id": 0,
//                 "parent_id": 0,
//                 "elementType": "VIEW",
//                 "style": {
//                     "display": "flex",
//                     "order": 1,
//                     "flex": 1,
//                     "flexDirection": "column",
//                     "width": "360px",
//                     "alignItems": "stretch",
//                     "justifyContent": "flex-start"
//                 },
//
//                 "data": {},
//                 "childIds": [
//                     1,
//                     2
//                 ]
//             },
//             "1": {
//                 "id": 1,
//                 "parent_id": 0,
//                 "elementType": "TEXT",
//                 "style": {
//                     "order": 1,
//                     "fontSize": "20px",
//                     "textAlign": "center",
//                     "padding": "10",
//                     "fontWeight": "bold",
//                     "fontFamily": "Heebo",
//                     "backgroundColor": "#e6665d",
//                     "color": "#fff"
//                 },
//
//                 "data": {
//                     "text": "ספר המתכונים של משפחת לוי"
//                 },
//                 "childIds": []
//             },
//             "2": {
//                 "id": 2,
//                 "parent_id": 0,
//                 "elementType": "TEXT",
//                 "style": {
//                     "order": 2,
//                     "textAlign": "center",
//                     "color": "#333333",
//                     "flexDirection": "row",
//                     "justifyContent": "flex-end",
//                     "backgroundColor": "#fff",
//                     "height": "100px",
//                     "alignItems": "center",
//                     "display": "flex"
//                 },
//                 "data": {},
//                 "childIds": [
//                     3,
//                     4,
//                     5
//                 ]
//             },
//             "3": {
//                 "id": 3,
//                 "parent_id": 2,
//                 "elementType": "IMAGE",
//                 "style": {
//                     "order": 3,
//                     "backgroundImage": "url(http://files.parsetfss.com/00da6fd8-205f-48f9-9641-bf1a19eb8070/tfss-a5d021bf-a90a-42e9-838b-579ad8b81296-image.png)",
//                     "backgroundSize": "cover",
//                     "width": "38px",
//                     "height": "38px",
//                     "marginLeft": "10px"
//                 },
//                 "data": {},
//                 "childIds": []
//             },
//             "4": {
//                 "id": 4,
//                 "parent_id": 2,
//                 "elementType": "IMAGE",
//                 "style": {
//                     "order": 1,
//                     "backgroundImage": "url(http://meatlessmonday.co.il/wp-content/uploads/2013/05/%D7%A1%D7%9C%D7%98-%…A8%D7%A4%D7%AA%D7%99-%D7%9C%D7%9C%D7%90-%D7%9E%D7%99%D7%95%D7%A0%D7%96.jpg)",
//                     "backgroundSize": "cover",
//                     "width": "80px",
//                     "height": "80px",
//                     "marginRight": "5px"
//                 },
//                 "data": {},
//                 "childIds": []
//             },
//             "5": {
//                 "id": 5,
//                 "parent_id": 2,
//                 "elementType": "VIEW",
//                 "style": {
//                     "order": 2,
//                     "flex": 1,
//                     "flexDirection": "column",
//                     "textAlign": "right",
//                     "color": "#333333",
//                     "paddingRight": "10px"
//                 },
//                 "data": {},
//                 "childIds": [
//                     6,
//                     7
//                 ]
//             },
//             "6": {
//                 "id": 6,
//                 "parent_id": 5,
//                 "elementType": "VIEW",
//                 "style": {
//                     "order": 1,
//                     "textAlign": "right",
//                     "color": "#333333",
//                     "fontSize": "20px",
//                     "fontWeight": "bold",
//                     "fontFamily": "Heebo"
//                 },
//                 "data": {
//                     "text": "סלט תפו״א של סבתא רבקה"
//                 },
//                 "childIds": []
//             },
//             "7": {
//                 "id": 7,
//                 "parent_id": 5,
//                 "elementType": "VIEW",
//                 "style": {
//                     "order": 2,
//                     "fontSize": "18px",
//                     "textAlign": "right",
//                     "color": "#333333",
//                     "fontFamily": "Heebo"
//                 },
//
//                 "data": {
//                     "text": "35 דקות הכנה | רמת קושי בינונית"
//                 },
//                 "childIds": []
//             }
//         }
//
//         deepFreeze(state);
//
//         expect(
//             reducerMany(state, {
//                 type: types.DELETE_ELEMENT,
//                 id: 2
//             })
//         ).toEqual({
//             "0": {
//                 "id": 0,
//                 "parent_id": 0,
//                 "elementType": "VIEW",
//                 "style": {
//                     "display": "flex",
//                     "order": 1,
//                     "flex": 1,
//                     "flexDirection": "column",
//                     "width": "360px",
//                     "alignItems": "stretch",
//                     "justifyContent": "flex-start"
//                 },
//
//                 "data": {},
//                 "childIds": [
//                     1
//                 ]
//             },
//             "1": {
//                 "id": 1,
//                 "parent_id": 0,
//                 "elementType": "TEXT",
//                 "style": {
//                     "order": 1,
//                     "fontSize": "20px",
//                     "textAlign": "center",
//                     "padding": "10",
//                     "fontWeight": "bold",
//                     "fontFamily": "Heebo",
//                     "backgroundColor": "#e6665d",
//                     "color": "#fff"
//                 },
//
//                 "data": {
//                     "text": "ספר המתכונים של משפחת לוי"
//                 },
//                 "childIds": []
//             }
//         })
//
//     })
//
//     it('should handle SWITCH_ELEMENT on complex structures', function () {
//
//         let state = {
//             "0": {
//                 "id": 0,
//                 "parent_id": 0,
//                 "elementType": "VIEW",
//                 "style": {
//                     "display": "flex",
//                     "order": 1,
//                     "flex": 1,
//                     "flexDirection": "column",
//                     "width": "360px",
//                     "alignItems": "stretch",
//                     "justifyContent": "flex-start"
//                 },
//
//                 "data": {},
//                 "childIds": [
//                     1,
//                     2
//                 ]
//             },
//             "1": {
//                 "id": 1,
//                 "parent_id": 0,
//                 "elementType": "TEXT",
//                 "style": {
//                     "order": 1,
//                     "fontSize": "20px",
//                     "textAlign": "center",
//                     "padding": "10",
//                     "fontWeight": "bold",
//                     "fontFamily": "Heebo",
//                     "backgroundColor": "#e6665d",
//                     "color": "#fff"
//                 },
//
//                 "data": {
//                     "text": "ספר המתכונים של משפחת לוי"
//                 },
//                 "childIds": []
//             },
//             "2": {
//                 "id": 2,
//                 "parent_id": 0,
//                 "elementType": "TEXT",
//                 "style": {
//                     "order": 2,
//                     "textAlign": "center",
//                     "color": "#333333",
//                     "flexDirection": "row",
//                     "justifyContent": "flex-end",
//                     "backgroundColor": "#fff",
//                     "height": "100px",
//                     "alignItems": "center",
//                     "display": "flex"
//                 },
//
//                 "data": {},
//                 "childIds": [
//                     3,
//                     4,
//                     5
//                 ]
//             },
//             "3": {
//                 "id": 3,
//                 "parent_id": 2,
//                 "elementType": "IMAGE",
//                 "style": {
//                     "order": 3,
//                     "backgroundImage": "url(http://files.parsetfss.com/00da6fd8-205f-48f9-9641-bf1a19eb8070/tfss-a5d021bf-a90a-42e9-838b-579ad8b81296-image.png)",
//                     "backgroundSize": "cover",
//                     "width": "38px",
//                     "height": "38px",
//                     "marginLeft": "10px"
//                 },
//
//                 "data": {},
//                 "childIds": []
//             },
//             "4": {
//                 "id": 4,
//                 "parent_id": 2,
//                 "elementType": "IMAGE",
//                 "style": {
//                     "order": 1,
//                     "backgroundImage": "url(http://meatlessmonday.co.il/wp-content/uploads/2013/05/%D7%A1%D7%9C%D7%98-%…A8%D7%A4%D7%AA%D7%99-%D7%9C%D7%9C%D7%90-%D7%9E%D7%99%D7%95%D7%A0%D7%96.jpg)",
//                     "backgroundSize": "cover",
//                     "width": "80px",
//                     "height": "80px",
//                     "marginRight": "5px"
//                 },
//
//                 "data": {},
//                 "childIds": []
//             },
//             "5": {
//                 "id": 5,
//                 "parent_id": 2,
//                 "elementType": "VIEW",
//                 "style": {
//                     "order": 2,
//                     "flex": 1,
//                     "flexDirection": "column",
//                     "textAlign": "right",
//                     "color": "#333333",
//                     "paddingRight": "10px"
//                 },
//
//                 "data": {},
//                 "childIds": [
//                     6,
//                     7
//                 ]
//             },
//             "6": {
//                 "id": 6,
//                 "parent_id": 5,
//                 "elementType": "VIEW",
//                 "style": {
//                     "order": 1,
//                     "textAlign": "right",
//                     "color": "#333333",
//                     "fontSize": "20px",
//                     "fontWeight": "bold",
//                     "fontFamily": "Heebo"
//                 },
//
//                 "data": {
//                     "text": "סלט תפו״א של סבתא רבקה"
//                 },
//                 "childIds": []
//             },
//             "7": {
//                 "id": 7,
//                 "parent_id": 5,
//                 "elementType": "VIEW",
//                 "style": {
//                     "order": 2,
//                     "fontSize": "18px",
//                     "textAlign": "right",
//                     "color": "#333333",
//                     "fontFamily": "Heebo"
//                 },
//
//                 "data": {
//                     "text": "35 דקות הכנה | רמת קושי בינונית"
//                 },
//                 "childIds": []
//             }
//         }
//
//         deepFreeze(state);
//
//         expect(
//             reducerMany(state, {
//                 type: types.SWITCH_ELEMENTS_ORDER,
//                 id1: 6,
//                 id2: 7
//             })
//         ).toEqual({
//             "0": {
//                 "id": 0,
//                 "parent_id": 0,
//                 "elementType": "VIEW",
//                 "style": {
//                     "display": "flex",
//                     "order": 1,
//                     "flex": 1,
//                     "flexDirection": "column",
//                     "width": "360px",
//                     "alignItems": "stretch",
//                     "justifyContent": "flex-start"
//                 },
//
//                 "data": {},
//                 "childIds": [
//                     1,
//                     2
//                 ]
//             },
//             "1": {
//                 "id": 1,
//                 "parent_id": 0,
//                 "elementType": "TEXT",
//                 "style": {
//                     "order": 1,
//                     "fontSize": "20px",
//                     "textAlign": "center",
//                     "padding": "10",
//                     "fontWeight": "bold",
//                     "fontFamily": "Heebo",
//                     "backgroundColor": "#e6665d",
//                     "color": "#fff"
//                 },
//
//                 "data": {
//                     "text": "ספר המתכונים של משפחת לוי"
//                 },
//                 "childIds": []
//             },
//             "2": {
//                 "id": 2,
//                 "parent_id": 0,
//                 "elementType": "TEXT",
//                 "style": {
//                     "order": 2,
//                     "textAlign": "center",
//                     "color": "#333333",
//                     "flexDirection": "row",
//                     "justifyContent": "flex-end",
//                     "backgroundColor": "#fff",
//                     "height": "100px",
//                     "alignItems": "center",
//                     "display": "flex"
//                 },
//
//                 "data": {},
//                 "childIds": [
//                     3,
//                     4,
//                     5
//                 ]
//             },
//             "3": {
//                 "id": 3,
//                 "parent_id": 2,
//                 "elementType": "IMAGE",
//                 "style": {
//                     "order": 3,
//                     "backgroundImage": "url(http://files.parsetfss.com/00da6fd8-205f-48f9-9641-bf1a19eb8070/tfss-a5d021bf-a90a-42e9-838b-579ad8b81296-image.png)",
//                     "backgroundSize": "cover",
//                     "width": "38px",
//                     "height": "38px",
//                     "marginLeft": "10px"
//                 },
//
//                 "data": {},
//                 "childIds": []
//             },
//             "4": {
//                 "id": 4,
//                 "parent_id": 2,
//                 "elementType": "IMAGE",
//                 "style": {
//                     "order": 1,
//                     "backgroundImage": "url(http://meatlessmonday.co.il/wp-content/uploads/2013/05/%D7%A1%D7%9C%D7%98-%…A8%D7%A4%D7%AA%D7%99-%D7%9C%D7%9C%D7%90-%D7%9E%D7%99%D7%95%D7%A0%D7%96.jpg)",
//                     "backgroundSize": "cover",
//                     "width": "80px",
//                     "height": "80px",
//                     "marginRight": "5px"
//                 },
//
//                 "data": {},
//                 "childIds": []
//             },
//             "5": {
//                 "id": 5,
//                 "parent_id": 2,
//                 "elementType": "VIEW",
//                 "style": {
//                     "order": 2,
//                     "flex": 1,
//                     "flexDirection": "column",
//                     "textAlign": "right",
//                     "color": "#333333",
//                     "paddingRight": "10px"
//                 },
//
//                 "data": {},
//                 "childIds": [
//                     6,
//                     7
//                 ]
//             },
//             "6": {
//                 "id": 6,
//                 "parent_id": 5,
//                 "elementType": "VIEW",
//                 "style": {
//                     "order": 2,
//                     "textAlign": "right",
//                     "color": "#333333",
//                     "fontSize": "20px",
//                     "fontWeight": "bold",
//                     "fontFamily": "Heebo"
//                 },
//
//                 "data": {
//                     "text": "סלט תפו״א של סבתא רבקה"
//                 },
//                 "childIds": []
//             },
//             "7": {
//                 "id": 7,
//                 "parent_id": 5,
//                 "elementType": "VIEW",
//                 "style": {
//                     "order": 1,
//                     "fontSize": "18px",
//                     "textAlign": "right",
//                     "color": "#333333",
//                     "fontFamily": "Heebo"
//                 },
//
//                 "data": {
//                     "text": "35 דקות הכנה | רמת קושי בינונית"
//                 },
//                 "childIds": []
//             }
//         })
//
//     })
//
//     it('should not DELETE_ELEMENT on root', function () {
//
//         let state = {
//             '1': {
//                 id: 1,
//                 parent_id: -1,
//                 elementType: 'view',
//                 style: {color: 'green'},
//                 childIds: [2]
//             },
//             '2': {
//                 id: 2,
//                 parent_id: 1,
//                 elementType: 'text',
//                 style: {color: 'green'},
//                 childIds: []
//             }
//         }
//
//         deepFreeze(state);
//
//         expect(
//             reducerMany(state, {
//                 type: types.DELETE_ELEMENT,
//                 id: 1
//             })
//         ).toEqual({
//             '1': {
//                 id: 1,
//                 parent_id: -1,
//                 elementType: 'view',
//                 style: {color: 'green'},
//                 childIds: [2]
//             },
//             '2': {
//                 id: 2,
//                 parent_id: 1,
//                 elementType: 'text',
//                 style: {color: 'green'},
//                 childIds: []
//             }
//         })
//
//     })
//
//     it('should handle APPLY_STYLE for multiple attributes', function () {
//
//         let state = {
//             '1': {
//                 id: 1,
//                 parent_id: 2,
//                 elementType: 'view',
//                 style: {color: 'green'},
//                 childIds: []
//             },
//             '2': {
//                 id: 2,
//                 parent_id: 3,
//                 elementType: 'text',
//                 style: {color: 'green'},
//                 childIds: [1]
//             },
//             '3': {
//                 id: 3,
//                 parent_id: 4,
//                 elementType: 'text',
//                 style: {color: 'green'},
//                 childIds: [2]
//             },
//             '4': {
//                 id: 4,
//                 parent_id: 0,
//                 elementType: 'text',
//                 style: {color: 'green'},
//                 childIds: [3]
//             }
//         };
//
//         deepFreeze(state);
//
//         expect(
//             reducerMany(state,
//                 {
//                     id: 4,
//                     type: types.APPLY_STYLE,
//                     style: {color: 'red', padding: '15px'}
//                 })
//         ).toEqual(
//             {
//                 '1': {
//                     id: 1,
//                     parent_id: 2,
//                     elementType: 'view',
//                     style: {color: 'green'},
//                     childIds: [],
//                     data: {}
//                 },
//                 '2': {
//                     id: 2,
//                     parent_id: 3,
//                     elementType: 'text',
//                     style: {color: 'green'},
//                     childIds: [1],
//                     data: {}
//                 },
//                 '3': {
//                     id: 3,
//                     parent_id: 4,
//                     elementType: 'text',
//                     style: {color: 'green'},
//                     childIds: [2],
//                     data: {}
//                 },
//                 '4': {
//                     id: 4,
//                     parent_id: 0,
//                     elementType: 'text',
//                     style: {color: 'red', padding: '15px'},
//                     childIds: [3],
//                     data: {}
//                 }
//             }
//         )
//
//     })
//
//     it('should handle APPLY_DATA for multiple attributes', function () {
//
//         let state = {
//             '1': {
//                 id: 1,
//                 parent_id: 2,
//                 elementType: 'view',
//                 style: {color: 'green'},
//                 childIds: []
//             },
//             '2': {
//                 id: 2,
//                 parent_id: 3,
//                 elementType: 'text',
//                 style: {color: 'green'},
//                 childIds: [1]
//             },
//             '3': {
//                 id: 3,
//                 parent_id: 4,
//                 elementType: 'text',
//                 style: {color: 'green'},
//                 childIds: [2]
//             },
//             '4': {
//                 id: 4,
//                 parent_id: 0,
//                 elementType: 'text',
//                 style: {color: 'green'},
//                 childIds: [3],
//                 data: {data: 'before', dataId: 'name'}
//             }
//         };
//
//         deepFreeze(state);
//
//         expect(
//             reducerMany(state,
//                 {
//                     id: 4,
//                     type: types.APPLY_DATA,
//                     data: {data: 'Yes!'}
//                 })
//         ).toEqual(
//             {
//                 '1': {
//                     id: 1,
//                     parent_id: 2,
//                     elementType: 'view',
//                     style: {color: 'green'},
//                     childIds: [],
//                     data: {}
//                 },
//                 '2': {
//                     id: 2,
//                     parent_id: 3,
//                     elementType: 'text',
//                     style: {color: 'green'},
//                     childIds: [1],
//                     data: {}
//                 },
//                 '3': {
//                     id: 3,
//                     parent_id: 4,
//                     elementType: 'text',
//                     style: {color: 'green'},
//                     childIds: [2],
//                     data: {}
//                 },
//                 '4': {
//                     id: 4,
//                     parent_id: 0,
//                     elementType: 'text',
//                     style: {color: 'green'},
//                     childIds: [3],
//                     data: {data: 'Yes!', dataId: 'name'}
//                 }
//             }
//         )
//
//     })
//
//     it('should handle PREVIEW_STYLE for multiple attributes', function () {
//
//         let state = {
//             '1': {
//                 id: 1,
//                 parent_id: 2,
//                 elementType: 'view',
//                 style: {color: 'green'},
//                 childIds: []
//             },
//             '2': {
//                 id: 2,
//                 parent_id: 3,
//                 elementType: 'text',
//                 style: {color: 'green'},
//                 childIds: [1]
//             },
//             '3': {
//                 id: 3,
//                 parent_id: 4,
//                 elementType: 'text',
//                 style: {color: 'green'},
//                 childIds: [2]
//             },
//             '4': {
//                 id: 4,
//                 parent_id: 0,
//                 elementType: 'text',
//                 style: {color: 'green'},
//                 childIds: [3]
//             }
//         };
//
//         deepFreeze(state);
//
//         expect(
//             reducerMany(state,
//                 {
//                     id: 4,
//                     type: types.PREVIEW_STYLE,
//                     style: {color: 'red', padding: '15px'}
//                 })
//         ).toEqual(
//             {
//                 '1': {
//                     id: 1,
//                     parent_id: 2,
//                     elementType: 'view',
//                     style: {color: 'green'},
//                     childIds: [],
//                     data: {}
//                 },
//                 '2': {
//                     id: 2,
//                     parent_id: 3,
//                     elementType: 'text',
//                     style: {color: 'green'},
//                     childIds: [1],
//                     data: {}
//                 },
//                 '3': {
//                     id: 3,
//                     parent_id: 4,
//                     elementType: 'text',
//                     style: {color: 'green'},
//                     childIds: [2],
//                     data: {}
//                 },
//                 '4': {
//                     id: 4,
//                     parent_id: 0,
//                     elementType: 'text',
//                     style: {color: 'red', padding: '15px'},
//                     childIds: [3],
//                     data: {}
//                 }
//             }
//         )
//
//     })
//
//     it('should handle REPLACE_ELEMENT', function () {
//
//         let state = {
//             '1': {
//                 id: 1,
//                 parent_id: 2,
//                 elementType: 'view',
//                 style: {color: 'green'},
//                 childIds: []
//             },
//             '2': {
//                 id: 2,
//                 parent_id: 3,
//                 elementType: 'text',
//                 style: {color: 'green'},
//                 childIds: [1]
//             },
//             '3': {
//                 id: 3,
//                 parent_id: 4,
//                 elementType: 'text',
//                 style: {color: 'green'},
//                 childIds: [2]
//             },
//             '4': {
//                 id: 4,
//                 parent_id: 0,
//                 elementType: 'text',
//                 style: {color: 'green', padding: '10px'},
//                 childIds: [3]
//             }
//         };
//
//         deepFreeze(state);
//
//         expect(
//             reducerMany(state,
//                 {
//                     id: 4,
//                     type: types.REPLACE_ELEMENT,
//                     parent_id: 0,
//                     elementType: 'view',
//                     style: {color: 'white'},
//                     data: {}
//                 })
//         ).toEqual(
//             {
//                 '1': {
//                     id: 1,
//                     parent_id: 2,
//                     elementType: 'view',
//                     style: {color: 'green'},
//                     childIds: [],
//                     data: {}
//                 },
//                 '2': {
//                     id: 2,
//                     parent_id: 3,
//                     elementType: 'text',
//                     style: {color: 'green'},
//                     childIds: [1],
//                     data: {}
//                 },
//                 '3': {
//                     id: 3,
//                     parent_id: 4,
//                     elementType: 'text',
//                     style: {color: 'green'},
//                     childIds: [2],
//                     data: {}
//                 },
//                 '4': {
//                     id: 4,
//                     parent_id: 0,
//                     elementType: 'view',
//                     style: {color: 'white', padding: '10px'},
//                     childIds: [],
//                     data: {}
//                 }
//             }
//         )
//
//     })
//
//     it('should handle REPLACE_ELEMENT with Order', function () {
//
//         let state = {
//             '1': {
//                 id: 1,
//                 parent_id: 2,
//                 elementType: 'view',
//                 style: {color: 'green', order: 1},
//                 childIds: [5, 6]
//             },
//             '2': {
//                 id: 2,
//                 parent_id: 3,
//                 elementType: 'view',
//                 style: {order: 1},
//                 childIds: [1]
//             },
//             '3': {
//                 id: 3,
//                 parent_id: 4,
//                 elementType: 'view',
//                 style: {order: 1},
//                 childIds: [2]
//             },
//             '4': {
//                 id: 4,
//                 parent_id: 0,
//                 elementType: 'view',
//                 style: {order: 1},
//                 childIds: [3]
//             },
//             '5': {
//                 id: 5,
//                 parent_id: 1,
//                 elementType: 'text',
//                 style: {color: 'green', padding: '10px', order: 1},
//                 childIds: []
//             },
//             '6': {
//                 id: 6,
//                 parent_id: 1,
//                 elementType: 'text',
//                 style: {color: 'green', padding: '10px', order: 2},
//                 childIds: []
//             }
//         };
//
//         deepFreeze(state);
//
//         expect(
//             reducerMany(state,
//                 {
//                     id: 5,
//                     type: types.REPLACE_ELEMENT,
//                     parent_id: 1,
//                     elementType: 'view',
//                     style: {color: 'white', order: 3},
//                     data: {}
//                 })
//         ).toEqual(
//             {
//                 '1': {
//                     id: 1,
//                     parent_id: 2,
//                     elementType: 'view',
//                     style: {color: 'green', order: 1},
//                     childIds: [5, 6],
//                     data: {}
//                 },
//                 '2': {
//                     id: 2,
//                     parent_id: 3,
//                     elementType: 'view',
//                     style: {order: 1},
//                     childIds: [1],
//                     data: {}
//                 },
//                 '3': {
//                     id: 3,
//                     parent_id: 4,
//                     elementType: 'view',
//                     style: {order: 1},
//                     childIds: [2],
//                     data: {}
//                 },
//                 '4': {
//                     id: 4,
//                     parent_id: 0,
//                     elementType: 'view',
//                     style: {order: 1},
//                     childIds: [3],
//                     data: {}
//                 },
//                 '5': {
//                     id: 5,
//                     parent_id: 1,
//                     elementType: 'view',
//                     style: {color: 'white', padding: '10px', order: 1},
//                     childIds: [],
//                     data: {}
//                 },
//                 '6': {
//                     id: 6,
//                     parent_id: 1,
//                     elementType: 'text',
//                     style: {color: 'green', padding: '10px', order: 2},
//                     childIds: [],
//                     data: {}
//                 }
//             }
//         )
//
//     })
//
//     it('should handle REPLACE_ELEMENT with subview', function () {
//
//         let state = {
//             '1': {
//                 id: 1,
//                 parent_id: 2,
//                 elementType: 'view',
//                 style: {color: 'green', order: 1},
//                 childIds: [5, 6]
//             },
//             '2': {
//                 id: 2,
//                 parent_id: 3,
//                 elementType: 'view',
//                 style: {order: 1},
//                 childIds: [1]
//             },
//             '3': {
//                 id: 3,
//                 parent_id: 4,
//                 elementType: 'view',
//                 style: {order: 1},
//                 childIds: [2]
//             },
//             '4': {
//                 id: 4,
//                 parent_id: 0,
//                 elementType: 'view',
//                 style: {order: 1},
//                 childIds: [3]
//             },
//             '5': {
//                 id: 5,
//                 parent_id: 1,
//                 elementType: 'text',
//                 style: {color: 'green', padding: '10px', order: 1},
//                 childIds: []
//             },
//             '6': {
//                 id: 6,
//                 parent_id: 1,
//                 elementType: 'text',
//                 style: {color: 'green', padding: '10px', order: 2},
//                 childIds: []
//             }
//         };
//
//         deepFreeze(state);
//
//         expect(
//             reducerMany(state,
//                 {
//                     id: 5,
//                     type: types.REPLACE_ELEMENT,
//                     parent_id: 1,
//                     elementType: 'view',
//                     style: {color: 'white', order: 3},
//                     data: {}
//                 })
//         ).toEqual(
//             {
//                 '1': {
//                     id: 1,
//                     parent_id: 2,
//                     elementType: 'view',
//                     style: {color: 'green', order: 1},
//                     childIds: [5, 6],
//                     data: {}
//                 },
//                 '2': {
//                     id: 2,
//                     parent_id: 3,
//                     elementType: 'view',
//                     style: {order: 1},
//                     childIds: [1],
//                     data: {}
//                 },
//                 '3': {
//                     id: 3,
//                     parent_id: 4,
//                     elementType: 'view',
//                     style: {order: 1},
//                     childIds: [2],
//                     data: {}
//                 },
//                 '4': {
//                     id: 4,
//                     parent_id: 0,
//                     elementType: 'view',
//                     style: {order: 1},
//                     childIds: [3],
//                     data: {}
//                 },
//                 '5': {
//                     id: 5,
//                     parent_id: 1,
//                     elementType: 'view',
//                     style: {color: 'white', padding: '10px', order: 1},
//                     childIds: [],
//                     data: {}
//                 },
//                 '6': {
//                     id: 6,
//                     parent_id: 1,
//                     elementType: 'text',
//                     style: {color: 'green', padding: '10px', order: 2},
//                     childIds: [],
//                     data: {}
//                 }
//             }
//         )
//
//     })
//
//     it('should handle CLEAR_ELEMENTS', function () {
//
//         let state = {
//             '1': {
//                 id: 1,
//                 parent_id: 2,
//                 elementType: 'view',
//                 style: {color: 'green', order: 1},
//                 childIds: [5, 6]
//             },
//             '2': {
//                 id: 2,
//                 parent_id: 3,
//                 elementType: 'view',
//                 style: {order: 1},
//                 childIds: [1]
//             },
//             '3': {
//                 id: 3,
//                 parent_id: 4,
//                 elementType: 'view',
//                 style: {order: 1},
//                 childIds: [2]
//             },
//             '4': {
//                 id: 4,
//                 parent_id: 0,
//                 elementType: 'view',
//                 style: {order: 1},
//                 childIds: [3]
//             },
//             '5': {
//                 id: 5,
//                 parent_id: 1,
//                 elementType: 'text',
//                 style: {color: 'green', padding: '10px', order: 1},
//                 childIds: []
//             },
//             '6': {
//                 id: 6,
//                 parent_id: 1,
//                 elementType: 'text',
//                 style: {color: 'green', padding: '10px', order: 2},
//                 childIds: []
//             }
//         };
//
//         deepFreeze(state);
//
//         expect(
//             reducerMany(state,
//                 {
//                     type: types.CLEAR_ELEMENTS,
//                 })
//         ).toEqual({})
//
//     })
//
//
// })
//
//
//
//
