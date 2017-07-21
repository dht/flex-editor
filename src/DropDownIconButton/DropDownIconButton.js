import React from 'react'
import IconButton from 'material-ui/IconButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

class DropDownIconButton extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			open: false,
		};
		this.renderIcon = this.renderIcon.bind(this);

		this.styles = props.big ? stylesBig : stylesSmall;
	}

	handleTouchTap = (event) => {
		// This prevents ghost click.
		event.preventDefault();

		this.setState({
			open: true,
			anchorEl: event.currentTarget,
		});
	};

	handleMenuItemClick = (index) => {
		this.props.menuClick(index);
		this.handleRequestClose();
	}

	handleRequestClose = () => {
		this.setState({
			open: false,
		});
	};

	renderMenu() {

		return (
			<Menu desktop={true}>
				{
					this.props.items.map((item, index) => {
						let keys = Object.keys(item),
							key = keys[0],
							text = item[key];

						let secondaryText = '';

						if (text.primary) {
							secondaryText = text.secondary;
							text = text.primary;
						}

						if (key === 'DIVIDER') {
							return (<Divider key={ index }/>)
						}

						return (<MenuItem style={ this.styles.menuItem }
										  primaryText={text}
										  secondaryText={secondaryText}
										  key={key + '-' + index}
										  onClick={()=>this.handleMenuItemClick(key)}/>)
					})
				}
			</Menu>);
	}

	iconStyle() {
		const {white} = this.props;

		return white ? this.styles.buttonWhite : this.styles.button
	}

	renderIcon() {
		const {iconName, title} = this.props;

		return <IconButton
			iconStyle={ this.iconStyle()}
			title={title}
			onClick={this.handleTouchTap}
			iconClassName="material-icons">
			{iconName}
		</IconButton>
	}

	render() {


		return (
			<div style={this.styles.container}>
				{
					this.renderIcon()
				}

				<Popover
					open={this.state.open}
					anchorEl={this.state.anchorEl}
					animated={false}
					anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
					targetOrigin={{horizontal: 'left', vertical: 'top'}}
					onRequestClose={this.handleRequestClose}
				>
					{this.renderMenu()}
				</Popover>
			</div>

		)
	}
}

const stylesBig = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		fontFamily: 'Roboto, sans-serif',
		boxSizing: 'border-box',
	},
	button: {
		color: '#000',
	},
	buttonWhite: {
		color: 'white',
	},

}

const stylesSmall = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		fontFamily: 'Roboto, sans-serif',
		boxSizing: 'border-box',
	},
	button: {
		color: '#000',
	},
	buttonWhite: {
		color: 'white',
	},
	menuItem: {
		fontSize: '12px',
	},

}

export default DropDownIconButton;
