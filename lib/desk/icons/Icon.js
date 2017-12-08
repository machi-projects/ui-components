'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _IconSvgBase = require('../../js/IconSvgBase');

var _IconSvgBase2 = _interopRequireDefault(_IconSvgBase);

var _icon = require('./icon.css');

var _icon2 = _interopRequireDefault(_icon);

var _fontsizes = require('../common-css/font-sizes/fontsizes.css');

var _fontsizes2 = _interopRequireDefault(_fontsizes);

var _colors = require('../common-css/colors/colors.css');

var _colors2 = _interopRequireDefault(_colors);

var _iconIdsMapping = require('./iconIdsMapping');

var _iconIdsMapping2 = _interopRequireDefault(_iconIdsMapping);

var _classNames = require('../../utils/classNamesUtils/classNames');

var _classNames2 = _interopRequireDefault(_classNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Icon = function (_Component) {
	_inherits(Icon, _Component);

	function Icon() {
		_classCallCheck(this, Icon);

		return _possibleConstructorReturn(this, (Icon.__proto__ || Object.getPrototypeOf(Icon)).apply(this, arguments));
	}

	_createClass(Icon, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    styleId = _props.styleId,
			    id = _props.id,
			    size = _props.size,
			    color = _props.color,
			    bgColor = _props.bgColor,
			    _props$onClick = _props.onClick,
			    onClick = _props$onClick === undefined ? null : _props$onClick,
			    className = _props.className;


			var classNames = (0, _classNames2.default)(_icon2.default[styleId], _colors2.default['clr_' + color], _colors2.default['bg_' + bgColor], _fontsizes2.default['fs_' + size], _icon2.default[id + '_global']);

			//name={name}

			return _react2.default.createElement(_IconSvgBase2.default, { icon: _iconIdsMapping2.default[id], className: classNames, onClick: onClick });
		}
	}]);

	return Icon;
}(_react.Component);

exports.default = Icon;


Icon.propTypes = {
	styleId: _propTypes2.default.string,
	id: _propTypes2.default.string.isRequired,
	size: _propTypes2.default.string,
	color: _propTypes2.default.string,
	bgColor: _propTypes2.default.string,
	onClick: _propTypes2.default.func
};

if (__DOCS__) {
	Icon.docs = {
		componentGroup: 'Atom'
	};
}

//_global - className {iconId}__global