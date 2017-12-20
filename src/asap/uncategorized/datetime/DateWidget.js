import React from 'react';
import PropTypes from 'prop-types';
import DateTime from './DateTime';
import Popup from '../Popup';
import style from './DateWidget.css';
import moment from 'moment-timezone';

import validator from '../../../utils/validator';

class DateWidget extends React.Component {
	constructor(props) {
		super(props);
		this.handleSelect = this.handleSelect.bind(this);
		this.state = { selected: props.value, timeZone: props.timeZone || moment.tz.guess() };
		this.setDropPopupRef = this.setDropPopupRef.bind(this);
		this.setRef = this.setRef.bind(this);
		this.setPlaceHolderRef = this.setPlaceHolderRef.bind(this);
	}
	
	setRef(el) {
		this.elementRef = el;
	}
	
	setPlaceHolderRef(el) {
		this.placeHolderRef = el;
	}
	
	setDropPopupRef(el){
		this.dropPopupRef = el;
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
			focusIn,
			focusOut,
			onClick
			
		} = this.props;
		let value = this.state.selected;
		value = value ? moment.tz(value, this.state.timeZone) : null;
		let displayText = value ? (!isDateTime ? value.format(dtPtn) : value.format(dtPtn + ' hh:mm A')) : '';
		
		return (
			<div className={style.posrel} ref={this.setRef} tabIndex={tabIndex} onFocus={focusIn} onBlur={focusOut} onClick={onClick} >
				<div
					className={isPopupOpen ? style.dateFocus : style.date}
					data-testid="remindMeOnDueDate"
					onClick={(e)=>{ togglePopup(e,this.dropPopupRef,this.placeHolderRef) }}
					data-testId={name}
					ref={this.setPlaceHolderRef}
				>
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

	componentWillReceiveProps(nextprops) {
		if (nextprops.validation != null && nextprops.validation.validate) {
			this.validateOnSelect(this.state.selected, nextprops);
		}
	}

	handleSelect(userZoneSelectedTime, e) {
		let { id, onChange, togglePopup } = this.props;
		this.setState({ selected: userZoneSelectedTime }, () => {
			if (this.props.validation && this.props.validation.validateOn) {
				this.validateOnSelect(this.state.selected, this.props);
			}
			onChange && onChange(userZoneSelectedTime ? userZoneSelectedTime.utc().format() : '', id);
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
		} else {
			onPassValidation && onPassValidation(value, targetTag);
		}
	}
	
	componentDidUpdate(prevProps, prevState)
	{
		if(this.props.fireEvent!==prevProps.fireEvent  && this.props.fireEvent){
			requestAnimationFrame(()=>{		
				this.elementRef && this.elementRef[this.props.fireEvent] && this.elementRef[this.props.fireEvent]();
			})
			
		}
	}

	componentDidMount() {
		if (this.props.validation != null && this.props.validation.validate) {
			this.validateOnSelect(this.state.selected, this.props);
		}
		if(this.props.fireEvent!=null){
			requestAnimationFrame(()=>{	
				this.elementRef  && this.elementRef[this.props.fireEvent] && this.elementRef[this.props.fireEvent]();
			})
		}
	}
}

DateWidget.defaultProps = {
	placeholder: '-None-'
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

	fireEvent : PropTypes.string,
	tabIndex : PropTypes.string,
	focusIn : PropTypes.func,
	focusOut : PropTypes.func,
	onClick : PropTypes.func,
	
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

export default Popup(DateWidget, 'date');
//export const DateWidgetInline = Popup(DateWidget);
