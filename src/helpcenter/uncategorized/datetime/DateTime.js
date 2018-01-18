import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { i18NProviderUtils } from 'fz-i18n';
import CalendarView from './CalendarView.js';
import TimeField from './TimeField';
import DropdownComponent from './DropdownComponent';
import style from './DateTime.css';
import moment from 'moment-timezone';
import selectn from 'selectn';

import { Icon } from '../../index';

var monthend = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var monthname = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

function title(dat, year, month) {
	if (month == 1) {
		monthend[1] = year % 400 == 0 || (year % 4 == 0 && year % 100 != 0) ? 29 : 28;
	}
	var showheadingtxt = monthname[month] + ' ' + year;
	return showheadingtxt;
}

export default class DateTime extends React.Component {
	constructor(props) {
		super(props);
		this.getHours = this.getHours.bind(this);
		this.amPmSelect = this.amPmSelect.bind(this);
		this.hoursSelect = this.hoursSelect.bind(this);
		this.dateSelect = this.dateSelect.bind(this);
		this.timeSelect = this.timeSelect.bind(this);
		this.handleClear = this.handleClear.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.minutesSelect = this.minutesSelect.bind(this);
		this.modifyCalendar = this.modifyCalendar.bind(this);
		this.hourSuggestions = (() => {
			let hourArr = [];
			for (var hour = 1; hour <= 12; hour++) {
				var htxt = hour < 10 ? '0' + hour : hour;
				hourArr.push(htxt);
			}
			return hourArr;
		})();
		this.minSuggestions = (() => {
			let minArr = [];
			for (var minute = 0; minute <= 59; minute++) {
				var mtxt = minute < 10 ? '0' + minute : minute;
				minArr.push(mtxt);
			}
			return minArr;
		})();
		this.ampmSuggestions = [
			{ id: 'AM', name: i18NProviderUtils.getI18NValue('AM') },
			{ id: 'PM', name: i18NProviderUtils.getI18NValue('PM') }
		];

		this.state = this.getStateFromProps(props);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.value !== this.props.value) {
			this.setState(this.getStateFromProps(nextProps));
		}
	}

	getStateFromProps(props) {
		let date, month, year, hours, mins, amPm, dateObj;
		let { value, timeZone } = props;
		dateObj = value ? moment.tz(value, timeZone) : moment.tz(new Date().toISOString(), timeZone);
		date = dateObj.get('date');
		month = dateObj.get('month');
		year = dateObj.get('year');
		hours = dateObj.get('hour');
		mins = dateObj.get('minute');
		mins = mins < 10 ? '0' + mins : mins;
		amPm = hours < 12 ? 'AM' : 'PM';
		hours = this.getHours(hours);
		return { date, month, year, mins, hours, amPm };
	}

	getHours(hours) {
		if (hours == 0) {
			hours = 12;
		} else if (hours > 12) {
			hours = hours - 12;
		}
		hours = hours < 10 ? '0' + hours : hours;
		return hours;
	}

	render() {
		let { date, month, year, hours, mins, amPm } = this.state;
		let showmonthtxt = title(date, year, month);
		let { isClear, isDateTimeField = true, position } = this.props;
		return (
			<div className={style.dateContainer} onClick={this.closePopup}>
				<i className={position ? style[`${position}ArowPos`] : style.topArow} />
				<div className={style.datemain}>
					<div className={style.optionsTop}>
						<span className={style.sideArows} onClick={this.modifyCalendar.bind(this, 'll')}>
							<Icon id="back"  styleId="datepickerarw" />
						</span>
						<span className={style.sideArows} onClick={this.modifyCalendar.bind(this, 'l')}>
							<Icon id="rightArrow"  styleId="datepickerarw" />
						</span>
						<span className={style.monthStr}>
							{showmonthtxt}
						</span>
						<span className={style.sideArows} onClick={this.modifyCalendar.bind(this, 'g')}>
							<Icon id="rightArrow"  styleId="datepickerarw" />
						</span>
						<span className={style.sideArows} onClick={this.modifyCalendar.bind(this, 'gg')}>
							<Icon id="back"  styleId="datepickerarw" />
						</span>
					</div>

					<div className={style.days}>
						<span className={style.daysStr}>Sun</span>
						<span className={style.daysStr}>Mon</span>
						<span className={style.daysStr}>Tue</span>
						<span className={style.daysStr}>Wed</span>
						<span className={style.daysStr}>Thu</span>
						<span className={style.daysStr}>Fri</span>
						<span className={style.daysStr}>Sat</span>
					</div>

					<CalendarView date={date} year={year} month={month} onSelect={this.dateSelect} />
					{isDateTimeField &&
						<div className={style.timesection}>
							<span className={style.timeStr}>
								{i18NProviderUtils.getI18NValue('Time')}
							</span>
							<span className={style.dropDown}>
								<DropdownComponent
									id="hours"
									suggestions={this.hourSuggestions}
									value={hours}
									valueField="id"
									textField="name"
									onSelect={this.hoursSelect}
								/>
							</span>
							<span className={style.dropDown}>
								<DropdownComponent
									id="minutes"
									suggestions={this.minSuggestions}
									value={mins}
									valueField="id"
									textField="name"
									onSelect={this.minutesSelect}
								/>
							</span>
							<span className={style.dropDown}>
								<DropdownComponent
									id="amPm"
									suggestions={this.ampmSuggestions}
									value={amPm}
									valueField="id"
									textField="name"
									onSelect={this.amPmSelect}
								/>
							</span>
						</div>}

					<div className={style.marTop}>
						<button className={style.canButton} onClick={this.handleClear}>
							{i18NProviderUtils.getI18NValue('Clear')}
						</button>
						<button className={style.blueBut} onClick={this.handleSelect}>
							{i18NProviderUtils.getI18NValue('Set')}
						</button>
					</div>
				</div>
			</div>
		);
	}

	handleSelect(e) {
		e.preventDefault();
		let { isDateTimeField, min, max, onError, onSelect, minErrorText, maxErrorText, timeZone } = this.props;
		let { year, month, date, hours, mins, amPm } = this.state;
		if (hours == 12) {
			hours = amPm == 'AM' ? 0 : 12;
		}
		if (amPm == 'PM') {
			if (hours < 12) {
				hours = parseInt(hours) + 12;
			}
		}
		let minDateTimeObj = min && moment.tz(min, timeZone);
		let maxDateTimeObj = max && moment.tz(max, timeZone);
		let dateString = isDateTimeField
			? `${year} ${month + 1} ${date} ${hours} ${mins} ${amPm}`
			: `${year} ${month + 1} ${date}`;
		let seletedDateObj = isDateTimeField
			? moment.tz(dateString, 'YYYY MM DD hh mm A', timeZone)
			: moment.tz(dateString, 'YYYY MM DD', timeZone);
		if (minDateTimeObj && seletedDateObj.isBefore(minDateTimeObj)) {
			onError(minErrorText, true);
		} else if (maxDateTimeObj && seletedDateObj.isAfter(maxDateTimeObj)) {
			onError(maxErrorText, true);
		} else {
			onSelect(seletedDateObj, e);
		}
	}

	handleClear(e) {
		this.props.onSelect('', e);
	}

	dateSelect(date, month, year) {
		this.setState({ date, month, year });
	}

	timeSelect(hours, mins, amPm) {
		this.setState({ hours, mins, amPm });
	}

	hoursSelect(value) {
		let hours = value;
		this.setState({ hours });
	}

	minutesSelect(value) {
		let mins = value;
		this.setState({ mins });
	}

	amPmSelect(value) {
		let amPm = value;
		this.setState({ amPm });
	}

	closePopup() {
		closeGroupPopups('dropdown');
	}

	modifyCalendar(type) {
		let { date, year, month } = this.state;
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
			this.setState({ year, month });
		} else {
			if (month == 0) {
				month = 11;
				year--;
			} else {
				month--;
			}
			this.setState({ year, month });
		}
	}
}
