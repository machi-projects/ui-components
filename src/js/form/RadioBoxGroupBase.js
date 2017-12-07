import React from 'react';
import PickOneGroupBase, { PickOneItemBase } from '../core/PickOneGroupBase';
import PropTypes from 'prop-types';
import InputButtonBoxBase from './InputButtonBoxBase';
import LabelBoxBase from './LabelBoxBase';

export class RadioBoxItemBase extends React.Component {
	render() {
		return null;
	}
}

RadioBoxItemBase.propTypes = {
	value: PropTypes.string.isRequired,
	styles: {
		inputStyle: PropTypes.string,
		labelStyle: PropTypes.string
	}
};

export default class RadioBoxGroupBase extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			uniqueName: Date.now() + '_radio',
			selectedItem: this.props.selectedItem
		};
		this.onSelectedItem = this.onSelectedItem.bind(this);
	}

	onSelectedItem(newSelectedItem, el) {
		this.setState(
			prevState => {
				prevState.selectedItem = newSelectedItem;
				return prevState;
			},
			() => {
				this.props.onSelect && this.props.onSelect(this.props.groupName, this.state.selectedItem, el);
			}
		);
	}

	render() {
		let {
			selectedItem,
			styles = {},

			required,
			onSelect,
			groupName,
			validation,
			onPassValidation,
			onFailValidation
		} = this.props;

		let uniqueName = this.state.uniqueName;
		let allStyles = { styles };

		let stateSelectedItem = this.state.selectedItem;

		return (
			<PickOneGroupBase
				required={required}
				validation={validation}
				onPassValidation={onPassValidation}
				onFailValidation={onFailValidation}
				{...allStyles}
				selectedItem={selectedItem}
				onSelect={this.onSelectedItem}
				tabIndex="-1"
			>
				{React.Children.map(this.props.children, (child, i) => {
					let checked = stateSelectedItem == child.props.value;

					//controlled RadioBoxItemBase..
					let childStyles = child.props.styles || {};
					return (
						<PickOneItemBase key={i} pickId={child.props.value}>
							<InputButtonBoxBase
								type="radio"
								name={uniqueName}
								className={childStyles.inputStyle}
								checked={checked}
								required={required}
							/>

							<LabelBoxBase className={childStyles.labelStyle}>
								{child.props.children}
							</LabelBoxBase>
						</PickOneItemBase>
					);
				})}
			</PickOneGroupBase>
		);
	}
}

RadioBoxGroupBase.defaultProps = {
	styles: {}
};

RadioBoxGroupBase.propTypes = {
	styles: PropTypes.shape({
		group: PropTypes.string,
		item: PropTypes.string,
		active: PropTypes.string
	}),

	required: PropTypes.bool,

	groupName: PropTypes.string,
	selectedItem: PropTypes.string,
	onSelect: PropTypes.func,

	validation: PropTypes.shape({
		validate: PropTypes.bool,
		validateOn: PropTypes.string,
		rulesOrder: PropTypes.arrayOf(PropTypes.string),
		rules: PropTypes.object,
		messages: PropTypes.object
	}),

	onPassValidation: PropTypes.func,
	onFailValidation: PropTypes.func,

	children: PropTypes.oneOfType([
		PropTypes.shape({ name: PropTypes.oneOf(['RadioBoxItemBase']) }),
		PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.oneOf(['RadioBoxItemBase']) }))
	])
};
