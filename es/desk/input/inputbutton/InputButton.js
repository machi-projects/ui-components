import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputButtonBoxBase from '../../../js/form/InputButtonBoxBase';
import styles from './inputbutton.css';

import { omit } from '../../../utils/objectUtils';
import cx from '../../../utils/classNamesUtils/classNamesBind';

var InputButton = function (_Component) {
  _inherits(InputButton, _Component);

  function InputButton() {
    _classCallCheck(this, InputButton);

    return _possibleConstructorReturn(this, (InputButton.__proto__ || _Object$getPrototypeOf(InputButton)).apply(this, arguments));
  }

  _createClass(InputButton, [{
    key: 'render',
    value: function render() {
      var _cx;

      var _props = this.props,
          styleId = _props.styleId,
          required = _props.required,
          disabled = _props.disabled,
          readOnly = _props.readOnly,
          hidden = _props.hidden,
          focused = _props.focused,
          errored = _props.errored,
          valid = _props.valid,
          raised = _props.raised;


      var newProps = omit(this.props, ["className", "styleId", "focused", "errored", "valid", "raised"]);

      var classNames = cx(styles, (_cx = {}, _defineProperty(_cx, styleId, true), _defineProperty(_cx, 'required', required), _defineProperty(_cx, 'disabled', disabled), _defineProperty(_cx, 'readOnly', readOnly), _defineProperty(_cx, 'hidden', hidden), _defineProperty(_cx, 'focused', focused), _defineProperty(_cx, 'errored', errored), _defineProperty(_cx, 'valid', valid), _defineProperty(_cx, 'raised', raised), _cx));

      //let onPassValidation = validation.validate ?  errored =  true

      return React.createElement(InputButtonBoxBase, _extends({}, newProps, { className: classNames }));
    }
  }]);

  return InputButton;
}(Component);

export default InputButton;


InputButton.propTypes = {
  styleId: PropTypes.string
};

InputButton.propTypes = {

  styleId: PropTypes.string,

  id: PropTypes.string,
  type: PropTypes.oneOf(["radio", "checkbox"]).isRequired,
  name: PropTypes.string,

  readOnly: PropTypes.bool,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  pattern: PropTypes.string,
  value: PropTypes.string,
  hidden: PropTypes.bool,

  onClick: PropTypes.func,
  onChange: PropTypes.func,
  getValue: PropTypes.func,

  validation: PropTypes.shape({
    validate: PropTypes.bool,
    validateOn: PropTypes.string,
    rules: PropTypes.object,
    rulesOrder: PropTypes.arrayOf(PropTypes.string),
    messages: PropTypes.object
  }),

  onFailValidation: PropTypes.func,
  onPassValidation: PropTypes.func,

  focused: PropTypes.bool,
  errored: PropTypes.bool,
  valid: PropTypes.bool,
  raised: PropTypes.bool

};

if (__DOCS__) {
  InputButton.docs = {
    componentGroup: "Atom"
  };
}