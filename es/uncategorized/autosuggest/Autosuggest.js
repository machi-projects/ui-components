import _extends from "babel-runtime/helpers/extends";
import _defineProperty from "babel-runtime/helpers/defineProperty";
import _Object$getPrototypeOf from "babel-runtime/core-js/object/get-prototype-of";
import _classCallCheck from "babel-runtime/helpers/classCallCheck";
import _createClass from "babel-runtime/helpers/createClass";
import _possibleConstructorReturn from "babel-runtime/helpers/possibleConstructorReturn";
import _inherits from "babel-runtime/helpers/inherits";
import React from "react";
import ReactDom from "react-dom";
import PropTypes from 'prop-types';

import { i18NProviderUtils } from 'fz-i18n';

import style from "./Autosuggest.css";
import Input from "../form/Input";
import Popup from "../Popup.js";

var Autosuggest = function (_React$Component) {
    _inherits(Autosuggest, _React$Component);

    function Autosuggest(props) {
        _classCallCheck(this, Autosuggest);

        var _this = _possibleConstructorReturn(this, (Autosuggest.__proto__ || _Object$getPrototypeOf(Autosuggest)).call(this, props));

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
                suggestLists = [React.createElement(RenderSuggestion, _extends({
                    key: "asd",
                    className: style.option1
                }, _defineProperty({}, textField, i18NProviderUtils.getI18NValue("cp.label.searching"))))];
            } else if (filterSuggestions.length) {
                suggestLists = filterSuggestions.map(function (suggestion, index) {
                    var isFocused = _this2.state.focusedSuggestion === index;
                    return React.createElement(RenderSuggestion, _extends({
                        ref: "suggestion_" + index,
                        key: index,
                        index: index
                    }, suggestion, {
                        handleClick: _this2.handleClick.bind(_this2, suggestion),
                        isFocused: isFocused,
                        onHover: _this2.handleHover,
                        className: isFocused ? style.optionFocus : style.option
                    }));
                });
            } else if (isShowNoResult) {
                suggestLists = [React.createElement(RenderSuggestion, _extends({
                    key: "asd",
                    className: style.option1
                }, _defineProperty({}, textField, i18NProviderUtils.getI18NValue("support.no.matches.found"))))];
            }

            return React.createElement(
                "div",
                { className: styles.container ? styles.container : style.container, "data-testid": this.props["data-testid"] },
                React.createElement(Input, {
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
                React.createElement(
                    "div",
                    { id: "suggestionContainer", className: style.suggestions, onClick: this.removeClose },
                    React.createElement(
                        "div",
                        null,
                        isPopupOpen && suggestLists.length && this.state.showSuggestion && isSuggest ? React.createElement(
                            "ul",
                            { className: style.listmenu, ref: "resultContainer" },
                            suggestLists
                        ) : ""
                    )
                )
            );
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
            var suggestionContainer = ReactDom.findDOMNode(this.refs.resultContainer);
            var selSuggestion = ReactDom.findDOMNode(this.refs["suggestion_" + this.state.focusedSuggestion]);
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

            var inputElement = ReactDom.findDOMNode(this.refs.input);
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
}(React.Component);

Autosuggest.defaultProps = {
    valueField: "id",
    textField: "name",
    searchType: "startsWith"

};
export default Popup(Autosuggest);

Autosuggest.propTypes = {
    suggestions: PropTypes.array.isRequired,
    searchKeys: PropTypes.array,
    id: PropTypes.string,
    valueField: PropTypes.string,
    textField: PropTypes.string,
    searchType: PropTypes.string,
    placeholder: PropTypes.string,
    maxLength: PropTypes.string,
    errorMsg: PropTypes.string,
    value: PropTypes.object,
    isSuggest: PropTypes.bool,
    isSearching: PropTypes.bool,
    isPopupOpen: PropTypes.bool,
    isSearch: PropTypes.bool,
    isShowNoResult: PropTypes.bool,
    isReadOnly: PropTypes.bool,
    isApiCall: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    onSelect: PropTypes.func,
    onKeyup: PropTypes.func,
    onClick: PropTypes.func,
    openPopupOnly: PropTypes.func,
    callApi: PropTypes.func
};