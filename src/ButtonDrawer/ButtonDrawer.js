import React from 'react';
import InputSectionFlex from '../InputSectionFlex';
import FlexStateButton from './FlexStateButton';

export default class ButtonDrawer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open:false
        }
    }

    render() {
        const {open} = this.state;
        const {elementStyle, isAlignItems} = this.props;

        return (
            <div style={styles.container}>
                <div style={{...styles.down, width: open ? '136px': 0}}>
                    <InputSectionFlex isAlignItems={isAlignItems}/>
                </div>
                <div style={styles.up} onClick={() => this.setState({open:!open})}>
                    <FlexStateButton
                        elementStyle={elementStyle}
                        isAlignItems={isAlignItems}
                    />
                </div>
            </div>
        );
    }
}

const styles = {
    container: {
        width: '30px',
        height: '28px',
        backgroundColor: '#fff',
        textAlign: 'center',
        position: 'relative',
    },
    down: {
        transition:'width 0.15s ease-in-out',
        position: 'absolute',
        overflow: 'hidden',
        height: '27px',
        border:'1px solid gray',
        borderLeft:'none',
        left: '28px',
    },
    buttons: {
        width: '300px',
        height: '27px',
        position: 'absolute',
        justifyContent: 'flex-end',
        right: '-300px',
        top: 0,
    },
    up: {
        position: 'absolute',
        height: '30px',
    }
}