import _Object$getPrototypeOf from "babel-runtime/core-js/object/get-prototype-of";
import _classCallCheck from "babel-runtime/helpers/classCallCheck";
import _createClass from "babel-runtime/helpers/createClass";
import _possibleConstructorReturn from "babel-runtime/helpers/possibleConstructorReturn";
import _inherits from "babel-runtime/helpers/inherits";
import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { i18NProviderUtils } from 'fz-i18n';
import CalendarComponent from './CalendarComponent.js';
import TimeField from './TimeField.js';
import DropdownComponent from './DropdownComponent.js';
import style from "./DateTime.css";
import moment from "moment-timezone";
import selectn from "selectn";

var monthend = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var monthname = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function title(dat, year, month) {
	if (month == 1) {
		monthend[1] = year % 400 == 0 || year % 4 == 0 && year % 100 != 0 ? 29 : 28;
	}
	var showheadingtxt = monthname[month] + ' ' + year;
	return showheadingtxt;
}

var DateTime = function (_React$Component) {
	_inherits(DateTime, _React$Component);

	function DateTime(props) {
		_classCallCheck(this, DateTime);

		var _this = _possibleConstructorReturn(this, (DateTime.__proto__ || _Object$getPrototypeOf(DateTime)).call(this, props));

		_this.getHours = _this.getHours.bind(_this);
		_this.amPmSelect = _this.amPmSelect.bind(_this);
		_this.hoursSelect = _this.hoursSelect.bind(_this);
		_this.dateSelect = _this.dateSelect.bind(_this);
		_this.timeSelect = _this.timeSelect.bind(_this);
		_this.handleClear = _this.handleClear.bind(_this);
		_this.handleSelect = _this.handleSelect.bind(_this);
		_this.minutesSelect = _this.minutesSelect.bind(_this);
		_this.modifyCalendar = _this.modifyCalendar.bind(_this);
		_this.hourSuggestions = function () {
			var hourArr = [];
			for (var hour = 1; hour <= 12; hour++) {
				var htxt = hour < 10 ? "0" + hour : hour;
				hourArr.push(htxt);
			}
			return hourArr;
		}();
		_this.minSuggestions = function () {
			var minArr = [];
			for (var minute = 0; minute <= 59; minute++) {
				var mtxt = minute < 10 ? "0" + minute : minute;
				minArr.push(mtxt);
			}
			return minArr;
		}();
		_this.ampmSuggestions = [{ id: "AM", name: i18NProviderUtils.getI18NValue('AM') }, { id: "PM", name: i18NProviderUtils.getI18NValue('PM') }];

		_this.state = _this.getStateFromProps(props);
		return _this;
	}

	_createClass(DateTime, [{
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(nextProps) {
			if (nextProps.value !== this.props.value) {
				this.setState(this.getStateFromProps(nextProps));
			}
		}
	}, {
		key: "getStateFromProps",
		value: function getStateFromProps(props) {
			var date = void 0,
			    month = void 0,
			    year = void 0,
			    hours = void 0,
			    mins = void 0,
			    amPm = void 0,
			    dateObj = void 0;
			var value = props.value,
			    timeZone = props.timeZone;

			dateObj = value ? moment.tz(value, timeZone) : moment.tz(new Date().toISOString(), timeZone);
			date = dateObj.get('date');
			month = dateObj.get('month');
			year = dateObj.get('year');
			hours = dateObj.get('hour');
			mins = dateObj.get('minute');
			mins = mins < 10 ? "0" + mins : mins;
			amPm = hours < 12 ? 'AM' : 'PM';
			hours = this.getHours(hours);
			return { date: date, month: month, year: year, mins: mins, hours: hours, amPm: amPm };
		}
	}, {
		key: "getHours",
		value: function getHours(hours) {
			if (hours == 0) {
				hours = 12;
			} else if (hours > 12) {
				hours = hours - 12;
			}
			hours = hours < 10 ? "0" + hours : hours;
			return hours;
		}
	}, {
		key: "render",
		value: function render() {
			var _state = this.state,
			    date = _state.date,
			    month = _state.month,
			    year = _state.year,
			    hours = _state.hours,
			    mins = _state.mins,
			    amPm = _state.amPm;

			var showmonthtxt = title(date, year, month);
			var _props = this.props,
			    isClear = _props.isClear,
			    _props$isDateTimeFiel = _props.isDateTimeField,
			    isDateTimeField = _props$isDateTimeFiel === undefined ? true : _props$isDateTimeFiel,
			    position = _props.position;

			return React.createElement(
				"div",
				{ className: style.dateContainer, onClick: this.closePopup },
				React.createElement("i", { className: position ? style[position + "ArowPos"] : style.topArow }),
				React.createElement(
					"div",
					{ className: style.datemain },
					React.createElement(
						"div",
						{ className: style.optionsTop },
						React.createElement(
							"span",
							{ "data-testId": "prevYear", className: style.sideArows, onClick: this.modifyCalendar.bind(this, "ll") },
							"<<"
						),
						React.createElement(
							"span",
							{ "data-testId": "prevMonth", className: style.sideArows, onClick: this.modifyCalendar.bind(this, "l") },
							"<"
						),
						React.createElement(
							"span",
							{ "data-testId": "resultString", className: style.monthStr },
							showmonthtxt
						),
						React.createElement(
							"span",
							{ "data-testId": "nextMonth", className: style.sideArows, onClick: this.modifyCalendar.bind(this, 'g') },
							">"
						),
						React.createElement(
							"span",
							{ "data-testId": "nextyear", className: style.sideArows, onClick: this.modifyCalendar.bind(this, 'gg') },
							">>"
						)
					),
					React.createElement(
						"div",
						{ className: style.days },
						React.createElement(
							"span",
							{ className: style.daysStr },
							"Sun"
						),
						React.createElement(
							"span",
							{ className: style.daysStr },
							"Mon"
						),
						React.createElement(
							"span",
							{ className: style.daysStr },
							"Tue"
						),
						React.createElement(
							"span",
							{ className: style.daysStr },
							"Wed"
						),
						React.createElement(
							"span",
							{ className: style.daysStr },
							"Thu"
						),
						React.createElement(
							"span",
							{ className: style.daysStr },
							"Fri"
						),
						React.createElement(
							"span",
							{ className: style.daysStr },
							"Sat"
						)
					),
					React.createElement(CalendarComponent, { date: date, year: year, month: month, onSelect: this.dateSelect }),
					isDateTimeField && React.createElement(
						"div",
						null,
						React.createElement(
							"span",
							{ className: style.timeStr },
							i18NProviderUtils.getI18NValue('crm.events.time')
						),
						React.createElement(
							"span",
							{ className: style.dropDown },
							React.createElement(DropdownComponent, { id: "hours", suggestions: this.hourSuggestions, value: hours, valueField: "id", textField: "name", onSelect: this.hoursSelect })
						),
						React.createElement(
							"span",
							{ className: style.dropDown },
							React.createElement(DropdownComponent, { id: "minutes", suggestions: this.minSuggestions, value: mins, valueField: "id", textField: "name", onSelect: this.minutesSelect })
						),
						React.createElement(
							"span",
							{ className: style.dropDown },
							React.createElement(DropdownComponent, { id: "amPm", suggestions: this.ampmSuggestions, value: amPm, valueField: "id", textField: "name", onSelect: this.amPmSelect })
						)
					),
					React.createElement(
						"div",
						{ className: style.marTop },
						React.createElement(
							"button",
							{ "data-testId": "submit", className: style.blueBut, onClick: this.handleSelect },
							i18NProviderUtils.getI18NValue("support.request.history.value.update.set")
						),
						React.createElement(
							"button",
							{ "data-testId": "clear", className: style.canButton, onClick: this.handleClear },
							i18NProviderUtils.getI18NValue("support.request.clear")
						)
					)
				)
			);
		}
	}, {
		key: "handleSelect",
		value: function handleSelect(e) {
			e.preventDefault();
			var _props2 = this.props,
			    isDateTimeField = _props2.isDateTimeField,
			    timeZone = _props2.timeZone,
			    min = _props2.min,
			    max = _props2.max,
			    onError = _props2.onError,
			    onSelect = _props2.onSelect,
			    minErrorText = _props2.minErrorText,
			    maxErrorText = _props2.maxErrorText;
			var _state2 = this.state,
			    year = _state2.year,
			    month = _state2.month,
			    date = _state2.date,
			    hours = _state2.hours,
			    mins = _state2.mins,
			    amPm = _state2.amPm;

			if (hours == 12) {
				hours = amPm == "AM" ? 0 : 12;
			}
			if (amPm == 'PM') {
				if (hours < 12) {
					hours = parseInt(hours) + 12;
				}
			}
			var minDateTimeObj = min && moment.tz(min, timeZone);
			var maxDateTimeObj = max && moment.tz(max, timeZone);
			var dateString = isDateTimeField ? year + " " + (month + 1) + " " + date + " " + hours + " " + mins + " " + amPm : year + " " + (month + 1) + " " + date;
			var seletedDateObj = isDateTimeField ? moment.tz(dateString, "YYYY MM DD hh mm A", timeZone) : moment.tz(dateString, "YYYY MM DD", timeZone);
			if (minDateTimeObj && seletedDateObj.isBefore(minDateTimeObj)) {
				onError(minErrorText, true);
			} else if (maxDateTimeObj && seletedDateObj.isAfter(maxDateTimeObj)) {
				onError(maxErrorText, true);
			} else {
				onSelect(seletedDateObj, e);
			}
		}
	}, {
		key: "handleClear",
		value: function handleClear(e) {
			this.props.onSelect("", e);
		}
	}, {
		key: "dateSelect",
		value: function dateSelect(date, month, year) {
			this.setState({ date: date, month: month, year: year });
		}
	}, {
		key: "timeSelect",
		value: function timeSelect(hours, mins, amPm) {
			this.setState({ hours: hours, mins: mins, amPm: amPm });
		}
	}, {
		key: "hoursSelect",
		value: function hoursSelect(value) {
			var hours = value.id;
			this.setState({ hours: hours });
		}
	}, {
		key: "minutesSelect",
		value: function minutesSelect(value) {
			var mins = value.id;
			this.setState({ mins: mins });
		}
	}, {
		key: "amPmSelect",
		value: function amPmSelect(value) {
			var amPm = value.id;
			this.setState({ amPm: amPm });
		}
	}, {
		key: "closePopup",
		value: function closePopup() {
			closeGroupPopups("dropdown");
		}
	}, {
		key: "modifyCalendar",
		value: function modifyCalendar(type) {
			var _state3 = this.state,
			    date = _state3.date,
			    year = _state3.year,
			    month = _state3.month;

			if (type === "gg") {
				this.setState({ year: year + 1 });
			} else if (type === "ll") {
				this.setState({ year: year - 1 });
			} else if (type === "g") {
				if (month == 11) {
					month = 0;
					year++;
				} else {
					month++;
				}
				this.setState({ year: year, month: month });
			} else {
				if (month == 0) {
					month = 11;
					year--;
				} else {
					month--;
				}
				this.setState({ year: year, month: month });
			}
		}
	}]);

	return DateTime;
}(React.Component);

function mapStateToProps(state, props) {
	var timeZone = selectn("userDetails.timeZone", state);
	return { timeZone: timeZone };
}

export default connect(mapStateToProps)(DateTime);