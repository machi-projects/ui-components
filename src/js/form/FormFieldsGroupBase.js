import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { omit } from '../../utils/objectUtils';


let getTotalFieldsCount=(fieldChildren)=>{

	let count = 0;
	React.Children.map(fieldChildren, (child, i) => {
		if( child ){
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
			validate: props.validate,
			validFields: {},
			inValidFields: {},
			totalFieldsCount : ( props.totalFieldsCount ? nextProps.totalFieldsCount : getTotalFieldsCount(props.children))
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
	
	componentWillReceiveProps(nextProps){
		
		if( nextProps.validate !== this.state.validate  ){
			this.setState({ 
				validate : nextProps.validate,
				totalFieldsCount :( nextProps.totalFieldsCount ? nextProps.totalFieldsCount : getTotalFieldsCount(nextProps.children))
			});
		}
	}
	
	onValidationDone(){
		
		let numOfInvalidFields =  Object.keys(this.state.inValidFields).length;
		let numOfValidFields =  Object.keys(this.state.validFields).length;
		if( numOfInvalidFields > 0 ){
			this.props.onFailValidation && this.props.onFailValidation(this.state.inValidFields);
		}
		else{
			this.props.onPassValidation && this.props.onPassValidation(this.state.validatedFields);
		}
		this.reseSetDoneFieldsCount();
	}
	
	onPassValidationItem(fieldId, fieldVal, el) {
		
		this.setState(
			state => {
				state.validFields[fieldId] = fieldVal;
				state.inValidFields = omit(state.inValidFields, fieldId);
				state.validate = false;
				state.errored = false;
				return state;
			},
			()=>{
				
				this.addDoneFieldsCount();
				console.log( this.getDoneFieldsCount() );
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
				state.validate = false;
				state.errored = true;
				return state;
			},
			()=>{
				
				this.addDoneFieldsCount();
				console.log( this.getDoneFieldsCount() );
				if( this.getDoneFieldsCount() === this.state.totalFieldsCount ){
					this.onValidationDone();
				}
				
			}
		);
			
	}

	render() {
		let { formFieldsGroupStyle } = this.props;

		return (
			<div className={formFieldsGroupStyle} tabIndex="-1">
				{React.Children.map(this.props.children, (child, i) => {
					return child
						? React.cloneElement(child, {
								key: i,
								validate: this.state.validate,
								onPassValidation: (fieldId, fieldVal, el)=>{ 
									child.props.onPassValidation && child.props.onPassValidation(fieldId, fieldVal, el); 
									this.state.validate && this.onPassValidationItem(fieldId, fieldVal, el);
								},
								onFailValidation: (fieldId, rule, message, el)=>{ 
									child.props.onFailValidation && child.props.onFailValidation(fieldId, rule, message, el);  
									this.state.validate && this.onFailValidationItem(fieldId, rule, message, el);
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

	validate: PropTypes.bool,
	onFailValidation: PropTypes.func,
	onPassValidation: PropTypes.func,

	totalFieldsCount : PropTypes.number,
	children: PropTypes.oneOfType([
		PropTypes.shape({ name: PropTypes.oneOf(['FormFieldSetBase']) }),
		PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.oneOf(['FormFieldSetBase']) }))
	])
};
