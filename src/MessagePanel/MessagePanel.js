import React from 'react';

export default class MessagePanel extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            message: '',
            show: false,
            lastMessageId:0
        }

        this.hideInXSeconds = this.hideInXSeconds.bind(this);
        this.showMessage = this.showMessage.bind(this);
    }

    hideInXSeconds(seconds) {
        clearTimeout(this._timeout);

        this._timeout = setTimeout(() => {
            this.setState({
                show:false
            });
        }, seconds * 1000)
    }

    showMessage(msg) {
        const {id, message = '', isSticky} = msg;

        clearTimeout(this._timeout);

        this.setState({
            lastMessageId: id,
            message: message,
            show:true
        });

        if (!isSticky) {
            this.hideInXSeconds(4);
        }
    }

    componentWillReceiveProps(props) {
        const {lastMessageId} = this.state;

        const {uiMessages = []} = props,
            count = uiMessages.length,
            lastOne = uiMessages[count - 1] || {},
            lastOneId = lastOne.id;

        if (lastOneId > lastMessageId) {
            this.showMessage(lastOne)
        }
    }

    render() {
        const {message, show} = this.state;

        return (
         <div style={{...styles.container, bottom: show ? 0 : '-50px' }}>
             {message}
         </div>
        );
    }

    unstable_handleError(e){
        console.log('MessagePanel error -> ', e);
    }
}

const styles = {
    container: {
        width:'450px',
        height:'40px',
        lineHeight:'40px',
        backgroundColor:'#2C3E50',
        color:'white',
        textAlign:'center',
        borderRadius:'5px 5px 0 0',
        transition:'bottom 0.4s ease-in-out',
        position:'fixed',
        bottom:0,
        left:'50%',
        zIndex:102,
    }
}