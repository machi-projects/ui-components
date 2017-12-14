import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { omit } from '../../utils/objectUtils';

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
			onFailValidation
		} = this.props;
		let FieldChild = React.Children.only(this.props.children);
		let childOnPassValidation = FieldChild.props.onPassValidation;
		let childOnFailValidation = FieldChild.props.onFailValidation;

		return (
			<div className={fieldStyle} tabIndex={tabIndex}>
				{React.cloneElement(FieldChild, {
					disabled: disabled,
					readOnly: readOnly,
					errored: errored,
					focused: focused,
					valid: valid,
					validation: validation,
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
			validate: props.validation && props.validation.validate ? true : false
		};

		//Bind the method to the component context
		this.onPassValidationItem = this.onPassValidationItem.bind(this);
		this.onFailValidationItem = this.onFailValidationItem.bind(this);
		this.focusErrorFieldSet = this.focusErrorFieldSet.bind(this);
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

	focusErrorFieldSet(el) {
		el.focus && el.focus();
		//React.findDOMNode(this).focus();
		//requestAnimationFrame(()=>{ el.focus && el.focus() });  will be in on the same element id...
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
				requestAnimationFrame(this.focusErrorFieldSet.bind(el));
				this.props.onFailValidation && this.props.onFailValidation(this.props.fieldId, rule, this.state.errMessage, el);
			}
		);
	}

	render() {
		let {
			fieldSetStyle,

			focusFieldOnError,
			hideMessageOnValid,

			fieldInfo,
			validation,
			onPassValidation,
			onFailValidation
		} = this.props;

		return (
			<div className={fieldSetStyle} tabIndex="-1">
				{React.Children.map(this.props.children, (childComponent, i) => {
					if (childComponent.type.prototype === FormFieldLabelBase.prototype) {
						let FieldLabelChild = React.Children.only(childComponent.props.children);
						return React.cloneElement(
							FieldLabelChild,
							Object.assign(omit(childComponent.props, ['children']), {
								errored: this.state.errored,
								focused: this.state.errored && focusFieldOnError
							})
						);
					} else if (childComponent.type.prototype === FormFieldBase.prototype) {
						return React.cloneElement(childComponent, {
							errored: this.state.errored,
							focused: this.state.errored && focusFieldOnError,
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
								focused: this.state.errored && focusFieldOnError,
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

	fieldId: PropTypes.string.isRequired,
	value: PropTypes.any,

	hideMessageOnValid: PropTypes.bool,
	focusFieldOnError: PropTypes.bool,

	infoMessage: PropTypes.string,
	errMessage: PropTypes.string,
	
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
