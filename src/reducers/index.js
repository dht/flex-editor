import {combineReducers} from 'redux'

import appState from './appState/appState'

// import elements from './elements/elements'
// import elementSelection from './elementSelection/elementSelection'

import elements from 'lpm-core/reducers/elements/elements'
import elementSelection from 'lpm-core/reducers/elementSelection/elementSelection'
import clipboard from 'lpm-core/reducers/clipboard/clipboard'

import attributeSelection from './attributeSelection/attributeSelection'

const reduxApp = combineReducers({
    appState,
    elements,
    elementSelection,
    clipboard,
    attributeSelection,
})

export default reduxApp