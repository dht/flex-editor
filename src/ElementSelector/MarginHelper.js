import React from 'react';

export default class MarginHelper extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
		const { which, marginValue, type } = this.props;

		if (type != 'MARGIN') {
			return null;
		}

		switch (which) {
			case 'n':
			return <div style={{...styles.margin_north, top: -marginValue }}>
				<div style={{...styles.marginArrow_north, height: marginValue, lineHeight: marginValue + 'px'}}>
					{marginValue}
					<div style={ styles.marginArrowHead_north}>
					</div>
				</div>
			</div>
			case 'e':
				return <div style={{...styles.margin_east, right: -marginValue }}>
					<div style={{...styles.marginArrow_east, width: marginValue}}>
						{marginValue}
						<div style={ styles.marginArrowHead_east}>
						</div>
					</div>
				</div>
			case 's':
				return <div style={{...styles.margin_south, bottom: -marginValue }}>
					<div style={{...styles.marginArrow_south, height: marginValue, lineHeight: marginValue + 'px'}}>
						{marginValue}
						<div style={ styles.marginArrowHead_south}>
						</div>
					</div>
				</div>
			case 'w':
				return <div style={{...styles.margin_west, left: -marginValue }}>
					<div style={{...styles.marginArrow_west, width: marginValue}}>
						{marginValue}
						<div style={ styles.marginArrowHead_west}>
						</div>
					</div>
				</div>
			default:
				return <div style={{...styles.margin_all, left: -marginValue, right: -marginValue, top:-marginValue, bottom:-marginValue }}>
					<div style={{...styles.marginArrow_all, width: marginValue}}>
						{marginValue}
						<div style={ styles.marginArrowHead_all}>
						</div>
					</div>
				</div>
		}
    }
}

const styles = {
	margin_north: {
		position: 'absolute',
		top: '-50px',
		left:0,
		right:0,
		borderTop: '1px solid green',
		pointerEvents: 'none',
	},
	marginArrow_north: {
		position: 'absolute',
		top: '0px',
		left: '50%',
		width: '1px',
		textAlign: 'center',
		color: 'green',
		fontSize: '10px',
		height: '50px',
		borderRight: '1px dotted green',
		zIndex:1,
		textIndent:'5px',
	},
	marginArrowHead_north: {
		position:'absolute',
		top:0,
		left:'-3px',
		width: 0,
		height: 0,
		borderLeft: '5px solid transparent',
		borderRight: '5px solid transparent',
		borderBottom: '5px solid green',
	},
	margin_south: {
		position: 'absolute',
		bottom: '-50px',
		left:0,
		right:0,
		borderTop: '1px solid green',
		pointerEvents: 'none',
	},
	marginArrow_south: {
		position: 'absolute',
		bottom: '0px',
		left: '50%',
		width: '1px',
		textAlign: 'center',
		color: 'green',
		fontSize: '10px',
		height: '50px',
		borderRight: '1px dotted green',
		zIndex:1,
		textIndent:'5px',
	},
	marginArrowHead_south: {
		position:'absolute',
		bottom:0,
		left:'-3px',
		width: 0,
		height: 0,
		borderLeft: '5px solid transparent',
		borderRight: '5px solid transparent',
		borderTop: '5px solid green',
	},
	margin_east: {
		position: 'absolute',
		right: '-50px',
		top:0,
		bottom:0,
		borderRight: '1px solid green',
		pointerEvents: 'none',
	},
	marginArrow_east: {
		position: 'absolute',
		right: '0px',
		top: '50%',
		height: '1px',
		textAlign: 'center',
		color: 'green',
		fontSize: '10px',
		width: '50px',
		borderBottom: '1px dotted green',
		zIndex:1,
	},
	marginArrowHead_east: {
		position:'absolute',
		right:0,
		top:'-4px',
		width: 0,
		height: 0,
		borderTop: '5px solid transparent',
		borderBottom: '5px solid transparent',
		borderLeft: '5px solid green',
	},
	margin_west: {
		position: 'absolute',
		left: '-50px',
		top:0,
		bottom:0,
		borderLeft: '1px solid green',
		pointerEvents: 'none',
	},
	marginArrow_west: {
		position: 'absolute',
		left: '0px',
		top: '50%',
		height: '1px',
		textAlign: 'center',
		color: 'green',
		fontSize: '10px',
		width: '50px',
		borderBottom: '1px dotted green',
		zIndex:1,
	},
	marginArrowHead_west: {
		position:'absolute',
		left:0,
		top:'-4px',
		width: 0,
		height: 0,
		borderTop: '5px solid transparent',
		borderBottom: '5px solid transparent',
		borderRight: '5px solid green',
	},
	margin_all: {
		position: 'absolute',
		left: '-50px',
		top:0,
		bottom:0,
		border: '1px solid green',
		pointerEvents: 'none',
	},
	marginArrow_all: {
		position: 'absolute',
		right: '0px',
		top: '50%',
		height: '1px',
		textAlign: 'center',
		color: 'green',
		fontSize: '10px',
		width: '50px',
		borderBottom: '1px dotted green',
		zIndex:1,
	},
	marginArrowHead_all: {
		position:'absolute',
		right:0,
		top:'-4px',
		width: 0,
		height: 0,
		borderTop: '5px solid transparent',
		borderBottom: '5px solid transparent',
		borderLeft: '5px solid green',
	}
}