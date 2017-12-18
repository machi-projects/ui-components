'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _FreezeLayerBase = require('../../js/FreezeLayerBase');

var _FreezeLayerBase2 = _interopRequireDefault(_FreezeLayerBase);

var _freezelayer = require('./freezelayer.css');

var _freezelayer2 = _interopRequireDefault(_freezelayer);

var _zindex = require('../common-css/zindexes/zindex.css');

var _zindex2 = _interopRequireDefault(_zindex);

var _colors = require('../common-css/colors/colors.css');

var _colors2 = _interopRequireDefault(_colors);

var _styleMapping = require('./styleMapping');

var _styleMapping2 = _interopRequireDefault(_styleMapping);

var _classNames = require('../../utils/classNamesUtils/classNames');

var _classNames2 = _interopRequireDefault(_classNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FreezeLayer = function (_React$Component) {
	_inherits(FreezeLayer, _React$Component);

	function FreezeLayer() {
		_classCallCheck(this, FreezeLayer);

		return _possibleConstructorReturn(this, (FreezeLayer.__proto__ || Object.getPrototypeOf(FreezeLayer)).apply(this, arguments));
	}

	_createClass(FreezeLayer, [{
		key: 'render',
		value: function render() {
			var _React$createElement;

			var _props = this.props,
			    styleId = _props.styleId,
			    zIndexLevel = _props.zIndexLevel,
			    onClick = _props.onClick,
			    executeClickOn = _props.executeClickOn,
			    onEscKeyUp = _props.onEscKeyUp,
			    executeEscKeyUpOn = _props.executeEscKeyUpOn;

			var classNames = (0, _classNames2.default)(_freezelayer2.default[styleId], _colors2.default['bg_' + _styleMapping2.default[styleId].bgStyleId], _zindex2.default[zIndexLevel]);

			return _react2.default.createElement(
				_FreezeLayerBase2.default,
				(_React$createElement = {
					onClick: onClick,
					executeClickOn: executeClickOn,
					onEscKeyUp: onEscKeyUp
				}, _defineProperty(_React$createElement, 'executeClickOn', executeClickOn), _defineProperty(_React$createElement, 'executeEscKeyUpOn', executeEscKeyUpOn), _defineProperty(_React$createElement, 'freezeStyle', classNames), _React$createElement),
				this.props.children
			);
		}
	}]);

	return FreezeLayer;
}(_react2.default.Component);

exports.default = FreezeLayer;


FreezeLayer.defaultProps = {
	styleId: 'default',
	zIndex: 'max_level_1'
};

FreezeLayer.propTypes = {
	styleId: _propTypes2.default.string,
	zIndexLevel: _propTypes2.default.string,
	onClick: _propTypes2.default.func,
	executeClickOn: _propTypes2.default.func,
	onEscKeyUp: _propTypes2.default.func,
	executeEscKeyUpOn: _propTypes2.default.func
};

if (__DOCS__) {
	FreezeLayer.docs = {
		componentGroup: 'Atom'
	};
}