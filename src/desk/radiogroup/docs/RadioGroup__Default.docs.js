import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RadioGroup , RadioItem } from '../index';

export default class RadioGroup__Default extends Component {

  render() {


    return (<div>

       <b> Radio group + custom styles </b> <br />  <br/>

       Group 1 : <br/>

       <RadioGroup selectedItem="B" >

          <RadioItem value="A"> Apple </RadioItem>
          <RadioItem value="B"> Banana </RadioItem>
          <RadioItem value="C"> Pinapple </RadioItem>

       </RadioGroup>


       <br/>


       <RadioGroup styleId="myradio" groupName="hello" selectedItem="BC" >

          <RadioItem value="AA"> Car </RadioItem>
          <RadioItem value="BC"> Flight </RadioItem>
          <RadioItem value="CD"> Bus </RadioItem>

       </RadioGroup>

    </div>);

    }

}

if(__DOCS__){
  RadioGroup__Default.docs = {
    componentGroup: RadioGroup.docs.componentGroup
  };
}


// <RadioGroup selectedItem="A" >
//        <RadioItem value="A" label="Apple" />
//        <RadioItem value="B" >  <span> Banana </span>    </RadioItem>
//        <RadioItem value="C" > <div> cappuccino  </div>  </RadioItem>
//  </RadioGroup>
