import React, { useState, useEffect } from "react"

import "./RolesSelectField.css"
import { fetchAllRoles } from "../../../LocalData/InputFormsData"

const RolesSelectField = (props) => {
  
  const [ fetchRoles, setFetchRoles ] = useState([])
  
  useEffect(() => {
    setFetchRoles(fetchAllRoles()) 
  }, [])
  // console.log(props.currentRole)
   return (
     <div>
       <select className="roles-select-div"
          onChange={e => {props.getRoleValue(e.target.value)}}
          onFocus={props.onClick()}
         >
          <option key={0} value={props.defaultRole}>
            {"Select a role"}
          </option>
          {fetchRoles.map((fields) => (
          <option key={fields.id} value={fields.name}>
          {fields.name} 
          </option>)) 
          }  
        </select>
      </div>
    )
  
}

export default RolesSelectField;