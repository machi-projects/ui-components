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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PictureBox__Default = function (_Component) {
	_inherits(PictureBox__Default, _Component);

	function PictureBox__Default() {
		_classCallCheck(this, PictureBox__Default);

		return _possibleConstructorReturn(this, (PictureBox__Default.__proto__ || Object.getPrototypeOf(PictureBox__Default)).apply(this, arguments));
	}

	_createClass(PictureBox__Default, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(_index.PictureBox, { styleId: 'mypicture', src: 'https://my.com/img/mycom.png', alt: 'mycom' }),
				_react2.default.createElement('br', null),
				_react2.default.createElement(
					_index.PictureBox,
					{ src: 'https://my.com/img/mycom.png', alt: 'mycom' },
					' This ',
					_react2.default.createElement(
						'b',
						null,
						' is '
					),
					' my figure '
				)
			);
		}
	}]);

	return PictureBox__Default;
}(_react.Component);

exports.default = PictureBox__Default;


if (__DOCS__) {

	PictureBox__Default.docs = {
		componentGroup: _index.PictureBox.docs.componentGroup
	};
}