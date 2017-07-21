import { connect } from 'react-redux'
import ElementSelector from './ElementSelector'
import { previewStyle, applyStyle } from '../reducers/elements/elements_actions'
import { refreshSelector } from '../reducers/elementSelection/elementSelection_actions'
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
			dispatch(previewStyle(elementId, style));
			dispatch(refreshSelector());
		},
		applyStyle: (elementId, style) => {
			dispatch(applyStyle(elementId, style));
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