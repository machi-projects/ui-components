import React from 'react';
import PickMultiGroupBase, { PickItemBase } from '../core/PickMultiGroupBase';
import PropTypes from 'prop-types';
import InputButtonBoxBase from './InputButtonBoxBase';
import LabelBoxBase from './LabelBoxBase';
import { deepEqualObject } from '../../utils/objectUtils';

export class CheckBoxItemBase extends React.Component {
	render() {
		return null;
	}
}

CheckBoxItemBase.propTypes = {
	value: PropTypes.string.isRequired,
	tabIndex : PropTypes.string
};

export default class CheckBoxGroupBase extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			uniqueName: Date.now() + '_checkbox',
			selectedItems: (this.props.selectedItems || [])
		};
		this.onSelectedItem = this.onSelectedItem.bind(this);
	}

	componentWillReceiveProps(nextProps){
		
		if( deepEqualObject(nextProps.selectedItems , this.state.selectedItems) == false ){
			this.setState({ selectedItems : nextProps.selectedItems });
		}
	}
	
	onSelectedItem(newSelectedItems, currObjState, el) {
		this.setState(
			state => {
				state.selectedItems = newSelectedItems;
				return state;
			},
			() => {
				this.props.onSelect && this.props.onSelect(this.props.groupName, this.state.selectedItems, currObjState, el);
			}
		);
	}

	render() {
		let {
			selectedItems,
			styles = {},

			required,
			hidden,

			groupName,
			validation,
			onPassValidation,
			onFailValidation,
			
			tabIndex,
			getElementRef,
			getValue,
			onClick
			
		} = this.props;

		let uniqueName = this.state.uniqueName;
		let allStyles = { styles };

		let stateSelectedItems = this.state.selectedItems;
		return (
			<PickMultiGroupBase
				required={required}
				validation={validation}
				onPassValidation={onPassValidation}
				onFailValidation={onFailValidation}
				{...allStyles}
				selectedItems={selectedItems}
				onSelect={this.onSelectedItem}
				
				tabIndex={tabIndex}
				getElementRef={getElementRef}
				getValue={getValue}
				onClick={onClick}
			>
				{React.Children.map(this.props.children, (child, i) => {
					let checked = stateSelectedItems.indexOf(child.props.value) !== -1;

					//controlled CheckBoxItemBase..

					let childStyles = child.props.styles || {};
					return (
						<PickItemBase key={i} pickId={child.props.value} 	tabIndex={child.props.tabIndex}>
							<InputButtonBoxBase
								type="checkbox"
								name={uniqueName}
								className={childStyles.inputStyle}
								checked={checked}
								required={required}
							/>

							<LabelBoxBase className={childStyles.labelStyle}>
								{child.props.children}
							</LabelBoxBase>
						</PickItemBase>
					);
				})}
			</PickMultiGroupBase>
		);
	}
}

CheckBoxGroupBase.defaultProps = {
	styles: {}
};

CheckBoxGroupBase.propTypes = {
	styles: PropTypes.shape({
		selectedItemStyle: PropTypes.string,
		itemStyle: PropTypes.string,
		groupStyle: PropTypes.string
	}),
	required: PropTypes.bool,

	groupName: PropTypes.string,
	selectedItems: PropTypes.arrayOf(PropTypes.string),
	onSelect: PropTypes.func,
	getValue: PropTypes.func,
	
	tabIndex : PropTypes.string,
	onClick : PropTypes.func,
	getElementRef : PropTypes.func,
	
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
		PropTypes.shape({ name: PropTypes.oneOf(['CheckBoxItemBase']) }),
		PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.oneOf(['CheckBoxItemBase']) }))
	])
};
