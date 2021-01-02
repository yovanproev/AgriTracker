import React from "react";

import "./InputField.css"

const TextField = (props) => {
  return (
    <div className="input-div">
      <p>{props.name}</p>
      <textarea 
        type="text" 
        id={props.id}
        onChange={(e) => props.onChange(e.target.value, parseInt(e.target.id))}
      ></textarea>
    </div>
  )
}

export default TextField;