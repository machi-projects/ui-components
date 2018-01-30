import React from 'react';
import PropTypes from 'prop-types';
import CalendarView from './CalendarView.js';
import DropdownComponent from './DropdownComponent';
import style from './DateTime.css';
import moment from 'moment-timezone';

import { Icon } from '../../index';

var monthend = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var monthname = [
	'january',
	'february',
	'march',
	'april',
	'may',
	'june',
	'july',
	'august',
	'september',
	'october',
	'november',
	'december'
];

function getDisplayMonthAndYear(dat, year, month) {
	if (month == 1) {
		monthend[1] = year % 400 == 0 || (year % 4 == 0 && year % 100 != 0) ? 29 : 28;
	}
	
	return {
		month : monthname[month] ,
		year
	};
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
			{ id: 'AM', name: props.formatMessages.am },
			{ id: 'PM', name: props.formatMessages.pm }
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
		let { isClear, isDateTimeField = true, position , formatMessages } = this.props;
		let displayTextObject = getDisplayMonthAndYear(date, year, month);
		let displayText = formatMessages.monthsFull[ displayTextObject.month ] +' ' +year;
		
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
							{displayText}
						</span>
						<span className={style.sideArows} onClick={this.modifyCalendar.bind(this, 'g')}>
							<Icon id="rightArrow"  styleId="datepickerarw" />
						</span>
						<span className={style.sideArows} onClick={this.modifyCalendar.bind(this, 'gg')}>
							<Icon id="back"  styleId="datepickerarw" />
						</span>
					</div>

					<div className={style.days}>
						<span className={style.daysStr}>{ formatMessages.weeksShort.sun }</span>
						<span className={style.daysStr}>{ formatMessages.weeksShort.mon }</span>
						<span className={style.daysStr}>{ formatMessages.weeksShort.tue }</span>
						<span className={style.daysStr}>{ formatMessages.weeksShort.wed }</span>
						<span className={style.daysStr}>{ formatMessages.weeksShort.thu }</span>
						<span className={style.daysStr}>{ formatMessages.weeksShort.fri }</span>
						<span className={style.daysStr}>{ formatMessages.weeksShort.sat }</span>
					</div>

					<CalendarView date={date} year={year} month={month} onSelect={this.dateSelect} />
					{isDateTimeField &&
						<div className={style.timesection}>
							<span className={style.timeStr}>
								{formatMessages.time}
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
							{formatMessages.clear}
						</button>
						<button className={style.blueBut} onClick={this.handleSelect}>
							{formatMessages.set}
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

DateTime.defaultProps = {
	formatMessages : {
		set : "Set",
		clear : "Clear",
		time : "Time",
		am : "AM",
		pm : "PM",
		weeksShort : {
			sun : "Sun",
			mon : "Mon" ,
			tue : "Tue",
			wed : "Wed",
			thu : "Thu",
			fri : "Fri",
			sat : "Sat"
		},
		monthsFull : {
			'january' : "January",
			'february' : "February",
			'march' : "March",
			'april' : "April",
			'may' : "May",
			'june' : "June",
			'july' : "July",
			'august' : "August",
			'september': "September",
			'october' : "October",
			'november' : "November",
			'december' : "December"
		}
	}
}

DateTime.propTypes = {
	formatMessages : PropTypes.object
}


