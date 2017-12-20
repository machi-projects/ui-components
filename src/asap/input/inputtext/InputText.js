import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputTextBoxBase from '../../../js/form/InputTextBoxBase';
import styles from './inputtext.css';

import { omit } from '../../../utils/objectUtils';
import cx from '../../../utils/classNamesUtils/classNamesBind';

export default class InputText extends Component {
	render() {
		const {
			styleId,

			required,
			disabled,
			readOnly,
			hidden,

			focused,
			errored,
			valid,
			raised,
			
			focusIn,
			focusOut
			
		} = this.props;

		let newProps = omit(this.props, [
			'className',
			'styleId',
			'focused',
			'errored',
			'valid',
			'raised',
			
			'focusIn',
			'focusOut'
		]);

		let classNames = cx(styles, {
			[styleId]: true,

			required: required,
			disabled: disabled,
			readOnly: readOnly,
			hidden: hidden,

			focused: focused,
			errored: errored,
			valid: valid,
			raised: raised
		});

		//let onPassValidation = validation.validate ?  errored =  true
		return <InputTextBoxBase {...newProps} onFocus={focusIn} onBlur={focusOut} className={classNames} />;
	}
}
InputText.defaultProps = {
	styleId: 'default'
};

InputText.propTypes = {
	styleId: PropTypes.string,

	id: PropTypes.string,
	type: PropTypes.string.isRequired,
	name: PropTypes.string,
	placeholder: PropTypes.string,
	readOnly: PropTypes.bool,
	maxLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	step: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	list: PropTypes.string,
	size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	autoFocus: PropTypes.bool,
	autoComplete: PropTypes.bool,
	disabled: PropTypes.bool,
	required: PropTypes.bool,
	pattern: PropTypes.string,
	value: PropTypes.string,
	hidden: PropTypes.bool,

	fireEvent :  PropTypes.string,
	focusIn: PropTypes.func,
	focusOut : PropTypes.func,
	onKeyDown: PropTypes.func,
	onKeyUp: PropTypes.func,
	onChange: PropTypes.func,
	onInput: PropTypes.func,

	validation: PropTypes.shape({
		show: PropTypes.bool,
		validateOn: PropTypes.string,
		rules: PropTypes.object,
		rulesOrder: PropTypes.arrayOf(PropTypes.string),
		messages: PropTypes.object
	}),

	onFailValidation: PropTypes.func,
	onPassValidation: PropTypes.func,

	focused: PropTypes.bool,
	errored: PropTypes.bool,
	valid: PropTypes.bool,
	raised: PropTypes.bool
};

if (__DOCS__) {
	InputText.docs = {
		componentGroup: 'Atom'
	};
}
