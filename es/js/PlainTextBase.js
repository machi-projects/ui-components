import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'prop-types';

var PlainTextBase = function (_React$Component) {
  _inherits(PlainTextBase, _React$Component);

  function PlainTextBase() {
    _classCallCheck(this, PlainTextBase);

    return _possibleConstructorReturn(this, (PlainTextBase.__proto__ || _Object$getPrototypeOf(PlainTextBase)).apply(this, arguments));
  }

  _createClass(PlainTextBase, [{
    key: 'render',
    value: function render() {

      return React.createElement(
        'span',
        { className: this.props.className },
        ' ',
        this.props.text,
        ' '
      );
    }
  }]);

  return PlainTextBase;
}(React.Component);

export default PlainTextBase;