import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _typeof from 'babel-runtime/helpers/typeof';
import React from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import { FormatText } from 'fz-i18n';
import style from './DropDown.css';
import Popup from '../Popup';
import { Icon } from '../../asap/index';
import { formatValue } from '../common';

import validator from '../../utils/validator';

var getSelectedValue = function getSelectedValue(options, value) {
	var selected = value,
	    count = 0,
	    selectedOptName = value;
	options.forEach(function (opt, index) {
		var val = opt,
		    name = opt;
		if ((typeof opt === 'undefined' ? 'undefined' : _typeof(opt)) == 'object') {
			val = opt.id;
			name = opt.name;
		}

		if (value == val) {
			selected = val;
			count = index;
			selectedOptName = name;
		}
	});
	return { selected: selected, count: count, selectedOptName: selectedOptName, options: options };
};

var DropDown = function (_React$Component) {
	_inherits(DropDown, _React$Component);

	function DropDown(props) {
		_classCallCheck(this, DropDown);

		var _this = _possibleConstructorReturn(this, (DropDown.__proto__ || _Object$getPrototypeOf(DropDown)).call(this, props));

		var _getSelectedValue = getSelectedValue(formatValue(props.defaultOptions), props.defaultValue),
		    selected = _getSelectedValue.selected,
		    count = _getSelectedValue.count,
		    selectedOptName = _getSelectedValue.selectedOptName,
		    options = _getSelectedValue.options;

		_this.state = {
			options: options,
			selectedOptName: selectedOptName,
			selected: selected,
			count: count,
			searchStr: ''
		};
		_this.textidchange = _this.textidchange.bind(_this);
		_this.handleChange = _this.handleChange.bind(_this);
		_this.filterSuggestion = _this.filterSuggestion.bind(_this);
		_this.togglePopup = _this.togglePopup.bind(_this);

		_this.setRef = _this.setRef.bind(_this);
		_this.setDropPopupRef = _this.setDropPopupRef.bind(_this);
		return _this;
	}

	_createClass(DropDown, [{
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
		key: 'textidchange',
		value: function textidchange(id, opt, count, e) {
			var _this2 = this;

			this.setState({ selected: id, selectedOptName: opt, count: count }, function () {
				_this2.props.onSelect && _this2.props.onSelect(_this2.state.selected, _this2.props.groupName, e);
				if (_this2.props.validation && _this2.props.validation.validateOn) {
					_this2.validateOnSelect(_this2.state.selected, _this2.props);
				}
			});
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextprops) {
			if (nextprops.value && nextprops.value !== this.props.defaultValue || nextprops.options && nextprops.options !== this.props.defaultOptions) {
				this.setState(getSelectedValue(formatValue(nextprops.options), nextprops.value));
			}

			if (nextprops.validation != null && nextprops.validation.validate) {
				this.validateOnSelect(this.state.selected, nextprops);
			}
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
		key: 'keyPress',
		value: function keyPress(e) {
			var keyCode = e.keyCode;
			var _props = this.props,
			    onSelect = _props.onSelect,
			    id = _props.id,
			    togglePopup = _props.togglePopup;
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
					    val = opt;
					if ((typeof opt === 'undefined' ? 'undefined' : _typeof(opt)) == 'object') {
						val = opt.id;
					}
					this.setState({ selected: val });
					onSelect && onSelect(val, id, e);
					togglePopup && togglePopup(e);
				}
			}
		}
	}, {
		key: 'togglePopup',
		value: function togglePopup(e) {
			var _this3 = this;

			this.setState({ searchStr: '' });
			var con = this.refs.suggestionContainer;
			var elem = this.refs['suggestion_' + this.state.count];
			elem && (con.scrollTop = elem.offsetTop - 33);
			this.props.togglePopup(e, this.dropPopupRef);
			requestAnimationFrame(function () {
				_this3.refs.input && _this3.refs.input.focus();
			});
		}
	}, {
		key: 'handleChange',
		value: function handleChange(e) {
			this.setState({ searchStr: e.target.value, count: 0 });
		}
	}, {
		key: 'filterSuggestion',
		value: function filterSuggestion() {
			var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
			var searchStr = arguments[1];

			var minimumResultsForSearch = this.props.minimumResultsForSearch;
			var suggestions = options.filter(function (opt, index) {
				var val = opt.id,
				    name = opt.name;
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
		value: function componentDidUpdate() {
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
			    isPopupOpen = _props2.isPopupOpen,
			    position = _props2.position,
			    removeClose = _props2.removeClose,
			    isError = _props2.isError,
			    placeholder = _props2.placeholder,
			    minimumResultsForSearch = _props2.minimumResultsForSearch,
			    enableSeachOptionsCount = _props2.enableSeachOptionsCount;

			var options = this.state.options;

			var arrowopen = isPopupOpen ? style.arrowUp : style.arrowDown;
			var suggestions = this.filterSuggestion(options, this.state.searchStr);

			var enableSearch = minimumResultsForSearch > 0 && options.length >= enableSeachOptionsCount;
			return React.createElement(
				'div',
				{ className: style.main, ref: this.setRef },
				React.createElement(
					'div',
					{ onClick: this.togglePopup },
					React.createElement(
						'div',
						{
							className: isError ? style.isError + ' ' + style.dropdown + ' ' + arrowopen : style.dropdown + ' ' + arrowopen
						},
						React.createElement(
							'span',
							{ className: style.selectname },
							this.state.selectedOptName
						)
					)
				),
				React.createElement(
					'div',
					{ ref: this.setDropPopupRef, className: isPopupOpen ? position == 'top' ? style.listViewTop : style.listview : style.hide },
					enableSearch && React.createElement(
						'div',
						{ className: style.posRel },
						React.createElement('input', {
							type: 'text',
							ref: 'input',
							className: style.searchicon,
							placeholder: placeholder,
							onKeyDown: this.keyPress.bind(this),
							onChange: this.handleChange,
							value: this.state.searchStr
						}),
						React.createElement(
							'div',
							{ className: style.searchIconPosSet },
							React.createElement(Icon, { id: 'searchIcon', color: 'greyshade2', size: 'size15' })
						)
					),
					suggestions.length ? React.createElement(
						'ul',
						{ className: style.listmenu, ref: 'suggestionContainer' },
						suggestions.map(function (opt, index) {
							var val = opt,
							    name = opt;
							if ((typeof opt === 'undefined' ? 'undefined' : _typeof(opt)) == 'object') {
								val = opt.id;
								name = opt.name;
							}
							return React.createElement(
								'li',
								{
									key: index + 'opt',
									ref: 'suggestion_' + index,
									className: _this4.state.count == index ? style.bccolor : style.normal,
									onClick: _this4.textidchange.bind(_this4, val, name, index)
								},
								name
							);
						})
					) : React.createElement(FormatText, { i18NKey: 'No matches found', className: style.notfound, type: 'div' })
				)
			);
		}
	}]);

	return DropDown;
}(React.Component);

export default Popup(DropDown);

DropDown.defaultProps = {
	minimumResultsForSearch: Infinity,
	enableSeachOptionsCount: 1
};

DropDown.propTypes = {
	options: PropTypes.array,
	defaultOptions: PropTypes.array,
	id: PropTypes.string,
	isPopupOpen: PropTypes.bool,
	position: PropTypes.string,
	removeClose: PropTypes.func,
	isError: PropTypes.bool,
	onSelect: PropTypes.func,
	groupName: PropTypes.string,
	defaultValue: PropTypes.string,
	value: PropTypes.string,
	togglePopup: PropTypes.func,

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