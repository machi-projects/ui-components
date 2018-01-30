import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { omit , deepEqualObject } from '../../utils/objectUtils';


let getTotalFieldsCount=(fieldChildren)=>{

	let count = 0;
	React.Children.map(fieldChildren, (child, i) => {
		if( child && child.props.fieldId){
			count += 1;
		}
	})

	return count;
} 


export default class FormFieldsGroupBase extends Component {
	
	constructor(props) {
		super(props);	
		this.state = {
			errored: false,
			validFields: {},
			inValidFields: {},
			totalFieldsCount : ( props.totalFieldsCount ? nextProps.totalFieldsCount : getTotalFieldsCount(props.children)),
			errorFocusFieldId : props.errorFocusFieldId || null
		};
		
		this.reseSetDoneFieldsCount();
		this.onValidationDone = this.onValidationDone.bind(this);
		this.getDoneFieldsCount = this.getDoneFieldsCount.bind(this);
		this.reseSetDoneFieldsCount = this.reseSetDoneFieldsCount.bind(this);
		this.addDoneFieldsCount = this.addDoneFieldsCount.bind(this);
	}
	
	getDoneFieldsCount(){
		return this.doneFieldsCount;
	}
	
	reseSetDoneFieldsCount(){
		this.doneFieldsCount = 0;
	}
	
	addDoneFieldsCount(){
		this.doneFieldsCount = this.doneFieldsCount + 1;
	}
	
	onValidationDone(){
		
		let invalidFields =  Object.keys(this.state.inValidFields);
		//let numOfValidFields =  Object.keys(this.state.validFields).length;
		if( invalidFields.length > 0 ){
			
			this.props.onFailValidation && this.props.onFailValidation(this.state.inValidFields);
			if(this.props.focusFieldOnError){
				this.setState({ errorFocusFieldId : invalidFields[0] },()=>{this.setState({errorFocusFieldId:null})})
			}
		}
		else{
			this.props.onPassValidation && this.props.onPassValidation(this.state.validFields);
			this.setState({ errorFocusFieldId : null })
		}
		
		this.reseSetDoneFieldsCount();
	}
	
	onPassValidationItem(fieldId, fieldVal, el) {
		this.setState(
			state => {
				state.validFields[fieldId] = fieldVal;
				state.inValidFields = omit(state.inValidFields, fieldId);
				state.errored = false;
				return state;
			},
			()=>{
				
				this.addDoneFieldsCount();
				if( this.getDoneFieldsCount() === this.state.totalFieldsCount ){
					this.onValidationDone();
				}

			}
		);
			
	}

	onFailValidationItem(fieldId, rule, message, el) {
		this.setState(
			state => {
				state.inValidFields[fieldId] = { [rule]: message };
				state.validFields = omit(state.validFields, fieldId);
				state.errored = true;
				return state;
			},
			()=>{
				
				this.addDoneFieldsCount();
				if( this.getDoneFieldsCount() === this.state.totalFieldsCount ){
					this.onValidationDone();
				}
				
			}
		);
			
	}
	
	render() {
	
		let { formFieldsGroupStyle , focusFieldOnError, onChangeFieldValue } = this.props;
		return (
			<div className={formFieldsGroupStyle} >
				{React.Children.map(this.props.children, (child, i) => {
					return child
						? React.cloneElement(child, {
								key: i,
								validate: this.props.validate,
								resetField : this.props.resetForm,
								tabIndex: focusFieldOnError ? "-1" : null,
								focusField : ( this.state.errorFocusFieldId == child.props.fieldId ),
								getValue : onChangeFieldValue ? (val)=>{ onChangeFieldValue(child.props.fieldId, val) } : null ,
								onPassValidation: (fieldId, fieldVal, el)=>{
									child.props.onPassValidation && child.props.onPassValidation(fieldId, fieldVal, el); 
									this.props.validate && this.onPassValidationItem(fieldId, fieldVal, el);
								},
								onFailValidation: (fieldId, rule, message, el)=>{
									child.props.onFailValidation && child.props.onFailValidation(fieldId, rule, message, el);  
									this.props.validate && this.onFailValidationItem(fieldId, rule, message, el);
								}
							})
						: null;
				})}
			</div>
		);
	}
}

FormFieldsGroupBase.propTypes = {
	formFieldsGroupStyle: PropTypes.string,

	focusFieldOnError : PropTypes.bool,
	validate: PropTypes.bool,
	resetForm : PropTypes.bool,
	onFailValidation: PropTypes.func,
	onPassValidation: PropTypes.func,
	onChangeFieldValue : PropTypes.func,

	totalFieldsCount : PropTypes.number,
	children: PropTypes.oneOfType([
		PropTypes.shape({ name: PropTypes.oneOf(['FormFieldSetBase']) }),
		PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.oneOf(['FormFieldSetBase']) }))
	])
};
