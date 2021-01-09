import React from "react";

import "./InputField.css"

const TextField = (props) => {
  console.log(props)
  return (
    <div className="input-div">
      <p>{props.name}</p>
      <textarea 
        type="text" 
        id={props.id}
        name={props.statename}
        onChange={(e) => props.onChange(e.target.value, parseInt(e.target.id), (e.target.name))}
      ></textarea>
    </div>
  )
}

export default TextField;