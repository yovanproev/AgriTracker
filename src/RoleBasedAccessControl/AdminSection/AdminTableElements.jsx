import React from "react"

import RolesSelectField from "./RolesSelectField/RolesSelectField";

import "./AdminTableElements.css"

const AdminTableElements = (props) => {
  return (
    <span>
      <RolesSelectField 
        id={props.id}
        getRoleValue={props.getRoleValue} 
        getRowId={() => props.onClick()}/>  
    </span>
  )
}

export default AdminTableElements;
