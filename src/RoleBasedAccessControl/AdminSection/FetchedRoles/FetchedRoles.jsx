import React, { useState, useEffect} from "react"

import { getAllUsers } from "../../../Firebase/FetchUsersFromFirestore"
import RolesSelectField from "../RolesSelectField/RolesSelectField";

import "./FetchedRoles.css"

const FetchedRoles = (props) => {
  const [ assignedRole, updateAssignedRole ] = useState([]);
  
  useEffect(() => {
    getAllUsers().then(resolve => {
      updateAssignedRole(resolve)
    })
  }, [props])

  const fetchRoles = (rowId) => {
    const data = assignedRole.filter(roles => roles.id === rowId);
    if (data.length > 0) {
      return data[0].Role;
    } else {
      return data;
    }
  }
  
  return (
    <span>
      <input className="fetched-roles-input" type="text" disabled 
        value={fetchRoles(props.id) || ""}/>
            
      <RolesSelectField 
        id={props.id}
        getRoleValue={props.getRoleValue} 
        onFocus={props.onFocus}
        currentRole={props.currentRole}
        currentUser={props.currentUser}
        previousValue={fetchRoles(props.id)}/>  
    </span>
  )
}

export default FetchedRoles;
