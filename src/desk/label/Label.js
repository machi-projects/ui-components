import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LabelBoxBase from '../../js/form/LabelBoxBase';
import styles from './label.css';

import { omit } from '../../utils/objectUtils';
import cx from '../../utils/classNamesUtils/classNamesBind';

export default class Label extends React.Component {
	render() {
		const {
			styleId,

			disabled,
			focused,

			mandatory,
			
			primary,
			success,
			info,
			warning,
			danger,

			up,
			down,

			hovered,
			errored,
			hidden,
			raised
		} = this.props;
		
		let newProps = omit(this.props, [
			'className',
			'styleId',
			'disabled',
			'focused',
			'mandatory',
			'primary',
			'success',
			'info',
			'warning',
			'danger',
			'hovered',
			'errored',
			'raised',
			'up',
			'down'
		]);
		

		let classNames = cx(styles, {
			[styleId]: true,

			disabled: disabled,
			focused: focused,

			mandatory : mandatory,
			primary: primary,
			success: success,
			info: info,
			warning: warning,
			danger: danger,

			hovered: hovered,
			errored: errored,
			hidden: hidden,
			raised: raised,

			up: up,
			down: down
		});

		return <LabelBoxBase {...newProps} className={classNames} />;
	}
}

Label.defaultProps = {
	styleId: 'default'
};

Label.propTypes = {
	id: PropTypes.string,
	htmlFor: PropTypes.string,
	styleId: PropTypes.string,

	disabled: PropTypes.bool,
	focused: PropTypes.bool,

	mandatory: PropTypes.bool,
	primary: PropTypes.bool,
	success: PropTypes.bool,
	info: PropTypes.bool,
	warning: PropTypes.bool,
	danger: PropTypes.bool,

	hovered: PropTypes.bool,
	errored: PropTypes.bool,
	hidden: PropTypes.bool,
	raised: PropTypes.bool
};

if (__DOCS__) {
	Label.docs = {
		componentGroup: 'Atom'
	};
}

/*

		Label.stateStyles = [ "disabled", "enabled" , "focused" , "mandatory" , "primary" , "success" , "info",
		"warning", "danger", "hovered" , "errored" , "hidden", , "errored", "raised" ]

	*/
