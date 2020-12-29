import React from "react"

import "./ActivityBubble.css"
import FuelConsumptionImage from "../../Assets/gasStation.jpg";
import MachineRegistrationImage from "../../Assets/tractor.jpg";
import IrrigationImage from "../../Assets/irrigation.jpg";
import WorkingHoursImage from "../../Assets/workinghours.png"

const ActivityBubble = (props) => {

  const handleClick = () => {
  props.onClick(props.id);
  }

  return (
    <button onClick={handleClick}
     onScroll={() => props.onScroll()} 
       className="activity-bubble">
        <span className="span-img">
          {(props.distance < 0 && props.distance > -40 && props.id === 0) ? <img alt='' src={FuelConsumptionImage} className="image-scroll"/> : 
          (props.distance < -40 && props.distance > -80 && props.id === 1) ? <img alt='' src={MachineRegistrationImage} className="image-scroll"/> :
          (props.distance < -80 && props.distance > -120 && props.id === 2) ? <img alt='' src={IrrigationImage} className="image-scroll"/> :
          (props.distance < -120 && props.distance > -160 && props.id === 3) ? <img alt='' src={WorkingHoursImage} className="image-scroll"/> : props.children}
        </span>
    </button>
  )
}

export default ActivityBubble;