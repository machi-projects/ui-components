'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _MultiSelect$propType;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _MultiSelect = require('./MultiSelect.css');

var _MultiSelect2 = _interopRequireDefault(_MultiSelect);

var _common = require('../common');

var _objectUtils = require('../../../utils/objectUtils');

var _validator = require('../../../utils/validator');

var _validator2 = _interopRequireDefault(_validator);

var _Popup = require('../Popup');

var _Popup2 = _interopRequireDefault(_Popup);

var _Pill = require('../Pill');

var _Pill2 = _interopRequireDefault(_Pill);

var _fzI18n = require('fz-i18n');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MultiSelect = function (_React$Component) {
	_inherits(MultiSelect, _React$Component);

	function MultiSelect(props) {
		_classCallCheck(this, MultiSelect);

		var _this = _possibleConstructorReturn(this, (MultiSelect.__proto__ || Object.getPrototypeOf(MultiSelect)).call(this, props));

		_common.bind.apply(_this, ['handleSearchFocus', 'handleKeyUp', 'handleSelect', 'handleChange', 'handleRemove', 'handleHover', 'handleToggle', 'handleToggleClick', 'handleKeyDown', 'onSelectedItem', 'onChangeValue']);

		_this.state = {
			focusedSuggestionIndex: 0,
			searchString: '',
			selectedValues: props.selectedValues,
			formattedSuggestions: (0, _common.formatValue)(props.suggestions, props.valueField, props.textField),
			formattedSelectedValues: (0, _common.formatValue)(props.selectedValues, props.valueField, props.textField)
		};

		_this.setRef = _this.setRef.bind(_this);
		_this.setDropPopupRef = _this.setDropPopupRef.bind(_this);
		_this.setPlaceHolderRef = _this.setPlaceHolderRef.bind(_this);
		_this.setSearchInputRef = _this.setSearchInputRef.bind(_this);
		return _this;
	}

	_createClass(MultiSelect, [{
		key: 'setRef',
		value: function setRef(el) {
			this.elementRef = el;
			this.props.getElementRef && this.props.getElementRef(el);
		}
	}, {
		key: 'setDropPopupRef',
		value: function setDropPopupRef(el) {
			this.dropPopupRef = el;
		}
	}, {
		key: 'setPlaceHolderRef',
		value: function setPlaceHolderRef(el) {
			this.placeHolderRef = el;
		}
	}, {
		key: 'setSearchInputRef',
		value: function setSearchInputRef(el) {
			this.searchInputRef = el;
		}
	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps, nextState) {
			return (0, _objectUtils.deepEqualObject)(nextProps, this.props) == false || (0, _objectUtils.deepEqualObject)(nextState, this.state) == false;
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var _this2 = this;

			if ((0, _objectUtils.deepEqualObject)(nextProps.selectedValues, this.state.selectedValues) == false) {

				this.setState({
					selectedValues: nextProps.selectedValues,
					formattedSelectedValues: (0, _common.formatValue)(nextProps.selectedValues, this.props.valueField, this.props.textField)
				}, function () {

					var selectedValues = (0, _common.getSelectedValue)(_this2.state.formattedSelectedValues, _this2.props.valueField);
					_this2.onChangeValue(selectedValues);
				});
			}

			if ((0, _objectUtils.deepEqualObject)(nextProps.suggestions, this.props.suggestions) == false) {
				this.setState({
					formattedSuggestions: (0, _common.formatValue)(nextProps.suggestions, this.props.valueField, this.props.textField)
				});
			}

			if ((0, _objectUtils.deepEqualObject)(nextProps.validation, this.props.validation) == false && nextProps.validation && nextProps.validation.validate) {
				this.validateOnSelect((0, _common.getSelectedValue)(this.state.formattedSelectedValues, this.props.valueField), nextProps);
			}
		}
	}, {
		key: 'validateOnSelect',
		value: function validateOnSelect(value, props) {
			var defaultCheckPropsRules = ['required'];
			var defaultValidateRules = ['required', 'minLength', 'maxLength'];
			var defaultType = 'multigroup';

			var validation = props.validation,
			    onPassValidation = props.onPassValidation,
			    onFailValidation = props.onFailValidation;


			var targetTag = this.elementRef;
			if (validation != null) {
				//validateOn won't work here ...
				var newValidation = _validator2.default.combinePropsValidation(this.props, defaultType, 'onChange', validation, defaultCheckPropsRules, defaultValidateRules);

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
				this.validateOnSelect((0, _common.getSelectedValue)(this.state.formattedSelectedValues, this.props.valueField), this.props);
			}
		}
	}, {
		key: 'handleChange',
		value: function handleChange(e) {
			var _props = this.props,
			    isPopupOpen = _props.isPopupOpen,
			    togglePopup = _props.togglePopup;

			this.setState({ searchString: e.target.value });
			if (!isPopupOpen) {
				togglePopup(e);
			}
		}
	}, {
		key: 'handleToggle',
		value: function handleToggle(e, dropRef, placeHolderRef) {
			e.stopPropagation && e.stopPropagation();
			e.nativeEvent && e.nativeEvent.stopImmediatePropagation && e.nativeEvent.stopImmediatePropagation();
			var _props2 = this.props,
			    isPopupOpen = _props2.isPopupOpen,
			    togglePopup = _props2.togglePopup;

			this.handleSearchFocus();
			!isPopupOpen && togglePopup(e, dropRef, placeHolderRef);
		}
	}, {
		key: 'handleSelect',
		value: function handleSelect(selectedValue, e) {
			var _this3 = this;

			var _props3 = this.props,
			    closePopupOnly = _props3.closePopupOnly,
			    isPopupOpen = _props3.isPopupOpen;

			this.setState(function (state) {

				state.focusedSuggestionIndex = 0;
				state.searchString = '';
				state.formattedSelectedValues = [].concat(_toConsumableArray(state.formattedSelectedValues), [selectedValue]);
			}, function () {
				_this3.onSelectedItem();
			});

			isPopupOpen && closePopupOnly(e);
			this.handleSearchFocus();
		}
	}, {
		key: 'onSelectedItem',
		value: function onSelectedItem() {

			var selectedValues = (0, _common.getSelectedValue)(this.state.formattedSelectedValues, this.props.valueField);
			this.onChangeValue(selectedValues, this.props.groupName);
			if (this.props.validation && this.props.validation.validateOn) {
				this.validateOnSelect(selectedValues, this.props);
			}
		}
	}, {
		key: 'onChangeValue',
		value: function onChangeValue(val, groupName) {
			this.props.onChange && this.props.onChange(val, groupName);
			this.props.getValue && this.props.getValue(val);
		}
	}, {
		key: 'handleSearchFocus',
		value: function handleSearchFocus() {
			this.searchInputRef && this.searchInputRef.focus();
		}
	}, {
		key: 'handleRemove',
		value: function handleRemove(selectedValue, e) {
			var _this4 = this;

			var _props4 = this.props,
			    valueField = _props4.valueField,
			    isPopupOpen = _props4.isPopupOpen,
			    closePopupOnly = _props4.closePopupOnly,
			    groupName = _props4.groupName;

			var selectedValues = this.state.formattedSelectedValues;
			var newSelectedSuggestions = selectedValues.filter(function (selectedSuggestion, i) {
				return !(selectedSuggestion[valueField] === selectedValue[valueField]);
			});

			isPopupOpen && closePopupOnly(e);
			this.handleSearchFocus();
			this.setState({ focusedSuggestionIndex: 0, formattedSelectedValues: newSelectedSuggestions }, function () {
				_this4.onSelectedItem();
			});
		}
	}, {
		key: 'handleKeyDown',
		value: function handleKeyDown(e) {
			var _this5 = this;

			var keyCode = e.keyCode;
			var searchString = e.target.value;
			var _props5 = this.props,
			    valueField = _props5.valueField,
			    searchKeys = _props5.searchKeys,
			    searchType = _props5.searchType,
			    isPopupOpen = _props5.isPopupOpen,
			    closePopupOnly = _props5.closePopupOnly,
			    groupName = _props5.groupName;
			var _state = this.state,
			    focusedSuggestionIndex = _state.focusedSuggestionIndex,
			    formattedSuggestions = _state.formattedSuggestions,
			    formattedSelectedValues = _state.formattedSelectedValues;

			var suggestionList = this.filterSuggestions(searchString, formattedSuggestions, formattedSelectedValues, searchKeys, searchType, valueField);

			var suggestionLength = suggestionList.length;
			switch (keyCode) {
				case 8:
					if (formattedSelectedValues.length && searchString.length == 0) {
						var newSelectedSuggestions = formattedSelectedValues.slice(0, -1);
						focusedSuggestionIndex = 0;
						this.setState({ focusedSuggestionIndex: focusedSuggestionIndex, formattedSelectedValues: newSelectedSuggestions }, function () {
							_this5.onSelectedItem();
						});

						//isPopupOpen && closePopupOnly(e)
						this.handleSearchFocus();
					}
					break;
			}
		}
	}, {
		key: 'handleKeyUp',
		value: function handleKeyUp(e) {
			var _this6 = this;

			var keyCode = e.keyCode;
			var searchString = e.target.value;
			var _props6 = this.props,
			    textField = _props6.textField,
			    valueField = _props6.valueField,
			    searchKeys = _props6.searchKeys,
			    searchType = _props6.searchType,
			    isPopupOpen = _props6.isPopupOpen,
			    togglePopup = _props6.togglePopup,
			    closePopupOnly = _props6.closePopupOnly,
			    groupName = _props6.groupName;
			var _state2 = this.state,
			    focusedSuggestionIndex = _state2.focusedSuggestionIndex,
			    formattedSuggestions = _state2.formattedSuggestions,
			    formattedSelectedValues = _state2.formattedSelectedValues;

			var suggestionList = this.filterSuggestions(searchString, formattedSuggestions, formattedSelectedValues, searchKeys, searchType, valueField);
			var suggestionLength = suggestionList.length;
			switch (keyCode) {
				case 40:
				case 34:
					if (suggestionLength) {
						if (focusedSuggestionIndex === suggestionLength - 1) {
							focusedSuggestionIndex = 0;
						} else {
							focusedSuggestionIndex += 1;
						}
					}
					break;
				case 38:
				case 33:
					if (suggestionLength) {
						if (focusedSuggestionIndex === 0) {
							focusedSuggestionIndex = suggestionLength - 1;
						} else {
							focusedSuggestionIndex -= 1;
						}
					}
					break;
				case 13:
					if (suggestionLength) {
						this.handleSearchFocus();
						var selectedSuggestion = suggestionList[focusedSuggestionIndex];
						var newSelectedSuggestions = [].concat(_toConsumableArray(formattedSelectedValues), [selectedSuggestion]);

						//if (isPopupOpen) {
						focusedSuggestionIndex = 0;
						searchString = '';
						//closePopupOnly(e);
						//}

						/*else{
      	togglePopup(e);
      }*/

						//togglePopup(e);
						this.setState({ focusedSuggestionIndex: focusedSuggestionIndex, searchString: searchString, formattedSelectedValues: newSelectedSuggestions }, function () {
							//if (isPopupOpen) {
							_this6.onSelectedItem();
							_this6.handleSearchFocus();
							//}
						});

						return;
					}
					break;

				case 9:
				case 27:
					isPopupOpen && closePopupOnly(e);
					break;
				default:
					focusedSuggestionIndex = 0;
					break;
			}

			this.setState({ focusedSuggestionIndex: focusedSuggestionIndex, searchString: searchString });
		}
	}, {
		key: 'filterSuggestions',
		value: function filterSuggestions(searchString) {
			var suggestions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
			var selectedValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
			var searchKeys = arguments[3];
			var searchType = arguments[4];
			var valueField = arguments[5];

			searchString = typeof searchString === 'number' ? searchString.toString() : searchString;
			suggestions = selectedValues.length && suggestions.filter(function (suggestion) {
				return !selectedValues.some(function (value) {
					return suggestion[valueField] === value[valueField];
				});
			}) || suggestions;
			return searchString && suggestions.filter(function (suggestion) {
				return searchKeys && searchKeys.some(function (searchKey) {
					var result = suggestion[searchKey] && suggestion[searchKey].toLowerCase()[searchType](searchString);
					return !(result === false || result === -1);
				});
			}) || suggestions;
		}
	}, {
		key: 'handleHover',
		value: function handleHover(focusedSuggestionIndex) {
			this.state.focusedSuggestionIndex !== focusedSuggestionIndex && this.setState({ focusedSuggestionIndex: focusedSuggestionIndex });
		}
	}, {
		key: 'handleToggleClick',
		value: function handleToggleClick(ev) {

			this.handleToggle(ev, this.dropPopupRef, this.placeHolderRef);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this7 = this;

			var _state3 = this.state,
			    searchString = _state3.searchString,
			    focusedSuggestionIndex = _state3.focusedSuggestionIndex,
			    inputFocus = _state3.inputFocus;
			var _props7 = this.props,
			    groupName = _props7.groupName,
			    searchKeys = _props7.searchKeys,
			    searchType = _props7.searchType,
			    textField = _props7.textField,
			    valueField = _props7.valueField,
			    styleId = _props7.styleId,
			    isReadOnly = _props7.isReadOnly,
			    isPopupReady = _props7.isPopupReady,
			    isPopupOpen = _props7.isPopupOpen,
			    position = _props7.position,
			    togglePopup = _props7.togglePopup,
			    removeClose = _props7.removeClose,
			    placeholder = _props7.placeholder,
			    allowClear = _props7.allowClear,
			    tabIndex = _props7.tabIndex,
			    onClick = _props7.onClick;


			var stateSuggestions = this.state.formattedSuggestions;
			var stateSelectedValues = this.state.formattedSelectedValues;

			var displaySelectedItems = stateSelectedValues.map(function (selectedValue, i) {
				return [_react2.default.createElement(SelectedItem, {
					value: selectedValue,
					allowClear: allowClear,
					textField: textField,
					onDelete: _this7.handleRemove,
					key: i,
					styleId: styleId
				})];
			});

			var suggestions = this.filterSuggestions(searchString, stateSuggestions, stateSelectedValues, searchKeys, searchType, valueField);

			var suggestionList = null;
			if (suggestions.length) {
				suggestionList = suggestions.map(function (suggestion, i) {
					var focus = focusedSuggestionIndex === i;
					return _react2.default.createElement(SuggestionItem, {
						index: i,
						key: i,
						textField: textField,
						valueField: valueField,
						onHover: _this7.handleHover,
						option: suggestion,
						onChange: _this7.handleSelect,
						focus: focus,
						styleId: styleId
					});
				});
			} else {
				suggestionList = _react2.default.createElement(_fzI18n.FormatText, { i18NKey: 'No matches found', className: _MultiSelect2.default[styleId + '_notfound'], type: 'div' });
			}

			return _react2.default.createElement(
				'div',
				{ className: _MultiSelect2.default[styleId + '_mainrel'], ref: this.setRef, tabIndex: tabIndex, onClick: onClick },
				_react2.default.createElement(
					'div',
					{ ref: this.setPlaceHolderRef, className: isPopupOpen ? _MultiSelect2.default[styleId + '_mainFlexWrap'] : _MultiSelect2.default[styleId + '_mainBorder'],
						onClick: !isReadOnly && this.handleToggleClick },
					displaySelectedItems,
					_react2.default.createElement(
						'span',
						{ className: _MultiSelect2.default[styleId + '_inputAdjust'] },
						_react2.default.createElement('input', {
							className: _MultiSelect2.default[styleId + '_inputFocus'],
							placeholder: placeholder,
							ref: this.setSearchInputRef,
							readOnly: isReadOnly,
							onKeyDown: this.handleKeyDown,
							onKeyUp: this.handleKeyUp,
							onChange: this.handleChange,
							value: searchString
						})
					),
					_react2.default.createElement('div', { className: _MultiSelect2.default[styleId + '_clr'] })
				),
				_react2.default.createElement(
					'div',
					{ ref: this.setDropPopupRef, onClick: removeClose,

						className: _MultiSelect2.default[styleId + '_droppopup'] + ' ' + (isPopupReady ? _MultiSelect2.default.ready : '') + ' ' + (isPopupOpen ? _MultiSelect2.default.opened : '') + ' ' + (position == 'top' ? _MultiSelect2.default[styleId + '_ListAdsTop'] : _MultiSelect2.default[styleId + '_ListAds']) },
					suggestionList
				),
				_react2.default.createElement('div', { className: _MultiSelect2.default[styleId + '_clr'] })
			);
		}
	}]);

	return MultiSelect;
}(_react2.default.Component);

