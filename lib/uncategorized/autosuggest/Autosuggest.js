"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _fzI18n = require("fz-i18n");

var _Autosuggest = require("./Autosuggest.css");

var _Autosuggest2 = _interopRequireDefault(_Autosuggest);

var _Input = require("../form/Input");

var _Input2 = _interopRequireDefault(_Input);

var _Popup = require("../Popup.js");

var _Popup2 = _interopRequireDefault(_Popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Autosuggest = function (_React$Component) {
    _inherits(Autosuggest, _React$Component);

    function Autosuggest(props) {
        _classCallCheck(this, Autosuggest);

        var _this = _possibleConstructorReturn(this, (Autosuggest.__proto__ || Object.getPrototypeOf(Autosuggest)).call(this, props));

        _this.id = null;
        _this.startTime = null;
        _this.state = {
            showSuggestion: false,
            focusedSuggestion: 0,
            selectedValue: props.value || null,
            searchValue: props.value && props.value[props.textField] || ""
        };
        _this.documentClickHandler = _this.documentClickHandler.bind(_this);
        _this.handleHover = _this.handleHover.bind(_this);
        _this.handleBlur = _this.handleBlur.bind(_this);
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleKeyUp = _this.handleKeyUp.bind(_this);
        _this.handleFocus = _this.handleFocus.bind(_this);
        return _this;
    }

    _createClass(Autosuggest, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            document.addEventListener("click", this.documentClickHandler);
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                id = _props.id,
                _props$styles = _props.styles,
                styles = _props$styles === undefined ? {} : _props$styles,
                RenderSuggestion = _props.RenderSuggestion,
                _props$suggestions = _props.suggestions,
                suggestions = _props$suggestions === undefined ? [] : _props$suggestions,
                valueField = _props.valueField,
                textField = _props.textField,
                searchKeys = _props.searchKeys,
                searchType = _props.searchType,
                onClick = _props.onClick,
                placeholder = _props.placeholder,
                _props$isShowNoResult = _props.isShowNoResult,
                isShowNoResult = _props$isShowNoResult === undefined ? false : _props$isShowNoResult,
                isReadOnly = _props.isReadOnly,
                maxLength = _props.maxLength,
                errorMsg = _props.errorMsg,
                value = _props.value,
                isSearching = _props.isSearching,
                isPopupOpen = _props.isPopupOpen,
                isSuggest = _props.isSuggest;
            var _state = this.state,
                searchValue = _state.searchValue,
                focusedSuggestion = _state.focusedSuggestion,
                showSuggestion = _state.showSuggestion;


            var filterSuggestions = this.filterSuggestions(searchValue, suggestions, searchKeys, searchType) || [];
            var suggestLists = [];
            if (isSearching) {
                suggestLists = [_react2.default.createElement(RenderSuggestion, _extends({
                    key: "asd",
                    className: _Autosuggest2.default.option1
                }, _defineProperty({}, textField, _fzI18n.i18NProviderUtils.getI18NValue("cp.label.searching"))))];
            } else if (filterSuggestions.length) {
                suggestLists = filterSuggestions.map(function (suggestion, index) {
                    var isFocused = _this2.state.focusedSuggestion === index;
                    return _react2.default.createElement(RenderSuggestion, _extends({
                        ref: "suggestion_" + index,
                        key: index,
                        index: index
                    }, suggestion, {
                        handleClick: _this2.handleClick.bind(_this2, suggestion),
                        isFocused: isFocused,
                        onHover: _this2.handleHover,
                        className: isFocused ? _Autosuggest2.default.optionFocus : _Autosuggest2.default.option
                    }));
                });
            } else if (isShowNoResult) {
                suggestLists = [_react2.default.createElement(RenderSuggestion, _extends({
                    key: "asd",
                    className: _Autosuggest2.default.option1
                }, _defineProperty({}, textField, _fzI18n.i18NProviderUtils.getI18NValue("support.no.matches.found"))))];
            }

            return _react2.default.createElement(
                "div",
                { className: styles.container ? styles.container : _Autosuggest2.default.container, "data-testid": this.props["data-testid"] },
                _react2.default.createElement(_Input2.default, {
                    id: id,
                    ref: "input",
                    type: "text",
                    autoComplete: "off",
                    "data-testid": this.props["data-testid"],
                    value: searchValue,
                    maxlength: maxLength,
                    onClick: onClick,
                    onChange: this.handleChange,
                    onBlur: this.handleBlur,
                    onKeyUp: this.handleKeyUp,
                    onFocus: this.handleFocus,
                    placeHolder: placeholder,
                    readOnly: isReadOnly
                }),
                _react2.default.createElement(
                    "div",
                    { id: "suggestionContainer", className: _Autosuggest2.default.suggestions, onClick: this.removeClose },
                    _react2.default.createElement(
                        "div",
                        null,
                        isPopupOpen && suggestLists.length && this.state.showSuggestion && isSuggest ? _react2.default.createElement(
                            "ul",
                            { className: _Autosuggest2.default.listmenu, ref: "resultContainer" },
                            suggestLists
                        ) : ""
                    )
                )
            );
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
            var suggestionContainer = _reactDom2.default.findDOMNode(this.refs.resultContainer);
            var selSuggestion = _reactDom2.default.findDOMNode(this.refs["suggestion_" + this.state.focusedSuggestion]);
            if (selSuggestion && suggestionContainer) {
                if (suggestionContainer.scrollHeight == selSuggestion.offsetTop + selSuggestion.offsetHeight) {
                    suggestionContainer.scrollTop = selSuggestion.offsetTop;
                } else if (selSuggestion.offsetTop == 0) {
                    suggestionContainer.scrollTop = 0;
                } else if (suggestionContainer.offsetHeight + suggestionContainer.scrollTop < selSuggestion.offsetTop) {
                    suggestionContainer.scrollTop = selSuggestion.offsetTop - 170;
                } else if (suggestionContainer.scrollTop > selSuggestion.offsetTop) {
                    suggestionContainer.scrollTop = selSuggestion.offsetTop;
                }
            }
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            var searchValue = nextProps.value[nextProps.textField] || "";
            this.setState({
                searchValue: searchValue
            });
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            document.removeEventListener("click", this.documentClickHandler);
        }
    }, {
        key: "handleFocus",
        value: function handleFocus() {
            this.props.onFocus && this.props.onFocus(true);
        }
    }, {
        key: "documentClickHandler",
        value: function documentClickHandler() {
            this.state.showSuggestion && this.setState({
                showSuggestion: false
            });
        }
    }, {
        key: "removeClose",
        value: function removeClose(e) {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
        }
    }, {
        key: "filterSuggestions",
        value: function filterSuggestions(searchValue, suggestions, searchKeys, searchType) {
            var filterList = searchValue && suggestions.length && suggestions.filter(function (suggestion) {
                return searchKeys && searchKeys.some(function (searchKey) {
                    return suggestion[searchKey] && suggestion[searchKey].toLowerCase()[searchType](searchValue.toLowerCase());
                }) || true;
            }) || suggestions;
            return filterList;
        }
    }, {
        key: "handleKeyUp",
        value: function handleKeyUp(val, id, e) {
            var _value;

            var keyCode = e.keyCode;
            var _props2 = this.props,
                textField = _props2.textField,
                valueField = _props2.valueField,
                searchKeys = _props2.searchKeys,
                searchType = _props2.searchType,
                suggestions = _props2.suggestions,
                inputType = _props2.inputType,
                onSelect = _props2.onSelect,
                onKeyup = _props2.onKeyup;
            var _state2 = this.state,
                focusedSuggestion = _state2.focusedSuggestion,
                showSuggestion = _state2.showSuggestion,
                selectedValue = _state2.selectedValue;

            var searchValue = this.refs.input ? this.refs.input.value : "";
            var suggestionList = this.filterSuggestions(searchValue, suggestions, searchKeys, searchType);
            var suggestionLength = suggestionList.length;
            if (showSuggestion && suggestionLength) {
                switch (keyCode) {
                    case 40:
                    case 34:
                        if (focusedSuggestion === suggestionLength - 1 || focusedSuggestion == null) {
                            focusedSuggestion = 0;
                        } else {
                            focusedSuggestion += 1;
                        }
                        break;
                    case 38:
                    case 33:
                        if (focusedSuggestion === 0 || focusedSuggestion == null) {
                            focusedSuggestion = suggestionLength - 1;
                        } else {
                            focusedSuggestion -= 1;
                        }
                        break;
                    case 13:
                        selectedValue = suggestionList[focusedSuggestion];
                        var value = (_value = {}, _defineProperty(_value, valueField, selectedValue[valueField]), _defineProperty(_value, textField, selectedValue[textField]), _value);
                        onKeyup && onKeyup(value, id, e);
                        showSuggestion = false;
                        onSelect(value, id, e);
                        break;
                    case 9:
                    case 27:
                        showSuggestion = false;
                        break;
                }
                this.setState({
                    focusedSuggestion: focusedSuggestion, showSuggestion: showSuggestion, selectedValue: selectedValue
                });
            }
        }
    }, {
        key: "handleClick",
        value: function handleClick(selectedSuggestion, e) {
            var _value2;

            e && e.preventDefault;
            this.setState({
                selectedValue: selectedSuggestion,
                showSuggestion: false
            });
            var _props3 = this.props,
                valueField = _props3.valueField,
                textField = _props3.textField,
                onSelect = _props3.onSelect,
                id = _props3.id;


            var value = (_value2 = {}, _defineProperty(_value2, valueField, selectedSuggestion[valueField]), _defineProperty(_value2, textField, selectedSuggestion[textField]), _value2);
            onSelect && onSelect(value, id, e);
        }
    }, {
        key: "handleHover",
        value: function handleHover(index) {
            this.setState({ focusedSuggestion: index });
        }
    }, {
        key: "handleBlur",
        value: function handleBlur(value, id, e) {
            this.props.onBlur && this.props.onBlur(value, id, e);
        }
    }, {
        key: "handleChange",
        value: function handleChange(value, id, e) {
            var _selectedValue;

            var inputElement = _reactDom2.default.findDOMNode(this.refs.input);
            var _props4 = this.props,
                valueField = _props4.valueField,
                textField = _props4.textField,
                isApiCall = _props4.isApiCall,
                callApi = _props4.callApi,
                onChange = _props4.onChange,
                openPopupOnly = _props4.openPopupOnly;


            this.setState({
                searchValue: value,
                focusedSuggestion: 0,
                showSuggestion: true,
                selectedValue: (_selectedValue = {}, _defineProperty(_selectedValue, valueField, ""), _defineProperty(_selectedValue, textField, value), _selectedValue)
            });
            if (isApiCall) {
                if (this.startTime) {
                    if (new Date().getTime() - this.startTime < 750) {
                        clearTimeout(this.id);
                    }
                }
                this.id = setTimeout(function () {
                    value ? callApi(value) : "";
                }, 250);
                this.startTime = new Date().getTime();
            }
            value && openPopupOnly(e);
            onChange(value, id, e);
        }
    }]);

    return Autosuggest;
}(_react2.default.Component);

