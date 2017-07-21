import React from 'react';
import InfiniteSurface from '../InfiniteSurface';
import ToolsPanel from '../ToolsPanel';
import Phone from '../Phone';
import StylePanel from '../StylePanel';
import Tree from '../Tree';
import ButtonDrawer from '../ButtonDrawer';
import Drawer from 'material-ui-extensions/Drawer';
import Tabs from '../Tree/inner';
import MessagePanel from '../MessagePanel';
import PropTypes from 'prop-types';

import {bigScreen} from '../_utils/utils';

import KeyHandler, {KEYDOWN, KEYPRESS} from 'react-key-handler';

export default class FlexEditor extends React.Component {

    static propTypes = {
        /**
         * array of colors
         */
        colors: PropTypes.array,
    }

    static defaultProps = {}

    constructor(props) {
        super(props);

        this.state = {
            highlighted: 5,
            backgroundColor: '#f3f3f3', //'#222935'
            focusOnElementSelector: null,
            colors: null,
            fonts: null
        }

        this.paste = this.paste.bind(this);

        this.renderKeyHandlers = this.renderKeyHandlers.bind(this);
        this.renderKeyHandlersNav = this.renderKeyHandlersNav.bind(this);
        this.rendersToolsPanel = this.rendersToolsPanel.bind(this);
        this.renderButtonsPanel = this.renderButtonsPanel.bind(this);
        this.renderStylePanel = this.renderStylePanel.bind(this);
        this.renderTreeDrawer = this.renderTreeDrawer.bind(this);

        this.switchColor = this.switchColor.bind(this);

        this.focusOnCommander = this.focusOnCommander.bind(this);
    }

    setColorsAndFonts(props) {
        const {colors, fonts} = props;

        if (colors && this.state.colors !== colors) {
            this.props.setColors(colors);
            this.setState({colors});
        }

        if (fonts && this.state.fonts !== fonts) {
            this.props.setFonts(fonts);
            this.setState({fonts});
        }
    }

    paste(ev) {
        this.props.checkPaste(ev);
    }


    componentDidMount() {
        const {darkula, showDataButtons} = this.props;

        this.setColorsAndFonts(this.props);
        this.switchColor(darkula);

        document.addEventListener('paste', this.paste);

        this.props.toggleDataButtons(showDataButtons);
    }

    componentWillReceiveProps(props) {
        const {darkula} = this.props;

        this.setColorsAndFonts(props);
        this.switchColor(darkula);
    }

    componentWillUnmount() {
        document.removeEventListener('paste', this.paste);
    }

    focusOnRoot() {
        this.setState({focusOnElementSelector: '#element-1'});
    }

    focusOnCommander(e) {
        e.preventDefault();
        document.querySelector('input[placeholder="attribute [shift]"]').focus();
    }

    switchColor(darkula) {
        this.setState({
            backgroundColor: darkula ? '#222935' : '#f3f3f3'
        });
    }

    renderKeyHandlers() {
        const {readonly} = this.props;

        if (readonly) {
            return null;
        }

        return <div>
            <KeyHandler keyEventName={KEYDOWN} keyValue="Tab" onKeyHandle={this.props.toggleDrawer}/>
            <KeyHandler keyEventName={KEYDOWN} keyValue="Shift" onKeyHandle={this.focusOnCommander}/>
            <KeyHandler keyEventName={KEYDOWN} keyValue="Backspace" onKeyHandle={this.props.remove}/>
            <KeyHandler keyEventName={KEYDOWN} keyValue="c" onKeyHandle={this.props.checkCopy}/>
            <KeyHandler keyEventName={KEYDOWN} keyValue="v" onKeyHandle={this.props.checkPaste}/>
        </div>
    }

    renderKeyHandlersNav() {
        return <div>
            <KeyHandler keyEventName={KEYDOWN} keyValue="ArrowUp" onKeyHandle={this.props.arrowUp}/>
            <KeyHandler keyEventName={KEYDOWN} keyValue="ArrowLeft" onKeyHandle={this.props.arrowLeft}/>
            <KeyHandler keyEventName={KEYDOWN} keyValue="ArrowDown" onKeyHandle={this.props.arrowDown}/>
            <KeyHandler keyEventName={KEYDOWN} keyValue="ArrowRight" onKeyHandle={this.props.arrowRight}/>
        </div>
    }

