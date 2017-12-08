import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _toArray from 'babel-runtime/helpers/toArray';
import React from 'react';
import ReactDOM from 'react-dom';
import style from './DropdownComponent.css';
import Popup from '../Popup.js';
import { formatValue, bind } from '../../../utils/common';
var getI18NValue = function getI18NValue(value, _ref) {
  var _ref2 = _toArray(_ref);

  return value;
};

var DropdownComponent = function (_React$Component) {
  _inherits(DropdownComponent, _React$Component);

  function DropdownComponent(props) {
    _classCallCheck(this, DropdownComponent);

    var _this = _possibleConstructorReturn(this, (DropdownComponent.__proto__ || _Object$getPrototypeOf(DropdownComponent)).call(this, props));

    bind.apply(_this, ["handleFocus", "handleSelect", "handleKeyUp", "handleToggle", "handleChange"]);

    var value = props.value,
        suggestions = props.suggestions,
        valueField = props.valueField,
        textField = props.textField;

    suggestions = suggestions ? formatValue(suggestions) : [];
    value = value ? value : [suggestions[0]];
    var selectedValue = value ? formatValue([value])[0] : null;

    var focusedSuggestion = _this.getFocussedSuggestion(suggestions, selectedValue, valueField);
    _this.state = { searchString: "", focusedSuggestion: focusedSuggestion };
    return _this;
  }

  _createClass(DropdownComponent, [{
    key: 'handleFocus',
    value: function handleFocus() {
      var _this2 = this;

      setTimeout(function () {
        _this2.refs.inputField.focus();
      }, 0);
    }
  }, {
    key: 'getFocussedSuggestion',
    value: function getFocussedSuggestion() {
      var suggestions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var valueField = arguments[2];

      return suggestions.reduce(function (res, next, index) {
        if (next && next[valueField] === value[valueField]) {
          res = index;
        }
        return res;
      }, 0) || 0;
    }
  }, {
    key: 'filterSuggestions',
    value: function filterSuggestions(searchValue, suggestions, searchKeys, searchType) {
      return searchValue && suggestions.length && suggestions.filter(function (suggestion) {
        return searchKeys && searchKeys.some(function (searchKey) {
          var result = suggestion[searchKey] && suggestion[searchKey].toLowerCase()[searchType](searchValue.toLowerCase());
          return !(result === false || result === -1);
        });
      }) || suggestions;
    }
  }, {
    key: 'handleChange',
    value: function handleChange(e) {
      this.setState({ searchString: e.target.value });
    }
  }, {
    key: 'handleKeyUp',
    value: function handleKeyUp(e) {
      var keyCode = e.keyCode;
      var searchString = this.refs.inputField.value;

      var _props = this.props,
          textField = _props.textField,
          valueField = _props.valueField,
          searchKeys = _props.searchKeys,
          searchType = _props.searchType,
          suggestions = _props.suggestions,
          onSelect = _props.onSelect,
          value = _props.value,
          togglePopup = _props.togglePopup,
          closePopupOnly = _props.closePopupOnly;


      suggestions = suggestions && suggestions.length && suggestions || [];
      suggestions = formatValue(suggestions); //
      value = value && value || suggestions[0];
      value = formatValue([value]); //

      var _state = this.state,
          focusedSuggestion = _state.focusedSuggestion,
          showSuggestion = _state.showSuggestion;


      var suggestionList = this.filterSuggestions(searchString, suggestions, searchKeys, searchType);
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
            var selectedValue = suggestionList[focusedSuggestion];
            if (selectedValue) {
              onSelect(selectedValue);
              togglePopup(e);
              searchString = "";
              focusedSuggestion = 0;
            }
          }
          break;

        case 9:
        case 27:
          searchString = "";
          focusedSuggestion = 0;
          closePopupOnly(e);
          break;
        default:
          focusedSuggestion = 0;
          break;
      }
      this.setState({ searchString: searchString, focusedSuggestion: focusedSuggestion });
    }
  }, {
    key: 'handleSelect',
    value: function handleSelect(value, e) {
      var _props2 = this.props,
          onSelect = _props2.onSelect,
          togglePopup = _props2.togglePopup;

      onSelect(value);
      togglePopup(e);
      this.setState({ searchString: "" });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var suggestions = nextProps.suggestions,
          valueField = nextProps.valueField,
          textField = nextProps.textField,
          value = nextProps.value;


      suggestions = suggestions ? formatValue(suggestions) : [];
      value = value ? value : suggestions[0];
      var selectedValue = value ? formatValue([value])[0] : null;

      var focusedSuggestion = this.getFocussedSuggestion(suggestions, selectedValue, valueField);
      this.state = {
        focusedSuggestion: focusedSuggestion
      };
    }
  }, {
    key: 'handleToggle',
    value: function handleToggle(e) {
      var _props3 = this.props,
          isPopupOpen = _props3.isPopupOpen,
          togglePopup = _props3.togglePopup;

      !isPopupOpen && this.handleFocus();
      togglePopup(e);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _state2 = this.state,
          searchString = _state2.searchString,
          focusedSuggestion = _state2.focusedSuggestion;
      var _props4 = this.props,
          valueField = _props4.valueField,
          textField = _props4.textField,
          searchField = _props4.searchField,
          isPopupOpen = _props4.isPopupOpen,
          togglePopup = _props4.togglePopup,
          _props4$styles = _props4.styles,
          styles = _props4$styles === undefined ? {} : _props4$styles,
          id = _props4.id,
          isReadOnly = _props4.isReadOnly,
          position = _props4.position,
          searchKeys = _props4.searchKeys,
          searchType = _props4.searchType,
          removeClose = _props4.removeClose,
          value = _props4.value,
          suggestions = _props4.suggestions;

      var suggestionsListElements = null;
      var dropDownMainstyle = styles.newMain ? styles.newMain : style.main;
      dropDownMainstyle = isReadOnly ? style.mainNot : dropDownMainstyle;

      suggestions = suggestions ? formatValue(suggestions) : [];
      value = value ? value : suggestions[0];
      var selectedValue = value ? formatValue([value])[0] : null;
      suggestions = this.filterSuggestions(searchString, suggestions, searchKeys, searchType);

      if (suggestions.length) {
        suggestionsListElements = suggestions.map(function (suggestion, i) {
          var focus = focusedSuggestion === i;
          return React.createElement(SuggestionItem, { key: i, focus: focus, value: suggestion, onSelect: _this3.handleSelect, textField: textField });
        });
      } else {
        suggestionsListElements = React.createElement(
          'li',
          { className: style.notfound },
          (getI18NValue("crm.module.empty.msg.for.search"), ["matches"])
        );
      }

      return React.createElement(
        'div',
        { className: dropDownMainstyle, onClick: !isReadOnly && this.handleToggle, 'data-testid': id },
        React.createElement(
          'div',
          { className: styles.container ? styles.container : this.props.dropStyle ? style.dropStyle : style.dropdown, 'data-testid': 'remindByCountContainer' },
          React.createElement(
            'a',
            { rel: 'noopener', className: style.flexline },
            selectedValue && React.createElement(
              'span',
              { 'data-testid': 'selectedValue', className: this.props.dropStyle ? style.dropSelectName : style.selectname },
              selectedValue[textField]
            ),
            React.createElement(
              'span',
              { className: isPopupOpen ? style.topArow : style.downArow },
              ' ',
              ' '
            )
          )
        ),
        React.createElement(
          'div',
          { className: isPopupOpen ? position == "top" ? style.topListView : style.listview : style.hide },
          React.createElement(
            'div',
            { className: searchField ? style.searchinp : style.hide, onClick: removeClose },
            React.createElement('input', { type: 'text', id: 'testtest', className: style.searchicon, onChange: this.handleChange,
              value: searchString, onKeyUp: this.handleKeyUp, ref: 'inputField' }),
            React.createElement('span', { className: style.searchIcon })
          ),
          React.createElement(
            'ul',
            { className: style.listmenu, 'data-testid': 'suggestionContainer' },
            suggestionsListElements
          )
        )
      );
    }
  }]);

  return DropdownComponent;
}(React.Component);

export default Popup(DropdownComponent, "dropdown");

var SuggestionItem = function (_React$Component2) {
  _inherits(SuggestionItem, _React$Component2);

  function SuggestionItem(props) {
    _classCallCheck(this, SuggestionItem);

    var _this4 = _possibleConstructorReturn(this, (SuggestionItem.__proto__ || _Object$getPrototypeOf(SuggestionItem)).call(this, props));

    _this4.handleSelect = _this4.handleSelect.bind(_this4);
    return _this4;
  }

  _createClass(SuggestionItem, [{
    key: 'handleSelect',
    value: function handleSelect(e) {
      var _props5 = this.props,
          onSelect = _props5.onSelect,
          value = _props5.value;

      onSelect && onSelect(value, e);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props6 = this.props,
          focus = _props6.focus,
          value = _props6.value,
          textField = _props6.textField;

      return React.createElement(
        'li',
        { className: focus ? style.bccolor : style.normal, onClick: this.handleSelect },
        value[textField]
      );
    }
  }]);

  return SuggestionItem;
}(React.Component);