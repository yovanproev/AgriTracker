import React, { useState, useEffect} from "react"

import { getAllUsers } from "../../../src/Firebase/FetchUsersFromFirestore"
import RolesSelectField from "./RolesSelectField/RolesSelectField";

import "./AdminTableElements.css"

const AdminTableElements = (props) => {
  const [ assignedRole, updateAssignedRole ] = useState([]);
  
  useEffect(() => {
    getAllUsers().then(resolve => {
       updateAssignedRole(resolve)
    })
  }, [])

  const fetchRoles = (rowId) => {
    const data = assignedRole.filter(roles => roles.id === rowId);
    if (data.length > 0) {
      return data[0].role;
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
        onFocus={() => props.onClick()}
        currentRole={props.currentRole}
        currentUser={props.currentUser}
        previousValue={fetchRoles(props.id)}/>  
    </span>
  )
}

export default AdminTableElements;
