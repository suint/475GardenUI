import React from 'react';


const Input = (props: any) => {
	//console.log(props.value);
	return (  
  <div className="form-group">
    {(String(props.name)!= 'length' && String(props.name)!='width') &&
    <label htmlFor={props.name} className="form-label">{props.title}</label>}
    <input
      className="form-control"
      id={props.name}
      name={props.name}
      type={props.inputType}
      value={props.value}
      onChange={props.handleChange}
      placeholder={props.placeholder} 
      {...props} />
  </div>
)
}

export default Input;