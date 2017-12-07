import _createClass from 'babel-runtime/helpers/createClass';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DropDownBase, { DropDownItemsBase, DropDownItemBase } from '../../js/DropDownBase';
import { InputText } from '../index';
import { Icon } from '../index';

import styles from './searchbox.css';
import styleMapping from './styleMapping';
import { omit } from '../../utils/objectUtils';

var DropDownSelection = function (_Component) {
	_inherits(DropDownSelection, _Component);

	function DropDownSelection() {
		_classCallCheck(this, DropDownSelection);

		return _possibleConstructorReturn(this, (DropDownSelection.__proto__ || _Object$getPrototypeOf(DropDownSelection)).apply(this, arguments));
	}

	return DropDownSelection;
}(Component);

var DropDownItems = function (_Component2) {
	_inherits(DropDownItems, _Component2);

	function DropDownItems(props) {
		_classCallCheck(this, DropDownItems);

		return _possibleConstructorReturn(this, (DropDownItems.__proto__ || _Object$getPrototypeOf(DropDownItems)).call(this, props));
	}

	_createClass(DropDownItems, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				'MyComponent'
			);
		}
	}]);

	return DropDownItems;
}(Component);

var DropDownItem = function (_Component3) {
	_inherits(DropDownItem, _Component3);

	function DropDownItem(props) {
		_classCallCheck(this, DropDownItem);

		return _possibleConstructorReturn(this, (DropDownItem.__proto__ || _Object$getPrototypeOf(DropDownItem)).call(this, props));
	}

	_createClass(DropDownItem, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				'MyComponent'
			);
		}
	}]);

	return DropDownItem;
}(Component);

var DropDown = function (_Component4) {
	_inherits(DropDown, _Component4);

	function DropDown(props) {
		_classCallCheck(this, DropDown);

		return _possibleConstructorReturn(this, (DropDown.__proto__ || _Object$getPrototypeOf(DropDown)).call(this, props));
	}

	_createClass(DropDown, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				'MyComponent'
			);
		}
	}]);

	return DropDown;
}(Component);

export default DropDown;


DropDown.propTypes = {};

if (__DOCS__) {
	DropDown.docs = {
		componentGroup: 'Atom'
	};
}