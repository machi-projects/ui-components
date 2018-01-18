'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _fzI18n = require('fz-i18n');

var _DropDown = require('./DropDown.css');

var _DropDown2 = _interopRequireDefault(_DropDown);

var _Popup = require('../Popup');

var _Popup2 = _interopRequireDefault(_Popup);

var _index = require('../../index');

var _common = require('../common');

var _validator = require('../../../utils/validator');

var _validator2 = _interopRequireDefault(_validator);

var _objectUtils = require('../../../utils/objectUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DropDown = function (_React$Component) {
	_inherits(DropDown, _React$Component);

	function DropDown(props) {
		_classCallCheck(this, DropDown);

		var _this = _possibleConstructorReturn(this, (DropDown.__proto__ || Object.getPrototypeOf(DropDown)).call(this, props));

		var _formatSelectedValue = (0, _common.formatSelectedValue)((0, _common.formatValue)(props.options, props.valueField, props.textField), props.selectedValue, props.valueField, props.textField),
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
			return (0, _objectUtils.deepEqualObject)(nextProps, this.props) == false || (0, _objectUtils.deepEqualObject)(nextState, this.state) == false;
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {

			if ((0, _objectUtils.deepEqualObject)(nextProps.selectedValue, this.state.selected) == false) {
				var _formatSelectedValue2 = (0, _common.formatSelectedValue)(this.state.options, nextProps.selectedValue, this.props.valueField, this.props.textField),
				    selected = _formatSelectedValue2.selected,
				    count = _formatSelectedValue2.count,
				    selectedOptName = _formatSelectedValue2.selectedOptName;

				this.setState({ selectedOptName: selectedOptName, selected: selected, count: count });
			}

			if ((0, _objectUtils.deepEqualObject)(nextProps.options, this.props.options) == false) {

				var options = (0, _common.formatValue)(nextProps.options, this.props.valueField, this.props.textField);
				this.setState({ options: options });
			}

			if ((0, _objectUtils.deepEqualObject)(nextProps.validation, this.props.validation) == false && nextProps.validation && nextProps.validation.validate) {
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

			var suggestionContainer = _reactDom2.default.findDOMNode(this.refs.suggestionContainer);
			var selSuggestion = _reactDom2.default.findDOMNode(this.refs['suggestion_' + this.state.count]);
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

			var arrowopen = isPopupOpen ? _DropDown2.default[styleId + '_arrowUp'] : _DropDown2.default[styleId + '_arrowDown'];
			var suggestions = this.filterSuggestion(options, this.state.searchStr);

			var enableSearch = minimumResultsForSearch > 0 && options.length >= enableSeachOptionsCount;
			return _react2.default.createElement(
				'div',
				{ className: _DropDown2.default[styleId + '_main'], ref: this.setRef, tabIndex: tabIndex, onClick: onClick },
				_react2.default.createElement(
					'div',
					{ onClick: function onClick(e) {
							_this4.togglePopup(e, _this4.dropPopupRef, _this4.placeHolderRef);
						},
						ref: this.setPlaceHolderRef },
					_react2.default.createElement(
						'div',
						{
							className: isError ? _DropDown2.default[styleId + '_isError'] + ' ' + _DropDown2.default[styleId + '_dropdown'] + ' ' + arrowopen : _DropDown2.default[styleId + '_dropdown'] + ' ' + arrowopen
						},
						_react2.default.createElement(
							'span',
							{ className: _DropDown2.default[styleId + '_selectname'] },
							this.state.selectedOptName
						)
					)
				),
				_react2.default.createElement(
					'div',
					{ ref: this.setDropPopupRef, onClick: removeClose,
						className: _DropDown2.default[styleId + '_droppopup'] + ' ' + (isPopupReady ? _DropDown2.default.ready : '') + ' ' + (isPopupOpen ? _DropDown2.default.opened : '') + ' ' + (position == 'top' ? _DropDown2.default[styleId + '_listViewTop'] : _DropDown2.default[styleId + '_listview']) },
					enableSearch && _react2.default.createElement(
						'div',
						{ className: _DropDown2.default[styleId + '_posRel'] },
						_react2.default.createElement('input', {
							type: 'text',
							ref: 'input',
							className: _DropDown2.default[styleId + '_searchicon'],
							placeholder: placeholder,
							onKeyDown: this.keyPress.bind(this),
							onChange: this.handleOnSearch,
							value: this.state.searchStr

						}),
						_react2.default.createElement(
							'div',
							{ className: _DropDown2.default[styleId + '_searchIconPosSet'] },
							_react2.default.createElement(_index.Icon, { id: 'searchIcon', color: 'greyshade2', size: 'size15' })
						)
					),
					suggestions.length ? _react2.default.createElement(
						'ul',
						{ className: _DropDown2.default[styleId + '_listmenu'], ref: 'suggestionContainer' },
						suggestions.map(function (opt, index) {

							var val = opt[valueField];
							var name = opt[textField];

							return _react2.default.createElement(
								'li',
								{
									key: index + 'opt',
									ref: 'suggestion_' + index,
									className: _this4.state.count == index ? _DropDown2.default[styleId + '_bccolor'] : _DropDown2.default[styleId + '_normal'],
									onClick: _this4.handleOnSelect.bind(_this4, val, name, index)
								},
								name
							);
						})
					) : _react2.default.createElement(_fzI18n.FormatText, { i18NKey: 'No matches found', className: _DropDown2.default[styleId + '_notfound'], type: 'div' })
				)
			);
		}
	}]);

	return DropDown;
}(_react2.default.Component);

exports.default = (0, _Popup2.default)(DropDown);


DropDown.defaultProps = {
	minimumResultsForSearch: Infinity,
	enableSeachOptionsCount: 1,
	textField: "name",
	valueField: "id",
	styleId: "default"
};

DropDown.propTypes = {
	styleId: _propTypes2.default.string,
	options: _propTypes2.default.array,
	defaultOptions: _propTypes2.default.array,
	id: _propTypes2.default.string,
	textField: _propTypes2.default.string,
	isPopupOpen: _propTypes2.default.bool,
	position: _propTypes2.default.string,
	removeClose: _propTypes2.default.func,
	isError: _propTypes2.default.bool,
	onChange: _propTypes2.default.func,
	groupName: _propTypes2.default.string,
	selectedValue: _propTypes2.default.string,
	togglePopup: _propTypes2.default.func,

	tabIndex: _propTypes2.default.string,
	getElementRef: _propTypes2.default.func,
	getValue: _propTypes2.default.func,
	onClick: _propTypes2.default.func,

	raised: _propTypes2.default.bool,
	focused: _propTypes2.default.bool,
	errored: _propTypes2.default.bool,

	minimumResultsForSearch: _propTypes2.default.number,
	enableSeachOptionsCount: _propTypes2.default.number,

	placeholder: _propTypes2.default.string,
	validation: _propTypes2.default.shape({
		validate: _propTypes2.default.bool,
		validateOn: _propTypes2.default.string,
		rulesOrder: _propTypes2.default.arrayOf(_propTypes2.default.string),
		rules: _propTypes2.default.object,
		messages: _propTypes2.default.object
	}),

	onPassValidation: _propTypes2.default.func,
	onFailValidation: _propTypes2.default.func
};