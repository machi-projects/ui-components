'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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
	return _react2.default.createElement('div', { style: { background: '#007fff', minHeight: '1rem', marginBottom: '1rem' } });
}

var Layout__default = function (_React$Component) {
	_inherits(Layout__default, _React$Component);

	function Layout__default(props) {
		_classCallCheck(this, Layout__default);

		return _possibleConstructorReturn(this, (Layout__default.__proto__ || Object.getPrototypeOf(Layout__default)).call(this, props));
	}

	_createClass(Layout__default, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				_Grid2.default,
				{ fluid: true },
				_react2.default.createElement(
					_View2.default,
					{ col: true },
					_react2.default.createElement(
						_Box2.default,
						{ xs: 12, sm: 3, md: 2, lg: 1 },
						_react2.default.createElement(_Box2.default, null)
					),
					_react2.default.createElement(
						_Box2.default,
						{ xs: 6, sm: 6, md: 8, lg: 10 },
						_react2.default.createElement(_Box2.default, null)
					),
					_react2.default.createElement(
						_Box2.default,
						{ xs: 6, sm: 3, md: 2, lg: 1 },
						_react2.default.createElement(_Box2.default, null)
					)
				)
			);
		}
	}]);

	return Layout__default;
}(_react2.default.Component);

exports.default = Layout__default;


Layout__default.docs = {
	componentGroup: 'Template'
};