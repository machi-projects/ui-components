import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RadioBoxGroupBase, { RadioBoxItemBase } from '../../js/form/RadioBoxGroupBase';

import styles from './radiogroup.css';
import inputStyles from '../input/inputbutton/inputbutton.css';
import labelStyles from '../label/label.css';

import styleMapping from './styleMapping';

import { omit } from '../../utils/objectUtils';
import cx from '../../utils/classNamesUtils/classNamesBind';

export class RadioItem extends Component {
	render() {
		return null;
	}
}

RadioItem.propTypes = {
	value: PropTypes.string.isRequired,
	tabIndex : PropTypes.string
};

export default class RadioGroup extends Component {
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
			raised: raised
		});

		//let onPassValidation = validation.validate ?  errored =  true
		let styleMappings = styleMapping[styleId];

		let itemStyle = styles[styleMappings.itemStyle];
		let itemActiveStyle = styles[styleMappings.activeStyle];

		let inputStyle = inputStyles[styleMappings.inputStyle];
		let labelStyle = labelStyles[styleMappings.labelStyle];

		return (
			<RadioBoxGroupBase {...newProps} styles={{ group: classNames, item: itemStyle, active: itemActiveStyle }}>
				{React.Children.map(this.props.children, (child, i) => {
					return (
						<RadioBoxItemBase {...child.props} key={i} styles={{ inputStyle: inputStyle, labelStyle: labelStyle }} />
					);
				})}
			</RadioBoxGroupBase>
		);
	}
}

RadioGroup.defaultProps = {
	styleId: 'default'
};

RadioGroup.propTypes = {
	styleId: PropTypes.string,
	required: PropTypes.bool,

	groupName: PropTypes.string,
	selectedItem: PropTypes.string,
	onSelect: PropTypes.func,

	validation: PropTypes.shape({
		validate: PropTypes.bool,
		validateOn : PropTypes.string,
		rulesOrder: PropTypes.arrayOf(PropTypes.string),
		rules: PropTypes.object,
		messages: PropTypes.object
	}),

	onPassValidation: PropTypes.func,
	onFailValidation: PropTypes.func,

	fireEvent :  PropTypes.string,
	tabIndex : PropTypes.string,
	focusIn : PropTypes.func,
	focusOut : PropTypes.func,
	onClick : PropTypes.func,
	
	focused: PropTypes.bool,
	errored: PropTypes.bool,
	valid: PropTypes.bool,
	raised: PropTypes.bool,

	children: PropTypes.oneOfType([
		PropTypes.shape({ name: PropTypes.oneOf(['RadioItem']) }),
		PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.oneOf(['RadioItem']) }))
	])
};

if (__DOCS__) {
	RadioGroup.docs = {
		componentGroup: 'Atom'
	};
}
