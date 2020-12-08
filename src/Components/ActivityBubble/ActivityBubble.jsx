import React from "react"

import "./ActivityBubble.css"

const ActivityBubble = (props) => {

  const handleClick = () => {
  props.onClick(props.id);
  }

  return (
    <button onClick={handleClick} 
       className="activity-bubble">
        <span>
          {props.children}
        </span>
    </button>
  )
}

export default ActivityBubble;