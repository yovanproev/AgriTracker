import React, { useState, useEffect} from "react"

import TableFilter from 'react-table-filter';
import "react-table-filter/lib/styles.css";
import "./AdminWorkHoursTable.css"

const AdminWorkHoursTableHeader = ({data}) => {
   //  console.log(data)
   const [ uniqueDates, updateUniqueDates ] = useState([])

   useEffect(() => {
   const reducedToUniqueDates = [...new Set(data.map(date => date.date))];  
       updateUniqueDates(reducedToUniqueDates)
          
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [...data, data])
   
   return (
    <thead className='bgvi'>
      <TableFilter>
         <th className="first-col-header" key = {Math.random() * 1000}>Employees</th>
         {uniqueDates.map(x => 
         <th key = {Math.random() * 1000} filterkey="date" className="cell" 
            casesensitive={'true'} showsearch={'true'}>{x}
         </th>)}
      </TableFilter>
    </thead>
   )
}

export default AdminWorkHoursTableHeader;