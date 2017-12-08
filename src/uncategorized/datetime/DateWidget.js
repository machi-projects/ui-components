import React from "react";
import PropTypes from 'prop-types';
import DateTimeComponent from "./DateTime.js";
import Popup from "../Popup.js";
import style from "./DateWidget.css";
import moment from "moment-timezone";

class DateWidget1 extends React.Component{
	constructor(){
		super();
		this.handleSelect= this.handleSelect.bind(this)
	}

	render(){
		let { togglePopup,removeClose,value,id,name,isReadOnly,minErrorText,maxErrorText,min,max,
			  	isPopupOpen,isDateTime,dtPtn,position,timeZone, arrowPosition }= this.props;
		value = value? moment.tz(value, timeZone): null;
		let displayText= value? !isDateTime ? value.format(dtPtn) : value.format(dtPtn+" hh:mm A"): "";
		return <div>
					<div className={isPopupOpen ? style.dateFocus : style.date} data-testid="remindMeOnDueDate" onClick={togglePopup} data-testId={name}>{displayText}
						{isPopupOpen && <div className={position == "top" ?style.dateTop:style.absolute} onClick={removeClose} >
								<DateTimeComponent value={value} isDateTimeField={ isDateTime } onSelect={this.handleSelect} timeZone={ timeZone}
									position={position == "top" ? "top" :arrowPosition} min={ min } max={ max } maxErrorText={ maxErrorText } minErrorText={ minErrorText }/>
							</div>
						}
					</div>
	 			</div>
	}

    handleSelect(userZoneSelectedTime,e){
    	let { id,onSelect,togglePopup }= this.props;
    	togglePopup(e);
    	onSelect(userZoneSelectedTime?userZoneSelectedTime.utc().format():"",id);
	}
}

DateWidget1.propTypes={
	id: PropTypes.string.isRequired,
	isReadOnly: PropTypes.bool.isRequired,
	value: PropTypes.string,
	dateTimeSelect: PropTypes.func,
	togglePopup:PropTypes.func,
	onSelect:PropTypes.func,
	removeClose:PropTypes.func,
	name:PropTypes.string,
	isReadOnly:PropTypes.bool,
	minErrorText:PropTypes.string,
	maxErrorText:PropTypes.string,
	min:PropTypes.string,
	max:PropTypes.string,
	isPopupOpen:PropTypes.bool,
	isDateTime:PropTypes.bool,
	dtPtn:PropTypes.string,
	position:PropTypes.string,
	timeZone:PropTypes.string,
	arrowPosition:PropTypes.string
}


export default Popup(DateWidget1,"date");
export  const FormDateWidget=Popup(DateWidget1);
