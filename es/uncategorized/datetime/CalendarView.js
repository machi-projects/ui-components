import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import style from './DateTime.css';

var monthend = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

var CalendarView = function (_React$Component) {
	_inherits(CalendarView, _React$Component);

	function CalendarView(props) {
		_classCallCheck(this, CalendarView);

		var _this = _possibleConstructorReturn(this, (CalendarView.__proto__ || _Object$getPrototypeOf(CalendarView)).call(this, props));

		_this.handleSelect = _this.handleSelect.bind(_this);
		return _this;
	}

	_createClass(CalendarView, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    date = _props.date,
			    year = _props.year,
			    month = _props.month;

			var userSeeDate = new Date(year, month, 1);
			var userSeeDay = userSeeDate.getDay() + 1;
			var userSeeYear = userSeeDate.getFullYear();
			var userSeeMonth = userSeeDate.getMonth();
			var noOfRow = 5;
			if (monthend[month] == 31 && userSeeDay >= 6 || monthend[month] == 30 && userSeeDay == 7) {
				noOfRow = 6;
			} else if (monthend[month] == 28 && userSeeDay == 1) {
				noOfRow = 4;
			}
			var incremday = 1;
			var incremleti = 1;
			var rows = function () {
				var rowArr = [];
				for (var j = 1; j <= noOfRow; j++) {
					var dayArr = [];
					var output = null;
					for (var i = 1; i < 8; i++) {
						if (incremleti >= userSeeDay && incremday <= monthend[month]) {
							var tdclass = style.datesStr;

							if (i === 1) {
								tdclass += " " + style.sunday;
							}
							if (incremday == parseInt(date) && parseInt(month) == userSeeMonth && parseInt(year) == userSeeYear) {
								tdclass += " " + style.today;
							}
							output = React.createElement(
								'span',
								{ className: tdclass, key: i, onClick: _this2.handleSelect.bind(_this2, incremday, userSeeMonth, userSeeYear) },
								' ',
								incremday
							);
							incremday++;
						} else {
							output = React.createElement('span', { key: i, className: style.emptySpan });
						}
						incremleti++;
						dayArr.push(output);
					}

					rowArr.push(React.createElement(
						'div',
						{ className: style.weekly, key: j },
						dayArr
					));
				}
				return rowArr;
			}();
			return React.createElement(
				'div',
				{ 'data-testId': 'dateContainer', className: style.DateNew },
				rows
			);
		}
	}, {
		key: 'handleSelect',
		value: function handleSelect(day, month, year) {
			this.props.onSelect(day, month, year);
		}
	}]);

	return CalendarView;
}(React.Component);

export default CalendarView;