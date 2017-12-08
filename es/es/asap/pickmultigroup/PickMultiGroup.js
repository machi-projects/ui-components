import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PickMultiGroupBase, { PickItemBase } from '../../js/core/PickMultiGroupBase';

import styles from './pickmultigroup.css';
import styleMapping from './styleMapping';

import { omit } from '../../utils/objectUtils';
import cx from '../../utils/classNamesUtils/classNamesBind';

export var PickItem = function (_Component) {
  _inherits(PickItem, _Component);

  function PickItem() {
    _classCallCheck(this, PickItem);

    return _possibleConstructorReturn(this, (PickItem.__proto__ || _Object$getPrototypeOf(PickItem)).apply(this, arguments));
  }

  _createClass(PickItem, [{
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return PickItem;
}(Component);

PickItem.propTypes = {
  pickId: PropTypes.string.isRequired
};

var PickMultiGroup = function (_Component2) {
  _inherits(PickMultiGroup, _Component2);

  function PickMultiGroup() {
    _classCallCheck(this, PickMultiGroup);

    return _possibleConstructorReturn(this, (PickMultiGroup.__proto__ || _Object$getPrototypeOf(PickMultiGroup)).apply(this, arguments));
  }

  _createClass(PickMultiGroup, [{
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


      var newProps = omit(this.props, ["className", "styleId", "readOnly", "disabled", "hidden", "focused", "errored", "valid", "raised"]);

      var classNames = cx(styles, (_cx = {}, _defineProperty(_cx, styleId, true), _defineProperty(_cx, 'required', required), _defineProperty(_cx, 'disabled', disabled), _defineProperty(_cx, 'readOnly', readOnly), _defineProperty(_cx, 'hidden', hidden), _defineProperty(_cx, 'focused', focused), _defineProperty(_cx, 'errored', errored), _defineProperty(_cx, 'valid', valid), _defineProperty(_cx, 'raised', raised), _cx));

      //let onPassValidation = validation.validate ?  errored =  true
      var styleMappings = styleMapping[styleId];

      var itemStyle = styles[styleMappings.itemStyle];
      var itemActiveStyle = styles[styleMappings.activeStyle];

      return React.createElement(
        PickMultiGroupBase,
        _extends({}, newProps, { styles: { group: classNames, item: itemStyle, active: itemActiveStyle } }),
        React.Children.map(this.props.children, function (child, i) {

          return React.createElement(PickItemBase, _extends({ key: i }, child.props));
        })
      );
    }
  }]);

  return PickMultiGroup;
}(Component);

export default PickMultiGroup;


PickMultiGroup.defaultProps = {
  styleId: "default"
};

PickMultiGroup.propTypes = {

  styleId: PropTypes.string,

  required: PropTypes.bool,
  hidden: PropTypes.bool,

  itemsControls: PropTypes.bool,
  selectedItems: PropTypes.arrayOf(PropTypes.string),
  onSelect: PropTypes.func,
  pickOn: PropTypes.string,

  validation: PropTypes.shape({
    validate: PropTypes.bool,
    validateOn: PropTypes.string,
    rulesOrder: PropTypes.arrayOf(PropTypes.string),
    rules: PropTypes.object,
    messages: PropTypes.object
  }),

  onPassValidation: PropTypes.func,
  onFailValidation: PropTypes.func,

  focused: PropTypes.bool,
  errored: PropTypes.bool,
  valid: PropTypes.bool,
  raised: PropTypes.bool,

  children: PropTypes.oneOfType([PropTypes.shape({ name: PropTypes.oneOf(["PickItem"]) }), PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.oneOf(["PickItem"]) }))])

};

if (__DOCS__) {
  PickMultiGroup.docs = {
    componentGroup: "Atom"
  };
}