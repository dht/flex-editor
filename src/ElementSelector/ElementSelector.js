import React from 'react';
import ReactDOM from 'react-dom';
import InputData from '../InputData/InputDataContainer';
import MarginHelper from './MarginHelper';
import {addEvent, removeEvent} from '../_utils/dom';

export default class ElementSelector extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            top: 0,
            left: 0,
            width: 0,
            height: 0,
            type: 'RESIZE'
        }

        this.onDragStart = this.onDragStart.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.onDrag = this.onDrag.bind(this);
        this.renderMarginHelper = this.renderMarginHelper.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.renderSouth = this.renderSouth.bind(this);
        this.renderHandlers = this.renderHandlers.bind(this);
        this.renderHandler = this.renderHandler.bind(this);
        this.cornerSize = this.cornerSize.bind(this);
        this.getComputedStyle = this.getComputedStyle.bind(this);
        this.calculateCurrentValues = this.calculateCurrentValues.bind(this);
        this.getValue = this.getValue.bind(this);
    }

    getComputedStyle(property){
        const {elementSelection} = this.props;
        const elementDom = document.querySelector(`#element-${elementSelection.id}`);

        if (!elementDom) {
            return null;
        }

        return getComputedStyle(elementDom).getPropertyValue(property);
    }

    componentWillReceiveProps(props) {
        const {rect} = props;

        if (rect.left - 1 != this.state.left ||
            rect.top - 1 != this.state.top ||
            rect.width != this.state.width ||
            rect.height != this.state.height
        ) {
            this.setState({
                top: rect.top - 1,
                left: rect.left - 1,
                width: rect.width,
                height: rect.height,
            })
        }
    }

    handleScroll() {
        const {element} = this.props;

        clearTimeout(this._timeout);

        this.setState({hidden: true});

        this._timeout = setTimeout(() => {
            this.props.refreshSelector(element);
            setTimeout(() => {
                this.setState({hidden: false});
            }, 100);
        }, 150);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    renderDataWrapper() {
        const isMobile = (this.props.appType === 'MOBILE');
        let webStyle = isMobile ? {} : {left: 'auto', marginLeft: 'auto'};

        const {top, left, width, height} = this.state;
        const {elementSelection, showAttributePopover} = this.props;

        if (!showAttributePopover) {
            return;
        }

        return <div style={{...styles.dataWrapper, top: top + height + 20, ...webStyle}}>
            <div style={{...styles.triangle, left: left + (width / 2), top: top + height + 22,}}>
                <div style={styles.triangle1}></div>
                <div style={styles.triangle2}></div>
            </div>

            <InputData createDataField={this.props.createDataField} elementId={ elementSelection.id }
                       appType={ this.props.appType }/>
        </div>
    }

    calculateCurrentValues(which, isPadding) {
        const text = this.whichToText(which).toLowerCase(),
            name = isPadding ? `padding-${text}` : `margin-${text}`;

        const starting_value = parseInt(this.getComputedStyle(name), 10);

        this.setState({
            marginStartingValue: !isPadding ? starting_value : 0,
            paddingStartingValue: isPadding ? starting_value : 0,
        });
    }

    onDragStart(ev, which) {

        const {width, height} = this.state;



        if (ev.altKey) {
            const modeType = ev.shiftKey ? 'PADDING' : 'MARGIN';
            this.setState({type: modeType});
            this.calculateCurrentValues(which, ev.shiftKey);
        } else {
            this.setState({type: 'RESIZE'});
        }

        const domNode = ReactDOM.findDOMNode(this);
        const {ownerDocument} = domNode;

        this.setState({
            which,
            startWidth: width,
            startHeight: height,
            x: ev.clientX,
            y: ev.clientY,
            marginValue: 0,
            paddingValue: 0,
        });

        addEvent(ownerDocument, 'mousemove', this.onDrag);
        addEvent(ownerDocument, 'mouseup', this.onDragEnd);
    }

    whichToText(which) {
        switch (which) {
            case 'n':
                return 'Top';
            case 's':
                return 'Bottom';
            case 'e':
                return 'Right';
            case 'w':
                return 'Left';
            default:
                return '';
        }
    }

    whichToDelta(which, deltaX, deltaY) {
        switch (which) {
            case 'n':
                return deltaY;
            case 's':
                return deltaY;
            case 'e':
                return deltaX;
            case 'w':
                return deltaX;
            default:
                return Math.min(deltaX, deltaY);
        }
    }

    getValue(ev) {
        const {zoom} = this.props;
        const {x, y, startWidth, startHeight, which,
            paddingStartingValue = 0, marginStartingValue = 0} = this.state;

        let deltaX = Math.floor((ev.clientX - x) / zoom),
            deltaY = Math.floor((ev.clientY - y) / zoom);

        if (which.indexOf('n') >= 0) {
            deltaY = -deltaY;
        }

        if (which.indexOf('w') >= 0) {
            deltaX = -deltaX;
        }

        let deltaMin = Math.min(deltaX, deltaY);

        // if (which.indexOf('w') >= 0 || which.indexOf('n') >= 0) {
        // 	deltaMin = -deltaMin;
        // }

        if (which == 's' || which == 'n') {
            deltaX = 0
        }
        if (which == 'e' || which == 'w') {
            deltaY = 0
        }

        if (which.length == 2) {
            deltaX = deltaMin;
            deltaY = deltaMin;
        }

        let value = {},
            whichText = this.whichToText(which),
            theDelta = this.whichToDelta(which, deltaX, deltaY);

        switch (this.state.type) {
            case 'RESIZE':
                value = {
                    width: Math.round(startWidth + deltaX) + 'px',
                    height: Math.round(startHeight + deltaY) + 'px',
                }

                if (which == 's' || which == 'n') {
                    delete value['width'];
                }

                if (which == 'w' || which == 'e') {
                    delete value['height'];
                }

                this.setState(value);

                break;
            case 'MARGIN':
                theDelta += marginStartingValue;
                value[`margin${whichText}`] = Math.round(theDelta) + 'px';
                this.setState({marginValue: theDelta});
                break;
            case 'PADDING':
                theDelta += paddingStartingValue;
                value[`padding${whichText}`] = Math.round(theDelta) + 'px';
                this.setState({paddingValue: theDelta});
                break;
        }

        return value;
    }

    onDrag(ev) {
        const {elementSelection} = this.props;
        const value = this.getValue(ev);
        this.props.previewStyle(elementSelection.id, value);
    }

    onDragEnd(ev) {
        const domNode = ReactDOM.findDOMNode(this);
        const {ownerDocument} = domNode;

        const {elementSelection} = this.props;
        const value = this.getValue(ev);
        this.props.applyStyle(elementSelection.id, value);

        removeEvent(ownerDocument, 'mousemove', this.onDrag);
        removeEvent(ownerDocument, 'mouseup', this.onDragEnd);

        this.setState({type: 'NONE'})
    }

    renderMarginHelper() {
        const {which, marginValue, type} = this.state;

        return <MarginHelper
            which={which}
            marginValue={marginValue}
            type={type}
        />;
    }

    cornerSize() {
        const {zoom} = this.props;
        const size = Math.min(15, Math.floor(13 / zoom));

        return {width: `${size}px`, height: `${size}px`};
    }

    renderSouth() {
        return (<div>
            <div onMouseDown={(ev) => this.onDragStart(ev, 's')} style={{
                ...styles.corner, ...styles.cornerCenter, ...styles.cornerBottom,
                cursor: 's-resize'
            }}></div>
        </div>);
    }

    renderHandler(w) {
        const {readonly} = this.props;

        if (readonly) {
            return null;
        }

        let style = {};

        const cornerSize = this.cornerSize(),
            halfSize = Math.floor(cornerSize / 2);

        if (w.indexOf('n') >= 0) {
            style = {...style, bottom:'auto', top:'-5px'};
        }
        if (w.indexOf('e') >= 0) {
            style = {...style, left:'auto', right:'-5px'};
        }
        if (w.indexOf('s') >= 0) {
            style = {...style, top:'auto', bottom:'-5px'};
        }
        if (w.indexOf('w') >= 0) {
            style = {...style, right:'auto', bottom:'-5px'};
        }

        if (w==='n' || w==='s') {
            style = {...style, left:'50%', marginLeft:'-5px'};
        }

        if (w==='w' || w==='e') {
            style = {...style, top:'50%', marginTop:'-5px'};
        }

        return <div key={w}
                    onMouseDown={(ev) => this.onDragStart(ev, w)}
                    onDragStart={(ev) => {ev.preventDefault(); return false}}
             style={{
                 ...styles.corner, ...styles.cornerLeft, ...styles.cornerTop,
                 cursor: `${w}-resize`, ...style, ...cornerSize
             }}></div>
    }
    renderHandlers() {
        const {elementSelection = {}} = this.props;


        if (elementSelection.id === 1) {
            return this.renderSouth();
        }

        return ['nw','n','ne','e','se','s','sw','w']
            .map(w => this.renderHandler(w));
    }

    render() {

        const {hidden} = this.state;

        if (hidden || !this.props.showSelection) {
            return null;
        }

        return (
            <div
                style={{...styles.container, ...this.state}}>
                {
                    this.renderHandlers()
                }
                {
                    this.renderMarginHelper()
                }
                {
                    this.renderDataWrapper()
                }
            </div>
        );
    }

    unstable_handleError(e){
        console.log('elementSelector error -> ', e);
    }
}

