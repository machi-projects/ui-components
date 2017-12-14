import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { i18NProviderUtils } from 'fz-i18n';
import Input from './Input';
import { ErrorMsg } from './Form';
import style from './css/Captcha.css';

export default class Captcha extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		let { maxLength, onBlur, onChange, value, id, captchaUrl, onKeyDown, errorMsg, isValid, onRefresh } = this.props;
		return (
			<div className={style.captcha}>
				<Input maxLength={maxLength} onBlur={onBlur} onKeyDown={onKeyDown} onChange={onChange} id={id} value={value} />
				{isValid ? '' : <ErrorMsg errMsg={errorMsg} />}
				<div className={style.captchImg}>
					<img src={captchaUrl} />
					<span className={style.refresh} onMouseDown={onRefresh}>
						Refresh
					</span>
					<div className={style.clboth} />
				</div>
			</div>
		);
	}
}

Captcha.propTypes = {
	maxLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	value: PropTypes.string,
	id: PropTypes.string,
	captchaUrl: PropTypes.string.isRequired,
	errorMsg: PropTypes.string,
	isValid: PropTypes.bool.isRequired,
	onKeyDown: PropTypes.func,
	onRefresh: PropTypes.func.isRequired,
	onBlur: PropTypes.func,
	onChange: PropTypes.func.isRequired
};
