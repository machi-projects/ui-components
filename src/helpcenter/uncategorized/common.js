export function bind(...handlers){
	handlers.forEach(handler =>{
		this[handler] = this[handler].bind(this)})
}
export function formatValue(values= [],valueField= "id",textField= "name"){
  return (values && values.map((value)=>{
    let formattedValue= value;
    if(typeof(value) === "string" || typeof(value) === "number" )
    {
      formattedValue= {};
      formattedValue[valueField]= value;
      formattedValue[textField]= value;
    }
    return formattedValue;
  })) || [];

}
