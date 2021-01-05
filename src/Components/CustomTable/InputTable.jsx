import React, { useState } from 'react'
import Table from 'react-bootstrap/Table';

import TableHeader from "./InputTableHeader"
import "./InputTable.css"
import { TableRows } from './TableRows';

const CustomTable = ({jobActivities, names, id}) => {
    const [ , setHours ] = useState([])
  
    const getHours = (hours) => {
        setHours(hours)
    }

     return (
        <div className="table-div-input">
        <Table striped bordered hover responsive>
            <TableHeader 
            jobActivities={jobActivities}/>
            {TableRows(names, id, getHours)}
        </Table>
        </div>
    )
}

export default React.memo(CustomTable)