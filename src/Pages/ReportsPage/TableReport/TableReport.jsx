import React, { useEffect, useState } from 'react';

import './TableReport.css';

import { TableHeader } from './TableHeader/TableHeader'

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

  function handleChange(rowId, numberOfEmployee, numberOfJob) {
    // Here, we invoke the callback with the new value
    props.deleteRowHandler(rowId, numberOfEmployee, numberOfJob);
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
    let headerName =
    props.stateProps.stateProps.index1 ? 
    props.stateProps.stateProps.activityBubbleState[0].name : 
    props.stateProps.stateProps.index2 ? 
    props.stateProps.stateProps.activityBubbleState[1].name: 
    props.stateProps.stateProps.index3 ? 
    props.stateProps.stateProps.activityBubbleState[2].name: 
    props.stateProps.stateProps.index4 ? 
    props.stateProps.stateProps.activityBubbleState[3].name: 
    null   
    setName(headerName)
    
    const getStartingDate = () => {
      const startingDay = startingDate.length !== 0 ? addZero(startingDate.getDate()) : null
      const startingMonth = startingDate.length !== 0 ? addZero(startingDate.getMonth()+1) : null
      const startingYear = startingDate.length !== 0 ? addZero(startingDate.getFullYear()) : null
        return startingDay + "-" + startingMonth + "-" + startingYear
    }

    const getEndDate = () => {
      const endDay = endDate.length !== 0 ? addZero(endDate.getDate()) : null
      const endMonth = endDate.length !== 0 ? addZero(endDate.getMonth()+1) : null
      const endYear = endDate.length !== 0 ? addZero(endDate.getFullYear()) : null
        return endDay + "-" + endMonth + "-" + endYear
    }
    if (endDate !== null) getFilteredDataForExport(getStartingDate(), getEndDate(), props.stateProps)
    .then(res => updateExcelData(res))
    .catch(err => {
      console.log(err)
    })
    
  }, [startingDate, props, endDate])
  
  return (
    <div className="table-report">
      <TableHeader>{name}</TableHeader>
          <div style={{border: "solid 3px", padding: "10px", margin: "15px"}}>
            <h5>Choose a date range for export</h5>
           <div style={{display: "inline-flex"}}> 
             <Calendar onChange={fetchFilteredDateForExport} stateProps={props.stateProps.stateProps}/>
           </div>
            <ExportCSV  csvData={excelData} 
            fileName={name} />
          </div>
      <Table
        blockNextButton={props.blockNextButton}
        counter={props.counter}
        nextPageLoad={props.nextPageLoad}  
        previousPageLoad={props.previousPageLoad}
        stateProps={props.stateProps.stateProps}
        data={props.tableData}
        modeChange={props.modeChange}
        onDelete={handleChange}/>
      <BackButton onClick={props.onClick}
       onFocus={resetCounter}/>
    </div>
  )
}

export default TableReport;