exports.default = (0, _Popup2.default)(MultiSelect);


MultiSelect.defaultProps = {
	valueField: 'id',
	textField: 'name',
	searchKeys: ['name'],
	searchType: 'indexOf',
	allowClear: true,
	styleId: "default"
};

MultiSelect.propTypes = (_MultiSelect$propType = {
	styleId: _propTypes2.default.string,
	groupName: _propTypes2.default.string,
	placeholder: _propTypes2.default.string,
	selectedValues: _propTypes2.default.array,
	searchKeys: _propTypes2.default.array,
	searchType: _propTypes2.default.string,
	textField: _propTypes2.default.string,
	valueField: _propTypes2.default.string,
	suggestions: _propTypes2.default.array,
	isReadOnly: _propTypes2.default.bool,
	isPopupOpen: _propTypes2.default.bool,
	togglePopup: _propTypes2.default.func,
	removeClose: _propTypes2.default.func,
	onChange: _propTypes2.default.func,
	closePopupOnly: _propTypes2.default.func,

	tabIndex: _propTypes2.default.string,
	getElementRef: _propTypes2.default.func,
	getValue: _propTypes2.default.func,
	onClick: _propTypes2.default.func,

	errored: _propTypes2.default.bool,
	focused: _propTypes2.default.bool
}, _defineProperty(_MultiSelect$propType, 'errored', _propTypes2.default.bool), _defineProperty(_MultiSelect$propType, 'validation', _propTypes2.default.shape({
	validate: _propTypes2.default.bool,
	validateOn: _propTypes2.default.string,
	rulesOrder: _propTypes2.default.arrayOf(_propTypes2.default.string),
	rules: _propTypes2.default.object,
	messages: _propTypes2.default.object
})), _defineProperty(_MultiSelect$propType, 'onPassValidation', _propTypes2.default.func), _defineProperty(_MultiSelect$propType, 'onFailValidation', _propTypes2.default.func), _MultiSelect$propType);

