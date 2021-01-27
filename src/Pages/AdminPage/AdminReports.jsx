import React, { useState, useEffect } from "react";

// import Modal from "../../Components/Modal/Modal";
import ManagementReports from "./AdminTables/ManagementReports";
import UsersData from "./UsersData/UsersData";
import SelectionFieldsUpdate from "./SelectFieldsData/SelectFieldsData"

const AdminReports = (props) => {
    
  const [modeChange, setModeChange] = useState('');
 useEffect(() => {
   setModeChange(props.stateProps.outputMode)
 }, [props.stateProps.outputMode])

//  const moduleInProgress = <Modal show={props.modal} hide={props.modal}>
//    Module Still Not Built</Modal> 
  //  const errorModal = table.length === 0 || table === undefined ? <Modal show={props.stateProps.hideModal} 
  //   hide={props.modal}>User has no authorization to read data{error}</Modal> : null
    
    return (
   <div className="table-reports">

      {props.stateProps.selectedActivity === 0 && props.stateProps.adminSection ?
      <UsersData stateProps={props.stateProps} onClick={props.onClick}/> : null}
      
      {props.stateProps.selectedActivity === 1 ||
      props.stateProps.selectedActivity === 2  || 
      props.stateProps.selectedActivity === 3  ||
      props.stateProps.selectedActivity === 4 ? 
      <ManagementReports 
          stateProps={props}
          modeChange={modeChange}
          onClick={props.onClick}/> : null }
      
      {props.stateProps.selectedActivity === 5 ? <SelectionFieldsUpdate 
      stateProps={props.stateProps} onClick={props.onClick}/> : null}
      
    </div>
  ) 
}

export default AdminReports;