'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _FreezeLayer = require('../FreezeLayer');

var _FreezeLayer2 = _interopRequireDefault(_FreezeLayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FreezeLayer__Default = function (_Component) {
	_inherits(FreezeLayer__Default, _Component);

	function FreezeLayer__Default() {
		_classCallCheck(this, FreezeLayer__Default);

		return _possibleConstructorReturn(this, (FreezeLayer__Default.__proto__ || Object.getPrototypeOf(FreezeLayer__Default)).apply(this, arguments));
	}

	_createClass(FreezeLayer__Default, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(_FreezeLayer2.default, {
					zIndexLevel: 'max_level_2',
					onClick: function onClick(ev) {
						console.log(' default ', 'onClicked ');
					},
					onEscKeyUp: function onEscKeyUp(ev) {
						console.log(' default ', ev.keyCode);
					}
				}),
				_react2.default.createElement(_FreezeLayer2.default, {
					styleId: 'myfreeze',
					zIndexLevel: 'max_level_1',
					onClick: function onClick(ev) {
						console.log(' myfreeze ', 'onClicked ');
					},
					onEscKeyUp: function onEscKeyUp(ev) {
						console.log(' myfreeze ', ev.keyCode);
					}
				})
			);
		}
	}]);

	return FreezeLayer__Default;
}(_react.Component);

exports.default = FreezeLayer__Default;


if (__DOCS__) {
	FreezeLayer__Default.docs = {
		componentGroup: _FreezeLayer2.default.docs.componentGroup
	};
}