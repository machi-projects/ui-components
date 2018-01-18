import _extends from 'babel-runtime/helpers/extends';
import _Object$keys from 'babel-runtime/core-js/object/keys';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import ReactDOM from 'react-dom';
import hoistStatics from 'hoist-non-react-statics';
import viewPort from '../../utils/viewport';

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

			var _this = _possibleConstructorReturn(this, (Popup.__proto__ || _Object$getPrototypeOf(Popup)).call(this, props));

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

				popups = _Object$keys(popups).reduce(function (res, groupName) {
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
						var betterPosition = viewPort.betterView(dropElement, placeHoldeEl, defaultPosition, frame);

						//Auto predict views
						if (betterPosition.view == "topCenter") {

							_this3.setState({ isPopupReady: true, position: 'top' });
						} else if (betterPosition.view == "bottomCenter") {

							_this3.setState({ isPopupReady: true, position: 'bottom' });
						} else if (betterPosition.view == "leftCenter") {

							_this3.setState({ isPopupReady: true, position: 'left' });
						} else if (betterPosition.view == "rightCenter") {

							_this3.setState({ isPopupReady: true, position: 'right' });
						} else {

							_this3.setState({ isPopupReady: true, position: 'bottom' });
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
					_Object$keys(popups).forEach(function (groupName) {
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
						_Object$keys(popups).forEach(function (groupName) {
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

				return React.createElement(Component, _extends({
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
	}(React.Component);

	return hoistStatics(Popup, Component);
};

export default Popup;