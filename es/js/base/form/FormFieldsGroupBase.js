import _Object$assign from 'babel-runtime/core-js/object/assign';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _Object$keys from 'babel-runtime/core-js/object/keys';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { omit } from '../../../utils/objectUtils';

var FormFieldsGroupBase = function (_Component) {
	_inherits(FormFieldsGroupBase, _Component);

	function FormFieldsGroupBase(props) {
		_classCallCheck(this, FormFieldsGroupBase);

		var _this = _possibleConstructorReturn(this, (FormFieldsGroupBase.__proto__ || _Object$getPrototypeOf(FormFieldsGroupBase)).call(this, props));

		_this.state = {
			errored: false,
			validate: props.validate,
			validFields: {},
			inValidFields: {}
		};
		return _this;
	}

	_createClass(FormFieldsGroupBase, [{
		key: 'onPassValidationItem',
		value: function onPassValidationItem(onPassValidationCallback) {
			var _this2 = this;

			return function (fieldId, fieldVal, el) {
				onPassValidationCallback && onPassValidationCallback(fieldId, fieldVal, el);

				if (_this2.state.validate) {
					_this2.setState(function (state) {
						state.validFields[fieldId] = fieldVal;
						state.inValidFields = omit(state.inValidFields, fieldId);
						state.validate = false;
						state.errored = false;

						return state;
					}, function () {
						_Object$keys(state.inValidFields).length == 0 && _this2.props.onPassValidation && _this2.props.onPassValidation(_this2.state.validatedFields);
					});
				}
			};
		}
	}, {
		key: 'onFailValidationItem',
		value: function onFailValidationItem(onFailValidationCallback) {
			var _this3 = this;

			return function (fieldId, rule, message, el) {
				onFailValidationCallback && onFailValidationCallback(fieldId, rule, message, el);
				if (_this3.state.validate) {
					_this3.setState(function (state) {
						state.inValidFields[fieldId] = _defineProperty({}, rule, message);
						state.validFields = omit(state.validFields, fieldId);
						state.validate = false;
						state.errored = true;
						return state;
					}, function () {
						_this3.props.onFailValidation && _this3.props.onFailValidation(_this3.state.inValidFields);
					});
				}
			};
		}
	}, {
		key: 'render',
		value: function render() {
			var _this4 = this;

			var formFieldsGroupStyle = this.props.formFieldsGroupStyle;


			return React.createElement(
				'div',
				{ className: formFieldsGroupStyle, tabIndex: '-1' },
				React.Children.map(this.props.children, function (child, i) {
					return React.cloneElement(child, {
						key: i,
						validation: _Object$assign({}, child.props.validation, {
							validate: _this4.state.validate
						}),
						onPassValidation: _this4.onPassValidationItem(child.props.onPassValidation),
						onFailValidation: _this4.onFailValidationItem(child.props.onFailValidation)
					});
				})
			);
		}
	}]);

	return FormFieldsGroupBase;
}(Component);

export default FormFieldsGroupBase;


FormFieldsGroupBase.propTypes = {
	formFieldsGroupStyle: PropTypes.string,

	validate: PropTypes.bool,
	onFailValidation: PropTypes.func,
	onPassValidation: PropTypes.func,

	children: PropTypes.oneOfType([PropTypes.shape({ name: PropTypes.oneOf(['FormFieldSetBase']) }), PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.oneOf(['FormFieldSetBase']) }))])
};