const stylesBig = {
    zoom: 1,
    container: {
        position: 'fixed',
        border: '1px solid red',
        // boxShadow: '0 0 5px rgba(255,255,255,0.6)',
        pointerEvents: 'none',
        zIndex: 900,
    },
    corner: {
        // display: 'none',
        opacity: 1,
        position: 'absolute',
        left: '0px',
        top: '0px',
        width: '8px',
        height: '8px',
        border: '1px solid rgba(0,0,0,0.8)',
        borderRadius: '2px',
        backgroundColor: 'rgba(255,255,255,1)',
        boxSizing: 'border-box',
        pointerEvents: 'all',
    },
    cornerTop: {
        top: '-5px',
        bottom: 'auto',
    },
    cornerRight: {
        right: '-5px',
        left: 'auto',
    },
    cornerBottom: {
        bottom: '-5px',
        top: 'auto',
    },
    cornerLeft: {
        left: '-5px',
        right: 'auto',
    },
    cornerCenter: {
        left: '50%',
        right: 'auto',
        marginLeft: '-5px',
    },
    cornerMiddle: {
        top: '50%',
        bottom: 'auto',
        marginTop: '-5px',
    },
    dataWrapper: {
        position: 'fixed',
        top: '100px',
        width: '300px',
        height: '70px',
        border: '1px solid gray',
        backgroundColor: 'white',
        left: '815px',
        marginLeft: '-155px',
        bottom: '-100px',
        boxShadow: '0 0 10px rgba(0,0,0,0.2)',
        borderRadius: '3px',
        padding: '5px 15px',
        zIndex: 999,
        pointerEvents: 'all',
    },
    triangle: {
        position: 'fixed',
    },
    triangle1: {
        width: 0,
        height: 0,
        borderLeft: '10px solid transparent',
        borderRight: '10px solid transparent',
        borderBottom: '10px solid #333',
        position: 'absolute',
        top: '-11px',
        left: '50%',
        marginLeft: '-10px',
    },
    triangle2: {
        width: 0,
        height: 0,
        borderLeft: '10px solid transparent',
        borderRight: '10px solid transparent',
        borderBottom: '10px solid white',
        position: 'absolute',
        top: '-10px',
        left: '50%',
        marginLeft: '-10px',
    },

}

