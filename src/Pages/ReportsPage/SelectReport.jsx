import React, { useState, useEffect } from "react";
import Modal from "../../Components/Modal/Modal";
import Spinner2 from "../../Components/Spinners/Spinner2"

import { getPaginatedTableData, nextPage, previousPage, counter } from "../../Firebase/FetchDataFromRealtimeDB";
import { deleteByRowId } from "../../Firebase/DeleteRowsInRealtimeDB"
import { updateByRowId } from "../../Firebase/UpdateRowsInRealtimeDB";

import TableReport from "./TableReport/TableReport"
import { fetchStatusOfPurchaseByName } from "../../LocalData/InputFormsData"
import { getSelectFields } from "../../Firebase/FetchCollectionsFromFirestore";

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
      updateBlockNextButton(fullDataArray.length > counter ? true : false)
    setTable(fullDataArray)
    })
  }

  const [ categorySelectField, updateCategorySelectField ] = useState([]);
  const [ subcategorySelectField, updateSubcategorySelectField ] = useState([]);
  useEffect(() => {
        getPaginatedTableData(0, 10, props, errorOnDB).then((fullData)=>{
          //console.log(fullData)  
          if (fullData === null || fullData === undefined) {errorOnDB()}
            else {let fullDataArray=[]
            Object.keys(fullData).forEach((key)=>{
              fullDataArray.push(fullData[key]);
            })
            setTable(fullDataArray)}
        })

        getSelectFields(16).then(category => updateCategorySelectField(category))
        getSelectFields(17).then(category => updateSubcategorySelectField(category))
  }, [props]);
    
 const deleteRowHandler = (rowId, numberOfEmployee, numberOfJob, numberOfItem, parentId) => {
  const rows = props.stateProps.selectedActivity === 3 ? (Object.values(table).filter(x => x.id !== rowId)) :
  props.stateProps.selectedActivity === 4 ? (Object.values(table)[0]?.filter(x => x.id !== rowId)) :
   table.filter((row) => row.id !== rowId);

    deleteByRowId(rowId, props, numberOfEmployee, numberOfJob, numberOfItem, parentId)
    setTable(rows) 
  }

  // get the table row number 
  const [ rowIdValue, setRowId ] = useState(undefined);
  const [ numberOfItem, setNumberOfItem ] = useState(undefined);
 
  const onClickRowId = (rowId, numberOfItem) => {
    if (rowId.id !== undefined) {
    setRowId(rowId.id)
    setNumberOfItem(numberOfItem)
    }
    else return 0
  }

  const [ fuelPrice, updateFuelPrice ] = useState("")
  const updateFuelPriceHandler = (value) => {
    updateFuelPrice(value)
    const update = {pricePerLiter: value}
    updateByRowId(rowIdValue, props.stateProps, null, null, update, null, errorOnDB, null)
  }

  const [ statusHandler, updateStatusHandler ] = useState("")
  const updateStatusOfPurchaseRequestHandler = (value) => {
    updateStatusHandler(value)
    const update = {statusOfRequest: fetchStatusOfPurchaseByName(value)}
    updateByRowId(rowIdValue, props.stateProps, null, null, update, null, errorOnDB, numberOfItem)
  }
   
  const [ purchaseNumber, updatePurchaseNumber ] = useState("")
  const updatePRNumByRow = (value) => {
    updatePurchaseNumber(value)
    const update = {PRNumber: value}
    updateByRowId(rowIdValue, props.stateProps, null, null, update,null, errorOnDB, numberOfItem)
  }

  const [ invoiceNumber, updateInvoiceNumber ] = useState("")
  const updateInvoiceNumByRow = (value) => {
     updateInvoiceNumber(value)
    const update = {invoiceNum: value}
    updateByRowId(rowIdValue, props.stateProps, null, null, update, null, errorOnDB, numberOfItem)
  }

  const [ categoryOfMaterials, updateCategoryOfMaterials ] = useState("")
  const updateCategoryOfMaterialsByRow = (value) => {
    updateCategoryOfMaterials(value)
    console.log(value)
    const filtered = categorySelectField.filter(x => x.id === (value))
    const update = {category: filtered[0]?.name}
    if (value !== 0)
    updateByRowId(rowIdValue, props.stateProps, null, null, update, null, errorOnDB, numberOfItem)
  }

  const [ subcategoryOfMaterials, updateSubcategoryOfMaterials ] = useState("")
  const updateSubcategoryOfMaterialsByRow = (value) => {
    updateSubcategoryOfMaterials(value)
    const filtered = subcategorySelectField.filter(x => x.id === (value))
    const update = {subcategory: filtered[0].name}
    updateByRowId(rowIdValue, props.stateProps, null, null, update, null, errorOnDB, numberOfItem)
  }
 
   //  const moduleInProgress = <Modal show={props.modal} hide={props.modal}>
//    Module Still Not Built</Modal> 
   const loader = table.length === 0 || table === undefined ? 
   <Modal show={props.stateProps.hideModal} hide={props.modal}><Spinner2 /></Modal> : null
  
   const errorModal = <Modal show={error} 
    hide={props.modal}>User has no authorization to read data or no data in the DB.</Modal>
// console.log(selectField)
    return (
    <div className="table-reports">
      {errorModal}
      {props.stateProps.selectedActivity && error === false ? loader : null}
      {/* {props.stateProps.selectedActivity === 4 ? moduleInProgress : null} */}
      < TableReport
        updateFuelPriceHandler={updateFuelPriceHandler}
        fuelPrice={fuelPrice}
        subcategorySelectField={subcategorySelectField}
        categorySelectField={categorySelectField}
        updateSubcategoryOfMaterialsByRow={updateSubcategoryOfMaterialsByRow}
        subcategoryOfMaterials={subcategoryOfMaterials}
        updateCategoryOfMaterialsByRow={updateCategoryOfMaterialsByRow}
        categoryOfMaterials={categoryOfMaterials} 
        outputMode={props.outputMode}
       blockNextButton={blockNextButton}
       counter={counter}
        nextPageLoad={nextPageLoad}
        previousPageLoad={previousPageLoad}
        stateProps={props}
        deleteRowHandler={deleteRowHandler} 
        tableData={table}
        onClick={props.onClick}
        updateStatusOfPurchaseRequestHandler={updateStatusOfPurchaseRequestHandler}
        statusHandler={statusHandler}
        onClickRowId={onClickRowId}
        updatePRNumByRow={updatePRNumByRow}
        purchaseNumber={purchaseNumber}
        updateInvoiceNumByRow={updateInvoiceNumByRow}
        invoiceNumber={invoiceNumber}
        errorOnDB={errorOnDB}
        />         
    </div>
  ) 
}

export default SelectReport;