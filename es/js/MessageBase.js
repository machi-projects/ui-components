import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'prop-types';

var MessageBase = function (_React$Component) {
  _inherits(MessageBase, _React$Component);

  function MessageBase() {
    _classCallCheck(this, MessageBase);

    return _possibleConstructorReturn(this, (MessageBase.__proto__ || _Object$getPrototypeOf(MessageBase)).apply(this, arguments));
  }

  _createClass(MessageBase, [{
    key: 'render',
    value: function render() {

      return React.createElement('span', this.props);
    }
  }]);

  return MessageBase;
}(React.Component);

export default MessageBase;