import React, { useEffect, useState } from 'react';

import './TableReport.css';

import { ExportCSV } from './ExcelExport/ExcelExport'
import Table from "../../../Components/ReactTableLibrary/Table"

import { resetCounter } from "../../../Firebase/FetchDataFromRealtimeDB"
import BackButton from '../../../Components/BackButton/BackButton';
import Calendar from '../../../Components/Calendar/Calendar';
import { getFilteredDataForExport } from '../../../Firebase/FetchFilteredDataForExportFromRealtimeDB';
import { addZero } from '../../InputPage/DBObjectElements/GetDateTime';

const TableReport = (props) => {
  //name of the excel file
  const [ name, setName ] = useState(null)

  function handleChange(rowId, numberOfEmployee, numberOfJob, numberOfItem, parentId) {
    // Here, we invoke the callback with the new value
    props.deleteRowHandler(rowId, numberOfEmployee, numberOfJob, numberOfItem, parentId);
  }

  // produce table for excel export
  const [ excelData, updateExcelData ] = useState([]) 

  // fetch dates for excel export
  const [ startingDate, updateStartingDate ] = useState([])
  const [ endDate, updateEndDate ] = useState([])
  
  const fetchFilteredDateForExport = (startingDate, endDate) => {
   updateStartingDate(startingDate)
   updateEndDate(endDate)
  }

  useEffect(() => {
    setName(props.stateProps.stateProps.activityBubbleState[props.stateProps.stateProps.selectedActivity]?.name)
    
    const getStartingDate = () => {
      const startingDay = startingDate?.length !== 0 ? addZero(startingDate?.getDate()) : null
      const startingMonth = startingDate?.length !== 0 ? addZero(startingDate?.getMonth()+1) : null
      const startingYear = startingDate?.length !== 0 ? addZero(startingDate?.getFullYear()) : null
        return startingDay + "-" + startingMonth + "-" + startingYear
    }

    const getEndDate = () => {
      const endDay = endDate?.length !== 0 ? addZero(endDate?.getDate()) : null
      const endMonth = endDate?.length !== 0 ? addZero(endDate?.getMonth()+1) : null
      const endYear = endDate?.length !== 0 ? addZero(endDate?.getFullYear()) : null
        return endDay + "-" + endMonth + "-" + endYear
    }
    
    if (endDate !== null) {getFilteredDataForExport(getStartingDate(), getEndDate(), 
      props.stateProps)
    .then(res => updateExcelData(res))
    .catch(err => {
      console.log(err)
    })}
    
  }, [startingDate, props, endDate])
  
  return (
    <div className="table-report">
      {props.stateProps.stateProps.outputTable === false && props.stateProps.stateProps.inputForms === false 
      && props.stateProps.stateProps.adminMode === false ? null :
      <div>
        <BackButton onClick={props.onClick}
        onFocus={resetCounter}/>
        <h2 style={{marginBottom: "10px"}}>{name}</h2>
            <div style={{border: "solid 3px", padding: "10px", margin: "15px"}}>
              <h5>Choose a date range for export</h5>
            <div style={{display: "inline-flex"}}> 
              <Calendar onChange={fetchFilteredDateForExport} stateProps={props.stateProps.stateProps}/>
            </div>
              <ExportCSV  csvData={excelData} 
              fileName={name} stateProps={props.stateProps.stateProps}/>
            </div>
      </div>}
      <Table
      subcategorySelectField={props.subcategorySelectField}
      categorySelectField={props.categorySelectField}
      updateSubcategoryOfMaterialsByRow={props.updateSubcategoryOfMaterialsByRow}
      subcategoryOfMaterials={props.subcategoryOfMaterials}
      updateCategoryOfMaterialsByRow={props.updateCategoryOfMaterialsByRow}
      categoryOfMaterials={props.categoryOfMaterials} 
      outputMode={props.outputMode}
        updateDataByRowHandler={props.updateDataByRowHandler}
        statusHandler={props.statusHandler}
        onClickRowId={props.onClickRowId}
        blockNextButton={props.blockNextButton}
        counter={props.counter}
        nextPageLoad={props.nextPageLoad}  
        previousPageLoad={props.previousPageLoad}
        stateProps={props.stateProps.stateProps}
        data={props.tableData}
        onDelete={handleChange}
        updatePRNumByRow={props.updatePRNumByRow}
        purchaseNumber={props.purchaseNumber}
        updateInvoiceNumByRow={props.updateInvoiceNumByRow}
        invoiceNumber={props.invoiceNumber}
        errorOnDB={props.errorOnDB}/>
    </div>
  )
}

export default TableReport;