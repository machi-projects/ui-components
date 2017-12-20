import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { omit, equals } from '../../utils/objectUtils';

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
	
	constructor(props){
		super(props);
		this.onFocusInFieldItem = this.onFocusInFieldItem.bind(this);
		this.onFocusOutFieldItem = this.onFocusOutFieldItem.bind(this);
		
		this.state = {  
			fireEvent :  props.fireFieldFocusIn ? "focus" : null ,
			fireFieldFocusIn  : props.fireFieldFocusIn  || false
		}
	}
	
	
	componentWillReceiveProps(nextProps){

		if( nextProps.fireFieldFocusIn !== this.state.fireFieldFocusIn){
			
			this.setState( { 
				fireEvent : nextProps.fireFieldFocusIn ? "focus" : null, 
				fireFieldFocusIn : nextProps.fireFieldFocusIn
			} );
		}
	}
	

	onFocusInFieldItem(ev){
				
		this.props.onFocusFieldUpdate && this.props.onFocusFieldUpdate("up",null,()=>{
			
			this.setState( { 
				
				fireEvent : null ,
				fireFieldFocusIn : false 
				
			})
			
		});
	}
	
	onFocusOutFieldItem(ev){
			
		this.props.onFocusFieldUpdate && this.props.onFocusFieldUpdate("down",  ev.target.value ,()=>{
			
			this.setState({ 
				
				fireEvent : "blur" ,
				fireFieldFocusIn : false 
				
			})
			
		});
	}
	
	render() {
		
		let {
			fieldStyle,
			tabIndex,
			required,
			disabled,
			readOnly,
			focused,
			errored,
			valid,
			validation,
			onPassValidation,
			onFailValidation,
			
			onFocusFieldUpdate
			
		} = this.props;
		let FieldChild = React.Children.only(this.props.children);
		let childOnPassValidation = FieldChild.props.onPassValidation;
		let childOnFailValidation = FieldChild.props.onFailValidation;
		
		return (
			<div className={fieldStyle} tabIndex={tabIndex}>
				{React.cloneElement(FieldChild, {
					ref : (el)=>{ this.fieldRef = el },
					disabled: disabled,
					readOnly: readOnly,
					errored: errored,
					focused: focused,
					valid: valid,
					fireEvent : this.state.fireFieldFocusIn ? this.state.fireEvent : this.state.fireEvent,
					validation: validation,
					focusIn :  this.onFocusInFieldItem,
					focusOut : this.onFocusOutFieldItem,
					tabIndex : FieldChild.props.tabIndex || "-1" ,			
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

FormFieldBase.propTypes = {
	fieldStyle: PropTypes.string, 
	tabIndex: PropTypes.string
};

export default class FormFieldSetBase extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			errored: false,
			errMessage: null,
			validate: ((props.validation && props.validation.validate) ? true : false),
			labelRaised : props.raiseLabelOnChange ? (props.value ? true : false) : false,
			fieldFocused : false,
			fireFocusIn : props.fireFocusIn || false
		};
		
		//Bind the method to the component context
		this.onPassValidationItem = this.onPassValidationItem.bind(this);
		this.onFailValidationItem = this.onFailValidationItem.bind(this);
		this.onFocusFieldUpdate = this.onFocusFieldUpdate.bind(this);
		this.setFieldSetRef = this.setFieldSetRef.bind(this);
	}
	
	setFieldSetRef(el){
		this.fieldSetRef = el
	}
	
	componentWillReceiveProps(nextProps){

		if( (nextProps.value != this.props.value ) || ( nextProps.validate !== this.props.validate )  ){
			
			this.setState({ 
				 validate : nextProps.validate,
				 labelRaised : nextProps.raiseLabelOnChange ? (nextProps.value ? true : false) : false 
			 })
		}
	}
	
	onPassValidationItem(val, el) {
		this.setState(
			state => {
				state.errored = false;
				state.errMessage = null;
				state.validate = false;
				return state;
			},
			() => {
				this.props.onPassValidation && this.props.onPassValidation(this.props.fieldId, val, el);
			}
		);
	}

	onFocusFieldUpdate(type , value, callback ){
		
		this.setState({
			fieldFocused : (type == "up") , 
			labelRaised : this.props.raiseLabelOnChange && ( (type == "up") ? true : (value && value.length > 0 ? true : false) ) 
	    },()=>{
	    		callback && callback();
	    		/*if(this.props.fireFocusIn ){
	    			requestAnimationFrame(()=>{
	    				this.fieldSetRef && this.fieldSetRef.focus && this.fieldSetRef.focus();
	    			})
	    		}*/
	    });
		
	}
	
	onFailValidationItem(rule, message, el) {
		this.setState(
			state => {
				state.errored = true;
				state.errMessage = message;
				state.validate = false;
				return state;
			},
			() => {
				this.props.onFailValidation && this.props.onFailValidation(this.props.fieldId, rule, this.state.errMessage, el);
			}
		);
	}

	render() {
		let {
			fieldSetStyle,

			focusFieldOnChange,
			hideMessageOnValid,

			tabIndex,
			fieldInfo,
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
								focused : this.state.fieldFocused,
								raised : this.state.labelRaised
							})
						);
					} else if (childComponent.type.prototype === FormFieldBase.prototype) {
						return React.cloneElement(childComponent, {
							errored: this.state.errored,
							
							focused: this.state.fieldFocused,
							fireFieldFocusIn : this.props.fireFocusIn,
							onFocusFieldUpdate : focusFieldOnChange ? this.onFocusFieldUpdate : null,
									
							valid: !this.state.errored,
							validation: Object.assign({}, childComponent.props.validation, validation, {
								validate: this.state.validate
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
								focused: this.state.fieldFocused,
								valid: !this.state.errored,
								hidden: !this.state.errored && hideMessageOnValid
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

	fireFocusIn :  PropTypes.bool,
	hideMessageOnValid: PropTypes.bool,
	focusFieldOnChange : PropTypes.bool,
	raiseLabelOnChange : PropTypes.bool,

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
