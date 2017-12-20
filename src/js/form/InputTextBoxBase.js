import React from 'react';
import InputBase from '../core/InputBase';
import validator from '../../utils/validator';
import PropTypes from 'prop-types';
import { equals } from '../../utils/objectUtils';

export default class InputTextBoxBase extends React.Component {
	shouldComponentUpdate(nextProps) {
		if (equals(nextProps, this.props)) {
			return false;
		}
		return true;
	}

	render() {
		let defaultCheckPropsRules = [
			'required',
			'min',
			'minLength',
			'range',
			'rangeLength',
			'max',
			'maxLength',
			'step',
			'pattern'
		];
		let defaultValidateRules = [
			'required',
			'min',
			'minLength',
			'range',
			'rangeLength',
			'max',
			'maxLength',
			'step',
			'pattern',
			'email',
			'integer',
			'digits',
			'double',
			'phone',
			'url',
			'hexcode',
			'month',
			'date',
			'time',
			'datetime'
		];

		let defaultType = 'text';

		const { type, validation } = this.props;

		let newType = type || defaultType;
		let newValidation = validator.combinePropsValidation(
			this.props,
			newType,
			'onBlur',
			validation,
			defaultCheckPropsRules,
			defaultValidateRules
		);

		return <InputBase {...this.props} type={newType} validation={newValidation} />;
	}
}

InputTextBoxBase.defaultProps = {
	type: 'text'
};

InputTextBoxBase.propTypes = {
	id: PropTypes.string,
	type: PropTypes.oneOf([
		'number',
		'email',
		'text',
		'range',
		'color',
		'file',
		'search',
		'tel',
		'url',
		'month',
		'week',
		'date',
		'time',
		'datetime-local',
		'hidden'
	]).isRequired,
	name: PropTypes.string,
	className: PropTypes.string,
	placeholder: PropTypes.string,
	readOnly: PropTypes.bool,
	maxLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	step: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	list: PropTypes.string,
	size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	autoFocus: PropTypes.bool,

	tabIndex:PropTypes.string,
	autoComplete: PropTypes.bool,
	disabled: PropTypes.bool,
	required: PropTypes.bool,
	pattern: PropTypes.string,
	value: PropTypes.string,

	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
	onKeyDown: PropTypes.func,
	onKeyUp: PropTypes.func,
	onChange: PropTypes.func,
	onInput: PropTypes.func,

	validation: PropTypes.shape({
		validate: PropTypes.bool,
		validateOn: PropTypes.string,
		rulesOrder: PropTypes.arrayOf(PropTypes.string),
		rules: PropTypes.object,
		messages: PropTypes.object
	}),

	onPassValidation: PropTypes.func,
	onFailValidation: PropTypes.func
};
