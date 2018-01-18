import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { omit, deepEqualObject , IsEqualGivenKeys } from '../../utils/objectUtils';

export class FormFieldLabelBase extends Component {
	render() {
		return null;
	}
}

export class FormFieldMsgBase extends Component {
	render() {
		return null;
	}
}

export class FormFieldBase extends Component {
	
	componentWillReceiveProps(nextProps){
		if(nextProps.focused != this.props.focused && nextProps.focused){
			requestAnimationFrame(()=>{
				this.fieldRef && this.fieldRef.focus()
			});
		}
	}
	
	render() {
		
		let {
			
			fieldStyle,
			tabIndex,
			
			focused,
			errored,
			valid,
			
			validation,
			onPassValidation,
			onFailValidation,
			
			fieldValue,
			getFieldValue,
			valueKey,
			
			onFoucsField,
			onBlurField
			
		} = this.props;
		
		
		let FieldChild = React.Children.only(this.props.children);
		let childOnPassValidation = FieldChild.props.onPassValidation;
		let childOnFailValidation = FieldChild.props.onFailValidation;
		
		return (
			<div className={fieldStyle} >
			
				{React.cloneElement(FieldChild, {
					getElementRef : (el)=>{ this.fieldRef = el },
					
					[valueKey] : fieldValue, 
					getValue : getFieldValue,
					
					errored: errored,
					valid: valid,
					
					onFocus : onFoucsField,
					onBlur : onBlurField,
					
					validation: validation,
					tabIndex : onFoucsField ?  null : "-1",
					
					onPassValidation: (a, b) => {
						childOnPassValidation && childOnPassValidation(a, b);
						onPassValidation && onPassValidation(a, b);
					},
					onFailValidation: (a, b, c) => {
						childOnFailValidation && childOnFailValidation(a, b, c);
						onFailValidation && onFailValidation(a, b, c);
					}
					
				})}
			</div>
		);
	}
}

FormFieldBase.defaultProps = {
	valueKey : "value" 
}

FormFieldBase.propTypes = {
	fieldStyle: PropTypes.string, 
	fieldValue : PropTypes.any,
	getFieldValue : PropTypes.func,
	valueKey : PropTypes.string,
	tabIndex: PropTypes.string,
	onFoucsField :PropTypes.func,
	onBlurField : PropTypes.func
};

export default class FormFieldSetBase extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			errored: false,
			errMessage: null,
			floatLabel : (this.props.floatLabel && props.value ) ?  true :  false  ,
			fieldValue : props.value
		};
		
		//Bind the method to the component context
		this.onPassValidationItem = this.onPassValidationItem.bind(this);
		this.onFailValidationItem = this.onFailValidationItem.bind(this);
		this.onValueChangeItem = this.onValueChangeItem.bind(this);
		this.setFieldSetRef = this.setFieldSetRef.bind(this);
		
		this.onFoucsFieldItem = this.onFoucsFieldItem.bind(this);
		this.onBlurFieldItem = this.onBlurFieldItem.bind(this);
	}
	
	setFieldSetRef(el){
		this.fieldSetRef = el
	}
	
	onPassValidationItem(val, el) {
		this.setState(
			state => {
				state.errored = false;
				state.errMessage = null;
				return state;
			},
			() => {
				this.props.onPassValidation && this.props.onPassValidation(this.props.fieldId, val, el);
			}
		);
	}
	
	onFailValidationItem(rule, message, el) {
		this.setState(
			state => {
				state.errored = true;
				state.errMessage = message;
				return state;
			},
			() => {
				this.props.onFailValidation && this.props.onFailValidation(this.props.fieldId, rule, this.state.errMessage, el);
			}
		);
	}

	onFoucsFieldItem(){
		if( this.props.floatingLabel ){
			this.setState({ floatLabel : true })
		}
	}
	
	onBlurFieldItem(){
		if( this.props.floatingLabel ){
			this.setState({ floatLabel : (this.state.fieldValue ? true :  false)  })
		}
	}
	
	componentWillReceiveProps(nextProps){
		
		if(deepEqualObject(nextProps.value,this.state.fieldValue) == false){
			this.onValueChangeItem(nextProps.value);
		}
	}
	
	onValueChangeItem(fieldValue){
		
		let stateValues = {};
		if( this.props.floatingLabel ){
			stateValues.floatLabel = fieldValue ? true : false;
		}
		
		stateValues.fieldValue = fieldValue;
		
		this.setState( stateValues ,()=>{
			this.props.getValue && this.props.getValue(this.state.fieldValue);
		});

	}
	
	render() {

		let {
			fieldSetStyle,
			tabIndex,
			floatingLabel,
			
			validation,
			onPassValidation,
			onFailValidation
			
		} = this.props;
		
		return (
			<div className={fieldSetStyle} tabIndex={tabIndex} ref={this.setFieldSetRef}>
				{React.Children.map(this.props.children, (childComponent, i) => {
					if (childComponent.type.prototype === FormFieldLabelBase.prototype) {
						let FieldLabelChild = React.Children.only(childComponent.props.children);
						return React.cloneElement(
							FieldLabelChild,
							Object.assign(omit(childComponent.props, ['children']), {
								errored : this.state.errored,
								raised : this.state.floatLabel
							})
						);
					} else if (childComponent.type.prototype === FormFieldBase.prototype) {
						return React.cloneElement(childComponent, {
							
							fieldValue : this.state.fieldValue,
							errored: this.state.errored,
							valid: !this.state.errored,
							focused:this.props.focusField,
							getFieldValue : this.onValueChangeItem,
							
							onFoucsField : this.props.floatingLabel ? this.onFoucsFieldItem : null,
							onBlurField : this.props.floatingLabel ? this.onBlurFieldItem : null,
							
							validation: Object.assign({}, childComponent.props.validation, validation, {
								validate: this.props.validate
							}),
							onPassValidation: this.onPassValidationItem,
							onFailValidation: this.onFailValidationItem
							
						});
					} else if (childComponent.type.prototype === FormFieldMsgBase.prototype) {
						let FieldMsgChild = React.Children.only(childComponent.props.children);

						return React.cloneElement(
							FieldMsgChild,
							Object.assign(omit(childComponent.props, ['children']), {
								errored: this.state.errored,
								valid: !this.state.errored
							}),
							this.state.errored ? this.state.errMessage : this.props.infoMessage || FieldMsgChild.props.children
						);
					}

					return null;
				})}
			</div>
		);
	}
}

FormFieldSetBase.propTypes = {
	fieldSetStyle: PropTypes.string,

	tabIndex : PropTypes.string,
	fieldId: PropTypes.string.isRequired,
	value: PropTypes.any,
	getValue : PropTypes.func,
	
	focusField :  PropTypes.bool,
	floatingLabel : PropTypes.bool,

	infoMessage: PropTypes.string,
	errMessage: PropTypes.string,
	
	validate: PropTypes.bool,
	
	validation: PropTypes.shape({
		validateOn: PropTypes.string,
		rulesOrder: PropTypes.arrayOf(PropTypes.string),
		rules: PropTypes.object,
		messages: PropTypes.object
	}),

	onPassValidation: PropTypes.func,
	onFailValidation: PropTypes.func,

	children: PropTypes.oneOfType([
		PropTypes.shape({
			name: PropTypes.oneOf(['FormFieldLabelBase', 'FormFieldBase', 'FormFieldMsgBase'])
		}),
		PropTypes.arrayOf(
			PropTypes.shape({
				name: PropTypes.oneOf(['FormFieldMsgBase', 'FormFieldBase', 'FormFieldMsgBase'])
			})
		)
	])
};
