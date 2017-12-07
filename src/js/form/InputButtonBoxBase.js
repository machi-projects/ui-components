import React from 'react';
import InputBase from '../core/InputBase';
import validator from '../../utils/validator';
import PropTypes from 'prop-types';
import {equals} from '../../utils/objectUtils';

export default class InputButtonBoxBase extends React.Component {

	shouldComponentUpdate(nextProps)
	{
			if( equals(nextProps, this.props) ){
					return false;
			}

			return true;
	}

	render() {

			let defaultCheckPropsRules = 	[ "required" , "pattern" ]
			let defaultValidateRules =  [ "required" ,  "pattern" ];
			let defaultType = "radio";

			const {
			type,
			validation
			} = this.props;

			let newType = (type || defaultType);
			let newValidation = validator.combinePropsValidation( this.props, newType , "onChange" ,  validation , defaultCheckPropsRules  , defaultValidateRules);

    return ( <InputBase {...this.props} type={newType} validation={ newValidation }  />);

  }

}

InputButtonBoxBase.defaultProps = {
	type : "radio"
}

InputButtonBoxBase.propTypes = {

	id : PropTypes.string ,
	type : PropTypes.oneOf([  "checkbox" , "radio"  ]).isRequired ,
	name : PropTypes.string ,
  className : PropTypes.string,

	readOnly : PropTypes.bool ,
	defaultChecked :  PropTypes.bool ,
	checked :  PropTypes.bool ,

	disabled :  PropTypes.bool ,
	required :  PropTypes.bool ,
	pattern :  PropTypes.string ,
	value : PropTypes.string ,

	onFocus: PropTypes.func,
	onBlur : PropTypes.func,
	onKeyDown : PropTypes.func,
	onKeyUp : PropTypes.func,
	onChange : PropTypes.func,

	validation : PropTypes.shape({
			validate : PropTypes.bool ,
			validateOn : PropTypes.string,
			rulesOrder :  PropTypes.arrayOf(PropTypes.string),
			rules : PropTypes.object,
			messages : PropTypes.object,
	}),

	onPassValidation : PropTypes.func,
	onFailValidation :  PropTypes.func

}
