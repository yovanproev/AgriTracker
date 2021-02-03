import React from 'react'
import Table from 'react-bootstrap/Table';

import AdminMachinesTableHeader from "./AdminMachinesTableHeader"
import "./AdminMachinesTable.css"
import { AdminMachinesTableRows } from './AdminMachinesTableRows';

const AdminMachinesTable = ({data, stateProps, fuelForComparison}) => {
        
     return (
        <div className="table-div-input">
        <Table striped bordered hover responsive>
            <AdminMachinesTableHeader columns={data}/>
            {data.length !== 0 ?  
            <AdminMachinesTableRows fuelForComparison={fuelForComparison}
             data={data} stateProps={stateProps}/> 
             : null}
        </Table>
        </div>
    )
}

export default AdminMachinesTable