Autosuggest.defaultProps = {
    valueField: "id",
    textField: "name",
    searchType: "startsWith"

};
exports.default = (0, _Popup2.default)(Autosuggest);


Autosuggest.propTypes = {
    suggestions: _propTypes2.default.array.isRequired,
    searchKeys: _propTypes2.default.array,
    id: _propTypes2.default.string,
    valueField: _propTypes2.default.string,
    textField: _propTypes2.default.string,
    searchType: _propTypes2.default.string,
    placeholder: _propTypes2.default.string,
    maxLength: _propTypes2.default.string,
    errorMsg: _propTypes2.default.string,
    value: _propTypes2.default.object,
    isSuggest: _propTypes2.default.bool,
    isSearching: _propTypes2.default.bool,
    isPopupOpen: _propTypes2.default.bool,
    isSearch: _propTypes2.default.bool,
    isShowNoResult: _propTypes2.default.bool,
    isReadOnly: _propTypes2.default.bool,
    isApiCall: _propTypes2.default.bool,
    onChange: _propTypes2.default.func.isRequired,
    onBlur: _propTypes2.default.func,
    onSelect: _propTypes2.default.func,
    onKeyup: _propTypes2.default.func,
    onClick: _propTypes2.default.func,
    openPopupOnly: _propTypes2.default.func,
    callApi: _propTypes2.default.func
};