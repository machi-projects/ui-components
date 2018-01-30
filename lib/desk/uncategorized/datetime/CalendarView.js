'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DateTime = require('./DateTime.css');

var _DateTime2 = _interopRequireDefault(_DateTime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var monthend = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

var CalendarView = function (_React$Component) {
	_inherits(CalendarView, _React$Component);

	function CalendarView(props) {
		_classCallCheck(this, CalendarView);

		var _this = _possibleConstructorReturn(this, (CalendarView.__proto__ || Object.getPrototypeOf(CalendarView)).call(this, props));

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

			var totalDays = monthend[month];
			date = totalDays < date ? totalDays : date;

			var incremday = 1;
			var incremleti = 1;
			var rows = function () {
				var rowArr = [];
				for (var j = 1; j <= noOfRow; j++) {
					var dayArr = [];
					var output = null;
					for (var i = 1; i < 8; i++) {
						if (incremleti >= userSeeDay && incremday <= monthend[month]) {
							var tdclass = _DateTime2.default.datesStr;

							if (i === 1) {
								tdclass += " " + _DateTime2.default.sunday;
							}
							if (incremday == parseInt(date) && parseInt(month) == userSeeMonth && parseInt(year) == userSeeYear) {
								tdclass += " " + _DateTime2.default.today;
							}
							output = _react2.default.createElement(
								'span',
								{ className: tdclass, key: i, onClick: _this2.handleSelect.bind(_this2, incremday, userSeeMonth, userSeeYear) },
								' ',
								incremday
							);
							incremday++;
						} else {
							output = _react2.default.createElement('span', { key: i, className: _DateTime2.default.emptySpan });
						}
						incremleti++;
						dayArr.push(output);
					}

					rowArr.push(_react2.default.createElement(
						'div',
						{ className: _DateTime2.default.weekly, key: j },
						dayArr
					));
				}
				return rowArr;
			}();
			return _react2.default.createElement(
				'div',
				{ className: _DateTime2.default.DateNew },
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
}(_react2.default.Component);

exports.default = CalendarView;