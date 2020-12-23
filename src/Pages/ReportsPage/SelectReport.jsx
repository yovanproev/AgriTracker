import React, { useState, useEffect } from "react";
import Modal from "../../Components/Modal/Modal";

import { getPaginatedTableData, nextPage, previousPage, counter } from "../../Firebase/FetchDataFromRealtimeDB";
import { deleteByRowId } from "../../Firebase/deleteRowHandlerRealtimeDB"

import TableReport from "./TableReport/TableReport"

const SelectReport = (props) => {
  const [ table, setTable ] = useState([])
  const [ blockNextButton, updateBlockNextButton ] = useState(undefined)
  
  function nextPageLoad(){
    const nextPageCount = nextPage();
    getPaginatedTableData(0, nextPageCount, props).then((fullData)=>{
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
    getPaginatedTableData(0, previousPageCount, props).then((fullData)=>{
      const fullDataArray=[]
      Object.keys(fullData).forEach((key)=>{
        fullDataArray.push(fullData[key]);
      })
    updateBlockNextButton(fullDataArray.length > counter ? true : false)
    setTable(fullDataArray)
    })
  }

  useEffect(() => {
          getPaginatedTableData(0, 10, props).then((fullData)=>{
            const fullDataArray=[]
            Object.keys(fullData).forEach((key)=>{
              fullDataArray.push(fullData[key]);
            })
        // console.log(fullDataArray);
        setTable(fullDataArray)
        })
  }, [props]);

 const [modeChange, setModeChange] = useState('');
 useEffect(() => {
   setModeChange(props.stateProps.outputMode)
 }, [props.stateProps.outputMode])

 const deleteRowHandler = (rowId) => {
    const rows = table.filter((row) => row.id !== rowId);
    deleteByRowId(rowId, props)
    setTable(rows) 
  }

 const moduleInProgress = <Modal show={props.stateProps.hideModal} hide={props.modal}>
   Module Still Not Built</Modal> 
  
 const errorModal = table.length === 0 ? <Modal show={props.stateProps.hideModal} 
    hide={props.modal}>User has no authorization to read data.</Modal> : null
    
    return (
   <div className="table-reports">
       {errorModal}
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