import React, { useState, useEffect} from "react"

import { users } from '../../../Firebase/Firebase.utils';
import FetchedRoleToInputField from "./FetchedRoleFromBackEnd"
// import RolesSelectField from "./RolesSelectField/RolesSelectField"

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
     <div>
        <FetchedRoleToInputField
            value={fetchRoles(props.id)}/>
        </div>
    )
  
}

export default FetchedRoles;
