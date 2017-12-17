import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormFieldsGroupBase from '../../js/form/FormFieldsGroupBase';
import styles from './formfieldsgroup.css';

import { omit } from '../../utils/objectUtils';
import cx from '../../utils/classNamesUtils/classNamesBind';

export default class FormFieldsGroup extends Component {
	
	render() {
		const {
			styleId,

			required,
			disabled,
			readOnly,
			hidden,

			focused,
			errored,
			raised
		} = this.props;

		let newProps = omit(this.props, [
			'className',
			'styleId',
			'readOnly',
			'disabled',
			'hidden',
			'focused',
			'errored',
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
			raised: raised
		});

		return <FormFieldsGroupBase {...newProps} formFieldsGroupStyle={classNames} />;
	}
}

FormFieldsGroup.defaultProps = {
	styleId: 'default'
};

FormFieldsGroup.propTypes = {
	formFieldsGroupStyle: PropTypes.string,

	validate: PropTypes.bool,
	onFailValidation: PropTypes.func,
	onPassValidation: PropTypes.func,

	totalFieldsCount : PropTypes.number,
	
	children: PropTypes.oneOfType([
		PropTypes.shape({ name: PropTypes.oneOf(['FormFieldSet']) }),
		PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.oneOf(['FormFieldSet']) }))
	]),

	styleId: PropTypes.string,

	disabled: PropTypes.bool,
	focused: PropTypes.bool,
	required: PropTypes.bool,
	readOnly: PropTypes.bool,
	errored: PropTypes.bool,
	valid: PropTypes.bool,
	hidden: PropTypes.bool,
	raised: PropTypes.bool
};

if (__DOCS__) {
	FormFieldsGroup.docs = {
		componentGroup: 'Atom'
	};
}
