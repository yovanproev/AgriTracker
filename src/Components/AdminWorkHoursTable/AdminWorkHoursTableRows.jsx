import React, { useEffect, useState } from 'react'
import { fetchAllOperators } from "../../LocalData/InputFormsData"
import "./AdminWorkHoursTable.css"

export const AdminWorkHoursTableRows = ({data}) => {
    // const memoizedValue = useMemo(() => 
    // fetchOperatorsByTypeOfWorker(localState.selectedTypeOfHoursName), [localState.selectedTypeOfHoursName]);
    const [employeesRows, setEmployeesRows] = useState([]);
    
    const employees = fetchAllOperators()

    useEffect(()=>{
      setEmployeesRows(employees);
    }, [employees])

    const reducedToUniqueDate = [...new Set(data.map(date => date.date))];  
    
    const nameOfEmployee = "nameOfEmployee";
    const dateOfWork = "date";

    let result = data.reduce((map, obj) => {
      if (!map[obj[nameOfEmployee]]) map[obj[nameOfEmployee]] = {};
        [].concat(obj[dateOfWork]).forEach(subEl => {
            if (!map[obj[nameOfEmployee]][subEl]) map[obj[nameOfEmployee]][subEl] = [];
            map[obj[nameOfEmployee]][subEl].push(obj);
        });
        return map;
    }, {});
  
    // Person 1 -> [date1]: {manHours1}
    //          -> [date2]: {manHours2}
    
    // Person 2 -> [date1]: {manHours1}
    //          -> [date2]: {manHours2}
    
    const column = (rowId, date, columnId, employee) => {
      // console.log("columnId", columnId)
      // console.log("rowId", rowId)
      // console.log("date", date)
      // console.log(result[employee] ? ((result[employee][date] || [])[rowId !== 0 ? 0 : rowId] || [])?.manHours || "" : null)
      return <td key={rowId+columnId}> 
        {result[employee] ? ((result[employee][date] || [])[rowId !== 0 ? 0 : rowId] || [])?.manHours || 0 : null}
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
   
          
    
