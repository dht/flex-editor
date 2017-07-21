import React from 'react';
import IconButton from 'material-ui/IconButton';

const VersioningBar = (props) => <div style={styles.container}>
    <IconButton iconStyle={props.white ? styles.buttonWhite : styles.button}
                style={props.white ? styles.buttonWhite : styles.button}
                onClick={props.clear} title="Clear snippet"
                iconClassName="material-icons">
        refresh
    </IconButton>
    <IconButton
        iconStyle={props.white ? styles.buttonWhite : styles.button}
        onClick={props.publish}
        style={props.white ? styles.buttonWhite : styles.button}
        title="Publish new version"
        iconClassName="material-icons">
        publish
    </IconButton>
    <IconButton iconStyle={props.white ? styles.buttonWhite : styles.button}
                style={props.white ? styles.buttonWhite : styles.button}
                onClick={props.loadVersion}
                title="Load version"
                iconClassName="material-icons">
        list
    </IconButton>

    <IconButton iconStyle={props.white ? styles.buttonWhite : styles.button}
                style={props.white ? styles.buttonWhite : styles.button}
                onClick={props.importVersion}
                title="Import from snippet"
                iconClassName="material-icons">
        import_export
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

export default VersioningBar;