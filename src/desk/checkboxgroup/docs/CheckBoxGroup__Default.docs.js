import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CheckBoxGroup, CheckBoxItem } from '../index';

export default class CheckBoxGroup__Default extends Component {

  render() {

    return (
          <div>

            CheckBoxGroup styles...

              <CheckBoxGroup selectedItems={["B","C"]}>
                  <CheckBoxItem value="A" > Apple </CheckBoxItem>
                  <CheckBoxItem value="B" > Banana </CheckBoxItem>
                  <CheckBoxItem value="C" > Car </CheckBoxItem>
              </CheckBoxGroup>

              CheckBoxGroup styles...

                <CheckBoxGroup styleId="mycheckbox" selectedItems={["B","C"]}>
                    <CheckBoxItem value="A" > Apple </CheckBoxItem>
                    <CheckBoxItem value="B" > Banana </CheckBoxItem>
                    <CheckBoxItem value="C" > Car </CheckBoxItem>
                </CheckBoxGroup>


          </div>
    );

    }

}

if(__DOCS__){
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
