import React, { useState, useEffect} from "react"

import { users } from './Firebase.utils';
import RolesSelectField from "../RoleBasedAccessControl/AdminSection/RolesSelectField/RolesSelectField";

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
      <table>
        <tbody>
          <tr>
            <td>      
              <input style={{width: "100%"}} type="text" disabled 
                value={fetchRoles(props.id) || ""}/>
            </td>
            <td>
              <RolesSelectField 
              getRoleValue={props.getRoleValue} 
              onClick={props.onClick}
              currentRole={props.currentRole}
              currentUser={props.currentUser}
              previousValue={defaultRole}/>  
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default FetchedRoles;
