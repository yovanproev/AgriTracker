import React, { useEffect, useState } from 'react';

import './TableReport.css';

import { TableHeader } from './TableHeader/TableHeader'

import { ExportCSV } from './ExcelExport/ExcelExport'
import Table from "../../../Components/ReactTableLibrary/Table"

import { resetCounter } from "../../../Firebase/FetchDataFromRealtimeDB"
import BackButton from '../../../Components/BackButton/BackButton';
import Calendar from '../../../Components/Calendar/Calendar';
// import { getFilteredDataForExport } from '../../../Firebase/FetchFilteredDataForExportFromRealtimeDB';

const TableReport = (props) => {
const [ name, setName ] = useState(null)

  function handleChange(event) {
    // Here, we invoke the callback with the new value
   props.deleteRowHandler(event);
  }

  const [ date, updateDate ] = useState([])
  
  const fetchFilteredDataForExport = (data) => {
   updateDate(data)
  }

  useEffect(() => {
    let headerName =
    props.stateProps.stateProps.index1 ? 
    props.stateProps.stateProps.activityBubbleState[0].name : 
    props.stateProps.stateProps.index2 ? 
    props.stateProps.stateProps.activityBubbleState[1].name: 
    null   
    setName(headerName)
    
    // const getStartingDate = () => {
    //   const startingDay = date.getDate()
    //   const startingMonth = date.getMonth()+1
    //   const startingYear = date.getFullYear()
    //     return startingDay + "-" + startingMonth + "-" + startingYear
    // }
    // getFilteredDataForExport(getStartingDate(), a, props).then(res => console.log(res)) 
  }, [date, date.length, props])
  
  return (
    <div className="table-report">
      <TableHeader>{name}</TableHeader>
          <div style={{border: "solid 3px", padding: "10px", margin: "15px"}}>
            <h5>Choose a date range for export</h5>
           <div style={{display: "inline-flex"}}> <Calendar onClick={fetchFilteredDataForExport}/> <Calendar /></div>
            <ExportCSV  csvData={props.tableData} 
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