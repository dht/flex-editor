import React from 'react';
import IconButton from 'material-ui/IconButton';

export const ResolutionSelector = (props) => <div style={styles.container}>
    <IconButton iconStyle={styles.icon}
                style={{...styles.button, ...props.resolution === 1 ? styles.buttonOn : null}}
                onClick={() => props.changeResolution(1, props.isProject)}
                title="Mobile"
                iconClassName="material-icons">
        filter_1
    </IconButton>
    <IconButton iconStyle={styles.icon}
                style={{...styles.button, ...props.resolution === 2 ? styles.buttonOn : null}}
                onClick={() => props.changeResolution(2, props.isProject)}
                title="1024px screen"
                iconClassName="material-icons">
        filter_2
    </IconButton>
    <br />
    <IconButton iconStyle={styles.icon}
                style={{...styles.button, ...props.resolution === 3 ? styles.buttonOn : null}}
                onClick={() => props.changeResolution(3, props.isProject)}
                title="1280px screen"
                iconClassName="material-icons">
        filter_3
    </IconButton>
    <IconButton iconStyle={styles.icon}
                style={{...styles.button, ...props.resolution === 4 ? styles.buttonOn : null}}
                onClick={() => props.changeResolution(4, props.isProject)}
                title="1440px screen"
                iconClassName="material-icons">
        filter_4
    </IconButton>
</div>;

const styles = {
    container: {
        height: '60px',
        borderRight: '1px solid gray',
        width: '58px',
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

export default ResolutionSelector;