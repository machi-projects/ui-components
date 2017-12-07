import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { omit } from '../../utils/objectUtils';

export default class FormFieldsGroupBase extends Component {
	constructor(props) {
		super(props);
		this.state = {
			errored: false,
			validate: props.validate,
			validFields: {},
			inValidFields: {}
		};
	}

	onPassValidationItem(onPassValidationCallback) {
		return (fieldId, fieldVal, el) => {
			onPassValidationCallback && onPassValidationCallback(fieldId, fieldVal, el);

			if (this.state.validate) {
				this.setState(
					state => {
						state.validFields[fieldId] = fieldVal;
						state.inValidFields = omit(state.inValidFields, fieldId);
						state.validate = false;
						state.errored = false;

						return state;
					},
					() => {
						Object.keys(state.inValidFields).length == 0 &&
							this.props.onPassValidation &&
							this.props.onPassValidation(this.state.validatedFields);
					}
				);
			}
		};
	}

	onFailValidationItem(onFailValidationCallback) {
		return (fieldId, rule, message, el) => {
			onFailValidationCallback && onFailValidationCallback(fieldId, rule, message, el);
			if (this.state.validate) {
				this.setState(
					state => {
						state.inValidFields[fieldId] = { [rule]: message };
						state.validFields = omit(state.validFields, fieldId);
						state.validate = false;
						state.errored = true;
						return state;
					},
					() => {
						this.props.onFailValidation && this.props.onFailValidation(this.state.inValidFields);
					}
				);
			}
		};
	}

	render() {
		let { formFieldsGroupStyle } = this.props;

		return (
			<div className={formFieldsGroupStyle} tabIndex="-1">
				{React.Children.map(this.props.children, (child, i) => {
					return React.cloneElement(child, {
						key: i,
						validation: Object.assign({}, child.props.validation, {
							validate: this.state.validate
						}),
						onPassValidation: this.onPassValidationItem(child.props.onPassValidation),
						onFailValidation: this.onFailValidationItem(child.props.onFailValidation)
					});
				})}
			</div>
		);
	}
}

FormFieldsGroupBase.propTypes = {
	formFieldsGroupStyle: PropTypes.string,

	validate: PropTypes.bool,
	onFailValidation: PropTypes.func,
	onPassValidation: PropTypes.func,

	children: PropTypes.oneOfType([
		PropTypes.shape({ name: PropTypes.oneOf(['FormFieldSetBase']) }),
		PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.oneOf(['FormFieldSetBase']) }))
	])
};
