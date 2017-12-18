import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CheckBoxGroupBase, {
	CheckBoxItemBase
} from '../../js/form/CheckBoxGroupBase';

import styles from './checkboxgroup.css';
import inputStyles from '../input/inputbutton/inputbutton.css';
import labelStyles from '../label/label.css';

import styleMapping from './styleMapping';

import { omit } from '../../utils/objectUtils';
import cx from '../../utils/classNamesUtils/classNamesBind';

export class CheckBoxItem extends Component {
	render() {
		return null;
	}
}

CheckBoxItem.propTypes = {
	value: PropTypes.string.isRequired
};

export default class CheckBoxGroup extends Component {
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
			<CheckBoxGroupBase
				{...newProps}
				styles={{ group: classNames, item: itemStyle, active: itemActiveStyle }}
			>
				{React.Children.map(this.props.children, (child, i) => {
					return (
						<CheckBoxItemBase
							{...child.props}
							key={i}
							styles={{ inputStyle: inputStyle, labelStyle: labelStyle }}
						/>
					);
				})}
			</CheckBoxGroupBase>
		);
	}
}

CheckBoxGroup.defaultProps = {
	styleId: 'default'
};

CheckBoxGroup.propTypes = {
	styleId: PropTypes.string,
	required: PropTypes.bool,

	groupName: PropTypes.string,
	selectedItems: PropTypes.arrayOf(PropTypes.string),
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

	hidden: PropTypes.bool,
	focused: PropTypes.bool,
	errored: PropTypes.bool,
	valid: PropTypes.bool,
	raised: PropTypes.bool,

	children: PropTypes.oneOfType([
		PropTypes.shape({ name: PropTypes.oneOf(['CheckBoxItem']) }),
		PropTypes.arrayOf(
			PropTypes.shape({ name: PropTypes.oneOf(['CheckBoxItem']) })
		)
	])
};

if (__DOCS__) {
	CheckBoxGroup.docs = {
		componentGroup: 'Atom'
	};
}
