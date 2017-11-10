import React from 'react';
import PickMultiGroupBase, { PickItemBase } from '../base/PickMultiGroupBase';

export class CheckBoxItemBase extends React.Component{
	
	//Dummy div code...
	
	render(){
		return(<div> {this.props.children} </div>)
	}
}

export default class CheckBoxGroupBase extends React.Component {
	
	render() {
		
		let { 
			selectedItems,
			selectedItemStyle,
			groupStyle,
			onCheckItem,
			
			defaultGroupStyle,
			defaultselectedItemStyle
			
		} = this.props;
		
		let selectedStyles =  (selectedItemStyle || '') + ' ' + defaultselectedItemStyle;
		let groupStyles =  (groupStyle || '') + ' ' + defaultGroupStyle;
		
		//let itemStyles =  (itemStyle || '') + ' ' + defaultItemStyle;
		let itemStyles = this.props.defaultItemStyle;
		
		
		return (<PickMultiGroupBase 
				 styles={ { group : groupStyles , item : itemStyles , active :  selectedStyles } } 
				 selectedPids={ selectedItems || [] } 
				 onSelect={onCheckItem}  > 
		
					{
						React.Children.map(this.props.children, (child ,i ) => {
							
							if(child.type.prototype === CheckBoxItemBase.prototype){
								 
								//let itemStyles =  (child.props.styles || '') + ' ' + this.props.defaultItemStyle;
								return (<PickItemBase key={i} pid={child.props.value} >  {child.props.children} </PickItemBase>);
							
							}
							
							return null;
					     })
					}
					
			</PickMultiGroupBase>)
	}
}

CheckBoxGroupBase.defaultProps = {
	defaultGroupStyle : "checkbox_group",
	defaultselectedItemStyle : "active",
	defaultItemStyle : "checkbox_item"
}

/**
 
 <CheckBoxGroupBase groupStyle="" selectedItemStyle="" onCheckItem={ ()=>{} }  selectedItems={[]}   >
 	
 		<CheckBoxItemBase value="A" > hello 9 </CheckBoxItemBase>
 		<CheckBoxItemBase value="B" > hello 8 </CheckBoxItemBase>
 		
 </CheckBoxGroupBase>
 
 <style>
 .customgroupname.checkbox_group{
 
 }
 
 .customgroupname.checkbox_group .checkbox_item{
 
 }
 
 .customgroupname.checkbox_group .checkbox_item.active{
 
 }
 </style>
 */


