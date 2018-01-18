import React from 'react';
import PropTypes from 'prop-types';

import MessageBase from '../../js/MessageBase';
import styles from './message.css';
import { omit } from '../../utils/objectUtils';
import cx from '../../utils/classNamesUtils/classNamesBind';

export default class Message extends React.Component {
	render() {
		const {
			styleId,
			src,
			alt,
			text,

			disabled,
			focused,

			primary,
			success,
			info,
			warning,
			danger,

			errored,
			valid,
			hovered,
			hidden,
			raised
		} = this.props;
		
		let newProps = omit(this.props, [
			'className',
			'styleId',
			'disabled',
			'focused',
			'primary',
			'success',
			'info',
			'warning',
			'danger',
			'valid',
			'errored',
			'hovered',
			'raised'
		]);

		let classNames = cx(styles, {
			[styleId]: true,

			disabled: disabled,
			focused: focused,

			primary: primary,
			success: success,
			info: info,
			warning: warning,
			danger: danger,

			valid: valid,
			errored: errored,
			hovered: hovered,
			hidden: hidden,
			raised: raised
			
		});

		return <MessageBase {...newProps} className={classNames} />;
	}
}

Message.defaultProps = {
	styleId: 'default'
};

Message.propTypes = {
	styleId: PropTypes.string,
	disabled: PropTypes.bool,
	focused: PropTypes.bool,

	primary: PropTypes.bool,
	success: PropTypes.bool,
	info: PropTypes.bool,
	warning: PropTypes.bool,
	danger: PropTypes.bool,

	hovered: PropTypes.bool,
	hidden: PropTypes.bool,
	raised: PropTypes.bool
};

if (__DOCS__) {
	Message.docs = {
		componentGroup: 'Atom'
	};
}
