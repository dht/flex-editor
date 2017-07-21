import React from 'react';
import {getIcon} from '../_icons';

export default class FlexStateButton extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    componentDidMount() {
    }


    render() {
        const {elementStyle = {}, isAlignItems} = this.props;

        const Icon = getIcon(elementStyle, isAlignItems);

        return (
         <div style={styles.container}>
             <Icon width={27} height={27}/>
         </div>
        );
    }
}

const styles = {
    container: {
        border:'1px solid gray',
        height:'27px',
    }
}