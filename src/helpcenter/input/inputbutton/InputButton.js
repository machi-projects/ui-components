import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputButtonBoxBase from '../../../js/form/InputButtonBoxBase';
import styles from './inputbutton.css';

import {omit} from '../../../utils/objectUtils';
import cx from '../../../utils/classNamesUtils/classNamesBind';

export default class InputButton extends Component {

  render() {

    const {
      styleId,

      required,
      disabled,
      readOnly,
      hidden,

      focused,
      errored,
      valid,
      raised,
      
      focusIn,
      focusOut

    } = this.props;

    let newProps = omit(this.props, [ "className" , "styleId" , "focused" , "errored" ,"valid" , "raised" , "focusIn" , "focusOut" ]);

    let classNames = cx(styles,{

       [styleId] : true ,

       required : required ,
       disabled : disabled,
       readOnly : readOnly,
       hidden : hidden,

       focused : focused,
       errored : errored ,
       valid : valid ,
       raised : raised

     });

    //let onPassValidation = validation.validate ?  errored =  true

    return ( <InputButtonBoxBase {...newProps} onFocus={focusIn} onBlur={focusOut} className={ classNames }  />);


  }

}

InputButton.propTypes = {
    styleId : PropTypes.string
};

InputButton.propTypes = {

  styleId : PropTypes.string,

  id : PropTypes.string ,
  type : PropTypes.oneOf(["radio","checkbox"]).isRequired,
  name : PropTypes.string ,

  readOnly : PropTypes.bool,
  autoFocus :  PropTypes.bool ,
  disabled :  PropTypes.bool ,
  required :  PropTypes.bool ,
  pattern :  PropTypes.string ,
  value : PropTypes.string ,
  hidden : PropTypes.bool ,

  fireEvent :  PropTypes.string,
  focusIn: PropTypes.func,
  focusOut : PropTypes.func,

  onKeyDown : PropTypes.func,
  onKeyUp : PropTypes.func,
  onChange : PropTypes.func,

  validation : PropTypes.shape({
      show: PropTypes.bool,
      validateOn : PropTypes.string,
      rules : PropTypes.object ,
      rulesOrder : PropTypes.arrayOf(PropTypes.string) ,
      messages : PropTypes.object
  }),

  onFailValidation : PropTypes.func,
  onPassValidation : PropTypes.func,

  focused : PropTypes.bool,
  errored : PropTypes.bool,
  valid : PropTypes.bool,
  raised : PropTypes.bool

};

if(__DOCS__){
  InputButton.docs = {
    componentGroup: "Atom"
  };
}
