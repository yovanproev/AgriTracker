import React from "react"

import TableFilter from 'react-table-filter';
import "react-table-filter/lib/styles.css";

const TableHeader = ({jobActivities}) => {
    
   return (
    <thead className='bgvi'>
      <TableFilter 
         // onFilterUpdate={_filterUpdated}
         >
         <th key = {Math.random() * 1000}>Select Employee</th>
         <th key = {Math.random() * 1000}>Employees</th>
         {jobActivities.map(x => 
         <th key = {Math.random() * 1000} filterkey="kilometars" className="cell" 
            casesensitive={'true'} showsearch={'true'}>{x.name}
         </th>)}
         <th key = {Math.random() * 1000}>Total</th>
     </TableFilter>
    </thead>
   )
}

export default TableHeader;