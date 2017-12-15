import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';

var _DateWidget$propTypes;

import React from 'react';
import PropTypes from 'prop-types';
import DateTime from './DateTime';
import Popup from '../Popup';
import style from './DateWidget.css';
import moment from 'moment-timezone';

import validator from '../../utils/validator';

var DateWidget = function (_React$Component) {
	_inherits(DateWidget, _React$Component);

	function DateWidget(props) {
		_classCallCheck(this, DateWidget);

		var _this = _possibleConstructorReturn(this, (DateWidget.__proto__ || _Object$getPrototypeOf(DateWidget)).call(this, props));

		_this.handleSelect = _this.handleSelect.bind(_this);
		_this.state = { selected: props.value, timeZone: props.timeZone || moment.tz.guess() };
		_this.setDropPopupRef = _this.setDropPopupRef.bind(_this);
		return _this;
	}

	_createClass(DateWidget, [{
		key: 'setDropPopupRef',
		value: function setDropPopupRef(el) {
			this.dropPopupRef = el;
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    togglePopup = _props.togglePopup,
			    removeClose = _props.removeClose,
			    id = _props.id,
			    name = _props.name,
			    isReadOnly = _props.isReadOnly,
			    minErrorText = _props.minErrorText,
			    maxErrorText = _props.maxErrorText,
			    min = _props.min,
			    max = _props.max,
			    placeholder = _props.placeholder,
			    isPopupOpen = _props.isPopupOpen,
			    isPopupReady = _props.isPopupReady,
			    isDateTime = _props.isDateTime,
			    dtPtn = _props.dtPtn,
			    position = _props.position,
			    timeZone = _props.timeZone,
			    arrowPosition = _props.arrowPosition;

			var value = this.state.selected;
			value = value ? moment.tz(value, this.state.timeZone) : null;
			var displayText = value ? !isDateTime ? value.format(dtPtn) : value.format(dtPtn + ' hh:mm A') : '';

			return React.createElement(
				'div',
				{ className: style.posrel },
				React.createElement(
					'div',
					{
						className: isPopupOpen ? style.dateFocus : style.date,
						'data-testid': 'remindMeOnDueDate',
						onClick: function onClick(e) {
							togglePopup(e, _this2.dropPopupRef);
						},
						'data-testId': name
					},
					React.createElement(
						'span',
						null,
						value ? displayText : placeholder
					)
				),
				React.createElement(
					'div',
					{ ref: this.setDropPopupRef,
						className: style.droppopup + ' ' + (isPopupReady ? style.ready : '') + ' ' + (isPopupOpen ? style.opened : '') + ' ' + (position == 'top' ? style.dateTop : style.absolute),
						onClick: removeClose },
					React.createElement(DateTime, {
						value: value,
						isDateTimeField: isDateTime,
						onSelect: this.handleSelect,
						timeZone: this.state.timeZone,
						position: position == 'top' ? 'top' : arrowPosition,
						min: min,
						max: max,
						maxErrorText: maxErrorText,
						minErrorText: minErrorText
					})
				)
			);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextprops) {
			if (nextprops.validation != null && nextprops.validation.validate) {
				this.validateOnSelect(this.state.selected, nextprops);
			}
		}
	}, {
		key: 'handleSelect',
		value: function handleSelect(userZoneSelectedTime, e) {
			var _this3 = this;

			var _props2 = this.props,
			    id = _props2.id,
			    onSelect = _props2.onSelect,
			    togglePopup = _props2.togglePopup;

			this.setState({ selected: userZoneSelectedTime }, function () {
				if (_this3.props.validation && _this3.props.validation.validateOn) {
					_this3.validateOnSelect(_this3.state.selected, _this3.props);
				}
				onSelect(userZoneSelectedTime ? userZoneSelectedTime.utc().format() : '', id);
			});

			togglePopup(e);
		}
	}, {
		key: 'validateOnSelect',
		value: function validateOnSelect(value, props) {
			var defaultCheckPropsRules = ['required'];
			var defaultValidateRules = ['required'];
			var defaultType = 'onegroup';

			var validation = props.validation,
			    onPassValidation = props.onPassValidation,
			    onFailValidation = props.onFailValidation;


			var targetTag = this.elementRef;
			if (validation != null) {
				//validateOn won't work here ...
				var newValidation = validator.combinePropsValidation(this.props, defaultType, 'onSelect', validation, defaultCheckPropsRules, defaultValidateRules);

				var validationObj = {
					validation: newValidation,
					onPassValidation: onPassValidation,
					onFailValidation: onFailValidation
				};

				validator.executeValidation(value, targetTag, validationObj);
			} else {
				onPassValidation && onPassValidation(value, targetTag);
			}
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (this.props.validation != null && this.props.validation.validate) {
				this.validateOnSelect(this.state.selected, this.props);
			}
		}
	}]);

	return DateWidget;
}(React.Component);

DateWidget.defaultProps = {
	placeholder: '-None-'
};

DateWidget.propTypes = (_DateWidget$propTypes = {
	id: PropTypes.string,
	isReadOnly: PropTypes.bool,
	value: PropTypes.string,
	dateTimeSelect: PropTypes.func,
	togglePopup: PropTypes.func,
	onSelect: PropTypes.func,
	removeClose: PropTypes.func,
	name: PropTypes.string
}, _defineProperty(_DateWidget$propTypes, 'isReadOnly', PropTypes.bool), _defineProperty(_DateWidget$propTypes, 'minErrorText', PropTypes.string), _defineProperty(_DateWidget$propTypes, 'maxErrorText', PropTypes.string), _defineProperty(_DateWidget$propTypes, 'min', PropTypes.string), _defineProperty(_DateWidget$propTypes, 'max', PropTypes.string), _defineProperty(_DateWidget$propTypes, 'isPopupOpen', PropTypes.bool), _defineProperty(_DateWidget$propTypes, 'isDateTime', PropTypes.bool), _defineProperty(_DateWidget$propTypes, 'dtPtn', PropTypes.string), _defineProperty(_DateWidget$propTypes, 'position', PropTypes.string), _defineProperty(_DateWidget$propTypes, 'timeZone', PropTypes.string), _defineProperty(_DateWidget$propTypes, 'arrowPosition', PropTypes.string), _defineProperty(_DateWidget$propTypes, 'placeholder', PropTypes.string), _defineProperty(_DateWidget$propTypes, 'validation', PropTypes.shape({
	validate: PropTypes.bool,
	validateOn: PropTypes.string,
	rulesOrder: PropTypes.arrayOf(PropTypes.string),
	rules: PropTypes.object,
	messages: PropTypes.object
})), _defineProperty(_DateWidget$propTypes, 'onPassValidation', PropTypes.func), _defineProperty(_DateWidget$propTypes, 'onFailValidation', PropTypes.func), _DateWidget$propTypes);

export default Popup(DateWidget, 'date');
export var DateTimeBox = Popup(DateWidget);