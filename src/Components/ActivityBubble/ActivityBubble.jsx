import React, { useState, useEffect } from "react"

import "./ActivityBubble.css"
import FuelConsumptionImage from "../../Assets/gasStation.jpg";
import MachineRegistrationImage from "../../Assets/tractor.jpg";
import IrrigationImage from "../../Assets/irrigation.jpg";
import WorkingHoursImage from "../../Assets/workinghours.png"

const ActivityBubble = (props) => {
  const [ distance, upgradeDistance ] = useState("");
  const [ scroll, updateScroll ] =useState("")
  
  const stateProps = props.stateProps
  
  useEffect(() => {
    updateScroll(true)
   return() => {
      updateScroll(false)
   }
  }, [])

 let onScroll = () => {
   if (scroll === true)
    window.addEventListener('scroll', function scrollHandler () {
     const distanceToTop = document.body.getBoundingClientRect().top;
    upgradeDistance(distanceToTop)
   })
 }

  const handleClick = () => {
  props.onClick(props.id);
  }

  return (
    <button onClick={handleClick}
     onScroll={stateProps.outputTable !== true || stateProps.inputForms !== true ? onScroll() : null} 
       className="activity-bubble">
        <span className="span-img">
          {(distance < 0 && distance > -40 && props.id === 0) ? <img alt='' src={FuelConsumptionImage} className="image-scroll"/> : 
          (distance < -40 && distance > -80 && props.id === 1) ? <img alt='' src={MachineRegistrationImage} className="image-scroll"/> :
          (distance < -80 && distance > -120 && props.id === 2) ? <img alt='' src={IrrigationImage} className="image-scroll"/> :
          (distance < -120 && distance > -160 && props.id === 3) ? <img alt='' src={WorkingHoursImage} className="image-scroll"/> : props.children}
        </span>
    </button>
  )
}

export default ActivityBubble;