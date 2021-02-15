import React from "react"

import TableFilter from 'react-table-filter';
import "react-table-filter/lib/styles.css";
import "./CustomTable.css"

const CustomTableHeader = ({jobActivities}) => {
    
   return (
    <thead className='bgvi'>
      <TableFilter 
         // onFilterUpdate={_filterUpdated}
         >
         <th className="first-col-header" key = {Math.random() * 1000}>Employees</th>
         <th key = {Math.random() * 1000} className="cell">Select Employee</th>
         {jobActivities.map(x => 
         <th key = {Math.random() * 1000} filterkey="kilometars" className="cell" 
            casesensitive={'true'} showsearch={'true'}>{x.name}
         </th>)}
         <th key = {Math.random() * 1000} className="cell">Total</th>
     </TableFilter>
    </thead>
   )
}

export default CustomTableHeader;