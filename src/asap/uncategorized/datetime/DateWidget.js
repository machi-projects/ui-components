import React from 'react';
import PropTypes from 'prop-types';
import DateTime from './DateTime';
import Popup from '../Popup';
import style from './DateWidget.css';
import moment from 'moment-timezone';

import { Icon } from '../../index';

import validator from '../../../utils/validator';
import { deepEqualObject } from '../../../utils/objectUtils';

class DateWidget extends React.Component {
	constructor(props) {
		super(props);
		this.handleSelect = this.handleSelect.bind(this);
		this.onChangeValue = this.onChangeValue.bind(this);
		this.state = { selected : props.value, timeZone: (props.timeZone || moment.tz.guess()) };
		this.setDropPopupRef = this.setDropPopupRef.bind(this);
		this.setRef = this.setRef.bind(this);
		this.setPlaceHolderRef = this.setPlaceHolderRef.bind(this);
	}
	
	setRef(el) {
		this.elementRef = el;
		this.props.getElementRef && this.props.getElementRef(el);
	}
	
	setPlaceHolderRef(el) {
		this.placeHolderRef = el;
	}
	
	setDropPopupRef(el){
		this.dropPopupRef = el;
	}
	
	componentWillReceiveProps(nextProps) {
		
		if( nextProps.value !== this.state.selected){
			this.setState({ selected : nextProps.value },()=>{
				this.onChangeValue(this.state.selected);
			});
		}
		
		if( deepEqualObject(nextProps.validation,this.props.validation) == false && nextProps.validation && nextProps.validation.validate ){
			this.validateOnSelect(this.state.selected, nextProps);
		}
	}

	shouldComponentUpdate(nextProps, nextState)
	{
		return ( (deepEqualObject(nextProps,this.props) == false) || (deepEqualObject(nextState,this.state) == false) )
	}
	
	
	onChangeValue(val, groupName){
		this.props.onChange && this.props.onChange(val, groupName);
		this.props.getValue && this.props.getValue(val);
	}

	render() {
		let {
			togglePopup,
			removeClose,
			id,
			name,
			isReadOnly,
			minErrorText,
			maxErrorText,
			min,
			max,
			placeholder,
			isPopupOpen,
			isPopupReady,
			isDateTime,
			dtPtn,
			position,
			timeZone,
			arrowPosition,
			
			tabIndex,
			onClick
		} = this.props;
		let value = this.state.selected;
		
		value = value ? moment.tz(value, this.state.timeZone) : null;
		let displayText = value ? (!isDateTime ? value.format(dtPtn) : value.format(dtPtn + ' hh:mm A')) : '';
		
		return (
			<div className={style.posrel} ref={this.setRef} tabIndex={tabIndex} onClick={onClick} >
				<div
					className={isPopupOpen ? style.dateFocus : style.date}
					onClick={(e)=>{ togglePopup(e,this.dropPopupRef,this.placeHolderRef) }}
					ref={this.setPlaceHolderRef}
				>
				
				<Icon id="datePicker" color="tundora" styleId="date_Picker" />
				
					<span>
						{value ? displayText : placeholder}
					</span>
					
				</div> 
				<div ref={this.setDropPopupRef}
						className={
							style.droppopup+' '+ ( isPopupReady ? style.ready : '' ) +' '+ 
							( isPopupOpen ? style.opened : '')  +' '+
							(position == 'top' ? style.dateTop : style.absolute)
						}
						onClick={removeClose}>
						<DateTime
							value={value}
							isDateTimeField={isDateTime}
							onSelect={this.handleSelect}
							timeZone={this.state.timeZone}
							position={position == 'top' ? 'top' : arrowPosition}
							min={min}
							max={max}
							maxErrorText={maxErrorText}
							minErrorText={minErrorText}
						/>
				</div>
			</div>
		);
	}


	handleSelect(userZoneSelectedTime, e) {
		
		let value = userZoneSelectedTime ? userZoneSelectedTime.utc().format() : null;
		let { id, togglePopup } = this.props;
		this.setState({ selected: value }, () => {
			if (this.props.validation && this.props.validation.validateOn) {
				this.validateOnSelect(this.state.selected , this.props);
			}
			this.onChangeValue(this.state.selected,id);
		});

		togglePopup(e);
	}

	validateOnSelect(value, props) {
		let defaultCheckPropsRules = ['required'];
		let defaultValidateRules = ['required'];
		let defaultType = 'onegroup';

		const { validation, onPassValidation, onFailValidation } = props;

		let targetTag = this.elementRef;
		if (validation != null) {
			//validateOn won't work here ...
			let newValidation = validator.combinePropsValidation(
				this.props,
				defaultType,
				'onChange',
				validation,
				defaultCheckPropsRules,
				defaultValidateRules
			);

			let validationObj = {
				validation: newValidation,
				onPassValidation: onPassValidation,
				onFailValidation: onFailValidation
			};

			validator.executeValidation(value, targetTag, validationObj , defaultType);
		}
		else {
			onPassValidation && onPassValidation(value, targetTag);
		}
	}
	
	componentDidMount() {
		if (this.props.validation != null && this.props.validation.validate) {
			this.validateOnSelect(this.state.selected, this.props);
		}
	}
}

DateWidget.defaultProps = {
	placeholder: 'No date selected'
};

DateWidget.propTypes = {
	id: PropTypes.string,
	isReadOnly: PropTypes.bool,
	value: PropTypes.string,
	dateTimeSelect: PropTypes.func,
	togglePopup: PropTypes.func,
	onChange: PropTypes.func,
	removeClose: PropTypes.func,
	name: PropTypes.string,
	isReadOnly: PropTypes.bool,
	minErrorText: PropTypes.string,
	maxErrorText: PropTypes.string,
	min: PropTypes.string,
	max: PropTypes.string,
	isPopupOpen: PropTypes.bool,
	isDateTime: PropTypes.bool,
	dtPtn: PropTypes.string,
	position: PropTypes.string,
	timeZone: PropTypes.string,
	arrowPosition: PropTypes.string,
	placeholder: PropTypes.string,

	tabIndex : PropTypes.string,
	getElementRef : PropTypes.func,
	getValue : PropTypes.func,
	onClick : PropTypes.func,
	
	raised : PropTypes.bool,
	focused : PropTypes.bool,
	errored : PropTypes.bool,
	
	validation: PropTypes.shape({
		validate: PropTypes.bool,
		validateOn: PropTypes.string,
		rulesOrder: PropTypes.arrayOf(PropTypes.string),
		rules: PropTypes.object,
		messages: PropTypes.object
	}),

	onPassValidation: PropTypes.func,
	onFailValidation: PropTypes.func
};

export default Popup(DateWidget);
//export const DateWidgetInline = Popup(DateWidget);
