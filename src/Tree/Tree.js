import React from 'react'
import TreeContainer from './TreeContainer';
import TextField from 'material-ui/TextField';

import insertCss from 'insert-css';
import {TreeModes} from '../reducers/appState/appState';

insertCss('.hoverTree:hover {color: #333;background-color: rgba(0, 0, 0, 0.1); }');

export default class Tree extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            editMode: false,
            tempTag: ''
        };

        this.highlight = this.highlight.bind(this);
        this.startEditMode = this.startEditMode.bind(this);
        this.exitEditMode = this.exitEditMode.bind(this);
        this.keyDown = this.keyDown.bind(this);
        this.rename = this.rename.bind(this);

        //console.log('props -> ', props);
    }

    renderChild = (id, childId) => (
        <TreeContainer key={childId} id={childId}
                       focusElementId={ this.props.focusElementId }
                       readonly={ this.props.readonly }
                       highlighted={ this.props.highlighted }
                       onHighlight={ this.props.onHighlight }/>
    )

    getNestedItems = (id, childIds) => {
        var childItems = []

        childIds = childIds.sort(id => {

        })

        for (var i = 0; i < childIds.length; i++) {
            var child = this.renderChild(id, childIds[i])
            childItems.push(child)
        }


        return childItems
    }

    shouldComponentUpdate() {
        //console.log('shouldComponentUpdate -> ', true);

        return true;
    }

    text(elementType) {
        if (!elementType) {
            return '';
        }

        return elementType.toUpperCase().substr(0, 1) + elementType.toLowerCase().substr(1);
    }

    style() {
        if (this.props.selected) {
            return {
                color: 'brown',
            }
        }
    }

    iconByElementType() {
        switch (this.props.elementType) {
            case 'PLACEHOLDER':
                return 'select_all';
            case 'TEXT':
                return 'text_format';
            case 'IMAGE':
                return 'image';
            case 'VIEW':
                return 'view_column';
        }
    }


    //<i className="material-icons">visibility</i>

    highlight(ev, id) {

        ev.stopPropagation();

        this.props.onHighlight(id);
    }

    color(main = '#333') {
        return {
            color: this.props.selected ? 'brown' : main
        }
    }

    startEditMode() {
        if (this.props.readonly) {
            return;
        }

        if (this.props.treeMode === TreeModes.MODE_TOGGLE) {
            this.props.toggleVisibility(this.props.highlighted);
            return;
        }

        this.setState({editMode: true});

        setTimeout(() => {
            this._input.focus();
            this._input.select();
        }, 100);
    }

    exitEditMode() {
        this.setState({editMode: false});
    }

    rename() {
        const value = this._input.input.value;

        switch (this.props.treeMode) {
            case TreeModes.MODE_ELEMENTS:
                this.props.rename(this.props.id, value);
                return;

            case TreeModes.MODE_CLASSES:
                if (value !== 'none') {
                    this.props.applyClass(this.props.id, value);
                }
                break;

            case TreeModes.MODE_TAGS:
                this.props.renameTag(this.props.id, value);
                break;

            case TreeModes.MODE_TOGGLE:
                break;
        }
    }

    keyDown(ev) {
        switch (ev.keyCode) {
            case 13:
                this.rename();
                this.exitEditMode();
                break;
        }
    }

    render() {
        const {roles, focusElementId, highlighted, data = {}, resolution} = this.props;
        let {editMode} = this.state;
        const {isClosed} = data;

        let childItems = []
        if (this.props.childIds) {
            childItems = this.getNestedItems(this.props.id, this.props.childIds)
        }

        let title = this.text(this.props.elementType) + ' ' + this.props.id;

        if (data && data.role && roles && roles.ROLES) {
            title = roles.ROLES[data.role];
        }

        switch (this.props.treeMode) {
            case TreeModes.MODE_ELEMENTS:
                if (data && data.layer) {
                    title = data.layer;
                }
                break;

            case TreeModes.MODE_CLASSES:
                title = data.className || 'none';
                break;

            case TreeModes.MODE_TAGS:
                title = data.tag || 'div';
                break;

            case TreeModes.MODE_TOGGLE:
                if (data && data.layer) {
                    title = data.layer;
                }
                break;
        }


        return (
            <div style={ styles.container } className="hoverTree"
                 onMouseOver={ (ev) => this.highlight(ev, this.props.id)}
                 onClick={ev => this.props.onClick(ev, this.props.id, this.props.parent_id, this.props.elementType)}>
                <div style={{...styles.innerContainer, ...this.color()}} title={ `Element #${this.props.id}` }>


                    {this.props.elementType === 'VIEW' ?
                        <i className="material-icons"
                           onClick={ () => this.props.expand(this.props.id, !isClosed) }>{isClosed ? 'chevron_right' : 'expand_more'}</i> :
                        null
                    }

                    {this.props.elementType !== 'VIEW' ?
                        <i style={{...styles.icon, ...this.color()}}
                           className="material-icons icon">{this.iconByElementType()}</i> :
                        null
                    }

                    {!editMode ? <div>{ title }</div> :
                        <div>
                            <TextField
                                id="tag"
                                inputStyle={styles.textInput}
                                ref={(c) => this._input = c}
                                style={styles.text}
                                fullWidth={true}
                                hintStyle={ styles.textHint }
                                defaultValue={title}
                                onBlur={ this.exitEditMode }
                                onKeyDown={ (e) => this.keyDown(e) }
                            />
                        </div>}

                    {!this.props.readonly && !this.state.editMode && this.props.highlighted === this.props.id ?
                        <i style={ styles.edit } className="material-icons"
                           onClick={ this.startEditMode }>{this.props.treeMode != TreeModes.MODE_TOGGLE ? 'mode_edit' : 'visibility'}</i> :
                        null
                    }
                </div>

                {isClosed ? null : childItems}
            </div>
        )
    }

    unstable_handleError(e){
        console.log('Tree error -> ', e);
    }
}


const styles = {
    container: {
        paddingLeft: '24px',
        cursor: 'pointer',
        fontFamily: 'Source Sans Pro, sans-serif',
        color: '#333',
        lineHeight: '26px',
    },
    edit: {
        fontSize: '14px',
        padding: '2px',
        marginLeft: '10px',
    },
    icon: {
        fontSize: '1.4em',
        top: '1px',
        marginRight: '4px',
        position: 'relative',
    },
    innerContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        fontSize: '14px',
    },
}
