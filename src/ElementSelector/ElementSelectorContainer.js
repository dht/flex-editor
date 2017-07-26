import { connect } from 'react-redux'
import ElementSelector from './ElementSelector'
import actions, { refreshSelector } from 'lpm-core'
import {getFlexState} from '../reducers/utils';

const mapStateToProps = (state, ownProps) => {

	state = getFlexState(state);
	const { elementSelection, appState } = state;
	const { showAttributePopover, showSelection, zoom } = appState;
	const { rect } = elementSelection;

	return {
		elementSelection,
		rect,
        zoom,
		showAttributePopover,
        showSelection,
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {

	return {
		previewStyle: (elementId, style) => {
			dispatch(actions.previewStyle(elementId, style));
			dispatch(refreshSelector());
		},
		applyStyle: (elementId, style) => {
			dispatch(actions.applyStyle(elementId, style));
			dispatch(refreshSelector());
		},
		refreshSelector: () => {
			dispatch(refreshSelector());
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ElementSelector)