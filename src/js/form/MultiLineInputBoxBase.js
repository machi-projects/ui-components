import React from 'react';
import MultiLineInputBase from '../core/MultiLineInputBase';
import validator from '../../utils/validator';
import PropTypes from 'prop-types';
import {deepEqualObject} from '../../utils/objectUtils';

export default class MultiLineInputBoxBase extends React.Component {
	
	shouldComponentUpdate(nextProps, nextState)
	{
		return ((deepEqualObject(nextProps,this.props) == false) || (deepEqualObject(nextState,this.state) == false));
	}
	
    render() {

			let defaultCheckPropsRules = 	[ "required" , "minLength" , "maxLength" , "pattern" ]
			let defaultValidateRules =   [ "required" , "minLength" , "maxLength"  ]
			let defaultType = "textarea";

			const {
				type,
				validation
			} = this.props;

			let newValidation = validator.combinePropsValidation( this.props, defaultType , "onBlur" ,  validation , defaultCheckPropsRules  , defaultValidateRules);

    return ( <MultiLineInputBase {...this.props} validation={newValidation} />);

   }

}

MultiLineInputBoxBase.propTypes ={

	id : PropTypes.string ,
	name : PropTypes.string ,
	placeholder : PropTypes.string ,
	readOnly : PropTypes.bool ,
	maxLength :  PropTypes.oneOfType( [PropTypes.string,PropTypes.number] ),
	rows :  PropTypes.oneOfType( [PropTypes.string,PropTypes.number] ),
	cols :  PropTypes.oneOfType( [PropTypes.string,PropTypes.number] ),

	autoExpandY : PropTypes.bool ,
	autoExpandX : PropTypes.bool ,
	
	autoFocus :  PropTypes.bool ,
	disabled :  PropTypes.bool ,
	required :  PropTypes.bool ,
	value : PropTypes.string ,

	getElementRef : PropTypes.func,
	onFocus: PropTypes.func,
	onBlur : PropTypes.func,
	onKeyDown : PropTypes.func,
	onKeyUp : PropTypes.func,
	onChange : PropTypes.func,
	onInput : PropTypes.func,
	getValue : PropTypes.func,

	validation : PropTypes.shape({
			validate : PropTypes.bool ,
			validateOn : PropTypes.string,
			rulesOrder :  PropTypes.arrayOf(PropTypes.string),
			rules : PropTypes.object,
			messages : PropTypes.object
	}),

	onPassValidation : PropTypes.func,
	onFailValidation :  PropTypes.func
}
