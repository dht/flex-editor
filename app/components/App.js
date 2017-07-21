import React from 'react';
import FlexEditor from '../../src/FlexEditor';

import './App.scss';

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {}

        this.keyDown = this.keyDown.bind(this);
    }

    keyDown(e) {
        if (e.which === 192) {
            this.props.resetScreen();
        }
    }

    componentDidMount() {
        window.addEventListener('keydown', this.keyDown);

        setTimeout(() => {
            this.setState({
                colors: [{color: '#060', title: 'green'}],
                fonts: [{value: "Tisa Pro, Tisa OT, serif", title: "Tisa Pro"}]
            })
        }, 2000);

      this.props.runActions();
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.keyDown);
    }

    render() {
        const {colors, fonts} = this.state;

        return (<div style={ styles.container }>
                <FlexEditor
                    readonly={false}
                    colors={colors}
                    fonts={fonts}
                    width={1000}
                    height={600}
                    showDataButtons={true}/>
            </div>
        );
    }
}

const styles = {
    container: {
        position: 'fixed',
        top: '50px',
        left: '50px',
        right: '50px',
        bottom: '50px',
        border:'1px solid gray',
    }
}