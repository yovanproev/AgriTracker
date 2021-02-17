import React, { useState, useEffect } from "react"
import Tooltip  from "../../../Components/ToolTip/ToolTip"

import "./RolesSelectField.css"
import { fetchAllRoles } from "../../../../src/LocalData/InputFormsData"
import { getDateAndTime } from "../../../Pages/InputPage/DBObjectElements/GetDateTime"
import { updateAuthUsers } from "../../../Firebase/UpdateRowsInRealtimeDB"

const RolesSelectField = (props) => {
  
  const [ fetchRoles, setFetchRoles ] = useState([])
  useEffect(() => {
    setFetchRoles(fetchAllRoles()) 
  }, [])
    
  const [ openTooltip, updateOpenTooltip ] = useState(false)

  const users = "user:"

  const recordTrace = () => {
    updateAuthUsers({ changedRole: users + props.stateProps.email + ", " + getDateAndTime()}, 
      props.stateProps)
  }

  return (
     <span>
       
       <select className="roles-select-div"
          onBlur={(e) => {props.getRoleValue(e.target.value); recordTrace()}}
          onChange={() => {props.getRowId(); updateOpenTooltip(()=> true)}}
          disabled={props.id === parseInt(1) || props.id === parseInt(2) ? true : null}
         >
          <option key={0} value={"Please select a role"}>
            {"Select a role"}
          </option>
          {fetchRoles.map((fields) => (
          <option key={fields.id} value={fields.name}>
          {fields.name} 
          </option>)) 
          }  
        </select>
        {openTooltip === true ? <Tooltip open={openTooltip} /> : null}
      </span>
    )
  
}

export default RolesSelectField;