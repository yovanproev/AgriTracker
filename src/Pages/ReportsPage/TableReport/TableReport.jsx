import React, { useEffect, useState } from 'react';

import './TableReport.css';

import { TableHeader } from './TableHeader/TableHeader'

import { ExportCSV } from './ExcelExport/ExcelExport'
import Table from "../../../Components/ReactTableLibrary/Table"

import BackButton from '../../../Components/BackButton/BackButton';

const TableReport = (props) => {
const [ name, setName ] = useState(null)

  function handleChange(event) {
    // Here, we invoke the callback with the new value
   props.deleteRowHandler(event);
  }
  
  useEffect(() => {
    let headerName =
    props.stateProps.stateProps.index1 ? 
    props.stateProps.stateProps.activityBubbleState[0].name : 
    props.stateProps.stateProps.index2 ? 
    props.stateProps.stateProps.activityBubbleState[1].name: 
    null   
    
    return setName(headerName)
  }, [props.stateProps.stateProps])
  
  return (
    <div className="table-report">
      <TableHeader>{name}</TableHeader>
          <div>
            <ExportCSV csvData={props.tableData} 
            fileName={name} />
          </div>
      <Table 
        stateProps={props.stateProps.stateProps}
        data={props.tableData}
        modeChange={props.modeChange}
        onDelete={handleChange}/>
      <BackButton onClick={props.onClick}/>
    </div>
  )
}

export default TableReport;