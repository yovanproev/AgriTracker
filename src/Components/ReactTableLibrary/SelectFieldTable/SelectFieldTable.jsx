import React from "react"
import { updateAuthUsers } from "../../../Firebase/UpdateRowsInRealtimeDB"
import {fetchStatusOfPurchase} from "../../../LocalData/InputFormsData"
import { getDateAndTime } from "../../../Pages/InputPage/DBObjectElements/GetDateTime"

import "./SelectFieldTable.css"

const SelectFieldTable = ({onChange, value, onFocus, id, stateProps, nameOfStatus}) => {
  const status = fetchStatusOfPurchase()

  const recordTrace = () => {
    updateAuthUsers({ PurchaseRequestStatus: id + ", " + nameOfStatus + ", " + getDateAndTime()}, 
      stateProps)
    }
    
  return (
      <div >
        <select className="select-div-table"
          onChange={(e) => onChange(parseInt(e.target.value))}
          // value={value ? value : ""}
          onFocus={onFocus}
          onBlur={() => recordTrace()}
          id={id}
          
          >
          <option key={0} value={0}> Select status </option>
          {status.map((fields) => (
            <option key={fields.id} value={fields.id}>
            {fields.name} 
            </option>
            )) }
        </select>
      </div>
    )
  
}

export default SelectFieldTable;