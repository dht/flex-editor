import React from 'react';
import IconButton from 'material-ui/IconButton';

const AdhocBar = (props) => <div style={styles.container}>
    <IconButton iconStyle={props.white ? styles.buttonWhite : styles.button}
                style={props.white ? styles.buttonWhite : styles.button}
                onClick={props.clear} title="Clear snippet"
                iconClassName="material-icons">
        refresh
    </IconButton>
        <IconButton
            iconStyle={props.white ? styles.buttonWhite : styles.button}
            onClick={props.duplicate}
            style={props.white ? styles.buttonWhite : styles.button}
            title="Duplicate this layout"
            iconClassName="material-icons">
            call_split
        </IconButton>
</div>;


const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        height: '50px',
        backgroundColor: 'white',
        boxShadow: '0 0 5px rgba(0,0,0,0.1)',
        borderRadius: '1px',
        zIndex: '999',
    },
    button: {
        color: '#000',
    },
    buttonWhite: {
        color: 'white',
    },
}

export default AdhocBar;