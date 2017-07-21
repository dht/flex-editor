import React from 'react';
import DropDownIconButton from '../DropDownIconButton/DropDownIconButton';
import IconButton from 'material-ui/IconButton';

const ToolsPanel = (props) => <div style={styles.container}>
    <IconButton iconStyle={props.white ? styles.buttonWhite : styles.button} onClick={props.onAddText} title="Add text"
                iconClassName="material-icons">
        text_format
    </IconButton>
    <IconButton iconStyle={props.white ? styles.buttonWhite : styles.button} onClick={props.onAddImage}
                title="Add image"
                iconClassName="material-icons">
        image
    </IconButton>
    <DropDownIconButton white={ props.white} iconName={'view_column'} title="Add vertical view"
                        items={[{1: 'one column'}, {2: 'two columns'}, {3: 'three columns'}, {4: 'four columns'}, {5: 'five columns'}, {99: 'given sizes'}]}
                        menuClick={index => props.onAddHorizontalView(index)}>
    </DropDownIconButton>

    <DropDownIconButton white={ props.white} iconName={'view_stream'} title="Add horizontal view"
                        items={[{1: 'one row'}, {2: 'two rows'}, {3: 'three rows'}, {4: 'four rows'}, {5: 'five rows'}, {99: 'given sizes'}]}
                        menuClick={index => props.onAddVerticalView(index)}>
    </DropDownIconButton>


    <IconButton iconStyle={props.white ? styles.buttonWhite : styles.button} onClick={props.onAddPlaceholder}
                title="Add placeholder"
                iconClassName="material-icons">
        select_all
    </IconButton>
</div>;


const styles = {
    container: {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        height: '50px',
        boxShadow: '0 0 5px rgba(0,0,0,0.1)',
        borderRadius: '1px',
        zIndex: 999,
    },
    button: {
        color: '#000',
    },
    buttonWhite: {
        color: 'white',
    },
}

export default ToolsPanel;