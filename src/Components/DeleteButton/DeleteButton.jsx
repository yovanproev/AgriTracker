import React from "react";

import "./DeleteButton.css"

const DeleteButton = (props) => {
  return (
    <div className="delete-button">
      <button 
      onClick={props.onClick}>
        Delete
      </button>
    </div>
  )
}

export default DeleteButton;