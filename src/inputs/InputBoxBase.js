import React from 'react';
import InputBase from '../base/InputBase';
import validator from '../base/validator';

export default class InputBoxBase extends React.Component {
	
	render() {
	
	  const { id,
		  
	      type,
	      name,
	      className,
	      placeholder,
	      value,
	      readOnly,
	      maxLength,
	      max,
	      min,
	      size,
	      step,
	      list,
	      
	      checked,
	      autoComplete,
	      disabled,
	      required,
	      pattern,
	      autoFocus,
	      
	      onFocus,
	      onBlur,
	      onKeyDown,
	      onKeyUp,
	      onChange,
	      onInput,
	      
	      validation,
	      onPassValidation,
	      onFailValidation,
	      
	    } = this.props;
	   
	      let newValidation = validation || {};
	      let validationRules = newValidation.rules;
	      let validationRulesOrder = newValidation.rulesOrder;
	      let validationMessages = newValidation.messages;
	      let isValidate = newValidation.show;
	      let validateOn = newValidation.validateOn;

	      let newValidationRulesOrder = validationRulesOrder ? [...validationRulesOrder] : [];
	      let newValidationRules = validationRules ? validationRules : {};

	      let checkPropsRules = [ "required" , "min" , "minLength" , "range" , "rangeLength" , "max" , "maxLength" , "step" , "pattern" ]
	      let checkPropsOrder = [];
	      for(var i=0;i<checkPropsRules.length;i++)
	      {
		    	  let prop = checkPropsRules[i];
		    	  if( this.props.hasOwnProperty( prop ) ){
	
		    		  if( newValidationRulesOrder.indexOf( prop ) == -1 ){
		    			  checkPropsOrder.push( prop ); 
		    		  }
	
		    		  if( !newValidationRules.hasOwnProperty( prop ) ){
		    			  newValidationRules[ prop ] = this.props[prop];
		    		  }
		    	  }
	      }

	      newValidationRulesOrder = !newValidation.hasOwnProperty("rulesOrder") ? checkPropsOrder.concat(newValidationRulesOrder) : validationRulesOrder;

	      let newType = (type || this.props.defaultType).toLowerCase();
	      newType = this.props.supportedTypes.indexOf(newType) != -1 ? newType : this.props.defaultType;
	      
	      let isRulesFound = Object.keys( newValidationRules ).length;
	      newValidationRules = isRulesFound ? validator.composeRulesForValidation( newType,  this.props.defaultValidateRules , newValidationRules ) : newValidationRules;

	      
    return ( <InputBase id={id}
    
    type={newType}
    	name={name}
    className={className} 
    
    placeholder={placeholder}
    readOnly={readOnly}
    maxLength={maxLength}
    min={min}
    max={max}
    step={step}
    size={size}
    checked={checked}
    list={list}
    
    autoComplete={autoComplete}
    disabled={disabled}
    pattern={pattern}
    required={required}
    autoFocus={autoFocus}
    
    validate={isValidate}
    validateOn={validateOn}
    validationRules={newValidationRules}
    validationRulesOrder={newValidationRulesOrder}
    validationMessages={validationMessages}
    onPassValidation={onPassValidation}
    onFailValidation={onFailValidation}
    
    onFocus={onFocus}
    onBlur={onBlur}
    onKeyDown={onKeyDown} 
    onKeyUp={onKeyUp} 
    onChange={onChange} 
    onInput={onInput}
    value={value} 
   
    />);
 
  }

}


InputBoxBase.defaultProps = {
	defaultType : "text" ,
	
	supportedTypes : [ "number" , "text" ,"range" , "color" , "file" , "checkbox" , "radio" , "search" 
						, "tel" , "url" , "month" , "date" , "time" , "datetime-local" 
					]	, 
		
	defaultValidateRules : [ "required" , "min" , "minLength" , "range" , "rangeLength" , "max" , "maxLength" , "step" , "pattern" ,
		                     "email", "integer", "digits", "double" , "phone", "url" , "hexcode" , "month" , "date" , "time" , "datetime"
		                   ]

}
	
