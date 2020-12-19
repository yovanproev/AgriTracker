import React, { useState, useEffect } from "react";
import Modal from "../../Components/Modal/Modal";

import { getPaginatedTableData, nextPage, previousPage, counter } from "../../Firebase/FetchDataFromFirebase";
import { firebase_db, firebase_db_fuelConsump, firebase_db_machineReg } from '../../Firebase/Firebase.utils';

import TableReport from "./TableReport/TableReport"

const SelectReport = (props) => {
  const [ table, setTable ] = useState([])
  const [ fetchError, setFetchError ] = useState("")
  const [ blockNextButton, updateBlockNextButton ] = useState(undefined)

  function nextPageLoad(){
    const nextPageCount = nextPage();
    getPaginatedTableData(0, nextPageCount).then((fullData)=>{
      const fullDataArray=[]
      Object.keys(fullData).forEach((key)=>{
        fullDataArray.push(fullData[key]);
      })
    updateBlockNextButton(fullDataArray.length < counter ? true : false)
    setTable(fullDataArray)
    })
  }

  function previousPageLoad(){
    const previousPageCount = previousPage();
    getPaginatedTableData(0, previousPageCount).then((fullData)=>{
      const fullDataArray=[]
      Object.keys(fullData).forEach((key)=>{
        fullDataArray.push(fullData[key]);
      })
    setTable(fullDataArray)
    })
  }

  useEffect(() => {
          getPaginatedTableData(0, 10).then((fullData)=>{
            const fullDataArray=[]
            Object.keys(fullData).forEach((key)=>{
              fullDataArray.push(fullData[key]);
            })
        // console.log(fullDataArray);
        setTable(fullDataArray)
        updateBlockNextButton(fullDataArray.length < counter ? true : false)
       })
  }, []);

 const [modeChange, setModeChange] = useState('');
 useEffect(() => {
   setModeChange(props.stateProps.outputMode)
 }, [props.stateProps.outputMode])

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

   return (
   <div className="table-reports">
      {errorInProgress}
      {props.stateProps.index3 || 
      props.stateProps.index4 ? moduleInProgress :
      < TableReport
        blockNextButton={blockNextButton}
        counter={counter}
        nextPageLoad={nextPageLoad}
        previousPageLoad={previousPageLoad}
        stateProps={props}
        modeChange={modeChange}
        deleteRowHandler={deleteRowHandler} 
        tableData={table}
        onClick={props.onClick}/> }
    </div>
  ) 
}

export default SelectReport;