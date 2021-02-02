import React from "react"

import TableFilter from 'react-table-filter';
import "react-table-filter/lib/styles.css";
import "./AdminMachinesTable.css"

const AdminMachinesTableHeader = ({columns}) => {
   
   return (
    <thead className='bgvi'>
      <TableFilter>
         <th className="first-col-header" key = {Math.random() * 1000}>Machines</th>
         {/* {columns.map(x => 
         <th key = {Math.random() * 1000} filterkey="date" className="cell" 
            casesensitive={'true'} showsearch={'true'}>{x.machine}
         </th>)}
          */}
          {columns.length > 1 ? <th key = {Math.random() * 1000}>{Object.keys(columns[0])[6]}</th> : null}
          {columns.length > 1 ? <th key = {Math.random() * 1000}>{Object.keys(columns[0])[0]}</th> : null}
          {columns.length > 1 ? <th key = {Math.random() * 1000}>{Object.keys(columns[0])[2]}</th> : null}
          {columns.length > 1 ? <th key = {Math.random() * 1000}>{Object.keys(columns[0])[9]}</th> : null}
          {columns.length > 1 ? <th key = {Math.random() * 1000}>{Object.keys(columns[0])[7]}</th> : null}
      </TableFilter>
    </thead>
   )
}

export default AdminMachinesTableHeader;