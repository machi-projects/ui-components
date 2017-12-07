'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _documentEventSystem = require('../utils/documentEventSystem');

var _documentEventSystem2 = _interopRequireDefault(_documentEventSystem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//import windowEventSystem from '../utils/windowEventSystem';

var GlobalEventsLayerBase = function (_Component) {
	_inherits(GlobalEventsLayerBase, _Component);

	function GlobalEventsLayerBase() {
		_classCallCheck(this, GlobalEventsLayerBase);

		return _possibleConstructorReturn(this, (GlobalEventsLayerBase.__proto__ || Object.getPrototypeOf(GlobalEventsLayerBase)).apply(this, arguments));
	}

	_createClass(GlobalEventsLayerBase, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (this.props.click) {
				_documentEventSystem2.default.subscription('click', this.props.click);
			}

			if (this.props.keyup) {
				_documentEventSystem2.default.subscription('keyup', this.props.keyup);
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			if (this.props.click) {
				_documentEventSystem2.default.unSubscription('click', this.props.click);
			}

			if (this.props.keyup) {
				_documentEventSystem2.default.unSubscription('keyup', this.props.keyup);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			return null;
		}
	}]);

	return GlobalEventsLayerBase;
}(_react.Component);

exports.default = GlobalEventsLayerBase;