import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RadioGroup, RadioItem } from '../index';

var RadioGroup__Default = function (_Component) {
   _inherits(RadioGroup__Default, _Component);

   function RadioGroup__Default() {
      _classCallCheck(this, RadioGroup__Default);

      return _possibleConstructorReturn(this, (RadioGroup__Default.__proto__ || _Object$getPrototypeOf(RadioGroup__Default)).apply(this, arguments));
   }

   _createClass(RadioGroup__Default, [{
      key: 'render',
      value: function render() {

         return React.createElement(
            'div',
            null,
            React.createElement(
               'b',
               null,
               ' Radio group + custom styles '
            ),
            ' ',
            React.createElement('br', null),
            '  ',
            React.createElement('br', null),
            'Group 1 : ',
            React.createElement('br', null),
            React.createElement(
               RadioGroup,
               { selectedItem: 'B' },
               React.createElement(
                  RadioItem,
                  { value: 'A' },
                  ' Apple '
               ),
               React.createElement(
                  RadioItem,
                  { value: 'B' },
                  ' Banana '
               ),
               React.createElement(
                  RadioItem,
                  { value: 'C' },
                  ' Pinapple '
               )
            ),
            React.createElement('br', null),
            React.createElement(
               RadioGroup,
               { styleId: 'myradio', groupName: 'hello', selectedItem: 'BC' },
               React.createElement(
                  RadioItem,
                  { value: 'AA' },
                  ' Car '
               ),
               React.createElement(
                  RadioItem,
                  { value: 'BC' },
                  ' Flight '
               ),
               React.createElement(
                  RadioItem,
                  { value: 'CD' },
                  ' Bus '
               )
            )
         );
      }
   }]);

   return RadioGroup__Default;
}(Component);

export default RadioGroup__Default;


if (__DOCS__) {
   RadioGroup__Default.docs = {
      componentGroup: RadioGroup.docs.componentGroup
   };
}

// <RadioGroup selectedItem="A" >
//        <RadioItem value="A" label="Apple" />
//        <RadioItem value="B" >  <span> Banana </span>    </RadioItem>
//        <RadioItem value="C" > <div> cappuccino  </div>  </RadioItem>
//  </RadioGroup>