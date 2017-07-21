import {createStore, applyMiddleware, compose} from 'redux'
import ReduxThunk from 'redux-thunk'

import holoApp from './reducers';

export default createStore(holoApp, compose(applyMiddleware(ReduxThunk), //autosave
    window.devToolsExtension ? window.devToolsExtension() : f => f)); // logger , firebase, recorder ,autosave

