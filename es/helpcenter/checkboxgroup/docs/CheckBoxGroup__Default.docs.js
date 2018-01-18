import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CheckBoxGroup, CheckBoxItem } from '../index';

var CheckBoxGroup__Default = function (_Component) {
  _inherits(CheckBoxGroup__Default, _Component);

  function CheckBoxGroup__Default() {
    _classCallCheck(this, CheckBoxGroup__Default);

    return _possibleConstructorReturn(this, (CheckBoxGroup__Default.__proto__ || _Object$getPrototypeOf(CheckBoxGroup__Default)).apply(this, arguments));
  }

  _createClass(CheckBoxGroup__Default, [{
    key: 'render',
    value: function render() {

      return React.createElement(
        'div',
        null,
        'CheckBoxGroup styles...',
        React.createElement(
          CheckBoxGroup,
          { selectedItems: ["B", "C"] },
          React.createElement(
            CheckBoxItem,
            { value: 'A' },
            ' Apple '
          ),
          React.createElement(
            CheckBoxItem,
            { value: 'B' },
            ' Banana '
          ),
          React.createElement(
            CheckBoxItem,
            { value: 'C' },
            ' Car '
          )
        ),
        'CheckBoxGroup styles...',
        React.createElement(
          CheckBoxGroup,
          { styleId: 'mycheckbox', selectedItems: ["B", "C"] },
          React.createElement(
            CheckBoxItem,
            { value: 'A' },
            ' Apple '
          ),
          React.createElement(
            CheckBoxItem,
            { value: 'B' },
            ' Banana '
          ),
          React.createElement(
            CheckBoxItem,
            { value: 'C' },
            ' Car '
          )
        )
      );
    }
  }]);

  return CheckBoxGroup__Default;
}(Component);

export default CheckBoxGroup__Default;


if (__DOCS__) {
  CheckBoxGroup__Default.docs = {
    componentGroup: CheckBoxGroup.docs.componentGroup
  };
}

// <CheckBoxGroup selectedItems={["B","A"]} >
//
//         <CheckBoxItem value="A" label="Apple" />
//
//         <CheckBoxItem value="B" >  <span> Banana </span>    </CheckBoxItem>
//
//         <CheckBoxItem value="C" > <div> cappuccino  </div>  </CheckBoxItem>
//
//   </CheckBoxGroup>