import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import { FormatText } from 'fz-i18n';
import style from './DropDown.css';
import Popup from '../Popup';
import { Icon } from '../../index';
import { formatValue, formatSelectedValue } from '../common';

import validator from '../../../utils/validator';
import { deepEqualObject } from '../../../utils/objectUtils';

var DropDown = function (_React$Component) {
	_inherits(DropDown, _React$Component);

	function DropDown(props) {
		_classCallCheck(this, DropDown);

		var _this = _possibleConstructorReturn(this, (DropDown.__proto__ || _Object$getPrototypeOf(DropDown)).call(this, props));

		var _formatSelectedValue = formatSelectedValue(formatValue(props.options, props.valueField, props.textField), props.selectedValue, props.valueField, props.textField),
		    selected = _formatSelectedValue.selected,
		    count = _formatSelectedValue.count,
		    selectedOptName = _formatSelectedValue.selectedOptName,
		    options = _formatSelectedValue.options;

		_this.state = {
			options: options,
			selectedOptName: selectedOptName,
			selected: selected,
			count: count,
			searchStr: ''
		};

		_this.handleOnSelect = _this.handleOnSelect.bind(_this);
		_this.handleOnSearch = _this.handleOnSearch.bind(_this);
		_this.filterSuggestion = _this.filterSuggestion.bind(_this);
		_this.togglePopup = _this.togglePopup.bind(_this);
		_this.onChangeValue = _this.onChangeValue.bind(_this);

		_this.setRef = _this.setRef.bind(_this);
		_this.setDropPopupRef = _this.setDropPopupRef.bind(_this);
		_this.setPlaceHolderRef = _this.setPlaceHolderRef.bind(_this);
		//this.setSearchInputRef = this.setSearchInputRef.bind(this);
		return _this;
	}

	_createClass(DropDown, [{
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
		key: 'handleOnSelect',
		value: function handleOnSelect(val, optName, count, e) {
			var _this2 = this;

			this.setState({ selected: val, selectedOptName: optName, count: count }, function () {
				_this2.onChangeValue(_this2.state.selected, _this2.props.groupName, e);
				if (_this2.props.validation && _this2.props.validation.validateOn) {
					_this2.validateOnSelect(_this2.state.selected, _this2.props);
				}
			});
			this.props.closePopupOnly && this.props.closePopupOnly(e);
		}
	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps, nextState) {
			return deepEqualObject(nextProps, this.props) == false || deepEqualObject(nextState, this.state) == false;
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {

			if (deepEqualObject(nextProps.selectedValue, this.state.selected) == false) {
				var _formatSelectedValue2 = formatSelectedValue(this.state.options, nextProps.selectedValue, this.props.valueField, this.props.textField),
				    selected = _formatSelectedValue2.selected,
				    count = _formatSelectedValue2.count,
				    selectedOptName = _formatSelectedValue2.selectedOptName;

				this.setState({ selectedOptName: selectedOptName, selected: selected, count: count });
			}

			if (deepEqualObject(nextProps.options, this.props.options) == false) {

				var options = formatValue(nextProps.options, this.props.valueField, this.props.textField);
				this.setState({ options: options });
			}

			if (deepEqualObject(nextProps.validation, this.props.validation) == false && nextProps.validation && nextProps.validation.validate) {
				this.validateOnSelect(this.state.selected, nextProps);
			}
		}
	}, {
		key: 'validateOnSelect',
		value: function validateOnSelect(value, props) {
			var defaultCheckPropsRules = ['required'];
			var defaultValidateRules = ['required', 'minLength', 'maxLength'];
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
		key: 'keyPress',
		value: function keyPress(e) {
			var keyCode = e.keyCode;
			var _props = this.props,
			    togglePopup = _props.togglePopup,
			    valueField = _props.valueField,
			    groupName = _props.groupName;
			var _state = this.state,
			    count = _state.count,
			    searchStr = _state.searchStr;

			var options = this.filterSuggestion(this.state.options, searchStr);
			if (options.length) {
				if (keyCode == 38) {
					if (count === 0) {
						count = options.length - 1;
					} else {
						count -= 1;
					}
					this.setState({ count: count });
				}

				if (keyCode == 40) {
					if (count === options.length - 1) {
						count = 0;
					} else {
						count += 1;
					}
					this.setState({ count: count });
				}

				if (keyCode == 13) {
					var opt = options[this.state.count],
					    val = opt[valueField];
					this.setState({ selected: val });

					this.onChangeValue(val, groupName, e);
					togglePopup && togglePopup(e);
				}
			}
		}
	}, {
		key: 'togglePopup',
		value: function togglePopup(e, dropRef, placeHolderRef) {
			var _this3 = this;

			this.setState({ searchStr: '' });
			var con = this.refs.suggestionContainer;
			var elem = this.refs['suggestion_' + this.state.count];
			elem && (con.scrollTop = elem.offsetTop - 33);
			this.props.togglePopup(e, dropRef, placeHolderRef);
			requestAnimationFrame(function () {
				_this3.refs.input && _this3.refs.input.focus();
			});
		}
	}, {
		key: 'handleOnSearch',
		value: function handleOnSearch(e) {
			this.setState({ searchStr: e.target.value, count: 0 });
		}
	}, {
		key: 'onChangeValue',
		value: function onChangeValue(val, groupName, e) {
			this.props.onChange && this.props.onChange(val, groupName, e);
			this.props.getValue && this.props.getValue(val);
		}
	}, {
		key: 'filterSuggestion',
		value: function filterSuggestion() {
			var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
			var searchStr = arguments[1];


			var textField = this.props.textField;
			var valueField = this.props.valueField;

			var minimumResultsForSearch = this.props.minimumResultsForSearch;
			var suggestions = options.filter(function (opt, index) {
				var val = opt[valueField],
				    name = opt[textField];
				return name.toLowerCase().indexOf(searchStr.toLowerCase()) != -1;
			});

			suggestions = suggestions.length ? suggestions : [];
			if (minimumResultsForSearch > 0 && searchStr) {
				return suggestions.splice(0, minimumResultsForSearch);
			}

			return suggestions;
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps, prevState) {

			var suggestionContainer = ReactDom.findDOMNode(this.refs.suggestionContainer);
			var selSuggestion = ReactDom.findDOMNode(this.refs['suggestion_' + this.state.count]);
			if (selSuggestion && suggestionContainer) {
				if (suggestionContainer.scrollHeight == selSuggestion.offsetTop + selSuggestion.offsetHeight) {
					suggestionContainer.scrollTop = selSuggestion.offsetTop - 200;
				} else if (selSuggestion.offsetTop == 0) {
					suggestionContainer.scrollTop = 0;
				} else if (suggestionContainer.offsetHeight + suggestionContainer.scrollTop < selSuggestion.offsetTop) {
					suggestionContainer.scrollTop = selSuggestion.offsetTop - 200;
				} else if (suggestionContainer.scrollTop > selSuggestion.offsetTop) {
					suggestionContainer.scrollTop = selSuggestion.offsetTop - 30;
				}
			}
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (this.props.validation != null && this.props.validation.validate) {
				this.validateOnSelect(this.state.selected, this.props);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this4 = this;

			var _props2 = this.props,
			    isPopupReady = _props2.isPopupReady,
			    isPopupOpen = _props2.isPopupOpen,
			    position = _props2.position,
			    removeClose = _props2.removeClose,
			    isError = _props2.isError,
			    placeholder = _props2.placeholder,
			    minimumResultsForSearch = _props2.minimumResultsForSearch,
			    enableSeachOptionsCount = _props2.enableSeachOptionsCount,
			    tabIndex = _props2.tabIndex,
			    onClick = _props2.onClick,
			    textField = _props2.textField,
			    valueField = _props2.valueField,
			    styleId = _props2.styleId;


			var options = this.state.options;

			var arrowopen = isPopupOpen ? style[styleId + '_arrowUp'] : style[styleId + '_arrowDown'];
			var suggestions = this.filterSuggestion(options, this.state.searchStr);

			var enableSearch = minimumResultsForSearch > 0 && options.length >= enableSeachOptionsCount;
			return React.createElement(
				'div',
				{ className: style[styleId + '_main'], ref: this.setRef, tabIndex: tabIndex, onClick: onClick },
				React.createElement(
					'div',
					{ onClick: function onClick(e) {
							_this4.togglePopup(e, _this4.dropPopupRef, _this4.placeHolderRef);
						},
						ref: this.setPlaceHolderRef },
					React.createElement(
						'div',
						{
							className: isError ? style[styleId + '_isError'] + ' ' + style[styleId + '_dropdown'] + ' ' + arrowopen : style[styleId + '_dropdown'] + ' ' + arrowopen
						},
						React.createElement(
							'span',
							{ className: style[styleId + '_selectname'] },
							this.state.selectedOptName
						)
					)
				),
				React.createElement(
					'div',
					{ ref: this.setDropPopupRef, onClick: removeClose,
						className: style[styleId + '_droppopup'] + ' ' + (isPopupReady ? style.ready : '') + ' ' + (isPopupOpen ? style.opened : '') + ' ' + (position == 'top' ? style[styleId + '_listViewTop'] : style[styleId + '_listview']) },
					enableSearch && React.createElement(
						'div',
						{ className: style[styleId + '_posRel'] },
						React.createElement('input', {
							type: 'text',
							ref: 'input',
							className: style[styleId + '_searchicon'],
							placeholder: placeholder,
							onKeyDown: this.keyPress.bind(this),
							onChange: this.handleOnSearch,
							value: this.state.searchStr

						}),
						React.createElement(
							'div',
							{ className: style[styleId + '_searchIconPosSet'] },
							React.createElement(Icon, { id: 'searchIcon', color: 'greyshade2', size: 'size15' })
						)
					),
					suggestions.length ? React.createElement(
						'ul',
						{ className: style[styleId + '_listmenu'], ref: 'suggestionContainer' },
						suggestions.map(function (opt, index) {

							var val = opt[valueField];
							var name = opt[textField];

							return React.createElement(
								'li',
								{
									key: index + 'opt',
									ref: 'suggestion_' + index,
									className: _this4.state.count == index ? style[styleId + '_bccolor'] : style[styleId + '_normal'],
									onClick: _this4.handleOnSelect.bind(_this4, val, name, index)
								},
								name
							);
						})
					) : React.createElement(FormatText, { i18NKey: 'No matches found', className: style[styleId + '_notfound'], type: 'div' })
				)
			);
		}
	}]);

	return DropDown;
}(React.Component);

export default Popup(DropDown);

DropDown.defaultProps = {
	minimumResultsForSearch: Infinity,
	enableSeachOptionsCount: 1,
	textField: "name",
	valueField: "id",
	styleId: "default"
};

DropDown.propTypes = {
	styleId: PropTypes.string,
	options: PropTypes.array,
	defaultOptions: PropTypes.array,
	id: PropTypes.string,
	textField: PropTypes.string,
	isPopupOpen: PropTypes.bool,
	position: PropTypes.string,
	removeClose: PropTypes.func,
	isError: PropTypes.bool,
	onChange: PropTypes.func,
	groupName: PropTypes.string,
	selectedValue: PropTypes.string,
	togglePopup: PropTypes.func,

	tabIndex: PropTypes.string,
	getElementRef: PropTypes.func,
	getValue: PropTypes.func,
	onClick: PropTypes.func,

	raised: PropTypes.bool,
	focused: PropTypes.bool,
	errored: PropTypes.bool,

	minimumResultsForSearch: PropTypes.number,
	enableSeachOptionsCount: PropTypes.number,

	placeholder: PropTypes.string,
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