import React, { useState } from "react";
// import { useHistory } from "react-router-dom";

import "./BackButton.css"

const BackButton = (props) => {
  const [button, setButton] = useState(null)
  const data = props.onClick

  return (
    <div className="back-button1">
      <button 
      onClick={() => setButton(data)}>
        Back
      </button>
    </div>
  )
}

export default BackButton;