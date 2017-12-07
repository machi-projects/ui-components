'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DropDownBase = require('../../js/DropDownBase');

var _DropDownBase2 = _interopRequireDefault(_DropDownBase);

var _index = require('../index');

var _searchbox = require('./searchbox.css');

var _searchbox2 = _interopRequireDefault(_searchbox);

var _styleMapping = require('./styleMapping');

var _styleMapping2 = _interopRequireDefault(_styleMapping);

var _objectUtils = require('../../utils/objectUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DropDownSelection = function (_Component) {
	_inherits(DropDownSelection, _Component);

	function DropDownSelection() {
		_classCallCheck(this, DropDownSelection);

		return _possibleConstructorReturn(this, (DropDownSelection.__proto__ || Object.getPrototypeOf(DropDownSelection)).apply(this, arguments));
	}

	return DropDownSelection;
}(_react.Component);

var DropDownItems = function (_Component2) {
	_inherits(DropDownItems, _Component2);

	function DropDownItems(props) {
		_classCallCheck(this, DropDownItems);

		return _possibleConstructorReturn(this, (DropDownItems.__proto__ || Object.getPrototypeOf(DropDownItems)).call(this, props));
	}

	_createClass(DropDownItems, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				null,
				'MyComponent'
			);
		}
	}]);

	return DropDownItems;
}(_react.Component);

var DropDownItem = function (_Component3) {
	_inherits(DropDownItem, _Component3);

	function DropDownItem(props) {
		_classCallCheck(this, DropDownItem);

		return _possibleConstructorReturn(this, (DropDownItem.__proto__ || Object.getPrototypeOf(DropDownItem)).call(this, props));
	}

	_createClass(DropDownItem, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				null,
				'MyComponent'
			);
		}
	}]);

	return DropDownItem;
}(_react.Component);

var DropDown = function (_Component4) {
	_inherits(DropDown, _Component4);

	function DropDown(props) {
		_classCallCheck(this, DropDown);

		return _possibleConstructorReturn(this, (DropDown.__proto__ || Object.getPrototypeOf(DropDown)).call(this, props));
	}

	_createClass(DropDown, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				null,
				'MyComponent'
			);
		}
	}]);

	return DropDown;
}(_react.Component);

exports.default = DropDown;


DropDown.propTypes = {};

if (__DOCS__) {
	DropDown.docs = {
		componentGroup: 'Atom'
	};
}