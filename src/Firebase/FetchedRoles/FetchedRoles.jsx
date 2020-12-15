import React, { useState, useEffect} from "react"

import { users } from '../Firebase.utils';
import RolesSelectField from "../../RoleBasedAccessControl/AdminSection/RolesSelectField/RolesSelectField";

import "./FetchedRoles.css"

const FetchedRoles = (props) => {
  const [ defaultRole, updateDefaultRole ] = useState([]);
  
  useEffect(() => {
    const usersDB = users();
      usersDB.get()
   .then(function(querySnapshot) {
     querySnapshot.forEach(function(doc) {
       const objectKey = doc.data().id 
        const objectRole = doc.data().Role
        updateDefaultRole(prev => [...prev, {objectRole, objectKey} ])
     })
    })
    }, [props])
  
    const fetchRoles = (rowId) => {
    const data = defaultRole.filter(roles => roles.objectKey === rowId);
    if (data.length > 0) {
      return data[0].objectRole;
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
