'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _hoistNonReactStatics = require('hoist-non-react-statics');

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var _viewport = require('../../utils/viewport');

var _viewport2 = _interopRequireDefault(_viewport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var popups = {};
global.closeGroupPopups = function (groupName) {
	var groupPopups = popups[groupName] || [];
	groupPopups.forEach(function (popup) {
		popup.state.isPopupOpen && popup.setState({
			isPopupOpen: false
		});
	});
};

var Popup = function Popup(Component) {
	var group = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'global';

	var Popup = function (_React$Component) {
		_inherits(Popup, _React$Component);

		function Popup(props) {
			_classCallCheck(this, Popup);

			var _this = _possibleConstructorReturn(this, (Popup.__proto__ || Object.getPrototypeOf(Popup)).call(this, props));

			_this.state = { isPopupOpen: false, position: 'bottom', height: '0px', isPopupReady: false };
			_this.togglePopup = _this.togglePopup.bind(_this);
			_this.documentClickHandler = _this.documentClickHandler.bind(_this);
			_this.removeClose = _this.removeClose.bind(_this);
			_this.documentKeyupHandler = _this.documentKeyupHandler.bind(_this);
			_this.openPopupOnly = _this.openPopupOnly.bind(_this);
			_this.closePopupOnly = _this.closePopupOnly.bind(_this);
			_this.setRef = _this.setRef.bind(_this);
			return _this;
		}

		_createClass(Popup, [{
			key: 'setRef',
			value: function setRef(el) {
				this.elementRef = el;
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				var groupPopups = popups[group] || [];
				groupPopups.push(this);
				popups[group] = groupPopups;
				if (groupPopups.length == 1) {
					document.addEventListener('click', this.documentClickHandler, false);
					document.addEventListener('keyup', this.documentKeyupHandler, false);
				}
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				var _this2 = this;

				popups = Object.keys(popups).reduce(function (res, groupName) {
					if (groupName == group) {
						var groupPopups = popups[group];
						var newGroupPopups = groupPopups.filter(function (popup) {
							return popup !== _this2;
						});
						res[group] = newGroupPopups;
					}
					return res;
				}, popups);

				if (popups.length == 0) {
					document.removeEventListener('click', this.documentClickHandler);
					document.removeEventListener('keyup', this.documentKeyupHandler);
				}
			}
		}, {
			key: 'togglePopup',
			value: function togglePopup(e, dropElement, placeHoldeEl) {
				var _this3 = this;

				this.removeClose(e);
				var groupPopups = popups[group];
				groupPopups.forEach(function (popup) {
					if (popup != _this3) {
						popup.state.isPopupOpen && popup.setState({
							isPopupOpen: false,
							position: 'bottom'
						});
					}
				});

				this.setState({ isPopupOpen: !this.state.isPopupOpen, isPopupReady: false, position: 'bottom' }, function () {

					if (!dropElement || !placeHoldeEl) {
						return;
					};

					requestAnimationFrame(function () {

						var frame = _this3.props.frameId ? document.getElementById(_this3.props.frameId) : null;
						var defaultPosition = _this3.props.defaultPosition || "bottomCenter";
						var betterPosition = _viewport2.default.betterView(dropElement, placeHoldeEl, defaultPosition, frame);

						//Auto predict views
						if (betterPosition.view) {
							_this3.setState({ isPopupReady: true, position: betterPosition.view });
						} else {
							_this3.setState({ isPopupReady: true, position: defaultPosition });
						}
					});
				});
			}
		}, {
			key: 'openPopupOnly',
			value: function openPopupOnly(e) {
				this.removeClose(e);
				this.setState({ isPopupOpen: true, isPopupReady: true });
			}
		}, {
			key: 'closePopupOnly',
			value: function closePopupOnly(e) {
				this.removeClose(e);
				this.setState({ isPopupOpen: false, isPopupReady: false });
			}
		}, {
			key: 'documentClickHandler',
			value: function documentClickHandler(e) {
				try {
					Object.keys(popups).forEach(function (groupName) {
						var groupPopups = popups[groupName];
						groupPopups.forEach(function (popup) {
							popup.state.isPopupOpen && popup.setState({
								isPopupOpen: false
							});
						});
					});
				} catch (e) {
					console.error('popup component not unmounted properly', e);
				}
			}
		}, {
			key: 'documentKeyupHandler',
			value: function documentKeyupHandler(e) {
				try {
					if (e.keyCode == 27) {
						Object.keys(popups).forEach(function (groupName) {
							var groupPopups = popups[groupName];
							groupPopups.forEach(function (popup) {
								popup.state.isPopupOpen && popup.setState({
									isPopupOpen: false
								});
							});
						});
					}
				} catch (e) {
					console.log('error', e);
				}
			}
		}, {
			key: 'removeClose',
			value: function removeClose(e) {
				e.stopPropagation && e.stopPropagation();
				e.nativeEvent && e.nativeEvent.stopImmediatePropagation && e.nativeEvent.stopImmediatePropagation();
			}
		}, {
			key: 'render',
			value: function render() {

				return _react2.default.createElement(Component, _extends({
					ref: this.setRef
				}, this.props, this.state, {
					openPopupOnly: this.openPopupOnly,
					closePopupOnly: this.closePopupOnly,
					togglePopup: this.togglePopup,
					isPopupOpen: this.state.isPopupOpen,
					removeClose: this.removeClose
				}));
			}
		}]);

		return Popup;
	}(_react2.default.Component);

	return (0, _hoistNonReactStatics2.default)(Popup, Component);
};

exports.default = Popup;