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

import { Icon } from '../../index';

import validator from '../../../utils/validator';
import { deepEqualObject } from '../../../utils/objectUtils';

var DateWidget = function (_React$Component) {
	_inherits(DateWidget, _React$Component);

	function DateWidget(props) {
		_classCallCheck(this, DateWidget);

		var _this = _possibleConstructorReturn(this, (DateWidget.__proto__ || _Object$getPrototypeOf(DateWidget)).call(this, props));

		_this.handleSelect = _this.handleSelect.bind(_this);
		_this.onChangeValue = _this.onChangeValue.bind(_this);
		_this.state = { selected: props.value, timeZone: props.timeZone || moment.tz.guess() };
		_this.setDropPopupRef = _this.setDropPopupRef.bind(_this);
		_this.setRef = _this.setRef.bind(_this);
		_this.setPlaceHolderRef = _this.setPlaceHolderRef.bind(_this);
		return _this;
	}

	_createClass(DateWidget, [{
		key: 'setRef',
		value: function setRef(el) {
			this.elementRef = el;
			this.props.getElementRef && this.props.getElementRef(el);
		}
	}, {
		key: 'setPlaceHolderRef',
		value: function setPlaceHolderRef(el) {
			this.placeHolderRef = el;
		}
	}, {
		key: 'setDropPopupRef',
		value: function setDropPopupRef(el) {
			this.dropPopupRef = el;
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var _this2 = this;

			if (nextProps.value !== this.state.selected) {
				this.setState({ selected: nextProps.value }, function () {
					_this2.onChangeValue(_this2.state.selected);
				});
			}

			if (deepEqualObject(nextProps.validation, this.props.validation) == false && nextProps.validation && nextProps.validation.validate) {
				this.validateOnSelect(this.state.selected, nextProps);
			}
		}
	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps, nextState) {
			return deepEqualObject(nextProps, this.props) == false || deepEqualObject(nextState, this.state) == false;
		}
	}, {
		key: 'onChangeValue',
		value: function onChangeValue(val, groupName) {
			this.props.onChange && this.props.onChange(val, groupName);
			this.props.getValue && this.props.getValue(val);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

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
			    arrowPosition = _props.arrowPosition,
			    tabIndex = _props.tabIndex,
			    onClick = _props.onClick;

			var value = this.state.selected;

			value = value ? moment.tz(value, this.state.timeZone) : null;
			var displayText = value ? !isDateTime ? value.format(dtPtn) : value.format(dtPtn + ' hh:mm A') : '';

			return React.createElement(
				'div',
				{ className: style.posrel, ref: this.setRef, tabIndex: tabIndex, onClick: onClick },
				React.createElement(
					'div',
					{
						className: isPopupOpen ? style.dateFocus : style.date,
						onClick: function onClick(e) {
							togglePopup(e, _this3.dropPopupRef, _this3.placeHolderRef);
						},
						ref: this.setPlaceHolderRef
					},
					React.createElement(Icon, { id: 'datePicker', color: 'tundora', styleId: 'date_Picker' }),
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
		key: 'handleSelect',
		value: function handleSelect(userZoneSelectedTime, e) {
			var _this4 = this;

			var value = userZoneSelectedTime ? userZoneSelectedTime.utc().format() : null;
			var _props2 = this.props,
			    id = _props2.id,
			    togglePopup = _props2.togglePopup;

			this.setState({ selected: value }, function () {
				if (_this4.props.validation && _this4.props.validation.validateOn) {
					_this4.validateOnSelect(_this4.state.selected, _this4.props);
				}
				_this4.onChangeValue(_this4.state.selected, id);
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
				var newValidation = validator.combinePropsValidation(this.props, defaultType, 'onChange', validation, defaultCheckPropsRules, defaultValidateRules);

				var validationObj = {
					validation: newValidation,
					onPassValidation: onPassValidation,
					onFailValidation: onFailValidation
				};

				validator.executeValidation(value, targetTag, validationObj, defaultType);
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
	placeholder: 'No date selected'
};

DateWidget.propTypes = (_DateWidget$propTypes = {
	id: PropTypes.string,
	isReadOnly: PropTypes.bool,
	value: PropTypes.string,
	dateTimeSelect: PropTypes.func,
	togglePopup: PropTypes.func,
	onChange: PropTypes.func,
	removeClose: PropTypes.func,
	name: PropTypes.string
}, _defineProperty(_DateWidget$propTypes, 'isReadOnly', PropTypes.bool), _defineProperty(_DateWidget$propTypes, 'minErrorText', PropTypes.string), _defineProperty(_DateWidget$propTypes, 'maxErrorText', PropTypes.string), _defineProperty(_DateWidget$propTypes, 'min', PropTypes.string), _defineProperty(_DateWidget$propTypes, 'max', PropTypes.string), _defineProperty(_DateWidget$propTypes, 'isPopupOpen', PropTypes.bool), _defineProperty(_DateWidget$propTypes, 'isDateTime', PropTypes.bool), _defineProperty(_DateWidget$propTypes, 'dtPtn', PropTypes.string), _defineProperty(_DateWidget$propTypes, 'position', PropTypes.string), _defineProperty(_DateWidget$propTypes, 'timeZone', PropTypes.string), _defineProperty(_DateWidget$propTypes, 'arrowPosition', PropTypes.string), _defineProperty(_DateWidget$propTypes, 'placeholder', PropTypes.string), _defineProperty(_DateWidget$propTypes, 'tabIndex', PropTypes.string), _defineProperty(_DateWidget$propTypes, 'getElementRef', PropTypes.func), _defineProperty(_DateWidget$propTypes, 'getValue', PropTypes.func), _defineProperty(_DateWidget$propTypes, 'onClick', PropTypes.func), _defineProperty(_DateWidget$propTypes, 'raised', PropTypes.bool), _defineProperty(_DateWidget$propTypes, 'focused', PropTypes.bool), _defineProperty(_DateWidget$propTypes, 'errored', PropTypes.bool), _defineProperty(_DateWidget$propTypes, 'validation', PropTypes.shape({
	validate: PropTypes.bool,
	validateOn: PropTypes.string,
	rulesOrder: PropTypes.arrayOf(PropTypes.string),
	rules: PropTypes.object,
	messages: PropTypes.object
})), _defineProperty(_DateWidget$propTypes, 'onPassValidation', PropTypes.func), _defineProperty(_DateWidget$propTypes, 'onFailValidation', PropTypes.func), _DateWidget$propTypes);

export default Popup(DateWidget);
//export const DateWidgetInline = Popup(DateWidget);