import React, { useEffect, useState } from 'react'
import { fetchAllOperators } from "../../../../LocalData/InputFormsData"
import "./AdminWorkHoursTable.css"

export const AdminWorkHoursTableRows = ({data}) => {
    const [employeesRows, setEmployeesRows] = useState([]);
    const employees = fetchAllOperators()

    useEffect(()=>{
      setEmployeesRows(employees);
    }, [employees])

    const reducedToUniqueDate = [...new Set(data.map(date => date.date))];  
    
    const nameOfEmployee = "nameOfEmployee";
    const dateOfWork = "date";

    let result = data.reduce((prevValue, nextValue) => {
      if (!prevValue[nextValue[nameOfEmployee]]) prevValue[nextValue[nameOfEmployee]] = {};
        [].concat(nextValue[dateOfWork]).forEach(subEl => {
            if (!prevValue[nextValue[nameOfEmployee]][subEl]) prevValue[nextValue[nameOfEmployee]][subEl] = [];
            prevValue[nextValue[nameOfEmployee]][subEl].push(nextValue);
        });
        return prevValue;
    }, {});
  
    // Person 1 -> [date1]: {manHours1}
    //          -> [date2]: {manHours2}
    
    // Person 2 -> [date1]: {manHours1}
    //          -> [date2]: {manHours2}
    
    const column = (rowId, date, columnId, employee) => {
      return <td key={rowId+columnId}> 
                {result[employee] ? +parseFloat(((result[employee][date] || [])[rowId !== 0 ? 0 : rowId] || [])?.manHours).toFixed(1) || parseInt(0) : null}
             </td>
    }

 return(
        <tbody key={Math.random() *1000}>
            {employeesRows.map((employee, rowId) => 
            <tr key={employee.id} className='even'>
                <td className="first-col-rows"> 
                    {employee.name}
                </td>
              {reducedToUniqueDate.map((date, columnId) => {
                 return column(rowId, date, columnId, employee.name)})}
            </tr>
            )}  
        </tbody>
    )
}
   
          
    
