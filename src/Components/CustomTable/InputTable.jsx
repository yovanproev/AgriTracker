import React from 'react'
import Table from 'react-bootstrap/Table';

import TableHeader from "./InputTableHeader"
import "./InputTable.css"
import { TableRows } from './TableRows';

const CustomTable = ({jobActivities, names, id, onChange}) => {
    

     return (
        <div className="table-div-input">
        <Table striped bordered hover responsive>
            <TableHeader 
            jobActivities={jobActivities}/>
            {jobActivities.length !== 0 ? TableRows(names, id, onChange) : null}
        </Table>
        </div>
    )
}

export default React.memo(CustomTable)