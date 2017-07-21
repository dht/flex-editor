import React from 'react';

import AddBasicElements from '../../../src/AddBasicElements';
import CoreActionsBar from '../../../src/CoreActionsBar';
import Divider from 'material-ui/Divider';

export default class StylePanel extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const big = window.innerHeight > 750;

		return (
			<div style={ styles.container }>
				<div style={ styles.box }>
					<div style={ styles.content }>
						<CoreActionsBar white={ true } canUndo={ true } canRedo={ false } />
						<Divider style={ styles.divider } />
						<AddBasicElements white={ true } />
					</div>
				</div>
			</div>
		)
	}
}

const stylesSmall = {
	container: {
		backgroundColor: '#4b4b4b',
		flex: 1,
		padding: '10px 0 0',
		margin: 0,
		color: '#fff',
		width:'330px',
	},
	box: {},
	content: {
		padding: '0 10px',
	},
	divider: {
		backgroundColor: '#777',
		margin: '4px 0 6px',
		padding: 0,
	},
	label: {
		fontSize: '12px',
		width: '45px',
		lineHeight: '24px',
		textAlign: 'right',
		color: '#e3e3e3',
	},
	labelBgColor: {
		fontSize: '12px',
		width: '62px',
		marginRight: '3px',
		lineHeight: '24px',
		textAlign: 'right',
		color: '#e3e3e3',
	},
	position: {}

}
const stylesBig = {
	container: {
		backgroundColor: '#4b4b4b',
		flex: 1,
		padding: '10px 0 0',
		margin: 0,
		color: '#fff',
		width:'330px',
	},
	box: {},
	content: {
		padding: '0 10px',
	},
	divider: {
		backgroundColor: '#777',
		margin: '4px 0 6px',
		padding: 0,
	},
	label: {
		fontSize: '14px',
		width: '60px',
		lineHeight: '29px',
		textAlign: 'right',
		color: '#e3e3e3',
	},
	labelBgColor: {
		fontSize: '14px',
		width: '111px',
		marginRight: '3px',
		lineHeight: '29px',
		textAlign: 'right',
		color: '#e3e3e3',
	},
	position: {}

}


const bigScreen = window.innerHeight > 750;
const styles = bigScreen ? stylesBig : stylesSmall;