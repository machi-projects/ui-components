'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _DateWidget$propTypes;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DateTime = require('./DateTime');

var _DateTime2 = _interopRequireDefault(_DateTime);

var _Popup = require('../Popup');

var _Popup2 = _interopRequireDefault(_Popup);

var _DateWidget = require('./DateWidget.css');

var _DateWidget2 = _interopRequireDefault(_DateWidget);

var _momentTimezone = require('moment-timezone');

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

var _validator = require('../../../utils/validator');

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateWidget = function (_React$Component) {
	_inherits(DateWidget, _React$Component);

	function DateWidget(props) {
		_classCallCheck(this, DateWidget);

		var _this = _possibleConstructorReturn(this, (DateWidget.__proto__ || Object.getPrototypeOf(DateWidget)).call(this, props));

		_this.handleSelect = _this.handleSelect.bind(_this);
		_this.state = { selected: props.value, timeZone: props.timeZone || _momentTimezone2.default.tz.guess() };
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
			value = value ? _momentTimezone2.default.tz(value, this.state.timeZone) : null;
			var displayText = value ? !isDateTime ? value.format(dtPtn) : value.format(dtPtn + ' hh:mm A') : '';

			return _react2.default.createElement(
				'div',
				{ className: _DateWidget2.default.posrel },
				_react2.default.createElement(
					'div',
					{
						className: isPopupOpen ? _DateWidget2.default.dateFocus : _DateWidget2.default.date,
						'data-testid': 'remindMeOnDueDate',
						onClick: function onClick(e) {
							togglePopup(e, _this2.dropPopupRef);
						},
						'data-testId': name
					},
					_react2.default.createElement(
						'span',
						null,
						value ? displayText : placeholder
					)
				),
				_react2.default.createElement(
					'div',
					{ ref: this.setDropPopupRef,
						className: _DateWidget2.default.droppopup + ' ' + (isPopupReady ? _DateWidget2.default.ready : '') + ' ' + (isPopupOpen ? _DateWidget2.default.opened : '') + ' ' + (position == 'top' ? _DateWidget2.default.dateTop : _DateWidget2.default.absolute),
						onClick: removeClose },
					_react2.default.createElement(_DateTime2.default, {
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
				onSelect && onSelect(userZoneSelectedTime ? userZoneSelectedTime.utc().format() : '', id);
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
				var newValidation = _validator2.default.combinePropsValidation(this.props, defaultType, 'onSelect', validation, defaultCheckPropsRules, defaultValidateRules);

				var validationObj = {
					validation: newValidation,
					onPassValidation: onPassValidation,
					onFailValidation: onFailValidation
				};

				_validator2.default.executeValidation(value, targetTag, validationObj, defaultType);
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
}(_react2.default.Component);

DateWidget.defaultProps = {
	placeholder: '-None-'
};

DateWidget.propTypes = (_DateWidget$propTypes = {
	id: _propTypes2.default.string,
	isReadOnly: _propTypes2.default.bool,
	value: _propTypes2.default.string,
	dateTimeSelect: _propTypes2.default.func,
	togglePopup: _propTypes2.default.func,
	onSelect: _propTypes2.default.func,
	removeClose: _propTypes2.default.func,
	name: _propTypes2.default.string
}, _defineProperty(_DateWidget$propTypes, 'isReadOnly', _propTypes2.default.bool), _defineProperty(_DateWidget$propTypes, 'minErrorText', _propTypes2.default.string), _defineProperty(_DateWidget$propTypes, 'maxErrorText', _propTypes2.default.string), _defineProperty(_DateWidget$propTypes, 'min', _propTypes2.default.string), _defineProperty(_DateWidget$propTypes, 'max', _propTypes2.default.string), _defineProperty(_DateWidget$propTypes, 'isPopupOpen', _propTypes2.default.bool), _defineProperty(_DateWidget$propTypes, 'isDateTime', _propTypes2.default.bool), _defineProperty(_DateWidget$propTypes, 'dtPtn', _propTypes2.default.string), _defineProperty(_DateWidget$propTypes, 'position', _propTypes2.default.string), _defineProperty(_DateWidget$propTypes, 'timeZone', _propTypes2.default.string), _defineProperty(_DateWidget$propTypes, 'arrowPosition', _propTypes2.default.string), _defineProperty(_DateWidget$propTypes, 'placeholder', _propTypes2.default.string), _defineProperty(_DateWidget$propTypes, 'validation', _propTypes2.default.shape({
	validate: _propTypes2.default.bool,
	validateOn: _propTypes2.default.string,
	rulesOrder: _propTypes2.default.arrayOf(_propTypes2.default.string),
	rules: _propTypes2.default.object,
	messages: _propTypes2.default.object
})), _defineProperty(_DateWidget$propTypes, 'onPassValidation', _propTypes2.default.func), _defineProperty(_DateWidget$propTypes, 'onFailValidation', _propTypes2.default.func), _DateWidget$propTypes);

exports.default = (0, _Popup2.default)(DateWidget, 'date');
//export const DateWidgetInline = Popup(DateWidget);