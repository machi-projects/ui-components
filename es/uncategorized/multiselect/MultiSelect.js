import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import style from './MultiSelect.css';
import { formatValue, bind } from '../common';

import validator from '../../utils/validator';
import Popup from '../Popup';
import Pill from '../Pill';

import { FormatText } from 'fz-i18n';

var MultiSelect = function (_React$Component) {
	_inherits(MultiSelect, _React$Component);

	function MultiSelect(props) {
		_classCallCheck(this, MultiSelect);

		var _this = _possibleConstructorReturn(this, (MultiSelect.__proto__ || _Object$getPrototypeOf(MultiSelect)).call(this, props));

		bind.apply(_this, ['handleFocus', 'handleKeyUp', 'handleSelect', 'handleChange', 'handleRemove', 'handleHover', 'handleToggle', 'handleKeyDown', 'onSelectedItem']);

		_this.state = {
			focusedSuggestion: 0,
			searchString: '',
			suggestions: formatValue(props.defaultSuggestions),
			selectedValues: formatValue(props.defaultSelectedValues)
		};

		_this.setRef = _this.setRef.bind(_this);
		_this.setDropPopupRef = _this.setDropPopupRef.bind(_this);
		return _this;
	}

	_createClass(MultiSelect, [{
		key: 'setRef',
		value: function setRef(el) {
			this.elementRef = el;
		}
	}, {
		key: 'setDropPopupRef',
		value: function setDropPopupRef(el) {
			this.dropPopupRef = el;
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextprops) {
			if (nextprops.selectedValues && nextprops.selectedValues !== this.props.defaultSelectedValues || nextprops.suggestions && nextprops.suggestions !== this.props.defaultSuggestions) {
				this.setState({
					suggestions: formatValue(nextprops.suggestions),
					selectedValues: formatValue(nextprops.selectedValues)
				});
			}

			if (nextprops.validation != null && nextprops.validation.validate) {
				this.validateOnSelect(this.state.selectedValues, nextprops);
			}
		}
	}, {
		key: 'validateOnSelect',
		value: function validateOnSelect(value, props) {
			var defaultCheckPropsRules = ['required'];
			var defaultValidateRules = ['required'];
			var defaultType = 'multigroup';

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
				this.validateOnSelect(this.state.selectedValues, this.props);
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
		value: function handleToggle(e) {
			e.stopPropagation && e.stopPropagation();
			e.nativeEvent && e.nativeEvent.stopImmediatePropagation && e.nativeEvent.stopImmediatePropagation();
			var _props2 = this.props,
			    isPopupOpen = _props2.isPopupOpen,
			    togglePopup = _props2.togglePopup;

			ReactDOM.findDOMNode(this.refs.nameInput).focus();
			!isPopupOpen && togglePopup(e, this.dropPopupRef);
		}
	}, {
		key: 'handleSelect',
		value: function handleSelect(selectedValue, e) {
			var _this2 = this;

			var _props3 = this.props,
			    closePopupOnly = _props3.closePopupOnly,
			    isPopupOpen = _props3.isPopupOpen,
			    groupName = _props3.groupName;


			var selectedValues = this.state.selectedValues;
			var newSelectedSuggestions = [].concat(_toConsumableArray(selectedValues), [selectedValue]);
			this.setState({ focusedSuggestion: 0, searchString: '', selectedValues: newSelectedSuggestions }, function () {
				_this2.onSelectedItem();
			});
			isPopupOpen && closePopupOnly(e);
			this.refs.nameInput.focus();
		}
	}, {
		key: 'onSelectedItem',
		value: function onSelectedItem() {
			this.props.onSelect && this.props.onSelect(this.state.selectedValues, this.props.groupName);
			if (this.props.validation && this.props.validation.validateOn) {
				this.validateOnSelect(this.state.selectedValues, this.props);
			}
		}
	}, {
		key: 'handleFocus',
		value: function handleFocus() {
			ReactDOM.findDOMNode(this.refs.nameInput).focus();
		}
	}, {
		key: 'handleRemove',
		value: function handleRemove(selectedValue, e) {
			var _this3 = this;

			var _props4 = this.props,
			    valueField = _props4.valueField,
			    isPopupOpen = _props4.isPopupOpen,
			    closePopupOnly = _props4.closePopupOnly,
			    groupName = _props4.groupName;

			var selectedValues = this.state.selectedValues;
			var newSelectedSuggestions = selectedValues.filter(function (selectedSuggestion, i) {
				return !(selectedSuggestion[valueField] === selectedValue[valueField]);
			});

			isPopupOpen && closePopupOnly(e);
			ReactDOM.findDOMNode(this.refs.nameInput).focus();
			this.setState({ focusedSuggestion: 0, selectedValues: newSelectedSuggestions }, function () {
				_this3.onSelectedItem();
			});
		}
	}, {
		key: 'handleKeyDown',
		value: function handleKeyDown(e) {
			var _this4 = this;

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
			    focusedSuggestion = _state.focusedSuggestion,
			    suggestions = _state.suggestions,
			    selectedValues = _state.selectedValues;

			var suggestionList = this.filterSuggestions(searchString, suggestions, selectedValues, searchKeys, searchType, valueField);

			var suggestionLength = suggestionList.length;
			switch (keyCode) {
				case 8:
					if (selectedValues.length && searchString.length == 0) {
						var newSelectedSuggestions = selectedValues.slice(0, -1);
						focusedSuggestion = 0;
						this.setState({ focusedSuggestion: focusedSuggestion, selectedValues: newSelectedSuggestions }, function () {
							_this4.onSelectedItem();
						});

						//isPopupOpen && closePopupOnly(e)
						this.handleFocus();
					}
					break;
			}
		}
	}, {
		key: 'handleKeyUp',
		value: function handleKeyUp(e) {
			var _this5 = this;

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
			    focusedSuggestion = _state2.focusedSuggestion,
			    suggestions = _state2.suggestions,
			    selectedValues = _state2.selectedValues;

			var suggestionList = this.filterSuggestions(searchString, suggestions, selectedValues, searchKeys, searchType, valueField);
			var suggestionLength = suggestionList.length;
			switch (keyCode) {
				case 40:
				case 34:
					if (suggestionLength) {
						if (focusedSuggestion === suggestionLength - 1) {
							focusedSuggestion = 0;
						} else {
							focusedSuggestion += 1;
						}
					}
					break;
				case 38:
				case 33:
					if (suggestionLength) {
						if (focusedSuggestion === 0) {
							focusedSuggestion = suggestionLength - 1;
						} else {
							focusedSuggestion -= 1;
						}
					}
					break;
				case 13:
					if (suggestionLength) {
						ReactDOM.findDOMNode(this.refs.nameInput).focus();
						var selectedSuggestion = suggestionList[focusedSuggestion];
						var newSelectedSuggestions = [].concat(_toConsumableArray(selectedValues), [selectedSuggestion]);

						if (isPopupOpen) {
							focusedSuggestion = 0;
							searchString = '';
							closePopupOnly(e);
						} else {
							togglePopup(e);
						}
						this.setState({ focusedSuggestion: focusedSuggestion, searchString: searchString, selectedValues: newSelectedSuggestions }, function () {
							if (isPopupOpen) {
								_this5.onSelectedItem();
								_this5.handleFocus();
							}
						});

						return;
					}
					break;

				case 9:
				case 27:
					isPopupOpen && closePopupOnly(e);
					break;
				default:
					focusedSuggestion = 0;
					break;
			}

			this.setState({ focusedSuggestion: focusedSuggestion, searchString: searchString });
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
		value: function handleHover(focusedSuggestion) {
			this.state.focusedSuggestion !== focusedSuggestion && this.setState({ focusedSuggestion: focusedSuggestion });
		}
	}, {
		key: 'render',
		value: function render() {
			var _this6 = this;

			var _state3 = this.state,
			    searchString = _state3.searchString,
			    focusedSuggestion = _state3.focusedSuggestion,
			    inputFocus = _state3.inputFocus;
			var _props7 = this.props,
			    groupName = _props7.groupName,
			    searchKeys = _props7.searchKeys,
			    searchType = _props7.searchType,
			    textField = _props7.textField,
			    valueField = _props7.valueField,
			    _props7$styles = _props7.styles,
			    styles = _props7$styles === undefined ? {} : _props7$styles,
			    isReadOnly = _props7.isReadOnly,
			    isPopupOpen = _props7.isPopupOpen,
			    togglePopup = _props7.togglePopup,
			    removeClose = _props7.removeClose,
			    placeholder = _props7.placeholder,
			    allowClear = _props7.allowClear;


			var stateSuggestions = this.state.suggestions;
			var stateSelectedValues = this.state.selectedValues;

			var selectedValues = stateSelectedValues.map(function (selectedValue, i) {
				return [React.createElement(SelectedItem, {
					value: selectedValue,
					allowClear: allowClear,
					textField: textField,
					onDelete: _this6.handleRemove,
					key: i
				})];
			});

			var suggestions = this.filterSuggestions(searchString, stateSuggestions, stateSelectedValues, searchKeys, searchType, valueField);

			var suggestionList = void 0;
			if (suggestions.length) {
				suggestionList = suggestions.map(function (suggestion, i) {
					var focus = focusedSuggestion === i;
					return React.createElement(SuggestionItem, {
						index: i,
						key: i,
						textField: textField,
						valueField: valueField,
						onHover: _this6.handleHover,
						value: suggestion,
						onSelect: _this6.handleSelect,
						focus: focus
					});
				});
			} else {
				suggestionList = React.createElement(FormatText, { i18NKey: 'No matches found', className: style.notfound, type: 'div' });
			}

			return React.createElement(
				'div',
				{ className: style.mainrel, ref: this.setRef },
				React.createElement(
					'div',
					{ className: isPopupOpen ? style.mainFlexWrap : style.mainBorder, onClick: !isReadOnly && this.handleToggle },
					selectedValues,
					React.createElement(
						'span',
						{ className: style.inputAdjust },
						React.createElement('input', {
							className: style.inputFocus,
							placeholder: placeholder,
							ref: 'nameInput',
							readOnly: isReadOnly,
							onKeyDown: this.handleKeyDown,
							onKeyUp: this.handleKeyUp,
							onChange: this.handleChange,
							value: searchString
						})
					),
					React.createElement('div', { className: style.clr })
				),
				React.createElement(
					'div',
					{ ref: this.setDropPopupRef, className: isPopupOpen ? style.ListAds : style.hide, onClick: removeClose },
					suggestionList
				),
				React.createElement('div', { className: style.clr })
			);
		}
	}]);

	return MultiSelect;
}(React.Component);

export default Popup(MultiSelect);

MultiSelect.defaultProps = {
	valueField: 'id',
	textField: 'name',
	searchKeys: ['name'],
	searchType: 'indexOf',
	allowClear: true
};

MultiSelect.propTypes = {
	groupName: PropTypes.string,
	placeholder: PropTypes.string,
	selectedValues: PropTypes.array,
	searchKeys: PropTypes.array,
	searchType: PropTypes.string,
	textField: PropTypes.string,
	valueField: PropTypes.string,
	suggestions: PropTypes.array,
	isReadOnly: PropTypes.bool,
	isPopupOpen: PropTypes.bool,
	togglePopup: PropTypes.func,
	removeClose: PropTypes.func,
	onSelect: PropTypes.func,
	closePopupOnly: PropTypes.func,

	validation: PropTypes.shape({
		validate: PropTypes.bool,
		validateOn: PropTypes.string,
		rulesOrder: PropTypes.arrayOf(PropTypes.string),
		rules: PropTypes.object,
		messages: PropTypes.object
	}),

	onPassValidation: PropTypes.func,
	onFailValidation: PropTypes.func
};

var SuggestionItem = function (_React$Component2) {
	_inherits(SuggestionItem, _React$Component2);

	function SuggestionItem(props) {
		_classCallCheck(this, SuggestionItem);

		var _this7 = _possibleConstructorReturn(this, (SuggestionItem.__proto__ || _Object$getPrototypeOf(SuggestionItem)).call(this, props));

		_this7.handleSelect = _this7.handleSelect.bind(_this7);
		_this7.handleHover = _this7.handleHover.bind(_this7);
		return _this7;
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
			    onSelect = _props9.onSelect,
			    value = _props9.value;

			onSelect && onSelect(value, e);
		}
	}, {
		key: 'render',
		value: function render() {
			var _props10 = this.props,
			    focus = _props10.focus,
			    textField = _props10.textField,
			    _props10$value = _props10.value,
			    value = _props10$value === undefined ? {} : _props10$value;


			var className = focus ? style.suggestionFocus : style.suggestion;
			return React.createElement(
				'div',
				{ className: className, onClick: this.handleSelect, onMouseOver: this.handleHover },
				value[textField]
			);
		}
	}]);

	return SuggestionItem;
}(React.Component);

SuggestionItem.propTypes = {
	value: PropTypes.object,
	textField: PropTypes.string,
	onHover: PropTypes.func,
	onSelect: PropTypes.func
};

var SelectedItem = function (_React$Component3) {
	_inherits(SelectedItem, _React$Component3);

	function SelectedItem(props) {
		_classCallCheck(this, SelectedItem);

		var _this8 = _possibleConstructorReturn(this, (SelectedItem.__proto__ || _Object$getPrototypeOf(SelectedItem)).call(this, props));

		_this8.handleRemove = _this8.handleRemove.bind(_this8);
		return _this8;
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
			    allowClear = _props12.allowClear;

			return React.createElement(
				'span',
				{ className: style.multiSel },
				React.createElement(Pill, {
					backIcon: allowClear ? { name: 'xCloseIcon', size: 'small' } : null,
					text: value[textField],
					onBackIconClick: this.handleRemove
				})
			);
		}
	}]);

	return SelectedItem;
}(React.Component);

SelectedItem.propTypes = {
	value: PropTypes.object,
	textField: PropTypes.string,
	onDelete: PropTypes.func
};