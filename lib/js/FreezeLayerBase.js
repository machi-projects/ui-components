'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FreezeLayerBase = function (_Component) {
	_inherits(FreezeLayerBase, _Component);

	function FreezeLayerBase(props) {
		_classCallCheck(this, FreezeLayerBase);

		var _this = _possibleConstructorReturn(this, (FreezeLayerBase.__proto__ || Object.getPrototypeOf(FreezeLayerBase)).call(this, props));

		_this.setRef = _this.setRef.bind(_this);
		_this.onKeyupItem = _this.onKeyupItem.bind(_this);
		_this.onClickItem = _this.onClickItem.bind(_this);
		//this.onMouseOverItem = this.onMouseOverItem.bind(this);
		return _this;
	}

	// componentWillReciveProps(nextProps) {
	// 	if (nextProps.focusOn) {
	// 		requestAnimationFrame(() => {
	// 			this.elementRef.focus();
	// 		});
	// 	}
	// }

	_createClass(FreezeLayerBase, [{
		key: 'setRef',
		value: function setRef(el) {
			this.elementRef = el;
		}
	}, {
		key: 'onKeyupItem',
		value: function onKeyupItem(ev) {
			var _props = this.props,
			    onEscKeyUp = _props.onEscKeyUp,
			    executeEscKeyUpOn = _props.executeEscKeyUpOn;

			if (executeEscKeyUpOn) {
				executeEscKeyUpOn(ev) && ev.keyCode === 27 && onEscKeyUp && onEscKeyUp(ev);
			} else {
				ev.keyCode === 27 && onEscKeyUp && onEscKeyUp(ev);
			}
		}

		// onMouseOverItem() {
		// 	requestAnimationFrame(() => {
		// 		//this.elementRef.focus();
		// 	});
		// }

	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			requestAnimationFrame(function () {
				_this2.elementRef.focus();
			});
		}
	}, {
		key: 'onClickItem',
		value: function onClickItem(ev) {
			var _props2 = this.props,
			    executeClickOn = _props2.executeClickOn,
			    onClick = _props2.onClick;


			if (executeClickOn) {
				executeClickOn(ev) && onClick && onClick(ev);
			} else {
				onClick && onClick(ev);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var freezeStyle = this.props.freezeStyle;

			//onMouseOver={this.onMouseOverItem}

			return _react2.default.createElement('div', {
				ref: this.setRef,
				className: freezeStyle,
				tabIndex: '-1',
				onClick: this.onClickItem,
				onKeyUp: this.onKeyupItem
			});
		}
	}]);

	return FreezeLayerBase;
}(_react.Component);

exports.default = FreezeLayerBase;


FreezeLayerBase.propTypes = {
	freezeStyle: _propTypes2.default.string,
	onClick: _propTypes2.default.func,
	executeClickOn: _propTypes2.default.func,
	onEscKeyUp: _propTypes2.default.func,
	executeEscKeyUpOn: _propTypes2.default.func
};