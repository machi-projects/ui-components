import _defineProperty from "babel-runtime/helpers/defineProperty";
import _Object$getPrototypeOf from "babel-runtime/core-js/object/get-prototype-of";
import _classCallCheck from "babel-runtime/helpers/classCallCheck";
import _createClass from "babel-runtime/helpers/createClass";
import _possibleConstructorReturn from "babel-runtime/helpers/possibleConstructorReturn";
import _inherits from "babel-runtime/helpers/inherits";

var _DateWidget1$propType;

import React from "react";
import PropTypes from 'prop-types';
import DateTimeComponent from "./DateTime.js";
import Popup from "../Popup.js";
import style from "./DateWidget.css";
import moment from "moment-timezone";

var DateWidget1 = function (_React$Component) {
	_inherits(DateWidget1, _React$Component);

	function DateWidget1() {
		_classCallCheck(this, DateWidget1);

		var _this = _possibleConstructorReturn(this, (DateWidget1.__proto__ || _Object$getPrototypeOf(DateWidget1)).call(this));

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

			value = value ? moment.tz(value, timeZone) : null;
			var displayText = value ? !isDateTime ? value.format(dtPtn) : value.format(dtPtn + " hh:mm A") : "";
			return React.createElement(
				"div",
				null,
				React.createElement(
					"div",
					{ className: isPopupOpen ? style.dateFocus : style.date, "data-testid": "remindMeOnDueDate", onClick: togglePopup, "data-testId": name },
					displayText,
					isPopupOpen && React.createElement(
						"div",
						{ className: position == "top" ? style.dateTop : style.absolute, onClick: removeClose },
						React.createElement(DateTimeComponent, { value: value, isDateTimeField: isDateTime, onSelect: this.handleSelect, timeZone: timeZone,
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
}(React.Component);

DateWidget1.propTypes = (_DateWidget1$propType = {
	id: PropTypes.string.isRequired,
	isReadOnly: PropTypes.bool.isRequired,
	value: PropTypes.string,
	dateTimeSelect: PropTypes.func,
	togglePopup: PropTypes.func,
	onSelect: PropTypes.func,
	removeClose: PropTypes.func,
	name: PropTypes.string
}, _defineProperty(_DateWidget1$propType, "isReadOnly", PropTypes.bool), _defineProperty(_DateWidget1$propType, "minErrorText", PropTypes.string), _defineProperty(_DateWidget1$propType, "maxErrorText", PropTypes.string), _defineProperty(_DateWidget1$propType, "min", PropTypes.string), _defineProperty(_DateWidget1$propType, "max", PropTypes.string), _defineProperty(_DateWidget1$propType, "isPopupOpen", PropTypes.bool), _defineProperty(_DateWidget1$propType, "isDateTime", PropTypes.bool), _defineProperty(_DateWidget1$propType, "dtPtn", PropTypes.string), _defineProperty(_DateWidget1$propType, "position", PropTypes.string), _defineProperty(_DateWidget1$propType, "timeZone", PropTypes.string), _defineProperty(_DateWidget1$propType, "arrowPosition", PropTypes.string), _DateWidget1$propType);

export default Popup(DateWidget1, "date");
export var FormDateWidget = Popup(DateWidget1);