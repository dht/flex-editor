# Flex-Editor
A complete layout editor for[React](http://facebook.github.io/react/).

## Installation

flex-editor is available as an [npm package](https://www.npmjs.org/package/flex-editor).

```sh
npm install flex-editor
```

## Example
[https://dht.github.io/flex-editor](https://dht.github.io/flex-editor)

## Usage

Here is a quick example to get you started:

**Import**
```jsx
 import FlexEditor from 'flex-editor/FlexEditor';
```

**Add to reducers**
```jsx
import flexState from 'flex-editor/reducers';
 
const reduxApp = combineReducers({
   flexState,
   /// ...other reducers
});
 
export default reduxApp;

```

**Simple**
```jsx 
<div style={{position: 'fixed',top: 0,left: 0,right: 0,bottom: 0}}>
    <FlexEditor
        colors={[{color: '#060', title: 'green'}]}
        fonts={[{value: "Tisa Pro, Tisa OT, serif", title: "Tisa Pro"}]}
        width={1000}
        height={600}
        showDataButtons={true}/>
</div>
```

**API**
Flex-editor holds its state in a[Redux](http://redux.js.org/) store. 
To access the store you can use the following API methods:
 
 ```jsx 
import * as api from 'flex-editor';

 ```
 #### Properties
 
 | Property             | Description                                   |
 | -------------------- | --------------------------------------------- |
 | flexState            | The combined reduces of flex-editor           |
 | ElementTypes         | eNum of element Types (image, text...)        |
 | ActionTypesElements  | Get the action types in the element reducer   |
 | ActionTypesAppState  | Get the action types in the appState reducer  |
 
 #### Method
 
 | Method                              | Description                                   |
 | ----------------------------------- | --------------------------------------------- | 
 | clearFieldModal()                   | Hides the field modal                         |
 | configOverlay(options)              | Sets the overlay image                        |
 |                                     | {url: url, width: width, height: height}      |
 | changeOverlayVerPosition(delta)     | Nudges the vertical position by X px          |                                            
 | changeOverlayHorPosition(delta)     | Nudges the horizontal position by X px        |                                            
 | changeOverlayOpacity(opacity)       | Changes the opacity to X                      |                                            
 | toggleOverlay()                     | Show/hides overlay                            |                                            
 | resetOverlay()                      | Clears overlay configuration                  |                                            
 | addUIMessage(message, isSticky)     | Adds a user message                           |                                            
 | clearUIMessages()                   | Clears UI message                             |                                            
 | setResolution(resolution)           | Set appState to  a certain resolution (1-4)   |                                            
 | addView(data)                       | Add a view to current position with data      |                                            
 | addElement(...args)                 | Add an element to current position with data  |                                            
 |                                     | args: elementType, parent_id, style, data     |                                            
 | setElements(elements)               | Set the editor's initial elements             |                                            
 | resetScreen()                       | Resets editor's content to initial state      |                                            
 | setDataField(fieldName, fieldType)  | Set field variable for selected element       |                                            
 | setStyleField(fieldName, cssKey)    | Set style variable for selected element       |                                            
 | loadResolution(resolution)          | Load styles of a certain resolution (1-4)     |                                            
 | loadResolution(resolution)          | Load styles of a certain resolution (1-4)     |                                            
 | applyClass(element_id, className)   | Applies a className for a certain element     |                                            
 | applyVars(element_id, key, value)   | Merges a variable key with new json value     |                                            
 | applyContent(element_id, content)   | Sets an element's content                     |                                            
 | refreshSelector(delay?)             | Refreshes the selector's box                  |                                            
 | setSelectedElement(...args)         | Set a selected element                        |                                            
 |                                     | args: id, parent_id, elementType              |                                            

## Contribution
To run locally install all the dependencies:

dev:
```sh
npm install
```

peer:
```sh
npm install react@^15.4.1 react-dom@^15.4.1 material-ui@^0.18.6 redux@^3.6.0 redux-thunk@^2.1.0 react-redux@^4.4.6 react-tap-event-plugin@^2.0.0
```

run with npm:
```sh
npm start
```
and open:[http://localhost:3000](http://localhost:3000)

first test was added as a starting point:
```sh
npm test
```
We need to understand how to trigger long key presses and mouse moves in **enzyme** to further test this component. 
Any contributions are welcomed. 


## License
This project is licensed under the terms of the
[MIT license](https://github.com/quickstudio/flex-editor/blob/master/LICENSE)
