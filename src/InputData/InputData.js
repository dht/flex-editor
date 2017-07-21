import React from 'react';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';

export default class InputData extends React.Component {

    constructor(props) {
        super(props);

        const root = props.data || {},
            {content, dataTemplate} = root;

        this.state = {
            content,
            dataTemplate,
            isTemplate: !!dataTemplate,
        }

        this.keyDown = this.keyDown.bind(this);
        this.focus = this.focus.bind(this);
        this.injectData = this.injectData.bind(this);
        this.applyData = this.applyData.bind(this);
        this.clearData = this.clearData.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.focus();
    }

    componentWillReceiveProps(props) {
        const root = props.data || {},
            {content, dataTemplate} = root;

        if (content && this.state.content !== content && this.state.lastContent !== content ) {
            this.setState({
                content,
                lastContent: content
            });
            this.focus();
        }

        if (dataTemplate && this.state.dataTemplate !== dataTemplate) {
            this.setState({
                dataTemplate,
                isTemplate: !!dataTemplate,
            });
            this.focus();
        }
    }

    clearData() {
        this.props.applyDataToSelected({
            dataTemplate: '',
        });

        this.setState({
            dataTemplate: '',
            isTemplate: false,
        });

        this.focus();
    }

    focus() {
        setTimeout(() => {
            this._input.focus();
            this._input.select();
        }, 50);
    }

    applyData() {
        const {content, dataTemplate, isTemplate} = this.state;

        let output = {};

        if (isTemplate) {
            output.dataTemplate = dataTemplate;
        } else {
            output.content = content;
        }

        this.props.applyDataToSelected(output);
        this.props.onDone();
    }

    keyDown(ev) {
        switch (ev.keyCode) {
            case 13:
                this.applyData();
                break;
            case 27:
                this.props.onDone();
                break;
        }
    }

    injectData(index) {
        let {content = '', dataTemplate = ''} = this.state;

        if (index === 'CLEAR') {
            this.clearData();
            return;
        }

        if (!dataTemplate) {
            dataTemplate = content;
        }

        dataTemplate += `[recipes.${index}]`;

        this.setState({dataTemplate, isTemplate: true});
    }

    renderDataInjector() {
        return this.props.showDataButtons ?
            <IconButton iconStyle={styles.buttonWhite}
                        onClick={this.props.showDataFieldModal}
                        style={ styles.buttonWrapper }
                        title="Create field name"
                        iconClassName="material-icons">
                more_vert
            </IconButton> : null;
    }

    onChange(event) {
        const {isTemplate} = this.state;

        this.setState(isTemplate ?
            {dataTemplate: event.target.value} :
            {content: event.target.value});
    }

    renderTextInput() {
        const {selectedElement = {}} = this.props;
        const {content, dataTemplate, isTemplate} = this.state;
        const {elementType} = selectedElement;

        return <TextField
            inputStyle={styles.textInput}
            ref={(c) => this._input = c}
            style={styles.text}
            floatingLabelText={this.props.data.dataField ? this.props.data.dataField : 'Value'}
            hintStyle={ styles.textHint }
            hintText={ elementType === 'TEXT' ? 'Enter text' : 'Enter an image URL' }
            value={ isTemplate ? dataTemplate : content }
            onKeyDown={ this.keyDown }
            onChange={ this.onChange }
        />
    }

    render() {

        return (
            <div style={ styles.container }>

                {
                    this.renderTextInput()
                }

                <IconButton iconStyle={styles.buttonWhite}
                            onClick={this.applyData}
                            style={ styles.buttonWrapper }
                            title="Save value (Enter)"
                            iconClassName="material-icons">
                    done
                </IconButton>

                <IconButton iconStyle={styles.buttonWhite} onClick={this.props.onDone}
                            style={ styles.buttonWrapper }
                            iconClassName="material-icons">
                    close
                </IconButton>

                {
                    this.renderDataInjector()
                }

            </div>
        );
    }

    unstable_handleError(e){
        console.log('inputData error -> ', e);
    }
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '5px',
        paddingRight: '0',
    },
    buttonWrapper: {
        padding: 0,
        margin: 0,
        width: '30px',
        height: '30px',
    },
    buttonWhite: {
        padding: '5px 0',
        margin: 0,
        width: '30px',
        height: '30px',
        fontSize: '18px',
        color: '#333',
    },
    textInput: {
        fontSize: '14px',
    },
    text: {
        position:'relative',
        top:-13,
    },
    textHint: {}
}