import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PickOneGroupBase, { PickOneItemBase } from '../../js/core/PickOneGroupBase';

import styleMapping from './styleMapping';

import {omit} from '../../utils/objectUtils';
import cx from '../../utils/classNamesUtils/classNamesBind';

export  class PickOneItem extends Component {
  render(){
    return(null);
  }
}

PickOneItem.propTypes ={
	pickId : PropTypes.string.isRequired,
	tabIndex : PropTypes.string
}

export default class PickOneGroup extends Component {

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
    let styleMappings = styleMapping[  styleId ];

    let itemStyle = styles[ styleMappings.itemStyle ];
    let itemActiveStyle = styles[ styleMappings.activeStyle ];

    return ( <PickOneGroupBase {...newProps}  styles={ { group : classNames , item : itemStyle , active : itemActiveStyle } }  >

        {
          React.Children.map(this.props.children, (child ,i ) => {

            return (<PickOneItemBase key={i} {...child.props} />);

           })
        }

      </PickOneGroupBase>);

  }

}

PickOneGroup.defaultProps = {
    styleId : "default"
};

PickOneGroup.propTypes = {

   styleId : PropTypes.string,

   required : PropTypes.bool,
   hidden : PropTypes.bool,

   itemsControls : PropTypes.bool,
   selectedItem : PropTypes.string,
   onSelect : PropTypes.func,
   getValue : PropTypes.func,
   pickOn : PropTypes.string,

	tabIndex : PropTypes.string,
	getElementRef : PropTypes.func,
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
    PropTypes.shape({ name: PropTypes.oneOf( ["PickOneItem"] ) } )  ,
    PropTypes.arrayOf(  PropTypes.shape({ name: PropTypes.oneOf( ["PickOneItem"] ) } ) )
  ])

};

if(__DOCS__){
  PickOneGroup.docs = {
    componentGroup: "Atom"
  };
}
