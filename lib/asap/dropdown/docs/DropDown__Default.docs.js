'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = require('../index');

var _index2 = require('../../index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DropDown__Default = function (_Component) {
	_inherits(DropDown__Default, _Component);

	function DropDown__Default() {
		_classCallCheck(this, DropDown__Default);

		return _possibleConstructorReturn(this, (DropDown__Default.__proto__ || Object.getPrototypeOf(DropDown__Default)).apply(this, arguments));
	}

	_createClass(DropDown__Default, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					_index.DropDown,
					{ selectedItem: 'D' },
					_react2.default.createElement(DropDownSelection, {
						showOnSelection: function showOnSelection(selectedItem) {
							return 'sdasd';
						}
					}),
					_react2.default.createElement(_index2.SearchBox, { styleId: 'mysearch', viewOrder: ['textbox', 'searchIcon'] }),
					_react2.default.createElement(
						DropDownItems,
						null,
						_react2.default.createElement(
							DropDownItem,
							{ value: 'A' },
							' Apple '
						),
						_react2.default.createElement(
							DropDownItem,
							{ value: 'B' },
							' Banana '
						),
						_react2.default.createElement(
							DropDownItem,
							{ value: 'C' },
							' Car '
						),
						_react2.default.createElement(
							DropDownItem,
							{ value: 'D' },
							' Dog '
						),
						_react2.default.createElement(
							DropDownItem,
							{ value: 'E' },
							' Earned '
						),
						_react2.default.createElement(
							DropDownItem,
							{ value: 'G' },
							' sfff '
						)
					)
				)
			);
		}
	}]);

	return DropDown__Default;
}(_react.Component);

exports.default = DropDown__Default;


if (__DOCS__) {
	DropDown__Default.docs = {
		componentGroup: _index.DropDown.docs.componentGroup
	};
}