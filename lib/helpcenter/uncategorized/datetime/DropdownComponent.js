'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _DropdownComponent = require('./DropdownComponent.css');

var _DropdownComponent2 = _interopRequireDefault(_DropdownComponent);

var _Popup = require('../Popup');

var _Popup2 = _interopRequireDefault(_Popup);

var _common = require('../common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var getI18NValue = function getI18NValue(value, _ref) {
  var _ref2 = _toArray(_ref);

  return value;
};

var DropdownComponent = function (_React$Component) {
  _inherits(DropdownComponent, _React$Component);

  function DropdownComponent(props) {
    _classCallCheck(this, DropdownComponent);

    var _this = _possibleConstructorReturn(this, (DropdownComponent.__proto__ || Object.getPrototypeOf(DropdownComponent)).call(this, props));

    _common.bind.apply(_this, ["handleFocus", "handleSelect", "handleKeyUp", "handleToggle", "handleChange", "setInputRef"]);

    var value = props.value,
        suggestions = props.suggestions,
        valueField = props.valueField,
        textField = props.textField;

    suggestions = suggestions ? (0, _common.formatValue)(suggestions) : [];
    value = value ? value : [suggestions[0]];
    var selectedValue = value ? (0, _common.formatValue)([value])[0] : null;

    var focusedSuggestion = _this.getFocussedSuggestion(suggestions, selectedValue, valueField);
    _this.state = { searchString: "", focusedSuggestion: focusedSuggestion };

    return _this;
  }

  _createClass(DropdownComponent, [{
    key: 'setInputRef',
    value: function setInputRef(el) {
      this.inputRef = el;
    }
  }, {
    key: 'handleFocus',
    value: function handleFocus() {
      var _this2 = this;

      requestAnimationFrame(function () {
        _this2.inputRef && _this2.inputRef.focus();
      });
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
      var searchString = this.state.searchString;

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
      suggestions = (0, _common.formatValue)(suggestions); //
      value = value && value || suggestions[0];
      value = (0, _common.formatValue)([value]); //

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


      suggestions = suggestions ? (0, _common.formatValue)(suggestions) : [];
      value = value ? value : suggestions[0];
      var selectedValue = value ? (0, _common.formatValue)([value])[0] : null;

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
      var dropDownMainstyle = styles.newMain ? styles.newMain : _DropdownComponent2.default.main;
      dropDownMainstyle = isReadOnly ? _DropdownComponent2.default.mainNot : dropDownMainstyle;

      suggestions = suggestions ? (0, _common.formatValue)(suggestions) : [];
      value = value ? value : suggestions[0];
      var selectedValue = value ? (0, _common.formatValue)([value])[0] : null;
      suggestions = this.filterSuggestions(searchString, suggestions, searchKeys, searchType);

      if (suggestions.length) {
        suggestionsListElements = suggestions.map(function (suggestion, i) {
          var focus = focusedSuggestion === i;
          return _react2.default.createElement(SuggestionItem, { key: i, focus: focus, value: suggestion, onSelect: _this3.handleSelect, textField: textField });
        });
      } else {
        suggestionsListElements = _react2.default.createElement(
          'li',
          { className: _DropdownComponent2.default.notfound },
          (getI18NValue("crm.module.empty.msg.for.search"), ["matches"])
        );
      }

      return _react2.default.createElement(
        'div',
        { className: dropDownMainstyle, onClick: !isReadOnly && this.handleToggle, 'data-testid': id },
        _react2.default.createElement(
          'div',
          { className: styles.container ? styles.container : this.props.dropStyle ? _DropdownComponent2.default.dropStyle : _DropdownComponent2.default.dropdown, 'data-testid': 'remindByCountContainer' },
          _react2.default.createElement(
            'span',
            { className: _DropdownComponent2.default.flexline },
            selectedValue && _react2.default.createElement(
              'span',
              { 'data-testid': 'selectedValue', className: this.props.dropStyle ? _DropdownComponent2.default.dropSelectName : _DropdownComponent2.default.selectname },
              selectedValue[textField]
            ),
            _react2.default.createElement(
              'span',
              { className: isPopupOpen ? _DropdownComponent2.default.topArow : _DropdownComponent2.default.downArow },
              ' ',
              ' '
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: isPopupOpen ? position == "top" ? _DropdownComponent2.default.topListView : _DropdownComponent2.default.topListView : _DropdownComponent2.default.hide },
          searchField && _react2.default.createElement(
            'div',
            { className: searchField ? _DropdownComponent2.default.searchinp : _DropdownComponent2.default.hide, onClick: removeClose },
            _react2.default.createElement('input', { type: 'text', id: 'testtest', className: _DropdownComponent2.default.searchicon, onChange: this.handleChange,
              value: this.state.searchString, onKeyUp: this.handleKeyUp, ref: this.setInputRef }),
            _react2.default.createElement('span', { className: _DropdownComponent2.default.searchIcon })
          ),
          _react2.default.createElement(
            'ul',
            { className: _DropdownComponent2.default.listmenu, 'data-testid': 'suggestionContainer' },
            suggestionsListElements
          )
        )
      );
    }
  }]);

  return DropdownComponent;
}(_react2.default.Component);

exports.default = (0, _Popup2.default)(DropdownComponent, "dropdown");

var SuggestionItem = function (_React$Component2) {
  _inherits(SuggestionItem, _React$Component2);

  function SuggestionItem(props) {
    _classCallCheck(this, SuggestionItem);

    var _this4 = _possibleConstructorReturn(this, (SuggestionItem.__proto__ || Object.getPrototypeOf(SuggestionItem)).call(this, props));

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

      return _react2.default.createElement(
        'li',
        { className: focus ? _DropdownComponent2.default.bccolor : _DropdownComponent2.default.normal, onClick: this.handleSelect },
        value[textField]
      );
    }
  }]);

  return SuggestionItem;
}(_react2.default.Component);