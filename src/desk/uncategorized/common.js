export function bind(...handlers){
	handlers.forEach(handler =>{
		this[handler] = this[handler].bind(this)})
}

export function formatValue(values= [],valueField,textField){
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

export function getSelectedValue(values=[],valueField){
	
	return values.map((obj, index) => {
		
		return obj[valueField];
	});
	
}

export function formatSelectedValue(options=[],value,valueField,textField) {
	let selected = value, count = 0, selectedOptName = value;

	let formatedOptions = options.map((opt, index) => {
		let val = opt,
			name = opt;
		if (typeof opt == 'object') {
			val = opt[valueField];
			name = opt[textField];
		}

		if (value == val) {
			selected = val;
			count = index;
			selectedOptName = name;
		}
	});
	return { selected, count, selectedOptName, formatedOptions , options };
};