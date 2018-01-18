import React from 'react';
import PropTypes from 'prop-types';
import validator from '../../utils/validator';
import { deepEqualObject } from '../../utils/objectUtils';

export class PickItemBase extends React.Component {
	constructor(props) {
		super(props);
		this.onPickItem = this.onPickItem.bind(this);
	}

	onPickItem(newSelectedItemPid, ev) {
		this.props.onSelectItem(newSelectedItemPid, ev.target);
	}

	render() {
		let itemPid = this.props.pickId;

		let selectedItemStyle = this.props.selectedItems.indexOf(itemPid) != -1 ? this.props.selectedItemStyle : null;
		let itemStyles = (selectedItemStyle || '') + ' ' + (this.props.normalItemStyle || '');

		let events = {};
		events[this.props.pickOn] = this.props.itemsControls
			? null
			: ev => {
					this.onPickItem(itemPid, ev);
				};

		return itemPid
			? <div className={itemStyles} {...events} tabIndex={this.props.tabIndex} >
					{this.props.children}
				</div>
			: null;
	}
}

PickItemBase.propTypes = {
	pickId: PropTypes.string.isRequired,
	tabIndex: PropTypes.string
};

export default class PickMultiGroupBase extends React.Component {
	constructor(props) {
		super(props);
		// Bind the method to the component context
		this.renderChildren = this.renderChildren.bind(this);
		this.onSelectItem = this.onSelectItem.bind(this);
		this.state = { selectedItems : (this.props.selectedItems || []) };
		this.validateOnSelect = this.validateOnSelect.bind(this);
		
		this.setRef = this.setRef.bind(this);
	}

	setRef(el){
		this.elementRef = el;
		this.props.getElementRef && this.props.getElementRef(el);
	}
	
	componentWillReceiveProps(nextProps) {
		
		if ( deepEqualObject(this.props.selectedItems,this.state.selectedItems) == false ) {
			
			let pickGroupTag = this.elementRef;
			this.onSelectItem(nextProps.selectedItems, pickGroupTag, nextProps);
		}

		if( deepEqualObject(nextProps.validation,this.props.validation) == false && nextProps.validation && nextProps.validation.validate ){
			
			this.validateOnSelect(this.state.selectedItems, nextProps);
		}
		
	}
	
	shouldComponentUpdate(nextProps, nextState)
	{
		return ((deepEqualObject(nextProps,this.props) == false) || (deepEqualObject(nextState,this.state) == false));
	}
	
	componentDidMount() {
		if (this.props.validation != null && this.props.validation.validate) {
			this.validateOnSelect(this.state.selectedItems, this.props);
		}
	}

	validateOnSelect(values, props) {
		let defaultCheckPropsRules = ['required'];
		let defaultValidateRules = ['required'];
		let defaultType = 'multigroup';

		const { validation, onPassValidation, onFailValidation } = props;

		let targetTag = this.elementRef;
		if (validation != null) {
			//validateOn won't work here ...
			let newValidation = validator.combinePropsValidation(
				this.props,
				defaultType,
				props.pickOn,
				validation,
				defaultCheckPropsRules,
				defaultValidateRules
			);
			let validationObj = {
				validation: newValidation,
				onPassValidation: onPassValidation,
				onFailValidation: onFailValidation
			};

			validator.executeValidation(values, targetTag, validationObj, defaultType );
		}
		else{
			onPassValidation && onPassValidation(values, targetTag);
		}
	}

	onSelectItem(newSelectedPid, ev, nextProps) {
		this.setState(
			state => {
				let selectedItems = state.selectedItems;
				let itemPosition = selectedItems.indexOf(newSelectedPid);
				if (itemPosition == -1) {
					selectedItems.push(newSelectedPid);
				} else {
					selectedItems.splice(itemPosition, 1);
				}

				return { selectedItems };
			},
			()=>{
				let selectedItems = this.state.selectedItems;
				let itemPosition = selectedItems.indexOf(newSelectedPid);

				this.props.onSelect &&
					this.props.onSelect(
						selectedItems,
						{
							id: newSelectedPid,
							active: itemPosition !== -1
						},
						ev.currentTarget
				);
				
				console.log("selectedItems===>",selectedItems)
				this.props.getValue && this.props.getValue(selectedItems);
				

				if( this.props.validation && this.props.validation.validateOn ){
					this.validateOnSelect(selectedItems, nextProps || this.props);
				}
				
			}
		);
	}

	renderChildren() {
		return React.Children.map(this.props.children, child => {
			return React.cloneElement(child, {
				selectedItems: this.state.selectedItems,
				onSelectItem: this.onSelectItem,
				selectedItemStyle: this.props.styles.active,
				normalItemStyle: this.props.styles.item,
				itemsControls: this.props.itemsControls,
				pickOn: this.props.pickOn
			});
		});
	}

	render() {

		return (
			<div className={this.props.styles.group}  
				ref={this.setRef}  
				tabIndex={this.props.tabIndex}
				onClick={this.props.onClick} >
				{this.renderChildren()}
			</div>
		);
	}
}

PickMultiGroupBase.defaultProps = {
	styles: {},
	itemsControls: false,
	pickOn: 'onClick'
};

PickMultiGroupBase.propTypes = {
	styles: PropTypes.shape({
		group: PropTypes.string,
		item: PropTypes.string,
		active: PropTypes.string
	}),
	required: PropTypes.bool,

	
	itemsControls: PropTypes.bool,
	selectedItems: PropTypes.arrayOf(PropTypes.string),
	onSelect: PropTypes.func,
	getValue : PropTypes.func,
	pickOn: PropTypes.string,

	tabIndex: PropTypes.string,
	getElementRef : PropTypes.func,
	onClick : PropTypes.func,
	
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
		PropTypes.shape({ name: PropTypes.oneOf(['PickItemBase']) }),
		PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.oneOf(['PickItemBase']) }))
	])
};
