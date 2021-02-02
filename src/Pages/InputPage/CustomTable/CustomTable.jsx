import React from 'react'
import Table from 'react-bootstrap/Table';

import CustomTableHeader from "./CustomTableHeader"
import "./CustomTable.css"
import { CustomTableRows } from './CustomTableRows';

const CustomTable = ({jobActivities, nameOfJobActivity, id, tableRowsHandler, localState}) => {
    
     return (
        <div className="table-div-input">
        <Table striped bordered hover responsive className="custom-table">
            <CustomTableHeader 
            jobActivities={jobActivities}/>
            {jobActivities.length !== 0 ? <CustomTableRows jobActivities={jobActivities} localState={localState}
            index={id} tableRowsHandler={tableRowsHandler} nameOfJobActivity={nameOfJobActivity}/> : null}
        </Table>
        </div>
    )
}

export default CustomTable