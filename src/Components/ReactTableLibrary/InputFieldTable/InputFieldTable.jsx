import React from "react"
import { updateAuthUsers } from "../../../Firebase/UpdateRowsInRealtimeDB"
import { getDateAndTime } from "../../../Pages/InputPage/DBObjectElements/GetDateTime"

import "./InputFieldTable.css"

const InputFieldTable = ({onChange, value, onFocus, id, stateProps, nameOfStatus, purchaseMode}) => {
  
  const recordTrace = () => {
    updateAuthUsers({ PurchaseRequestStatus: id + ", " + nameOfStatus + ", " + getDateAndTime()}, 
      stateProps)
    }
    
  return (
      <div >
        {stateProps.selectedActivity === 0 && purchaseMode === "Purchase" ? 
        <input className="text-input-reports" type="number"
         placeholder="Price per liter"
          onChange={(e) => onChange(e.target.value)}
          // value={value ? value : ""}
          onFocus={onFocus}
          onBlur={() => recordTrace()}
          id={id}>
          </input> 
        : <textarea className="text-input-reports" type="text"
         onChange={(e) => onChange(e.target.value)}
          // value={value ? value : ""}
          onFocus={onFocus}
          onBlur={() => recordTrace()}
          id={id}>
          </textarea>}
      </div>
    )
  
}

export default InputFieldTable;