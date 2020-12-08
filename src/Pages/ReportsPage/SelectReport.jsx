import React, { useState, useEffect } from "react";
import Modal from "../../Components/Modal/Modal";

import { getFullDataFromFirebase } from "../../Firebase/FetchDataFromFirebase";
import { firebase_db, firebase_db_fuelConsump, firebase_db_machineReg } from '../../Firebase/Firebase.utils';

import TableReport from "./TableReports/TableReport"

const SelectReport = (props) => {
  const [ table, setTable ] = useState([])
  const [ fetchError, setFetchError ] = useState("")

  useEffect(() => {
       // if (props.stateProps != null) {
        const fullData = getFullDataFromFirebase(props)
        fullData.then(res => setTable(res))
       .catch((err) => {
         setFetchError(err)
       });
 }, [props]);
  
 const [modeChange, setModeChange] = useState('');
 useEffect(() => {
   setModeChange(props.stateProps.outputMode)
 }, [props.stateProps.outputMode])

//  console.log(props.stateProps.outputMode)

 const deleteRowHandler = (rowId) => {
    const rows = table.filter((row) => row.id !== rowId);
    
     let db = firebase_db.ref();
     if (props.stateProps.index1) {
     let query = firebase_db_fuelConsump.orderByKey();
     query.once("value")
       .then(function(snapshot) {
         snapshot.forEach(function(childSnapshot) {
         let randomKeyOnObject = childSnapshot.key
         let objectId = childSnapshot.val().id
         if(rowId === objectId) {
          db.child("fuelConsumptionInput/"+randomKeyOnObject).remove();
          return true}
         })
        })
      }
      else if (props.stateProps.index2) {
        let query = firebase_db_machineReg.orderByKey();
        query.once("value")
          .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
            let randomKeyOnObject = childSnapshot.key
            let objectId = childSnapshot.val().id
            if(rowId === objectId) {
             db.child("machineRegistrationInput/"+randomKeyOnObject).remove();
             return true}
            })
           })
         }
  setTable(rows) 
}

 const moduleInProgress = <Modal show={props.stateProps.hideModal} hide={props.modal}>
   Module Still Not Built</Modal> 
 const errorInProgress = <Modal show={fetchError} hide={props.modal}>
   Error fetching data from Database, please check your Internet connection</Modal> 

// console.log(table)
   return (
   <div className="table-reports">
      {errorInProgress}
      {props.stateProps.index3 || 
      props.stateProps.index4 ? moduleInProgress :
      < TableReport
        stateProps={props}
        modeChange={modeChange}
        deleteRowHandler={deleteRowHandler} 
        tableData={table}
        onClick={props.onClick}/> }
    </div>
  ) 
}

export default SelectReport;