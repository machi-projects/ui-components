import React from 'react';
import MultilineInputBase from '../base/MultilineInputBase';
import validator from '../base/validator';

export default class MultilineInputBoxBase extends React.Component {
	
	onInputText(ev){
		
		if( this.props.onInput ){
			this.props.onInput(ev);
		}
		
		if( this.props.autoExpand ){
			autoExpand(ev.target);
		}
	}

	autoExpand(textarea){
		
		var str = textarea.value || "";
		var cols = textarea.cols;

		var linecount = 0;
		str.split("\n").forEach( function(l) {
			linecount += Math.ceil( l.length / cols ); 
			// Take into account long lines
		});
		
		textarea.rows = linecount + 1;
	}
	
    render() {
	
	  const { id,
		  
	      name,
	      className,
	      placeholder,
	      value,
	      readOnly,
	      maxLength,
	      rows,
	      cols,
	      
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
	      onFailValidation
	      
	    } = this.props;
	    
	    let newValidation = validation || {};
	    let validationRules = newValidation.rules;
	    let validationRulesOrder = newValidation.rulesOrder;
	    let validationMessages = newValidation.messages;
	    let isValidate = newValidation.show;
	    let validateOn = newValidation.validateOn;

	    let newValidationRulesOrder = validationRulesOrder ? [...validationRulesOrder] : [];
	    let newValidationRules = validationRules ? validationRules : {};

	    let checkPropsRules = [ "required" , "minLength" , "maxLength"  ]
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

	    let isRulesFound = Object.keys( newValidationRules ).length;
	    newValidationRules = isRulesFound ? validator.composeRulesForValidation( this.props.defaultType ,  this.props.defaultValidateRules , newValidationRules ) : newValidationRules;

	
    return ( <MultilineInputBase id={id}
    
    	name={name} 
    className={className} 
    placeholder={placeholder}
    value={value} 
    maxLength={maxLength}
    rows={rows}
    cols={cols}
    
    readOnly={readOnly}
    disabled={disabled}
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
    
   />);
 
  }

}

MultilineInputBoxBase.defaultProps ={
	defaultType : "textarea" ,	
	defaultValidateRules : [ "required" , "minLength" , "maxLength" , "pattern" ]
}

