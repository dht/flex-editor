import {connect} from 'react-redux';
import ToolsPanel from './ToolsPanel';
import {refreshSelector} from '../reducers/elementSelection/elementSelection_actions';

import actions from '../reducers/elements/elements_actions'

const mapStateToProps = (state, ownProps) => {
	return {

	}
}

const mapDispatchToProps = (dispatch, ownProps) => {

	return {
		white: ownProps.white,
		onAddPlaceholder: () => {

			if (ownProps.onAddPlaceholder) {
				ownProps.onAddPlaceholder();
				return;
			}

			dispatch(actions.addPlaceholder());
			dispatch(refreshSelector(20));

		},
		onAddText: () => {

            if (ownProps.onAddText) {
                ownProps.onAddText();
                return;
            }

            dispatch(actions.addText());
			dispatch(refreshSelector(20));

		},
		onAddImage: () => {

            if (ownProps.onAddImage) {
                ownProps.onAddImage();
                return;
            }

            dispatch(actions.addImage());
			dispatch(refreshSelector(200));

		},

		onAddVerticalView: (rows) => {

            if (ownProps.onAddVerticalView) {
                ownProps.onAddVerticalView(rows);
                return;
            }

            if (rows == 99) {
				let sizes = prompt("Enter sizes:");
				dispatch(actions.addVerticalViewBySizes(sizes.split(',')));
				dispatch(refreshSelector(20));
				return;
			}

			dispatch(actions.addVerticalView(rows));

		},
		onAddHorizontalView: (columns) => {

            if (ownProps.onAddHorizontalView) {
                ownProps.onAddHorizontalView(columns);
                return;
            }

            if (columns == 99) {
				let sizes = prompt("Enter sizes:");
				dispatch(actions.addHorizontalViewBySizes(sizes.split(',')));
				dispatch(refreshSelector(20));
				return;
			}

			dispatch(actions.addHorizontalView(columns));

		},
        onAddDevider: () => {
            if (ownProps.onAddDevider) {
                ownProps.onAddDevider();
                return;
            }

            dispatch(actions.addDivider());
            dispatch(refreshSelector(20));
		},
        onAddSnippet: () => {
            if (ownProps.onAddSnippet) {
                ownProps.onAddSnippet();
                return;
            }

            dispatch(actions.addSnippet());
            dispatch(refreshSelector(20));
        }

	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ToolsPanel)

