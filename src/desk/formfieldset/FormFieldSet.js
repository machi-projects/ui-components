import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormFieldSetBase, {
	FormFieldBase,
	FormFieldMsgBase,
	FormFieldLabelBase
} from '../../js/form/FormFieldSetBase';
import styles from './formfieldset.css';
import styleMapping from './styleMapping';

import { omit } from '../../utils/objectUtils';
import cx from '../../utils/classNamesUtils/classNamesBind';

import { Label, Message } from '../index';

export class FormField extends Component {
	render() {
		return null;
	}
}

export default class FormFieldSet extends Component {

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

		let styleMappings = styleMapping[styleId];
		let fieldStyle = styles[styleMappings.fieldStyle];
		
		//styleId={styleMappings.labelStyle}
		//styleId={styleMappings.messageStyle}
		return (
			<FormFieldSetBase {...newProps} fieldSetStyle={classNames}>
				{React.Children.map(this.props.children, (childComponent, i) => {
					if (childComponent.type.prototype === Label.prototype) {
						return (
							<FormFieldLabelBase
								{...childComponent.props}	
								disabled={disabled}								
								errored={errored}
								focused={focused}
							>
								{childComponent}
							</FormFieldLabelBase>
						);
					} else if (childComponent.type.prototype == FormField.prototype) {
						return (
							<FormFieldBase
								{...childComponent.props}
								errored={errored}								
								fieldStyle={fieldStyle}
							/>
						);
					} else if (childComponent.type.prototype === Message.prototype) {
						return (
							<FormFieldMsgBase
								{...childComponent.props}	
								disabled={disabled}								
								errored={errored}
								focused={focused}
							>
								{childComponent}
							</FormFieldMsgBase>
						);
					}

					return null;
				})}
			</FormFieldSetBase>
		);
	}
}

FormFieldSet.defaultProps = {
	styleId: 'default'
};

FormFieldSet.propTypes = {

	fieldSetErrorStyle: PropTypes.string,

	tabIndex : PropTypes.string,
	fieldId: PropTypes.string.isRequired,
	value: PropTypes.any,

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
			name: PropTypes.oneOf(['Label', 'FormField', 'Message'])
		}),
		PropTypes.arrayOf(
			PropTypes.shape({
				name: PropTypes.oneOf(['Label', 'FormField', 'Message'])
			})
		)
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
	FormFieldSet.docs = {
		componentGroup: 'Atom'
	};
}
