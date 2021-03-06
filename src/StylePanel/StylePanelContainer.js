import {connect} from 'react-redux'
import AttributePanel from 'style-panel/StylePanel'
import {getItem} from 'lpm-core'
import actions from 'lpm-core'
import {refreshSelector} from 'lpm-core';

import {getFlexState} from '../reducers/utils';

const mapStateToProps = (state, ownProps) => {

    state = getFlexState(state);
    const {elementSelection, attributeSelection, navigateAttributes, appState} = state,
        {colors, fonts} = appState;

    const selectedElement = getItem(state.elements.present,elementSelection.id) || {},
        {style} = selectedElement;

    return {
        styleId: elementSelection.id,
        elementStyle: style || {},
        iconName: 'text_format',  // select_all, text_format, image, view_column
        colors,
        fonts,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {

    return {
        previewStyle: (style) => {
            const {elementId} = ownProps;
            dispatch(actions.previewStyle(elementId, style))
            dispatch(refreshSelector(20));
        },
        applyStyle: (style) => {
            const {elementId} = ownProps;

            dispatch(actions.applyStyle(elementId, style))
            dispatch(refreshSelector(20));
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AttributePanel)

