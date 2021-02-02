import React from 'react'
import Table from 'react-bootstrap/Table';

import AdminMachinesTableHeader from "./AdminMachinesTableHeader"
import "./AdminMachinesTable.css"
import { AdminMachinesTableRows } from './AdminMachinesTableRows';

const AdminMachinesTable = ({data, stateProps}) => {
    console.log(data)
    // const reducedToUniqueDates = [...new Set(data.map(date => date.date))];  
    
     return (
        <div className="table-div-input">
        <Table striped bordered hover responsive>
            <AdminMachinesTableHeader columns={data}/>
            {data.length !== 0 ?  
            <AdminMachinesTableRows 
             data={data} stateProps={stateProps}/> 
             : null}
        </Table>
        </div>
    )
}

export default AdminMachinesTable