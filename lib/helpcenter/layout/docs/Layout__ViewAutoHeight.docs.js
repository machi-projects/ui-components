'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Grid = require('../Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _Box = require('../Box');

var _Box2 = _interopRequireDefault(_Box);

var _View = require('../View');

var _View2 = _interopRequireDefault(_View);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function YourContent() {
	return _react2.default.createElement(
		'div',
		{ style: { background: '#007fff', minHeight: '1rem' } },
		'asdas'
	);
}

var Layout__ViewAutoHeight = function (_Component) {
	_inherits(Layout__ViewAutoHeight, _Component);

	function Layout__ViewAutoHeight(props) {
		_classCallCheck(this, Layout__ViewAutoHeight);

		return _possibleConstructorReturn(this, (Layout__ViewAutoHeight.__proto__ || Object.getPrototypeOf(Layout__ViewAutoHeight)).call(this, props));
	}

	_createClass(Layout__ViewAutoHeight, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				_Grid2.default,
				{ style: { width: '100%' } },
				_react2.default.createElement(
					_View2.default,
					{ style: { height: '100vh', flexDirection: 'column' } },
					_react2.default.createElement(
						_Box2.default,
						{
							style: {
								background: 'blue'
							}
						},
						'Header'
					),
					_react2.default.createElement(_Box2.default, {
						xs: true,
						sm: true,
						md: true,
						lg: true,
						style: {
							background: 'gray'
						}
					})
				)
			);
		}
	}]);

	return Layout__ViewAutoHeight;
}(_react.Component);

exports.default = Layout__ViewAutoHeight;

if (__DOCS__) {
	Layout__ViewAutoHeight.docs = {
		componentGroup: 'Template'
	};
}