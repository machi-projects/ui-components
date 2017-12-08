"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.FormDateWidget = undefined;

var _DateWidget1$propType;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DateTime = require("./DateTime.js");

var _DateTime2 = _interopRequireDefault(_DateTime);

var _Popup = require("../Popup.js");

var _Popup2 = _interopRequireDefault(_Popup);

var _DateWidget = require("./DateWidget.css");

var _DateWidget2 = _interopRequireDefault(_DateWidget);

var _momentTimezone = require("moment-timezone");

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateWidget1 = function (_React$Component) {
	_inherits(DateWidget1, _React$Component);

	function DateWidget1() {
		_classCallCheck(this, DateWidget1);

		var _this = _possibleConstructorReturn(this, (DateWidget1.__proto__ || Object.getPrototypeOf(DateWidget1)).call(this));

		_this.handleSelect = _this.handleSelect.bind(_this);
		return _this;
	}

	_createClass(DateWidget1, [{
		key: "render",
		value: function render() {
			var _props = this.props,
			    togglePopup = _props.togglePopup,
			    removeClose = _props.removeClose,
			    value = _props.value,
			    id = _props.id,
			    name = _props.name,
			    isReadOnly = _props.isReadOnly,
			    minErrorText = _props.minErrorText,
			    maxErrorText = _props.maxErrorText,
			    min = _props.min,
			    max = _props.max,
			    isPopupOpen = _props.isPopupOpen,
			    isDateTime = _props.isDateTime,
			    dtPtn = _props.dtPtn,
			    position = _props.position,
			    timeZone = _props.timeZone,
			    arrowPosition = _props.arrowPosition;

			value = value ? _momentTimezone2.default.tz(value, timeZone) : null;
			var displayText = value ? !isDateTime ? value.format(dtPtn) : value.format(dtPtn + " hh:mm A") : "";
			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					"div",
					{ className: isPopupOpen ? _DateWidget2.default.dateFocus : _DateWidget2.default.date, "data-testid": "remindMeOnDueDate", onClick: togglePopup, "data-testId": name },
					displayText,
					isPopupOpen && _react2.default.createElement(
						"div",
						{ className: position == "top" ? _DateWidget2.default.dateTop : _DateWidget2.default.absolute, onClick: removeClose },
						_react2.default.createElement(_DateTime2.default, { value: value, isDateTimeField: isDateTime, onSelect: this.handleSelect, timeZone: timeZone,
							position: position == "top" ? "top" : arrowPosition, min: min, max: max, maxErrorText: maxErrorText, minErrorText: minErrorText })
					)
				)
			);
		}
	}, {
		key: "handleSelect",
		value: function handleSelect(userZoneSelectedTime, e) {
			var _props2 = this.props,
			    id = _props2.id,
			    onSelect = _props2.onSelect,
			    togglePopup = _props2.togglePopup;

			togglePopup(e);
			onSelect(userZoneSelectedTime ? userZoneSelectedTime.utc().format() : "", id);
		}
	}]);

	return DateWidget1;
}(_react2.default.Component);

DateWidget1.propTypes = (_DateWidget1$propType = {
	id: _propTypes2.default.string.isRequired,
	isReadOnly: _propTypes2.default.bool.isRequired,
	value: _propTypes2.default.string,
	dateTimeSelect: _propTypes2.default.func,
	togglePopup: _propTypes2.default.func,
	onSelect: _propTypes2.default.func,
	removeClose: _propTypes2.default.func,
	name: _propTypes2.default.string
}, _defineProperty(_DateWidget1$propType, "isReadOnly", _propTypes2.default.bool), _defineProperty(_DateWidget1$propType, "minErrorText", _propTypes2.default.string), _defineProperty(_DateWidget1$propType, "maxErrorText", _propTypes2.default.string), _defineProperty(_DateWidget1$propType, "min", _propTypes2.default.string), _defineProperty(_DateWidget1$propType, "max", _propTypes2.default.string), _defineProperty(_DateWidget1$propType, "isPopupOpen", _propTypes2.default.bool), _defineProperty(_DateWidget1$propType, "isDateTime", _propTypes2.default.bool), _defineProperty(_DateWidget1$propType, "dtPtn", _propTypes2.default.string), _defineProperty(_DateWidget1$propType, "position", _propTypes2.default.string), _defineProperty(_DateWidget1$propType, "timeZone", _propTypes2.default.string), _defineProperty(_DateWidget1$propType, "arrowPosition", _propTypes2.default.string), _DateWidget1$propType);

exports.default = (0, _Popup2.default)(DateWidget1, "date");
var FormDateWidget = exports.FormDateWidget = (0, _Popup2.default)(DateWidget1);