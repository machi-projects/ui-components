import React from 'react';
import PickOneGroupBase, { PickOneItemBase } from '../base/PickOneGroupBase';

export class RadioBoxItemBase extends React.Component{
	
	//Dummy div code...
	render(){
		return(this.props.value ? (<div> {this.props.children} </div>) : null )
	}
}

export default class RadioBoxGroupBase extends React.Component {
	
	render() {
		
		let { 
			selectedItem,
			selectedItemStyle,
			itemStyle,
			groupStyle,
			onCheckItem,
			
			defaultGroupStyle,
			defaultselectedItemStyle,
			defaultItemStyle
			
		} = this.props;
		
		let selectedStyles =  (selectedItemStyle || '') + ' ' + defaultselectedItemStyle;
		let groupStyles =  (groupStyle || '') + ' ' + defaultGroupStyle;
		
		//let itemStyles =  (itemStyle || '') + ' ' + defaultItemStyle;
		let itemStyles = defaultItemStyle;
		
		return (<PickOneGroupBase styles={ { group : groupStyles , item : itemStyles , active :  selectedStyles } } selectedPid={selectedItem} 
					onSelect={onCheckItem}  > 
		
					{
						React.Children.map(this.props.children, (child ,i ) => {
							
							if(child.type.prototype === RadioBoxItemBase.prototype){
								 
								//let itemStyles =  (child.props.style || '');
								return (<PickOneItemBase key={i} pid={child.props.value} >  {child.props.children} </PickOneItemBase>);
							
							}
							
							return null;
					     })
					}
					
			</PickOneGroupBase>)
	}
}

RadioBoxGroupBase.defaultProps = {
	defaultGroupStyle : "radiobox_group",
	defaultselectedItemStyle : "active",
	defaultItemStyle : "radiobox_item"
}

/**

<RadioBoxGroupBase groupStyle="" selectedItemStyle="" onCheckItem={ ()=>{} }  selectedItem="" >
	
		<RadioBoxItemBase value="A" > hello 9 </RadioBoxItemBase>
		<RadioBoxItemBase value="B" > hello 8 </RadioBoxItemBase>
		<RadioBoxItemBase value="C" > hello 9 </RadioBoxItemBase>
		
</RadioBoxGroupBase>

<style>
 .customgroupname.radiobox_group{
 
 }
 
 .customgroupname.radiobox_group .radiobox_item{
 
 }
 
 .customgroupname.radiobox_group .radiobox_item.active{
 
 }
 </style>
 
*/


