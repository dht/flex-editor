import React from 'react'
import Element from 'lpm-core/Element'
import ElementSelector from '../ElementSelector'

class Phone extends React.Component {

    render() {
        const {isLoading} = this.props;
        const {screenHeight, screenWidth} = this.props;

        if (isLoading) {
            return <div>Loading...</div>
        }

        return (
            <div style={{
                ...style.container,
                direction: this.props.direction === 'RTL' ? 'rtl' : 'ltr',
                height: screenHeight,
                width: screenWidth || 320,
            }}>
                <Element id={ 1 }
                         statePath={ 'flexState/elements/present' }
                         onElementClick={this.props.onElementClick}
                         onElementDblClick={this.props.onDoubleClick}/>

                <ElementSelector readonly={this.props.readonly} appType={ this.props.appType } />
            </div>
        )
    }

    unstable_handleError(e){
        console.log('Phone error -> ', e);
    }
}

const style = {
        container: {
            display: 'flex',
            position: 'relative',
            backgroundColor: 'white',
            width: '320px',
            boxShadow: '0 0 5px rgba(0,0,0,0.1)',
        },
        iphone6: {
            width: '375px',
            height: '667px',
        },
        iphone6s: {
            width: '414px',
            height: '736px',
        }
    }

export default Phone;
