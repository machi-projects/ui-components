import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import style from './TimeField.css';
import DropdownComponent from './DropdownComponent.js';

var DateTime = function (_React$Component) {
	_inherits(DateTime, _React$Component);

	function DateTime(props) {
		_classCallCheck(this, DateTime);

		var _this = _possibleConstructorReturn(this, (DateTime.__proto__ || _Object$getPrototypeOf(DateTime)).call(this, props));

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
			return React.createElement(
				'div',
				{ className: 'm10 calendar' },
				React.createElement(
					'span',
					{ className: style.timeStr },
					getI18NValue('crm.events.time')
				),
				React.createElement(
					'span',
					{ className: style.dropdown },
					React.createElement(DropdownComponent, { suggestions: hourSuggestions, value: hours, valueField: 'id', textField: 'name', onSelect: this.hoursSelect })
				),
				React.createElement(
					'span',
					{ className: style.dropdown },
					React.createElement(DropdownComponent, { suggestions: minSuggestions, value: mins, valueField: 'id', textField: 'name', onSelect: this.minutesSelect })
				),
				React.createElement(
					'span',
					{ className: style.dropdown },
					React.createElement(DropdownComponent, { suggestions: ampmSuggestions, value: amPm, valueField: 'id', textField: 'name', onSelect: this.amPmSelect })
				)
			);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var hours = nextProps.hours,
			    mins = nextProps.mins,
			    amPm = nextProps.amPm;

			this.setState({ hours: hours, mins: mins, amPm: amPm });
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
}(React.Component);

export default DateTime;