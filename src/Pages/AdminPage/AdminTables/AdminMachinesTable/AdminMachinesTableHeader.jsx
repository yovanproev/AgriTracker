import React from "react"

import TableFilter from 'react-table-filter';
import "react-table-filter/lib/styles.css";
import "./AdminMachinesTable.css"

const AdminMachinesTableHeader = ({columns}) => {
   
   return (
    <thead className='bgvi'>
      <TableFilter>
          <th className="first-col-header" key = {Math.random() * 1000}>Machine</th> 
          <th key = {Math.random() * 1000}>Attached Machinery</th> 
          <th key = {Math.random() * 1000}>Farm</th> 
          <th key = {Math.random() * 1000}>Product</th> 
          <th key = {Math.random() * 1000}>Job Description</th> 
          <th key = {Math.random() * 1000}>Hours spent on activity</th> 
          <th key = {Math.random() * 1000}>% of total hours spent</th>
          <th key = {Math.random() * 1000}>Liters spent</th> 
          <th key = {Math.random() * 1000}>Liters spent times %</th> 
          <th key = {Math.random() * 1000}>Average fuel spent</th>
         </TableFilter>
    </thead>
   )
}

export default AdminMachinesTableHeader;