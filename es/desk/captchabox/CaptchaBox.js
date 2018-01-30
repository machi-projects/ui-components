import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { InputText } from '../index';

import { Icon } from '../index';

import styles from './captchabox.css';
import inputStyles from '../input/inputtext/inputtext.css';
import styleMapping from './styleMapping';

import cx from '../../utils/classNamesUtils/classNamesBind';

var CaptchaBox = function (_Component) {
	_inherits(CaptchaBox, _Component);

	function CaptchaBox() {
		_classCallCheck(this, CaptchaBox);

		return _possibleConstructorReturn(this, (CaptchaBox.__proto__ || _Object$getPrototypeOf(CaptchaBox)).apply(this, arguments));
	}

	_createClass(CaptchaBox, [{
		key: 'render',
		value: function render() {
			var _cx;

			var _props = this.props,
			    styleId = _props.styleId,
			    disabled = _props.disabled,
			    focused = _props.focused,
			    errored = _props.errored,
			    valid = _props.valid,
			    raised = _props.raised;


			var classNames = cx(styles, (_cx = {}, _defineProperty(_cx, styleId, true), _defineProperty(_cx, 'disabled', disabled), _defineProperty(_cx, 'focused', focused), _defineProperty(_cx, 'errored', errored), _defineProperty(_cx, 'valid', valid), _defineProperty(_cx, 'raised', raised), _cx));

			var styleMappings = styleMapping[styleId];
			var textboxViewStyle = styles[styleMappings.textboxViewStyle];
			var captchaInnerViewStyle = styles[styleMappings.captchaInnerView];
			var captchaImgStyle = styles[styleMappings.captchaImgStyle];
			var refreshStyle = styles[styleMappings.refreshStyle];

			var inputStyleId = styleMappings.inputStyleId;

			var _props2 = this.props,
			    value = _props2.value,
			    maxLength = _props2.maxLength,
			    placeholder = _props2.placeholder,
			    getValue = _props2.getValue,
			    captchaUrl = _props2.captchaUrl,
			    onRefresh = _props2.onRefresh,
			    getElementRef = _props2.getElementRef,
			    onChange = _props2.onChange,
			    validation = _props2.validation,
			    onFailValidation = _props2.onFailValidation,
			    onPassValidation = _props2.onPassValidation;


			return React.createElement(
				'div',
				{ className: classNames },
				React.createElement('div', { className: textboxViewStyle }),
				React.createElement(
					'div',
					{ className: captchaInnerViewStyle },
					React.createElement('img', { className: styles.captchaImgStyle, src: captchaUrl }),
					React.createElement(
						'span',
						{ className: refreshStyle, onClick: onRefresh },
						React.createElement(Icon, { id: 'refresh', color: 'dustyGray', styleId: 'refresh_icon' })
					),
					React.createElement(InputText, { type: 'text',
						styleId: inputStyleId,
						placeholder: placeholder,
						maxLength: maxLength,
						value: value,
						onChange: onChange,
						getElementRef: getElementRef,
						getValue: getValue,
						validation: validation,
						onFailValidation: onFailValidation,
						onPassValidation: onPassValidation
					})
				)
			);
		}
	}]);

	return CaptchaBox;
}(Component);

export default CaptchaBox;


CaptchaBox.defaultProps = {
	styleId: "default"
};

CaptchaBox.propTypes = {

	styleId: PropTypes.string,
	placeholder: PropTypes.string,
	maxLength: PropTypes.string,
	value: PropTypes.string,
	getValue: PropTypes.func,
	getElementRef: PropTypes.func,

	onChange: PropTypes.func,
	onRefresh: PropTypes.func,
	captchaUrl: PropTypes.string.isRequired,

	onFailValidation: PropTypes.func,
	onPassValidation: PropTypes.func,

	disabled: PropTypes.bool,
	focused: PropTypes.bool,
	errored: PropTypes.bool,
	valid: PropTypes.bool,
	raised: PropTypes.bool,

	validation: PropTypes.shape({
		validate: PropTypes.bool,
		validateOn: PropTypes.string,
		rules: PropTypes.object,
		rulesOrder: PropTypes.arrayOf(PropTypes.string),
		messages: PropTypes.object
	})

};

if (__DOCS__) {
	CaptchaBox.docs = {
		componentGroup: 'Atom'
	};
}