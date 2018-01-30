import React from 'react';
import style from './DateTime.css';

var monthend= [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
export default class CalendarView extends React.Component {
	constructor(props){
		super(props)
		this.handleSelect= this.handleSelect.bind(this);
	}
	render(){
		let { date,year,month }= this.props;
		let userSeeDate = new Date(year, month, 1);
		let userSeeDay = userSeeDate.getDay() + 1;
		let userSeeYear = userSeeDate.getFullYear();
		let userSeeMonth = userSeeDate.getMonth();
		let noOfRow = 5;
		if (((monthend[month] == 31) && (userSeeDay >= 6)) ||
				((monthend[month] == 30) && (userSeeDay == 7))) {
			noOfRow = 6;
		}
		else if ((monthend[month] == 28) && (userSeeDay == 1)) {
			noOfRow = 4;
		}
		
		let totalDays = monthend[month];
		date = totalDays < date ? totalDays : date;
		
		let incremday = 1;
		let incremleti = 1;
		let rows= (()=>{
			let rowArr= [];
			for(var j = 1; j <= noOfRow; j++){
				let dayArr= [];
				let output= null;
				for(var i = 1; i < 8; i++){
					if ((incremleti >= userSeeDay) && (incremday <= monthend[month])) {
						let tdclass = style.datesStr;
						
						if(i === 1)
						{
							tdclass += " "+style.sunday;
						}
						if ((incremday == parseInt(date)) && (parseInt(month) == userSeeMonth) && (parseInt(year) == userSeeYear)) {
							tdclass += " "+style.today;
						}
						output= <span className={tdclass} key={i} onClick={this.handleSelect.bind(this,incremday,userSeeMonth,userSeeYear)}> {incremday}</span>	
						incremday++;
					    
					}
					else {
						output= <span key={i} className={style.emptySpan}></span>
					}
					incremleti++;
					dayArr.push(output);
				} 

				rowArr.push(<div className={style.weekly} key={j}>{dayArr}</div>);
			}
			return rowArr
		})();
		return <div className={style.DateNew}>{rows}</div>
	}

	handleSelect(day,month,year){
		this.props.onSelect(day,month,year)
	}
}