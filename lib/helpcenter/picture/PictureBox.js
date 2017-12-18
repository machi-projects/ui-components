'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _PictureBoxBase = require('../../js/PictureBoxBase');

var _PictureBoxBase2 = _interopRequireDefault(_PictureBoxBase);

var _picturebox = require('./picturebox.css');

var _picturebox2 = _interopRequireDefault(_picturebox);

var _styleMapping = require('./styleMapping');

var _styleMapping2 = _interopRequireDefault(_styleMapping);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PictureBox = function (_React$Component) {
	_inherits(PictureBox, _React$Component);

	function PictureBox() {
		_classCallCheck(this, PictureBox);

		return _possibleConstructorReturn(this, (PictureBox.__proto__ || Object.getPrototypeOf(PictureBox)).apply(this, arguments));
	}

	_createClass(PictureBox, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    styleId = _props.styleId,
			    src = _props.src,
			    alt = _props.alt;


			var picGroupStyle = _picturebox2.default[styleId];
			var pictureStyMapping = _styleMapping2.default[styleId];

			var picSourceStyle = _picturebox2.default[pictureStyMapping.sourceStyle];
			var picCaptionStyle = _picturebox2.default[pictureStyMapping.captionStyle];

			return _react2.default.createElement(
				_PictureBoxBase2.default,
				{
					src: src,
					alt: alt,
					groupStyle: picGroupStyle,
					sourceStyle: picSourceStyle,
					captionStyle: picCaptionStyle
				},
				this.props.children
			);
		}
	}]);

	return PictureBox;
}(_react2.default.Component);

exports.default = PictureBox;


PictureBox.defaultProps = {
	styleId: 'default'
};

PictureBox.propTypes = {
	styleId: _propTypes2.default.string,
	src: _propTypes2.default.string,
	alt: _propTypes2.default.string,
	isTextHtml: _propTypes2.default.bool
};

if (__DOCS__) {
	PictureBox.docs = {
		componentGroup: 'Atom'
	};
}