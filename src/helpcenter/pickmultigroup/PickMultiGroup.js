import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PickMultiGroupBase, { PickItemBase } from '../../js/core/PickMultiGroupBase';

import styles from './pickmultigroup.css';
import styleMapping from './styleMapping';

import {omit} from '../../utils/objectUtils';
import cx from '../../utils/classNamesUtils/classNamesBind';

export  class PickItem extends Component {
  render(){
    return(null);
  }
}

PickItem.propTypes ={
	pickId : PropTypes.string.isRequired,
	tabIndex : PropTypes.string,
	focusIn : PropTypes.func,
	focusOut : PropTypes.func
}

export default class PickMultiGroup extends Component {

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
      raised

    } = this.props;

    let newProps = omit(this.props, [ "className" , "styleId" , "readOnly" , "disabled" , "hidden" ,"focused" , "errored" ,"valid" , "raised" ]);

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
    let styleMappings = styleMapping[ styleId ];

    let itemStyle = styles[ styleMappings.itemStyle ];
    let itemActiveStyle = styles[ styleMappings.activeStyle ];
    
    return ( <PickMultiGroupBase {...newProps}  styles={ { group : classNames , item : itemStyle , active : itemActiveStyle } }  >

        {
          React.Children.map(this.props.children, (child ,i ) => {

            return (<PickItemBase key={i} {...child.props} />);

           })
        }

      </PickMultiGroupBase>);

  }

}

PickMultiGroup.defaultProps = {
    styleId : "default"
};

PickMultiGroup.propTypes = {

   styleId : PropTypes.string,

   required : PropTypes.bool,
   hidden : PropTypes.bool,

   fireEvent : PropTypes.string,
   itemsControls : PropTypes.bool,
   selectedItems :  PropTypes.arrayOf(PropTypes.string),
   onSelect : PropTypes.func,
   pickOn : PropTypes.string,

	tabIndex : PropTypes.string,
	focusIn : PropTypes.func,
	focusOut : PropTypes.func,
	onClick : PropTypes.func,
	
   validation : PropTypes.shape({
		validate : PropTypes.bool ,
		validateOn : PropTypes.string,
		rulesOrder :  PropTypes.arrayOf(PropTypes.string),
		rules : PropTypes.object,
		messages : PropTypes.object
 	}),

 	onPassValidation : PropTypes.func,
 	onFailValidation :  PropTypes.func,

  focused : PropTypes.bool,
  errored : PropTypes.bool,
  valid : PropTypes.bool,
  raised : PropTypes.bool,

  children : PropTypes.oneOfType([
    PropTypes.shape({ name: PropTypes.oneOf( ["PickItem"] ) } )  ,
    PropTypes.arrayOf(  PropTypes.shape({ name: PropTypes.oneOf( ["PickItem"] ) } ) )
  ])

};

if(__DOCS__){
  PickMultiGroup.docs = {
    componentGroup: "Atom"
  };
}