var SuggestionItem = function (_React$Component2) {
	_inherits(SuggestionItem, _React$Component2);

	function SuggestionItem(props) {
		_classCallCheck(this, SuggestionItem);

		var _this8 = _possibleConstructorReturn(this, (SuggestionItem.__proto__ || Object.getPrototypeOf(SuggestionItem)).call(this, props));

		_this8.handleSelect = _this8.handleSelect.bind(_this8);
		_this8.handleHover = _this8.handleHover.bind(_this8);
		return _this8;
	}

	_createClass(SuggestionItem, [{
		key: 'handleHover',
		value: function handleHover() {
			var _props8 = this.props,
			    onHover = _props8.onHover,
			    index = _props8.index;

			onHover && onHover(index);
		}
	}, {
		key: 'handleSelect',
		value: function handleSelect(e) {
			var _props9 = this.props,
			    onChange = _props9.onChange,
			    option = _props9.option;

			onChange && onChange(option, e);
		}
	}, {
		key: 'render',
		value: function render() {
			var _props10 = this.props,
			    focus = _props10.focus,
			    textField = _props10.textField,
			    _props10$option = _props10.option,
			    option = _props10$option === undefined ? {} : _props10$option,
			    styleId = _props10.styleId;


			var className = focus ? _MultiSelect2.default[styleId + '_suggestionFocus'] : _MultiSelect2.default[styleId + '_suggestion'];
			return _react2.default.createElement(
				'div',
				{ className: className, onClick: this.handleSelect, onMouseOver: this.handleHover },
				option[textField]
			);
		}
	}]);

	return SuggestionItem;
}(_react2.default.Component);

