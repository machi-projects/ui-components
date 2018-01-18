'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TimeField = require('./TimeField.css');

var _TimeField2 = _interopRequireDefault(_TimeField);

var _DropdownComponent = require('./DropdownComponent');

var _DropdownComponent2 = _interopRequireDefault(_DropdownComponent);

var _objectUtils = require('../../../utils/objectUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateTime = function (_React$Component) {
	_inherits(DateTime, _React$Component);

	function DateTime(props) {
		_classCallCheck(this, DateTime);

		var _this = _possibleConstructorReturn(this, (DateTime.__proto__ || Object.getPrototypeOf(DateTime)).call(this, props));

		_this.hoursSelect = _this.hoursSelect.bind(_this);
		_this.minutesSelect = _this.minutesSelect.bind(_this);
		_this.amPmSelect = _this.amPmSelect.bind(_this);

		var hours = props.hours,
		    mins = props.mins,
		    amPm = props.amPm;

		_this.state = { hours: hours, mins: mins, amPm: amPm };

		return _this;
	}

	_createClass(DateTime, [{
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps, nextState) {
			return (0, _objectUtils.deepEqualObject)(nextProps, this.props) == false || (0, _objectUtils.deepEqualObject)(nextState, this.state) == false;
		}
	}, {
		key: 'render',
		value: function render() {
			var _state = this.state,
			    hours = _state.hours,
			    mins = _state.mins,
			    amPm = _state.amPm;

			var hourSuggestions = function () {
				var hourArr = [];
				for (var hour = 1; hour <= 12; hour++) {
					var htxt = hour < 10 ? "0" + hour : hour;
					hourArr.push(htxt);
				}
				return hourArr;
			}();
			var minSuggestions = function () {
				var minArr = [];
				for (var minute = 0; minute <= 59; minute++) {
					var mtxt = minute < 10 ? "0" + minute : minute;
					minArr.push(mtxt);
				}
				return minArr;
			}();
			var ampmSuggestions = [{ id: "AM", name: getI18NValue('AM') }, { id: "PM", name: getI18NValue('PM') }];
			return _react2.default.createElement(
				'div',
				{ className: 'm10 calendar' },
				_react2.default.createElement(
					'span',
					{ className: _TimeField2.default.timeStr },
					getI18NValue('crm.events.time')
				),
				_react2.default.createElement(
					'span',
					{ className: _TimeField2.default.dropdown },
					_react2.default.createElement(_DropdownComponent2.default, { suggestions: hourSuggestions, value: hours, valueField: 'id', textField: 'name', onSelect: this.hoursSelect })
				),
				_react2.default.createElement(
					'span',
					{ className: _TimeField2.default.dropdown },
					_react2.default.createElement(_DropdownComponent2.default, { suggestions: minSuggestions, value: mins, valueField: 'id', textField: 'name', onSelect: this.minutesSelect })
				),
				_react2.default.createElement(
					'span',
					{ className: _TimeField2.default.dropdown },
					_react2.default.createElement(_DropdownComponent2.default, { suggestions: ampmSuggestions, value: amPm, valueField: 'id', textField: 'name', onSelect: this.amPmSelect })
				)
			);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var hours = nextProps.hours,
			    mins = nextProps.mins,
			    amPm = nextProps.amPm;

			if ((0, _objectUtils.deepEqualObject)(nextProps, this.props) == false) {
				this.setState({ hours: hours, mins: mins, amPm: amPm });
			}
		}
	}, {
		key: 'hoursSelect',
		value: function hoursSelect(value) {
			var _state2 = this.state,
			    hours = _state2.hours,
			    mins = _state2.mins,
			    amPm = _state2.amPm;

			hours = value.id;
			this.props.onSelect(hours, mins, amPm);
			this.setState({ hours: hours });
		}
	}, {
		key: 'minutesSelect',
		value: function minutesSelect(value) {
			var _state3 = this.state,
			    hours = _state3.hours,
			    mins = _state3.mins,
			    amPm = _state3.amPm;

			mins = value.id;
			this.props.onSelect(hours, mins, amPm);
			this.setState({ mins: mins });
		}
	}, {
		key: 'amPmSelect',
		value: function amPmSelect(value) {
			var _state4 = this.state,
			    hours = _state4.hours,
			    mins = _state4.mins,
			    amPm = _state4.amPm;

			amPm = value.id;
			this.props.onSelect(hours, mins, amPm);
			this.setState({ amPm: amPm });
		}
	}]);

	return DateTime;
}(_react2.default.Component);

exports.default = DateTime;