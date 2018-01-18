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

var _PictureBoxBase = require('./PictureBoxBase');

var _PictureBoxBase2 = _interopRequireDefault(_PictureBoxBase);

var _PlainTextBase = require('./PlainTextBase');

var _PlainTextBase2 = _interopRequireDefault(_PlainTextBase);

var _IconSvgBase = require('./IconSvgBase');

var _IconSvgBase2 = _interopRequireDefault(_IconSvgBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FrameShapeBase = function (_React$Component) {
	_inherits(FrameShapeBase, _React$Component);

	function FrameShapeBase() {
		_classCallCheck(this, FrameShapeBase);

		return _possibleConstructorReturn(this, (FrameShapeBase.__proto__ || Object.getPrototypeOf(FrameShapeBase)).apply(this, arguments));
	}

	_createClass(FrameShapeBase, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    type = _props.type,
			    name = _props.name,
			    picture = _props.picture,
			    text = _props.text,
			    iconId = _props.iconId,
			    frameStyle = _props.frameStyle,
			    iconStyle = _props.iconStyle,
			    textStyle = _props.textStyle,
			    picStyles = _props.picStyles,
			    onPictureError = _props.onPictureError;


			var frameContent = null;
			if (type == 'picture') {
				frameContent = _react2.default.createElement(_PictureBoxBase2.default, _extends({ alt: name, src: picture }, picStyles, { onError: onPictureError }));
			} else if (type == 'text') {
				frameContent = _react2.default.createElement(_PlainTextBase2.default, { className: textStyle, text: text });
			} else if (type == 'icon') {
				frameContent = _react2.default.createElement(_IconSvgBase2.default, { className: iconStyle, icon: iconId });
			}

			return _react2.default.createElement(
				'div',
				{ className: frameStyle },
				frameContent
			);
		}
	}]);

	return FrameShapeBase;
}(_react2.default.Component);

exports.default = FrameShapeBase;


FrameShapeBase.propTypes = {
	id: _propTypes2.default.string,
	type: _propTypes2.default.oneOf(['picture', 'text', 'icon']),
	name: _propTypes2.default.string,
	picture: _propTypes2.default.string,
	text: _propTypes2.default.string,
	iconId: _propTypes2.default.string,
	onPictureError: _propTypes2.default.func,

	textStyle: _propTypes2.default.string,
	frameStyle: _propTypes2.default.string,
	iconStyle: _propTypes2.default.string,

	picStyles: _propTypes2.default.shape({
		groupStyle: _propTypes2.default.string,
		sourceStyle: _propTypes2.default.string,
		captionStyle: _propTypes2.default.string
	})
};