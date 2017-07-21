import React from 'react';
import IconButton from 'material-ui/IconButton';

export const ModalsToolbar = (props) =><div style={styles.container}>
            <IconButton iconStyle={styles.iconBig}
                        style={styles.buttonBig}
                        onClick={props.showCustomCssModal} title="Custom CSS"
                        iconClassName="material-icons">
                style
            </IconButton>
            <IconButton iconStyle={styles.iconBig}
                        style={styles.buttonBig}
                        onClick={props.cropOverlay} title="Crop overlay"
                        iconClassName="material-icons">
                crop
            </IconButton>
            <IconButton iconStyle={styles.iconBig}
                        style={styles.buttonBig}
                        onClick={props.showExportModal} title="Show source"
                        iconClassName="material-icons">
                code
            </IconButton>
        </div>


const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        width: '120px',
        borderRight: '1px solid gray',
        height: '40px',
        marginTop: '20px',
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

export default ModalsToolbar;