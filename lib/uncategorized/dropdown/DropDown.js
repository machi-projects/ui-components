'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

var _Icon = require('../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _validator = require('../../utils/validator');

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getSelectedValue = function getSelectedValue(options, value) {
  var selected = value,
      count = 0,
      selectedOptName = value;
  options.forEach(function (opt, index) {
    var val = opt,
        name = opt;
    if ((typeof opt === 'undefined' ? 'undefined' : _typeof(opt)) == "object") {
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

    var _this = _possibleConstructorReturn(this, (DropDown.__proto__ || Object.getPrototypeOf(DropDown)).call(this, props));

    var _getSelectedValue = getSelectedValue(props.defaultOptions, props.defaultValue),
        selected = _getSelectedValue.selected,
        count = _getSelectedValue.count,
        selectedOptName = _getSelectedValue.selectedOptName,
        options = _getSelectedValue.options;

    _this.state = {
      options: options,
      selectedOptName: selectedOptName,
      selected: selected,
      count: count,
      searchStr: ""
    };
    _this.textidchange = _this.textidchange.bind(_this);
    _this.handleChange = _this.handleChange.bind(_this);
    _this.filterSuggestion = _this.filterSuggestion.bind(_this);
    _this.togglePopup = _this.togglePopup.bind(_this);

    _this.setRef = _this.setRef.bind(_this);
    return _this;
  }

  _createClass(DropDown, [{
    key: 'setRef',
    value: function setRef(el) {
      this.elementRef = el;
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
        var newValidation = _validator2.default.combinePropsValidation(this.props, defaultType, "onSelect", validation, defaultCheckPropsRules, defaultValidateRules);

        var validationObj = {
          validation: newValidation,
          onPassValidation: onPassValidation,
          onFailValidation: onFailValidation
        };

        _validator2.default.executeValidation(value, targetTag, validationObj);
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
          if ((typeof opt === 'undefined' ? 'undefined' : _typeof(opt)) == "object") {
            val = opt.id;
          }
          this.setState({ selected: val });
          onSelect(val, id, e);
          togglePopup(e);
        }
      }
    }
  }, {
    key: 'togglePopup',
    value: function togglePopup(e) {
      var _this3 = this;

      this.setState({ searchStr: "" });
      this.props.togglePopup(e);
      setTimeout(function () {
        _this3.refs.input.focus();
        var con = _this3.refs.suggestionContainer;
        var elem = _this3.refs["suggestion_" + _this3.state.count];
        con.scrollTop = elem.offsetTop - 33;
      }, 10);
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

      var suggestions = options.filter(function (opt, index) {
        var val = opt,
            name = opt;
        if ((typeof opt === 'undefined' ? 'undefined' : _typeof(opt)) == "object") {
          val = opt.id;
          name = opt.name;
        }
        return name.toLowerCase().indexOf(searchStr.toLowerCase()) != -1;
      });
      return suggestions.length ? suggestions : [];
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextprops) {

      if (nextprops.value && nextprops.value !== this.props.defaultValue || nextprops.options && nextprops.options !== this.props.defaultOptions) {
        this.setState(getSelectedValue(nextprops.options, nextprops.value));
      }

      if (nextprops.validation != null && nextprops.validation.validate) {
        this.validateOnSelect(this.state.selected, nextprops);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var suggestionContainer = _reactDom2.default.findDOMNode(this.refs.suggestionContainer);
      var selSuggestion = _reactDom2.default.findDOMNode(this.refs["suggestion_" + this.state.count]);
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
          isError = _props2.isError;

      var options = this.state.options;

      var arrowopen = isPopupOpen ? _DropDown2.default.arrowUp : _DropDown2.default.arrowDown;
      var suggestions = this.filterSuggestion(options, this.state.searchStr);
      return _react2.default.createElement(
        'div',
        { className: _DropDown2.default.main, ref: this.setRef },
        _react2.default.createElement(
          'div',
          { onClick: this.togglePopup },
          _react2.default.createElement(
            'div',
            { className: isError ? _DropDown2.default.isError + " " + _DropDown2.default.dropdown + " " + arrowopen : _DropDown2.default.dropdown + " " + arrowopen },
            _react2.default.createElement(
              'span',
              { className: _DropDown2.default.selectname },
              this.state.selectedOptName
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: isPopupOpen ? position == "top" ? _DropDown2.default.listViewTop : _DropDown2.default.listview : _DropDown2.default.hide },
          _react2.default.createElement(
            'div',
            { className: _DropDown2.default.posRel },
            _react2.default.createElement('input', { type: 'text', ref: 'input', className: _DropDown2.default.searchicon, onKeyDown: this.keyPress.bind(this), onChange: this.handleChange, value: this.state.searchStr }),
            _react2.default.createElement(
              'div',
              { className: _DropDown2.default.searchIconPosSet },
              _react2.default.createElement(_Icon2.default, { icon: 'searchIcon', iconColor: 'greyShade2', size: 'size15' })
            )
          ),
          suggestions.length ? _react2.default.createElement(
            'ul',
            { className: _DropDown2.default.listmenu, ref: 'suggestionContainer' },
            suggestions.map(function (opt, index) {
              var val = opt,
                  name = opt;
              if ((typeof opt === 'undefined' ? 'undefined' : _typeof(opt)) == "object") {
                val = opt.id;
                name = opt.name;
              }
              return _react2.default.createElement(
                'li',
                { key: index + "opt", ref: "suggestion_" + index, className: _this4.state.count == index ? _DropDown2.default.bccolor : _DropDown2.default.normal, onClick: _this4.textidchange.bind(_this4, val, name, index) },
                name,
                ' '
              );
            })
          ) : _react2.default.createElement(_fzI18n.FormatText, { i18NKey: 'No matches found', className: _DropDown2.default.notfound, type: 'div' })
        )
      );
    }
  }]);

  return DropDown;
}(_react2.default.Component);

exports.default = (0, _Popup2.default)(DropDown);


DropDown.propTypes = {
  options: _propTypes2.default.array,
  defaultOptions: _propTypes2.default.array,
  id: _propTypes2.default.string,
  isPopupOpen: _propTypes2.default.bool,
  position: _propTypes2.default.string,
  removeClose: _propTypes2.default.func,
  isError: _propTypes2.default.bool,
  onSelect: _propTypes2.default.func,
  groupName: _propTypes2.default.string,
  defaultValue: _propTypes2.default.string,
  value: _propTypes2.default.string,
  togglePopup: _propTypes2.default.func,

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