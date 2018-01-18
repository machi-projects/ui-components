import React from 'react';
import style from './TimeField.css';
import DropdownComponent from './DropdownComponent';
import { deepEqualObject } from '../../../utils/objectUtils';

export default class DateTime extends React.Component {
	constructor(props){
		super(props);
		this.hoursSelect= this.hoursSelect.bind(this);
		this.minutesSelect= this.minutesSelect.bind(this);
		this.amPmSelect= this.amPmSelect.bind(this);

		let {hours,mins,amPm}= props;
		this.state={ hours,mins,amPm}

	}
	
	shouldComponentUpdate(nextProps, nextState)
	{
		return ((deepEqualObject(nextProps,this.props) == false) || (deepEqualObject(nextState,this.state) == false) )
	}
	
	render(){
		let { hours,mins,amPm}= this.state;
		let hourSuggestions= (()=>{
			let hourArr= []
			for(var hour=1;hour<=12;hour++){
				var htxt = (hour < 10) ? "0"+hour: hour;
				hourArr.push(htxt)
			}
		 	return hourArr
		})();
		let minSuggestions= (()=>{
			let minArr= [];
			for(var minute=0;minute<=59;minute++){
				var mtxt = (minute < 10) ? "0"+minute: minute;
				minArr.push(mtxt);
			}
			return minArr;		
		})();
		let ampmSuggestions=[
			{id:"AM",name:getI18NValue('AM')},
			{id:"PM",name:getI18NValue('PM')}
		]
		return <div className="m10 calendar">
					<span className={style.timeStr}>{getI18NValue('crm.events.time')}</span>
					<span className={style.dropdown}><DropdownComponent suggestions={hourSuggestions} value={ hours } valueField="id" textField="name" onSelect={ this.hoursSelect}/></span>
					<span className={style.dropdown}><DropdownComponent suggestions={minSuggestions} value={ mins } valueField="id" textField="name" onSelect={ this.minutesSelect }/></span>
					<span className={style.dropdown}><DropdownComponent suggestions={ampmSuggestions} value={ amPm } valueField="id" textField="name" onSelect={ this.amPmSelect }/></span>
				</div>

	}

	componentWillReceiveProps(nextProps) {
	    let {hours,mins,amPm}= nextProps;
	    if(deepEqualObject(nextProps,this.props) == false ){
	    		this.setState({ hours,mins,amPm });
	    }
	}

	hoursSelect(value){
		let {hours,mins,amPm}= this.state;
		hours= value.id;
		this.props.onSelect(hours,mins,amPm);
		this.setState({hours});
	}

	minutesSelect(value){
		let {hours,mins,amPm}= this.state;
		mins= value.id;
		this.props.onSelect(hours,mins,amPm);
		this.setState({mins});
	}

	amPmSelect(value){
		let {hours,mins,amPm}= this.state;
		amPm= value.id;
		this.props.onSelect(hours,mins,amPm);
		this.setState({amPm});
	}

}
