import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MultiLineInputBoxBase from '../../js/form/MultiLineInputBoxBase';
import styles from './multilineinput.css';

import { omit } from '../../utils/objectUtils';
import cx from '../../utils/classNamesUtils/classNamesBind';

export default class MultiLineInput extends Component {
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
			
			autoExpandX,
			autoExpandY
			
		} = this.props;

		let newProps = omit(this.props, [
			'className',
			'styleId',
			'focused',
			'errored',
			'valid',
			'raised'
			
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
			raised: raised,
			
			autoExpandX  : autoExpandX,
			autoExpandY : autoExpandY
			
		});

		//let onPassValidation = validation.validate ?  errored =  true

		return <MultiLineInputBoxBase {...newProps} className={classNames} />;
	}
}
MultiLineInput.defaultProps = {
	styleId: 'default'
};

MultiLineInput.propTypes = {
	styleId: PropTypes.string,

	id: PropTypes.string,
	name: PropTypes.string,
	placeholder: PropTypes.string,
	readOnly: PropTypes.bool,
	maxLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	cols: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

	autoExpandY : PropTypes.bool ,
	autoExpandX : PropTypes.bool ,
	
	autoFocus: PropTypes.bool,
	disabled: PropTypes.bool,
	hidden: PropTypes.bool,
	required: PropTypes.bool,
	value: PropTypes.string,

	getElementRef: PropTypes.func,
	onKeyDown: PropTypes.func,
	onKeyUp: PropTypes.func,
	onChange: PropTypes.func,
	onInput: PropTypes.func,
	getValue: PropTypes.func,

	validation: PropTypes.shape({
		validate: PropTypes.bool,
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
	MultiLineInput.docs = {
		componentGroup: 'Atom'
	};
}
