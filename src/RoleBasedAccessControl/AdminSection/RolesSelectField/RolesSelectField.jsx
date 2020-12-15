import React, { useState, useEffect } from "react"
import Tooltip  from "../../../Components/ToolTip/ToolTip"

import "./RolesSelectField.css"
import { fetchAllRoles } from "../../../LocalData/InputFormsData"

const RolesSelectField = (props) => {
  
  const [ fetchRoles, setFetchRoles ] = useState([])
  useEffect(() => {
    setFetchRoles(fetchAllRoles()) 
  }, [])
    
  const [ openModal, setOpenModal ] = useState(false)

  return (
     <span>
       
       <select className="roles-select-div"
          onChange={(e) => {props.getRoleValue(e.target.value); setOpenModal(() => true)}}
          onFocus={props.onFocus()}
          disabled={props.id === parseInt(6) || props.id === parseInt(4) ? true : null}
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
        {openModal === true ? <Tooltip open={openModal} /> : null}
      </span>
    )
  
}

export default RolesSelectField;