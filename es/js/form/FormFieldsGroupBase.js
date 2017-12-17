import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _Object$keys from 'babel-runtime/core-js/object/keys';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { omit } from '../../utils/objectUtils';

var getTotalFieldsCount = function getTotalFieldsCount(fieldChildren) {

	var count = 0;
	React.Children.map(fieldChildren, function (child, i) {
		if (child) {
			count += 1;
		}
	});

	return count;
};

var FormFieldsGroupBase = function (_Component) {
	_inherits(FormFieldsGroupBase, _Component);

	function FormFieldsGroupBase(props) {
		_classCallCheck(this, FormFieldsGroupBase);

		var _this = _possibleConstructorReturn(this, (FormFieldsGroupBase.__proto__ || _Object$getPrototypeOf(FormFieldsGroupBase)).call(this, props));

		_this.state = {
			errored: false,
			validate: props.validate,
			validFields: {},
			inValidFields: {},
			totalFieldsCount: props.totalFieldsCount ? nextProps.totalFieldsCount : getTotalFieldsCount(props.children)
		};

		_this.reseSetDoneFieldsCount();
		_this.onValidationDone = _this.onValidationDone.bind(_this);
		_this.getDoneFieldsCount = _this.getDoneFieldsCount.bind(_this);
		_this.reseSetDoneFieldsCount = _this.reseSetDoneFieldsCount.bind(_this);
		_this.addDoneFieldsCount = _this.addDoneFieldsCount.bind(_this);

		return _this;
	}

	_createClass(FormFieldsGroupBase, [{
		key: 'getDoneFieldsCount',
		value: function getDoneFieldsCount() {
			return this.doneFieldsCount;
		}
	}, {
		key: 'reseSetDoneFieldsCount',
		value: function reseSetDoneFieldsCount() {
			this.doneFieldsCount = 0;
		}
	}, {
		key: 'addDoneFieldsCount',
		value: function addDoneFieldsCount() {
			this.doneFieldsCount = this.doneFieldsCount + 1;
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {

			if (nextProps.validate !== this.state.validate) {
				this.setState({
					validate: nextProps.validate,
					totalFieldsCount: nextProps.totalFieldsCount ? nextProps.totalFieldsCount : getTotalFieldsCount(nextProps.children)
				});
			}
		}
	}, {
		key: 'onValidationDone',
		value: function onValidationDone() {

			var numOfInvalidFields = _Object$keys(this.state.inValidFields).length;
			var numOfValidFields = _Object$keys(this.state.validFields).length;
			if (numOfInvalidFields > 0) {
				this.props.onFailValidation && this.props.onFailValidation(this.state.inValidFields);
			} else {
				this.props.onPassValidation && this.props.onPassValidation(this.state.validatedFields);
			}
			this.reseSetDoneFieldsCount();
		}
	}, {
		key: 'onPassValidationItem',
		value: function onPassValidationItem(fieldId, fieldVal, el) {
			var _this2 = this;

			this.setState(function (state) {
				state.validFields[fieldId] = fieldVal;
				state.inValidFields = omit(state.inValidFields, fieldId);
				state.validate = false;
				state.errored = false;
				return state;
			}, function () {

				_this2.addDoneFieldsCount();
				console.log(_this2.getDoneFieldsCount());
				if (_this2.getDoneFieldsCount() === _this2.state.totalFieldsCount) {
					_this2.onValidationDone();
				}
			});
		}
	}, {
		key: 'onFailValidationItem',
		value: function onFailValidationItem(fieldId, rule, message, el) {
			var _this3 = this;

			this.setState(function (state) {
				state.inValidFields[fieldId] = _defineProperty({}, rule, message);
				state.validFields = omit(state.validFields, fieldId);
				state.validate = false;
				state.errored = true;
				return state;
			}, function () {

				_this3.addDoneFieldsCount();
				console.log(_this3.getDoneFieldsCount());
				if (_this3.getDoneFieldsCount() === _this3.state.totalFieldsCount) {
					_this3.onValidationDone();
				}
			});
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
					return child ? React.cloneElement(child, {
						key: i,
						validate: _this4.state.validate,
						onPassValidation: function onPassValidation(fieldId, fieldVal, el) {
							child.props.onPassValidation && child.props.onPassValidation(fieldId, fieldVal, el);
							_this4.state.validate && _this4.onPassValidationItem(fieldId, fieldVal, el);
						},
						onFailValidation: function onFailValidation(fieldId, rule, message, el) {
							child.props.onFailValidation && child.props.onFailValidation(fieldId, rule, message, el);
							_this4.state.validate && _this4.onFailValidationItem(fieldId, rule, message, el);
						}
					}) : null;
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

	totalFieldsCount: PropTypes.number,
	children: PropTypes.oneOfType([PropTypes.shape({ name: PropTypes.oneOf(['FormFieldSetBase']) }), PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.oneOf(['FormFieldSetBase']) }))])
};