const stylesSmall = {
    zoom: 1,
    container: {
        position: 'fixed',
        border: '1px solid red',
        // boxShadow: '0 0 5px rgba(255,255,255,0.6)',
        pointerEvents: 'none',
        zIndex: 900,
    },
    corner: {
        // display: 'none',
        opacity: 1,
        position: 'absolute',
        left: '0px',
        top: '0px',
        width: '10px',
        height: '10px',
        border: '2px solid rgba(0,0,0,0.8)',
        borderRadius: '2px',
        backgroundColor: 'rgba(255,255,255,1)',
        boxSizing: 'border-box',
        pointerEvents: 'all',
    },
    cornerTop: {
        top: '-7px',
        bottom: 'auto',
    },
    cornerRight: {
        right: '-7px',
        left: 'auto',
    },
    cornerBottom: {
        bottom: '-7px',
        top: 'auto',
    },
    cornerLeft: {
        left: '-7px',
        right: 'auto',
    },
    cornerCenter: {
        left: '50%',
        right: 'auto',
        marginLeft: '-5px',
    },
    cornerMiddle: {
        top: '50%',
        bottom: 'auto',
        marginTop: '-5px',
    },
    dataWrapper: {
        position: 'fixed',
        top: '100px',
        width: '300px',
        height: '70px',
        border: '1px solid gray',
        backgroundColor: 'white',
        left: '580px',
        marginLeft: '-155px',
        bottom: '-100px',
        boxShadow: '0 0 10px rgba(0,0,0,0.2)',
        borderRadius: '3px',
        padding: '5px 15px',
        zIndex: 999,
        pointerEvents: 'all',
    },
    triangle: {
        position: 'fixed',
    },
    triangle1: {
        width: 0,
        height: 0,
        borderLeft: '10px solid transparent',
        borderRight: '10px solid transparent',
        borderBottom: '10px solid #333',
        position: 'absolute',
        top: '-11px',
        left: '50%',
        marginLeft: '-10px',
    },
    triangle2: {
        width: 0,
        height: 0,
        borderLeft: '10px solid transparent',
        borderRight: '10px solid transparent',
        borderBottom: '10px solid white',
        position: 'absolute',
        top: '-10px',
        left: '50%',
        marginLeft: '-10px',
    },

}

const bigScreen = window.innerHeight > 750;
const styles = bigScreen ? stylesBig : stylesSmall;
