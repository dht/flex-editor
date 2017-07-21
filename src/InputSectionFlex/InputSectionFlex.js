import React from 'react';
import Icons from '../_icons';
import IconButton from 'material-ui/IconButton';

export default class InputSectionFlex extends React.Component {

    constructor(props) {
        super(props);
    }


    renderLine(options, which) {
        const {isParentRow, parentId} = this.props;

        return options.map(option => {

            const IconSet = Icons[isParentRow ? 'row' : 'col'];

            if (!IconSet[which] || !IconSet[which][option]) {
                return null;
            }

            const Icon = IconSet[which][option];

            let style = {};
            style[which] = option;

            return <IconButton
                key={option}
                tooltip={`${which} ${option}`}
                style={styles.button}
                onClick={() => this.props.applyStyleParent(parentId, style)}
            >
                <Icon width={27} height={27}/>
            </IconButton>
        });

    }

    render() {
        const alignItems_options = ['flex-start', 'center', 'flex-end', 'stretch', 'baseline'],
            justifyContent_options = ['flex-start', 'center', 'flex-end', 'space-between', 'space-around'];

        return (
            <div style={ styles.container }>
                <div style={ styles.row }>
                    {
                        this.props.isAlignItems ?
                            this.renderLine(alignItems_options, 'alignItems') :
                            this.renderLine(justifyContent_options, 'justifyContent')
                    }
                </div>
            </div>
        );
    }
}

const styles = {
    container: {
        fontFamily: 'Source Sans Pro, sans-serif',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'flex-end',
        padding: '0px 0',
    },
    button: {
        padding: 0,
        margin: 0,
        width: 27,
        height: 27,
    }
}


