import React from 'react';
import PropTypes from 'prop-types';
import validator from '../../utils/validator';

export class PickOneItemBase extends React.Component {
	constructor(props) {
		super(props);
		this.onPickItem = this.onPickItem.bind(this);
	}

	onPickItem(newSelectedItemPid, ev) {
		this.props.onSelectItem(newSelectedItemPid, ev);
	}

	render() {
		let itemPid = this.props.pickId;

		let selectedItemStyle = this.props.selectedItem == itemPid ? this.props.selectedItemStyle : '';
		let itemStyles = (selectedItemStyle || '') + ' ' + (this.props.normalItemStyle || '');

		let events = {};
		events[this.props.pickOn] = this.props.itemsControls
			? null
			: ev => {
					this.onPickItem(itemPid, ev);
				};

		return itemPid
			? <div className={itemStyles} {...events} tabIndex={this.props.tabIndex} onFocus={this.props.focusIn} onBlur={this.props.focusOut} >
					{this.props.children}
				</div>
			: null;
	}
}

PickOneItemBase.propTypes = {
	pickId: PropTypes.string.isRequired,
	tabIndex: PropTypes.string,
	focusIn : PropTypes.func,
	focusOut : PropTypes.func
};

export default class PickOneGroupBase extends React.Component {
	constructor(props) {
		super(props);
		// Bind the method to the component context
		this.renderChildren = this.renderChildren.bind(this);
		this.onSelectItem = this.onSelectItem.bind(this);
		this.state = { selectedItem: this.props.selectedItem };
		this.validateOnSelect = this.validateOnSelect.bind(this);
		
		this.setRef = this.setRef.bind(this);
	}
	
	setRef(el){
		this.elementRef = el;
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.selectedItem !== nextProps.selectedItem) {
			let pickGroupTag = this.elementRef;
			this.onSelectItem(nextProps.selectedItem, pickGroupTag);
		}

		if ( nextProps.validation != null && nextProps.validation.validate ) {
			this.validateOnSelect(this.state.selectedItem, nextProps);
		}
	}
	

	componentDidUpdate(prevProps, prevState)
	{
		if(this.props.fireEvent!==prevProps.fireEvent  && this.props.fireEvent){
			requestAnimationFrame(()=>{
				this.elementRef && this.elementRef[this.props.fireEvent] && this.elementRef[this.props.fireEvent]();
			});
		}
	}

	validateOnSelect(value, props) {
		let defaultCheckPropsRules = ['required'];
		let defaultValidateRules = ['required'];
		let defaultType = 'onegroup';

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

			validator.executeValidation(value, targetTag, validationObj, defaultType);
		} else {
			onPassValidation && onPassValidation(value, targetTag);
		}
	}

	componentDidMount() {
		if (this.props.validation != null && this.props.validation.validate) {
			this.validateOnSelect(this.state.selectedItem, this.props);
		}
		
		if(this.props.fireEvent!=null){
			requestAnimationFrame(()=>{
				this.elementRef  && this.elementRef[this.props.fireEvent] && this.elementRef[this.props.fireEvent]();
			})
			
		}
	}

	onSelectItem(newSelectedPid, ev) {
		let currentTarget = ev.currentTarget;
		this.setState({ selectedItem: newSelectedPid }, function() {
			this.props.onSelect && this.props.onSelect(this.state.selectedItem, currentTarget);
			if (this.props.validation != null && this.props.validation.validateOn) {
				this.validateOnSelect(this.state.selectedItem, this.props);
			}
			
		});
	}

	renderChildren() {
		return React.Children.map(this.props.children, (child, i) => {
			return React.cloneElement(child, {
				key: i,
				selectedItem: this.state.selectedItem,
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
			<div className={this.props.styles.group} ref={this.setRef}  tabIndex={this.props.tabIndex} 
				onFocus={this.props.focusIn}
				onBlur={this.props.focusOut}
				onClick={this.props.onClick} >
				{this.renderChildren()}
			</div>
		);
	}
}

PickOneGroupBase.defaultProps = {
	styles: {},
	itemsControls: false,
	pickOn: 'onClick'
};

PickOneGroupBase.propTypes = {
	styles: PropTypes.shape({
		group: PropTypes.string,
		item: PropTypes.string,
		active: PropTypes.string
	}),
	required: PropTypes.bool,

	fireEvent :  PropTypes.string,
	tabIndex: PropTypes.string,
	focusIn : PropTypes.func,
	focusOut : PropTypes.func,
	onClick : PropTypes.func,
	
	itemsControls: PropTypes.bool,
	selectedItem: PropTypes.string,
	onSelect: PropTypes.func,
	pickOn: PropTypes.string,

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
		PropTypes.shape({ name: PropTypes.oneOf(['PickOneItemBase']) }),
		PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.oneOf(['PickOneItemBase']) }))
	])
};
