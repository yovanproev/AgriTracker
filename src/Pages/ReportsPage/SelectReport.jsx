import React, { useState, useEffect } from "react";
import Modal from "../../Components/Modal/Modal";
import Spinner2 from "../../Components/Spinners/Spinner2"

import { getPaginatedTableData, nextPage, previousPage, counter } from "../../Firebase/FetchDataFromRealtimeDB";
import { deleteByRowId } from "../../Firebase/DeleteRowsInRealtimeDB"
import { updateByRowId } from "../../Firebase/UpdateRowsInRealtimeDB";

import TableReport from "./TableReport/TableReport"
import { fetchStatusOfPurchaseByName } from "../../LocalData/InputFormsData"

const SelectReport = (props) => {
  const [ table, setTable ] = useState([])
  const [ blockNextButton, updateBlockNextButton ] = useState(undefined)
  const [ error, setError ] = useState(false)
 
  const errorOnDB = () => {
    setError(true)
  }

   function nextPageLoad(){
    const nextPageCount = nextPage(props);
    getPaginatedTableData(0, nextPageCount, props, errorOnDB).then((fullData)=>{
      let fullDataArray=[]
      Object.keys(fullData).forEach((key)=>{
        fullDataArray.push(fullData[key]);
      })
      // console.log(counter)
      // console.log(fullDataArray.length)
      updateBlockNextButton(fullDataArray.length < counter ? true : false )
    setTable(fullDataArray)
    })
  }

  function previousPageLoad(){
    const previousPageCount = previousPage(props);
    getPaginatedTableData(0, previousPageCount, props, errorOnDB).then((fullData)=>{
      let fullDataArray=[]
      Object.keys(fullData).forEach((key)=>{
        fullDataArray.push(fullData[key]);
      })
      // console.log(counter)
    updateBlockNextButton(fullDataArray.length > counter ? true : false)
    setTable(fullDataArray)
    })
  }

  useEffect(() => {
        getPaginatedTableData(0, 10, props, errorOnDB).then((fullData)=>{
            if (fullData === null) {errorOnDB()}
            else {let fullDataArray=[]
            Object.keys(fullData).forEach((key)=>{
              fullDataArray.push(fullData[key]);
            })
            setTable(fullDataArray)}
        })
  }, [props]);

 const deleteRowHandler = (rowId, numberOfEmployee, numberOfJob) => {
    const rows = table.filter((row) => row.id !== rowId);
    deleteByRowId(rowId, props, numberOfEmployee, numberOfJob)
    setTable(rows) 
  }

  // get the table row number 
  const [ rowIdValue, setRowId ] = useState(undefined);
  const onClickRowId = (rowId) => {
    if (rowId.id !== undefined) setRowId(rowId.id)
    else return 0
  }

  const [ statusHandler, updateStatusHandler ] = useState("")
  const updateDataByRowHandler = (value) => {
    updateStatusHandler(value)
    const update = {statusOfRequest: fetchStatusOfPurchaseByName(value)}
    updateByRowId(rowIdValue, props, null, null, update)
  }
    
  //  const moduleInProgress = <Modal show={props.modal} hide={props.modal}>
//    Module Still Not Built</Modal> 
   const loader = table.length === 0 || table === undefined ? 
   <Modal show={props.stateProps.hideModal} hide={props.modal}><Spinner2 /></Modal> : null
  
   const errorModal = <Modal show={error} 
    hide={props.modal}>User has no authorization to read data or no data in the DB.</Modal>

    return (
    <div className="table-reports">
      {errorModal}
      {props.stateProps.selectedActivity && error === false ? loader : null}
      {/* {props.stateProps.selectedActivity === 4 ? moduleInProgress : null} */}
      < TableReport 
        blockNextButton={blockNextButton}
        counter={counter}
        nextPageLoad={nextPageLoad}
        previousPageLoad={previousPageLoad}
        stateProps={props}
        deleteRowHandler={deleteRowHandler} 
        tableData={table}
        onClick={props.onClick}
        updateDataByRowHandler={updateDataByRowHandler}
        statusHandler={statusHandler}
        onClickRowId={onClickRowId}/>         
    </div>
  ) 
}

export default SelectReport;