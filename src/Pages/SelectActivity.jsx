import React, { useState, useEffect} from "react"

import "./SelectActivity.css"

import ActivityBubble from "../Components/ActivityBubble/ActivityBubble"
import SelectReport from "./ReportsPage/SelectReport"
import InputSelection from "./InputPage/InputSelection"

const SelectActivity = (props) => {
  const [ distance, upgradeDistance ] = useState("");
  
  useEffect(()=>{
    onScroll()
  }, [])
  
 const onScroll = () => 
   window.addEventListener('scroll', function scrollHandler () {
    const distanceToTop = document.body.getBoundingClientRect().top;
    upgradeDistance(distanceToTop)
  })

 return (
    <div className="table-reports">
      {props.stateProps.inputMode ?
      <h2 className="headline">Input Form</h2> 
      : <h2 className="headline">Reports</h2>}
     
      {!props.stateProps.outputTable && !props.stateProps.inputForms ? 
          props.stateProps.activityBubbleState.map((activity, index) => (
          <ActivityBubble
          onClick={props.onClick}
          onScroll={onScroll}
          distance={distance}
          key={index}
          id={index}
          children={activity.name}/>
          )) : null
      }
           
      {props.stateProps.inputForms ? 
      <InputSelection
        tokenId={props.tokenId}
        email={props.email}
        modal={props.modal}
        stateProps={props.stateProps}
        onClick={props.backButton}/> : null
      }

      {props.stateProps.outputTable ? 
        <SelectReport
        tokenId={props.tokenId}
        email={props.email}
        modal={props.modal}
        stateProps={props.stateProps}
        onClick={props.backButton}/> : null
      }
    </div>
  ) 
}

export default SelectActivity;