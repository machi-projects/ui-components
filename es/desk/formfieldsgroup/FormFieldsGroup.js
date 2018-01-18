import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormFieldsGroupBase from '../../js/form/FormFieldsGroupBase';
import styles from './formfieldsgroup.css';

import { omit } from '../../utils/objectUtils';
import cx from '../../utils/classNamesUtils/classNamesBind';

var FormFieldsGroup = function (_Component) {
	_inherits(FormFieldsGroup, _Component);

	function FormFieldsGroup() {
		_classCallCheck(this, FormFieldsGroup);

		return _possibleConstructorReturn(this, (FormFieldsGroup.__proto__ || _Object$getPrototypeOf(FormFieldsGroup)).apply(this, arguments));
	}

	_createClass(FormFieldsGroup, [{
		key: 'render',
		value: function render() {
			var _cx;

			var _props = this.props,
			    styleId = _props.styleId,
			    required = _props.required,
			    disabled = _props.disabled,
			    readOnly = _props.readOnly,
			    hidden = _props.hidden,
			    focused = _props.focused,
			    errored = _props.errored,
			    raised = _props.raised;


			var newProps = omit(this.props, ['className', 'styleId', 'readOnly', 'disabled', 'hidden', 'focused', 'errored', 'raised']);

			var classNames = cx(styles, (_cx = {}, _defineProperty(_cx, styleId, true), _defineProperty(_cx, 'required', required), _defineProperty(_cx, 'disabled', disabled), _defineProperty(_cx, 'readOnly', readOnly), _defineProperty(_cx, 'hidden', hidden), _defineProperty(_cx, 'focused', focused), _defineProperty(_cx, 'errored', errored), _defineProperty(_cx, 'raised', raised), _cx));

			return React.createElement(FormFieldsGroupBase, _extends({}, newProps, { formFieldsGroupStyle: classNames }));
		}
	}]);

	return FormFieldsGroup;
}(Component);

export default FormFieldsGroup;


FormFieldsGroup.defaultProps = {
	styleId: 'default'
};

FormFieldsGroup.propTypes = {
	formFieldsGroupStyle: PropTypes.string,

	focusFieldOnError: PropTypes.bool,
	validate: PropTypes.bool,
	onFailValidation: PropTypes.func,
	onPassValidation: PropTypes.func,

	totalFieldsCount: PropTypes.number,

	children: PropTypes.oneOfType([PropTypes.shape({ name: PropTypes.oneOf(['FormFieldSet']) }), PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.oneOf(['FormFieldSet']) }))]),

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