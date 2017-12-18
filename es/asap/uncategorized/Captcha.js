import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { i18NProviderUtils } from 'fz-i18n';
import Input from './Input';
import { ErrorMsg } from './Form';
import style from './css/Captcha.css';

var Captcha = function (_Component) {
	_inherits(Captcha, _Component);

	function Captcha(props) {
		_classCallCheck(this, Captcha);

		return _possibleConstructorReturn(this, (Captcha.__proto__ || _Object$getPrototypeOf(Captcha)).call(this, props));
	}

	_createClass(Captcha, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    maxLength = _props.maxLength,
			    onBlur = _props.onBlur,
			    onChange = _props.onChange,
			    value = _props.value,
			    id = _props.id,
			    captchaUrl = _props.captchaUrl,
			    onKeyDown = _props.onKeyDown,
			    errorMsg = _props.errorMsg,
			    isValid = _props.isValid,
			    onRefresh = _props.onRefresh;

			return React.createElement(
				'div',
				{ className: style.captcha },
				React.createElement(Input, { maxLength: maxLength, onBlur: onBlur, onKeyDown: onKeyDown, onChange: onChange, id: id, value: value }),
				isValid ? '' : React.createElement(ErrorMsg, { errMsg: errorMsg }),
				React.createElement(
					'div',
					{ className: style.captchImg },
					React.createElement('img', { src: captchaUrl }),
					React.createElement(
						'span',
						{ className: style.refresh, onMouseDown: onRefresh },
						'Refresh'
					),
					React.createElement('div', { className: style.clboth })
				)
			);
		}
	}]);

	return Captcha;
}(Component);

export default Captcha;


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