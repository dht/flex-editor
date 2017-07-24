import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {Router, Route, hashHistory} from 'react-router'
import store from './store';

import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './components/AppContainer'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import actions from '../src/reducers/elements/elements_actions';

injectTapEventPlugin();

let rootElement;

const onEnter = () => {
    store.dispatch(actions.resetScreen());

    setTimeout(() => {
    	store.dispatch(actions.applyDataFieldForCurrentElement('hello'));
    	store.dispatch(actions.applyStyleFieldForCurrentElement('color1', 'backgroundColor'));
    	store.dispatch(actions.applyStyleFieldForCurrentElement('color2', 'color'));
    	store.dispatch(actions.applyStyleFieldForCurrentElement('height', 'height'));
    	store.dispatch(actions.applyStyleFieldForCurrentElement('fontFamily', 'fontFamily'));
    	store.dispatch(actions.applyStyleFieldForCurrentElement('', 'fontFamily'));
	}, 3000);
}

const renderStore = () => {
	rootElement = document.getElementById('root')

	render(
		<MuiThemeProvider>
		<div className="root">
				<Provider store={store}>
					<Router history={ hashHistory }
							routes={[{path: '/', component: App, onEnter: onEnter}]}/>
				</Provider>
			</div>
			</MuiThemeProvider>
		,
		rootElement
	);
}

renderStore();
