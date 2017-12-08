'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _SearchBoxBase = require('../../js/SearchBoxBase');

var _SearchBoxBase2 = _interopRequireDefault(_SearchBoxBase);

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

var InputBox = function (_React$Component) {
	_inherits(InputBox, _React$Component);

	function InputBox() {
		_classCallCheck(this, InputBox);

		return _possibleConstructorReturn(this, (InputBox.__proto__ || Object.getPrototypeOf(InputBox)).apply(this, arguments));
	}

	_createClass(InputBox, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    textboxStyle = _props.textboxStyle,
			    inputStyleId = _props.inputStyleId,
			    placeholder = _props.placeholder;

			var newProps = (0, _objectUtils.omit)(this.props, ['textboxStyle', 'inputStyleId']);

			return _react2.default.createElement(
				'div',
				{ className: textboxStyle },
				_react2.default.createElement(_index.InputText, _extends({ type: 'text', styleId: inputStyleId, placeholder: placeholder }, newProps))
			);
		}
	}]);

	return InputBox;
}(_react2.default.Component);

var SearchIcon = function (_React$Component2) {
	_inherits(SearchIcon, _React$Component2);

	function SearchIcon() {
		_classCallCheck(this, SearchIcon);

		return _possibleConstructorReturn(this, (SearchIcon.__proto__ || Object.getPrototypeOf(SearchIcon)).apply(this, arguments));
	}

	_createClass(SearchIcon, [{
		key: 'render',
		value: function render() {
			var _props2 = this.props,
			    onClick = _props2.onClick,
			    iconstyle = _props2.iconstyle,
			    iconInfo = _props2.iconInfo;

			return _react2.default.createElement(
				'div',
				{ className: iconstyle, onClick: onClick },
				_react2.default.createElement(_index.Icon, { styleId: iconInfo.styleId, id: iconInfo.id })
			);
		}
	}]);

	return SearchIcon;
}(_react2.default.Component);

var ClearIcon = function (_SearchIcon) {
	_inherits(ClearIcon, _SearchIcon);

	function ClearIcon() {
		_classCallCheck(this, ClearIcon);

		return _possibleConstructorReturn(this, (ClearIcon.__proto__ || Object.getPrototypeOf(ClearIcon)).apply(this, arguments));
	}

	return ClearIcon;
}(SearchIcon);

var SearchBox = function (_React$Component3) {
	_inherits(SearchBox, _React$Component3);

	function SearchBox() {
		_classCallCheck(this, SearchBox);

		return _possibleConstructorReturn(this, (SearchBox.__proto__ || Object.getPrototypeOf(SearchBox)).apply(this, arguments));
	}

	_createClass(SearchBox, [{
		key: 'render',
		value: function render() {
			var _props3 = this.props,
			    styleId = _props3.styleId,
			    text = _props3.text,
			    placeholder = _props3.placeholder,
			    viewOrder = _props3.viewOrder,
			    searchOn = _props3.searchOn,
			    onChange = _props3.onChange;


			var styleMappings = _styleMapping2.default[styleId];
			var _styleMappings$search = styleMappings.searchIcon,
			    searchIcon = _styleMappings$search === undefined ? {} : _styleMappings$search,
			    _styleMappings$clearI = styleMappings.clearIcon,
			    clearIcon = _styleMappings$clearI === undefined ? {} : _styleMappings$clearI,
			    inputStyleId = styleMappings.inputStyleId;


			var searchBoxStyle = _searchbox2.default[styleId];

			var searchiconStyle = _searchbox2.default['searchicon'];
			var textboxStyle = _searchbox2.default['textbox'];
			var cleariconStyle = _searchbox2.default['clearicon'];

			return _react2.default.createElement(
				_SearchBoxBase2.default,
				{ searchBoxStyle: searchBoxStyle, text: text, searchOn: searchOn, onChange: onChange },
				viewOrder.map(function (item, i) {
					if (item == 'textbox') {
						return _react2.default.createElement(InputBox, { textboxStyle: textboxStyle, inputStyleId: inputStyleId, key: i });
					} else if (item == 'searchIcon') {
						return _react2.default.createElement(SearchIcon, { iconstyle: searchiconStyle, iconInfo: searchIcon, key: i });
					} else if (item == 'clearIcon') {
						return _react2.default.createElement(ClearIcon, { iconstyle: cleariconStyle, iconInfo: clearIcon, key: i });
					}
					return null;
				})
			);
		}
	}]);

	return SearchBox;
}(_react2.default.Component);

exports.default = SearchBox;


SearchBox.defaultProps = {
	styleId: 'default',
	viewOrder: ['textbox', 'searchIcon']
};

SearchBox.propTypes = {
	styleId: _propTypes2.default.string,

	viewOrder: _propTypes2.default.arrayOf(_propTypes2.default.oneOf(['textbox', 'searchIcon', 'clearIcon'])),
	text: _propTypes2.default.string,
	placeholder: _propTypes2.default.string,

	searchOn: _propTypes2.default.string,
	onChange: _propTypes2.default.func
};

if (__DOCS__) {
	SearchBox.docs = {
		componentGroup: 'Atom'
	};
}