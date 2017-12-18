'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _redux = require('redux');

var _fzI18n = require('fz-i18n');

var _CalendarView = require('./CalendarView.js');

var _CalendarView2 = _interopRequireDefault(_CalendarView);

var _TimeField = require('./TimeField');

var _TimeField2 = _interopRequireDefault(_TimeField);

var _DropdownComponent = require('./DropdownComponent');

var _DropdownComponent2 = _interopRequireDefault(_DropdownComponent);

var _DateTime = require('./DateTime.css');

var _DateTime2 = _interopRequireDefault(_DateTime);

var _momentTimezone = require('moment-timezone');

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

var _selectn = require('selectn');

var _selectn2 = _interopRequireDefault(_selectn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var monthend = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var monthname = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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

		var _this = _possibleConstructorReturn(this, (DateTime.__proto__ || Object.getPrototypeOf(DateTime)).call(this, props));

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
				var htxt = hour < 10 ? '0' + hour : hour;
				hourArr.push(htxt);
			}
			return hourArr;
		}();
		_this.minSuggestions = function () {
			var minArr = [];
			for (var minute = 0; minute <= 59; minute++) {
				var mtxt = minute < 10 ? '0' + minute : minute;
				minArr.push(mtxt);
			}
			return minArr;
		}();
		_this.ampmSuggestions = [{ id: 'AM', name: _fzI18n.i18NProviderUtils.getI18NValue('AM') }, { id: 'PM', name: _fzI18n.i18NProviderUtils.getI18NValue('PM') }];

		_this.state = _this.getStateFromProps(props);
		return _this;
	}

	_createClass(DateTime, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (nextProps.value !== this.props.value) {
				this.setState(this.getStateFromProps(nextProps));
			}
		}
	}, {
		key: 'getStateFromProps',
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

			dateObj = value ? _momentTimezone2.default.tz(value, timeZone) : _momentTimezone2.default.tz(new Date().toISOString(), timeZone);
			date = dateObj.get('date');
			month = dateObj.get('month');
			year = dateObj.get('year');
			hours = dateObj.get('hour');
			mins = dateObj.get('minute');
			mins = mins < 10 ? '0' + mins : mins;
			amPm = hours < 12 ? 'AM' : 'PM';
			hours = this.getHours(hours);
			return { date: date, month: month, year: year, mins: mins, hours: hours, amPm: amPm };
		}
	}, {
		key: 'getHours',
		value: function getHours(hours) {
			if (hours == 0) {
				hours = 12;
			} else if (hours > 12) {
				hours = hours - 12;
			}
			hours = hours < 10 ? '0' + hours : hours;
			return hours;
		}
	}, {
		key: 'render',
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

			return _react2.default.createElement(
				'div',
				{ className: _DateTime2.default.dateContainer, onClick: this.closePopup },
				_react2.default.createElement('i', { className: position ? _DateTime2.default[position + 'ArowPos'] : _DateTime2.default.topArow }),
				_react2.default.createElement(
					'div',
					{ className: _DateTime2.default.datemain },
					_react2.default.createElement(
						'div',
						{ className: _DateTime2.default.optionsTop },
						_react2.default.createElement(
							'span',
							{ 'data-testId': 'prevYear', className: _DateTime2.default.sideArows, onClick: this.modifyCalendar.bind(this, 'll') },
							'<<'
						),
						_react2.default.createElement(
							'span',
							{ 'data-testId': 'prevMonth', className: _DateTime2.default.sideArows, onClick: this.modifyCalendar.bind(this, 'l') },
							'<'
						),
						_react2.default.createElement(
							'span',
							{ 'data-testId': 'resultString', className: _DateTime2.default.monthStr },
							showmonthtxt
						),
						_react2.default.createElement(
							'span',
							{ 'data-testId': 'nextMonth', className: _DateTime2.default.sideArows, onClick: this.modifyCalendar.bind(this, 'g') },
							'>'
						),
						_react2.default.createElement(
							'span',
							{ 'data-testId': 'nextyear', className: _DateTime2.default.sideArows, onClick: this.modifyCalendar.bind(this, 'gg') },
							'>>'
						)
					),
					_react2.default.createElement(
						'div',
						{ className: _DateTime2.default.days },
						_react2.default.createElement(
							'span',
							{ className: _DateTime2.default.daysStr },
							'Sun'
						),
						_react2.default.createElement(
							'span',
							{ className: _DateTime2.default.daysStr },
							'Mon'
						),
						_react2.default.createElement(
							'span',
							{ className: _DateTime2.default.daysStr },
							'Tue'
						),
						_react2.default.createElement(
							'span',
							{ className: _DateTime2.default.daysStr },
							'Wed'
						),
						_react2.default.createElement(
							'span',
							{ className: _DateTime2.default.daysStr },
							'Thu'
						),
						_react2.default.createElement(
							'span',
							{ className: _DateTime2.default.daysStr },
							'Fri'
						),
						_react2.default.createElement(
							'span',
							{ className: _DateTime2.default.daysStr },
							'Sat'
						)
					),
					_react2.default.createElement(_CalendarView2.default, { date: date, year: year, month: month, onSelect: this.dateSelect }),
					isDateTimeField && _react2.default.createElement(
						'div',
						{ className: _DateTime2.default.timesection },
						_react2.default.createElement(
							'span',
							{ className: _DateTime2.default.timeStr },
							_fzI18n.i18NProviderUtils.getI18NValue('Time')
						),
						_react2.default.createElement(
							'span',
							{ className: _DateTime2.default.dropDown },
							_react2.default.createElement(_DropdownComponent2.default, {
								id: 'hours',
								suggestions: this.hourSuggestions,
								value: hours,
								valueField: 'id',
								textField: 'name',
								onSelect: this.hoursSelect
							})
						),
						_react2.default.createElement(
							'span',
							{ className: _DateTime2.default.dropDown },
							_react2.default.createElement(_DropdownComponent2.default, {
								id: 'minutes',
								suggestions: this.minSuggestions,
								value: mins,
								valueField: 'id',
								textField: 'name',
								onSelect: this.minutesSelect
							})
						),
						_react2.default.createElement(
							'span',
							{ className: _DateTime2.default.dropDown },
							_react2.default.createElement(_DropdownComponent2.default, {
								id: 'amPm',
								suggestions: this.ampmSuggestions,
								value: amPm,
								valueField: 'id',
								textField: 'name',
								onSelect: this.amPmSelect
							})
						)
					),
					_react2.default.createElement(
						'div',
						{ className: _DateTime2.default.marTop },
						_react2.default.createElement(
							'button',
							{ 'data-testId': 'submit', className: _DateTime2.default.blueBut, onClick: this.handleSelect },
							_fzI18n.i18NProviderUtils.getI18NValue('Set')
						),
						_react2.default.createElement(
							'button',
							{ 'data-testId': 'clear', className: _DateTime2.default.canButton, onClick: this.handleClear },
							_fzI18n.i18NProviderUtils.getI18NValue('Clear')
						)
					)
				)
			);
		}
	}, {
		key: 'handleSelect',
		value: function handleSelect(e) {
			e.preventDefault();
			var _props2 = this.props,
			    isDateTimeField = _props2.isDateTimeField,
			    min = _props2.min,
			    max = _props2.max,
			    onError = _props2.onError,
			    onSelect = _props2.onSelect,
			    minErrorText = _props2.minErrorText,
			    maxErrorText = _props2.maxErrorText,
			    timeZone = _props2.timeZone;
			var _state2 = this.state,
			    year = _state2.year,
			    month = _state2.month,
			    date = _state2.date,
			    hours = _state2.hours,
			    mins = _state2.mins,
			    amPm = _state2.amPm;

			if (hours == 12) {
				hours = amPm == 'AM' ? 0 : 12;
			}
			if (amPm == 'PM') {
				if (hours < 12) {
					hours = parseInt(hours) + 12;
				}
			}
			var minDateTimeObj = min && _momentTimezone2.default.tz(min, timeZone);
			var maxDateTimeObj = max && _momentTimezone2.default.tz(max, timeZone);
			var dateString = isDateTimeField ? year + ' ' + (month + 1) + ' ' + date + ' ' + hours + ' ' + mins + ' ' + amPm : year + ' ' + (month + 1) + ' ' + date;
			var seletedDateObj = isDateTimeField ? _momentTimezone2.default.tz(dateString, 'YYYY MM DD hh mm A', timeZone) : _momentTimezone2.default.tz(dateString, 'YYYY MM DD', timeZone);
			if (minDateTimeObj && seletedDateObj.isBefore(minDateTimeObj)) {
				onError(minErrorText, true);
			} else if (maxDateTimeObj && seletedDateObj.isAfter(maxDateTimeObj)) {
				onError(maxErrorText, true);
			} else {
				onSelect(seletedDateObj, e);
			}
		}
	}, {
		key: 'handleClear',
		value: function handleClear(e) {
			this.props.onSelect('', e);
		}
	}, {
		key: 'dateSelect',
		value: function dateSelect(date, month, year) {
			this.setState({ date: date, month: month, year: year });
		}
	}, {
		key: 'timeSelect',
		value: function timeSelect(hours, mins, amPm) {
			this.setState({ hours: hours, mins: mins, amPm: amPm });
		}
	}, {
		key: 'hoursSelect',
		value: function hoursSelect(value) {
			var hours = value.id;
			this.setState({ hours: hours });
		}
	}, {
		key: 'minutesSelect',
		value: function minutesSelect(value) {
			var mins = value.id;
			this.setState({ mins: mins });
		}
	}, {
		key: 'amPmSelect',
		value: function amPmSelect(value) {
			var amPm = value.id;
			this.setState({ amPm: amPm });
		}
	}, {
		key: 'closePopup',
		value: function closePopup() {
			closeGroupPopups('dropdown');
		}
	}, {
		key: 'modifyCalendar',
		value: function modifyCalendar(type) {
			var _state3 = this.state,
			    date = _state3.date,
			    year = _state3.year,
			    month = _state3.month;

			if (type === 'gg') {
				this.setState({ year: year + 1 });
			} else if (type === 'll') {
				this.setState({ year: year - 1 });
			} else if (type === 'g') {
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
}(_react2.default.Component);

exports.default = DateTime;