    rendersToolsPanel() {
        const {readonly} = this.props;

        if (readonly) {
            return null;
        }

        return <div style={styles.toolsPanel}>
            <ToolsPanel
                onAddPlaceholder={this.props.onAddPlaceholder}
                onAddText={this.props.onAddText}
                onAddImage={this.props.onAddImage}
                onAddVerticalView={this.props.onAddVerticalView}
                onAddHorizontalView={this.props.onAddHorizontalView}
                onAddDevider={this.props.onAddDevider}
            />
        </div>
    }

    renderButtonsPanel() {
        const {selectedElementParent = {}, readonly} = this.props;
        const parentStyle = selectedElementParent.style;

        if (readonly) {
            return null;
        }

        return <div style={styles.buttonsPanel}>
            <ButtonDrawer elementStyle={ parentStyle } isAlignItems={true}/>
            <ButtonDrawer elementStyle={ parentStyle } isAlignItems={false}/>
        </div>
    }

    renderStylePanel() {
        const {selectedElement = {}, readonly} = this.props;
        const {style = {}} = selectedElement;

        return <div style={styles.attributesPanel}>
            <StylePanel
                readonly={readonly}
                elementStyle={ style }
                elementId={ selectedElement.id }
            />
        </div>
    }

    renderTreeDrawer() {
        const {readonly, drawerOpen, hideTreeTabs} = this.props;
        const {highlighted} = this.state;

        return <Drawer
            drawerOpen={drawerOpen}
            flex={false}
            left={false}
            drawerStyle={{padding: '0px'}}
            width={300}
            toggle={ this.props.toggleDrawer}>
            <Tree
                readonly={readonly}
                highlighted={ highlighted }
                onHighlight={ id => this.setState({highlighted: id}) }
                id={1}/>

            {!hideTreeTabs ?
                <div style={styles.treeToggleLinks}>
                    <Tabs />
                </div> : null}
        </Drawer>
    }

    render() {
        const {width = 320, height = 300, screenHeight, readonly} = this.props;

        const startingCanvasPosition = bigScreen ?
            {x: 300, y: 160, zoom: 1.1} :
            {x: 100, y: 100, zoom: 1.0};

        return (
            <div style={styles.container}>

                {this.renderKeyHandlers()}
                {this.renderKeyHandlersNav()}
                {this.rendersToolsPanel()}
                {this.renderButtonsPanel()}
                {this.renderStylePanel()}
                {this.renderTreeDrawer()}

                <InfiniteSurface
                    focusOnElementSelector={this.state.focusOnElementSelector}
                    startingPosition={startingCanvasPosition}
                    backgroundColor={this.state.backgroundColor}
                    refreshSelector={() => this.props.refreshSelector()}
                    modeCleared={() => this.props.showSelection(true)}
                    modeMoveEnter={() => this.props.showSelection(false)}
                    willZoom={() => this.props.showSelection(false)}
                    didZoom={() => this.props.showSelection(true)}
                    undo={this.props.undo}
                    setZoom={this.props.setZoom}
                    height={height}
                >
                    <div style={styles.phone}>
                        <div style={styles.dimensions}>
                            {width} x {parseInt(screenHeight, 10)}px
                        </div>
                        <Phone
                            readonly={readonly}
                            screenWidth={width}
                            screenHeight={height}
                        />
                    </div>
                </InfiniteSurface>


                <MessagePanel />

            </div>
        );
    }

    unstable_handleError(e) {
        console.log('flexEditor error -> ', e);
    }
}


const styles = {
    container: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
    },
    toolsPanel: {
        position: 'absolute',
        top: '0',
        left: '530px',
        height: '50px',
        width: '245px',
        zIndex: 1000,
        backgroundColor: 'white',
    },
    buttonsPanel: {
        position: 'absolute',
        left: 0,
        bottom: '100px',
        width: '30px',
        zIndex: 1000,
        backgroundColor: 'white',
    },
    attributesPanel: {
        width: '400px',
        position: 'absolute',
        top: 0,
        left: 0,
        marginLeft: '60px',
        zIndex: 999,
        backgroundColor: 'white',
        boxShadow: '0 0 5px rgba(0,0,0,0.1)',
        borderRadius: '1px',
    },
    phone: {},
    dimensions: {
        color: 'gray',
        paddingBottom: '3px',
        fontSize: '10px',
        position: 'absolute',
        top: '-20px',
        left: '0',
    },
    treeToggleLinks: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '45px',
    },
    lightButton: {
        backgroundColor: 'rgb(236, 236, 236)',
        border: '1px solid gray',
        width: '27px',
        height: '27px',
        textAlign: 'center',
        cursor: 'default',
    },
    lightIcon: {
        position: 'relative',
        top: '3px',
        fontSize: '22px',
        cursor: 'default',
    },
}

