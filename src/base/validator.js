let isFunction = (a)=>{
	return a && (Function.constructor === a.constructor); 
}

const validator = {
			
		executeValidation : ( text , inputTag , validationObj )=>{
			
			let validationRulesOrder = validationObj.validationRulesOrder || [];
			let validationRules = validationObj.validationRules || {};
			let validationMessages = validationObj.validationMessages || {};
			let onPassValidation = validationObj.onPassValidation;
			let onFailValidation = validationObj.onFailValidation;
			
			for(var i=0;i<validationRulesOrder.length; i++){
				
				var rule = validationRulesOrder[i];
				if( !validationRules[ rule ] || !isFunction(validationRules[ rule ]) ){
					continue;
				}
				
				let isInValid = validationRules[ rule ](text, inputTag);
				
				if( isInValid  ){
					let message = validationMessages[ rule ] && isFunction(validationMessages[ rule ]) ? validationMessages[ rule ](text, inputTag) : validationMessages[ rule ];
					onFailValidation && onFailValidation( rule, message, inputTag);
					return;
				}
			}
			
			onPassValidation && onPassValidation( text , inputTag );
			
		},
		
		composeRulesForValidation : ( type , defaultValidateRules , newValidationRules )=>{
			
				let defaultPatterns = this.regexs;
				
		 		for(let i=0 , len=defaultValidateRules.length; i<len; i++ ){
		    			
		    			let rule = defaultValidateRules[i];
		    			let ruleInfo = newValidationRules[ rule ] || '';
		    			
		    			if( ruleInfo && !isFunction( ruleInfo) ){
		    				
		    				if(rule == "required" && ruleInfo === true ){
		    					
		    					newValidationRules[ rule ] = (val,el)=>{
		    						
		    						if(  type == "radio"  ||  type == "checkbox"  ){
		    							return !(el.checked);
		    						}	
		    						
		    						let value = (val || '').replace(/\s{2,}/g,' ').trim();
		    						return !value;
		    					}
		    					
		    				}
		    				else if( rule == "maxLength" ){
		    					
		    					let maxLength = ruleInfo;
		    					newValidationRules[ rule ] = (val,el)=>{ 
		    						let value = (val || '').trim();
		    						return !(value.length <= maxLength);
		    					}
		    				}
		    				else if( rule == "minLength" ){
		    					
		    					let minLength = ruleInfo;
		    					newValidationRules[ rule ] = (val,el)=>{ 
		    						let value = (val || '').trim();
		    						return !(value.length >= minLength);
		    					}
		    					
		    				}
		    				else if( rule == "rangeLength" && /^([\-\+\d]+)*([\-]{1,1}([\-\+\d]+))$/.test(ruleInfo) == true ){
		    					
		    					let rangeLength = ruleInfo;
		    					rangeLength = rangeLength.split("-");
		    					
		    					newValidationRules[ rule ] = (val,el)=>{
		    						let value = (val || '').trim();
		    						
		    						return !(value.length >= rangeLength[0] && value.length <= rangeLength[1])
		    					}
		    				}
		    				else if( rule == "step" && ( type == "text" ||  type == "number" ) && Number(ruleInfo) != NaN && Number(ruleInfo) != Infinity ){
		    					
		    					let step = ruleInfo;
		    					newValidationRules[ rule ] = (val,el)=>{ 
		    						let value = (val || '').trim();
		    						value = Number(value);
		    						
		    						if( value == NaN || value == Infinity ){
		    							return true;
		    						}
		    						
		    						return !(value % step == 0);
		    					}
		    				}
		    				else if( rule == "max" && ( type == "text" ||  type == "number" ) && Number(ruleInfo) != NaN && Number(ruleInfo) != Infinity ){
		    					
		    					let max = ruleInfo;
		    					newValidationRules[ rule ] = (val,el)=>{ 
		    						let value = (val || '').trim();
		    						value = Number(value);
		    						
		    						if( value == NaN || value == Infinity ){
		    							return true;
		    						}
		    						
		    						return !(value <= max);
		    					}
		    				}
		    				else if(  rule == "min" && ( type == "text" ||  type == "number" ) && Number(ruleInfo) != NaN && Number(ruleInfo) != Infinity ){
		    					
		    					let min = ruleInfo;
		    					newValidationRules[ rule ] = (val,el)=>{
		    						let value = (val || '').trim();
		    						value = Number(value);
		    						
		    						if( value == NaN || value == Infinity ){
		    							return true;
		    						}
		    						
		    						return !(value >= min);
		    					}
		    				}
		    				else if( rule == "range" &&  ( type == "text" ||  type == "number" ) && /^([\-\+\d]+)*([\-]{1,1}([\-\+\d]+))$/.test(ruleInfo) == true && Number(ruleInfo) != NaN && Number(ruleInfo) != Infinity ){
		    					
		    					let ranges = ranges.split("-");
		    					newValidationRules[ rule ] = (val,el)=>{ 
		    						let value = (val || '').trim();
		    						value = Number(value);
		    						
		    						if( value == NaN || value == Infinity ){
		    							return true;
		    						}
		    						
		    						return !(value >= ranges[0] && value <= ranges[1]);
		    					}
		    				}
		    				else if( (rule == "digits" || rule == "integer" ||  rule == "double" ) && ( type == "text" ||  type == "number" ) && ruleInfo === true ){
		    					
		    					newValidationRules[ rule ] = (val,el)=>{
		    						let value = (val || '').trim();
		    						value = Number(value);
		    						
		    						if( value == NaN || value == Infinity ){
		    							return true;
		    						}
		    						
		    						let condition = true;
		    						if( rule == "integer"  ){
		    							condition =  Number.isSafeInteger( value )
		    						}
		    						
		    						if( rule == "double" ){
		    							
		    							condition = (-Number.MAX_VALUE) <= value && Number.MAX_VALUE >= value 
		    						}
		    						
		    						return !defaultPatterns[ rule ].test( value ) && condition; 
		    					}
		    				}
		    				else if( (rule == "date" || rule == "datetime") && ruleInfo === true )
		    				{  
		    					newValidationRules[ rule ] = (val,el)=>{
		    						
		    						let value = (val || '').trim();
		    						
		    						if(!defaultPatterns[ rule ].test( value ))
		    						{
		    							return true;
		    						}	
		    						
		    						if( rule == "datetime" ){
		    							value = value.split("T")[0];
		    						}
		    						
		    						value = value.replace('/','-');
		    						value = value.replace(':','-')
		    						var values = value.split('-');
		    						
			    					// Extract the string into month, date and year  
			    					var yy= parseInt(values[0]);  
			    					var mm = parseInt(values[1]);  
			    					var dd = parseInt(values[2]);
		    						
			    					// Create list of days of a month [assume there is no leap year by default]  
			    					var ListofDays = [31,28,31,30,31,30,31,31,30,31,30,31];  
			    					
			    					if (mm==1 || mm>2)  
			    					{  
			    						if (dd>ListofDays[mm-1])  
			    						{  
			    							return true;  
			    						}  
			    					}  
			    					
			    					if (mm==2)  
			    					{  
			    						var lyear = false;  
			    						if ( (!(yy % 4) && yy % 100) || !(yy % 400))   
			    						{  
			    							lyear = true;  
			    						}  
			    						
			    						if ((lyear==false) && (dd>=29))  
			    						{
			    							return true;  
			    						}  
			    						
			    						if ((lyear==true) && (dd>29))  
			    						{  
			    							return true;  
			    						}  
			    					}
			    					
		    					}
		    					
		    			    }  
		    				else if( rule == "pattern" && ruleInfo ){
		    					
		    					newValidationRules[ rule ] = (val,el)=>{
		    						let value = (val || '').trim();
		    						return !(new RegExp(ruleInfo)).test( value ); 
		    					}
		    					
		    				}
		    				else if( (rule == "email" ||rule == "month" || rule == "time" || rule == "phone" || 
		    						rule == "url" || rule == "hexcode" ) && ruleInfo === true ){
		    					
		    					newValidationRules[ rule ] = (val,el)=>{
		    						let value = (val || '').trim();
		    						return !defaultPatterns[ rule ].test( value ); 
		    					}
		    				}
		    				
		    			}
		    			
		    		}
 		
			return newValidationRules;
		},
		
		regexs : {
			"integer" : /^[-+]?[0-9]+$/,
			"digits" : /^[0-9]+$/,
		    "double" : /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/ ,
		    	"email" : /^[\w]([\w\-\.\+\'\/]*)@([\w\-\.]*)(\.[A-z]{2,22}(\.[a-zA-Z]{2}){0,2})$/ ,
		    	"phone" : /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})/g ,
		    	"hexcode" : /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/ ,
		    	"month" : /^(\d{4,6})[\/\-\:](1[0-2]|0[1-9])$/,
		    	"date" : /^(\d{4,6})[\/\-](1[0-2]|0[1-9])[\/\-\:](0[1-9]|1[0-9]|2[0-9]|3[0-1])$/,
		    	"time" : /^([0-9]|0[0-9]|1[0-9]|2[0-3])[\-\/\:][0-5][0-9]$/,
		    	"datetime" : /^(\d{4,6})[\/\-](1[0-2]|0[1-9])[\/\-\:](0[1-9]|1[0-9]|2[0-9]|3[0-1])[T](([0-9]|0[0-9]|1[0-9]|2[0-3])[\-\/\:][0-5][0-9])$/,
		    	"url" : /^(ht|f)tp(s?)\:\/\/[\-\.\w]+[.][\w]+(\/?)([A-z0-9\-\.\?\,\:\'\/\\\+=\&%\$#_@]*)?$/ 
		}
		
}

export default validator;
