import React from 'react';
import IconButton from 'material-ui/IconButton';
import {TreeModes} from '../../reducers/appState/appState';

export default class Tabs extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        const {treeMode} = this.props;

        return (
            <div style={styles.container}>
                <IconButton
                    iconClassName="material-icons"
                    iconStyle={{color: treeMode === TreeModes.MODE_ELEMENTS ?'#333' : '#999'}}
                    onClick={() => this.props.select(TreeModes.MODE_ELEMENTS)}
                    tooltip="Show names"
                >
                    list
                </IconButton>
                <IconButton
                    iconClassName="material-icons"
                    iconStyle={{color: treeMode === TreeModes.MODE_TOGGLE ?'#333' : '#999'}}
                    onClick={() => this.props.select(TreeModes.MODE_TOGGLE)}
                    tooltip="Show visibility"
                >
                    radio_button_checked
                </IconButton>
                <IconButton
                    iconClassName="material-icons"
                    iconStyle={{color: treeMode === TreeModes.MODE_TAGS ?'#333' : '#999'}}
                    onClick={() => this.props.select(TreeModes.MODE_TAGS)}
                    tooltip="Show tags"
                >
                    code
                </IconButton>
                <IconButton
                    iconClassName="material-icons"
                    iconStyle={{color: treeMode === TreeModes.MODE_CLASSES ?'#333' : '#999'}}
                    onClick={() => this.props.select(TreeModes.MODE_CLASSES)}
                    tooltip="Show classes"
                >
                    style
                </IconButton>
            </div>
        );
    }
}

const styles = {
    container: {
        height: '45px',
        borderTop: '1px solid #eee',
        backgroundColor: '#f3f3f3',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
    },
}