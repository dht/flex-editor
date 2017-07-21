import React from 'react';
import IconButton from 'material-ui/IconButton';

export const OverlayControls = (props) => <div style={styles.container}>
    <IconButton iconStyle={styles.icon}
                style={styles.button}
                onClick={() => props.toggleOverlay()}
                title="Toggle overlay"
                iconClassName="material-icons">
        {props.show ? 'radio_button_checked' : 'radio_button_unchecked'}
    </IconButton>
    <IconButton iconStyle={styles.icon}
                style={styles.button}
                onClick={() => props.changeOverlayOpacity(-0.1)}
                title="Decrease overlay's opacity"
                iconClassName="material-icons">
        remove
    </IconButton>
    <IconButton iconStyle={styles.icon}
                style={styles.button}
                onClick={() => props.changeOverlayVerPosition(-5)}
                title="Show source"
                iconClassName="material-icons">
        keyboard_arrow_up
    </IconButton>
    <IconButton iconStyle={styles.icon}
                style={styles.button}
                onClick={() => props.changeOverlayOpacity(+0.1)}
                title="Increase overlay's opacity"
                iconClassName="material-icons">
        add
    </IconButton>
    <br />
    <IconButton iconStyle={styles.icon}
                style={styles.button}
                onClick={() => props.resetOverlay()}
                title="Remove overlay"
                iconClassName="material-icons">
        close
    </IconButton>
    <IconButton iconStyle={styles.icon}
                style={styles.button}
                onClick={() => props.changeOverlayHorPosition(-5)}
                title="Move overlay left"
                iconClassName="material-icons">
        keyboard_arrow_left
    </IconButton>
    <IconButton iconStyle={styles.icon}
                style={styles.button}
                onClick={() => props.changeOverlayVerPosition(+5)}
                title="Move overlay down"
                iconClassName="material-icons">
        keyboard_arrow_down
    </IconButton>
    <IconButton iconStyle={styles.icon}
                style={styles.button}
                onClick={() => props.changeOverlayHorPosition(+5)}
                title="Move overlay right"
                iconClassName="material-icons">
        keyboard_arrow_right
    </IconButton>
</div>;


const styles = {
    container:{
        height: '60px',
        width: '116px',
        borderRight: '1px solid gray',
        marginRight: '20px',
    },
    button: {
        border: '1px solid gray',
        borderRight: 'none',
        borderBottom: 'none',
        backgroundColor: '#ECECEC',
        width: '29px',
        height: '29px',
        padding: 0,
    },
    buttonOn: {
        backgroundColor: '#ccc',
    },
    menuItem: {},
    icon: {
        fontSize: '20px',
    },
    buttonBig: {
        border: '1px solid gray',
        borderRight: 'none',
        borderBottom: 'none',
        backgroundColor: '#ECECEC',
        width: '40px',
        height: '40px',
        padding: 0,
    },
    iconBig: {
        fontSize: '23px',
    },
    iconSmall: {
        fontSize: '23px',
    }
}

export default OverlayControls;