SuggestionItem.propTypes = {
	option: _propTypes2.default.object,
	textField: _propTypes2.default.string,
	onHover: _propTypes2.default.func,
	onChange: _propTypes2.default.func
};

var SelectedItem = function (_React$Component3) {
	_inherits(SelectedItem, _React$Component3);

	function SelectedItem(props) {
		_classCallCheck(this, SelectedItem);

		var _this9 = _possibleConstructorReturn(this, (SelectedItem.__proto__ || Object.getPrototypeOf(SelectedItem)).call(this, props));

		_this9.handleRemove = _this9.handleRemove.bind(_this9);
		return _this9;
	}

	_createClass(SelectedItem, [{
		key: 'handleRemove',
		value: function handleRemove(groupName, e) {
			e.stopPropagation();

			e.nativeEvent && e.nativeEvent.stopImmediatePropagation && e.nativeEvent.stopImmediatePropagation();
			var _props11 = this.props,
			    onDelete = _props11.onDelete,
			    value = _props11.value;

			onDelete && onDelete(value, e);
		}
	}, {
		key: 'render',
		value: function render() {
			var _props12 = this.props,
			    textField = _props12.textField,
			    _props12$value = _props12.value,
			    value = _props12$value === undefined ? {} : _props12$value,
			    allowClear = _props12.allowClear,
			    styleId = _props12.styleId;

			return _react2.default.createElement(
				'span',
				{ className: _MultiSelect2.default[styleId + '_multiSel'] },
				_react2.default.createElement(_Pill2.default, {
					backIcon: allowClear ? { name: 'closeicon', size: 'small' } : null,
					text: value[textField],
					onBackIconClick: this.handleRemove
				})
			);
		}
	}]);

	return SelectedItem;
}(_react2.default.Component);

SelectedItem.propTypes = {
	value: _propTypes2.default.object,
	textField: _propTypes2.default.string,
	onDelete: _propTypes2.default.func
};