import {combineReducers} from 'redux'

import appState from './appState/appState'
import elements from './elements/elements'
import elementSelection from './elementSelection/elementSelection'
import attributeSelection from './attributeSelection/attributeSelection'

const reduxApp = combineReducers({
    appState,
    elements,
    elementSelection,
    attributeSelection,
})

export default reduxApp