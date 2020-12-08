import React from "react"

import "./SelectActivity.css"

import ActivityBubble from "../Components/ActivityBubble/ActivityBubble"
import SelectReport from "./ReportsPage/SelectReport"
import InputSelection from "./InputPage/InputSelection"
// import { getFullDataFromFirebase } from "../Firebase/FetchDataFromFirebase"

const SelectActivity = (props) => {
    return (
    <div className="table-reports">
      {props.stateProps.inputMode ?
      <h2 className="headline">Input Form</h2> 
      : <h2 className="headline">Reports</h2>
      }

      {!props.stateProps.outputTable && !props.stateProps.inputForms ? 
          props.stateProps.activityBubbleState.map((activity, index) => (
          <ActivityBubble
          onClick={props.onClick}
          key={index}
          id={index}
          children={activity.name}/>
          ))  : null
      }
      
      {props.stateProps.inputForms ? 
      <InputSelection
        modal={props.modal}
        stateProps={props.stateProps}
        onClick={props.backButton}/> : null
      }

      {props.stateProps.outputTable ? 
        <SelectReport
        modal={props.modal}
        stateProps={props.stateProps}
        onClick={props.backButton}/> : null
      }
    </div>
  ) 
}

export default SelectActivity;