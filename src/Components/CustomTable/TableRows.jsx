import React, { useEffect, useState, useMemo } from 'react'
import { fetchOperatorsByTypeOfWorker } from "../../LocalData/InputFormsData"
import "./InputTable.css"

export const TableRows = ({jobActivities, index, tableRowsHandler, localState}) => {
    
    const memoizedValue = useMemo(() => 
    fetchOperatorsByTypeOfWorker(localState.selectedTypeOfHoursName), [localState.selectedTypeOfHoursName]);
    
    const [employeesRows, setEmployeesRows] = useState([]);
    const [workHourReg, setWorkHourReg] = useState([]);

    // names of employees checked   
    const [ checkedFields, updateCheckedFields ] = useState('')
    
    const checkboxHandler = (e, name, rowId) => {
      
      const { id , checked} = e.target;
       updateCheckedFields({
        ...checkedFields, 
        [id] : name})
        if(checked === false){ 
          workHourReg[rowId].workHours = [{ type: jobActivities[index]?.name, time: 0.0}];
          setWorkHourReg(workHourReg);
        } 
        tableRowsHandler(workHourReg)
     }

    let i = 0;
    
    useEffect(()=>{
      let employees =[];
      setEmployeesRows(memoizedValue);
      
      do {
        employees.push({name: employeesRows[i]?.name, workHours:[{ type: jobActivities[i]?.name, time: ""}]});
        i++;
      } while (i < employeesRows.length);
      setWorkHourReg(employees)
    }, [employeesRows, employeesRows.length, i, jobActivities, memoizedValue])

     
    const handleInputChange = (e, rowId, columnId) => {
      const { value } = e.target;
      const workHours = (workHourReg[rowId] || {}).workHours || [];
      if(!workHours[columnId]){
         workHours.push({type: jobActivities[columnId]?.name, time: value });
      } else {
        workHours[columnId].time = value;
      }
      // console.log("Handle input: ", value, workHours);
      setWorkHourReg({
           ...workHourReg,
          //  workHours,
         });
         tableRowsHandler(workHourReg)
      };
       
      // disable handler
      const [ check, setCheck ] = useState(true)
      const disableHandler = (e) => {
        const { id, checked } = e.target;
        setCheck({
          ...check,
          [id] : checked,
        });
      };

    const column = (rows, columnindex) =>  
      <td key={rows+columnindex}> 
        <label style={{display:"grid"}}>
          <input type="number" className="jobs-input"
          step="0.1" id={rows+columnindex} 
          min="0" 
          value={(((workHourReg[rows] || {}).workHours || {})[columnindex-1] || {}).time || 0 }
          disabled={!check[rows]}   
          onChange={(e) => {handleInputChange(e, rows, columnindex - 1)}}
              />
        </label>
      </td>
 
  const columns = (rows) => {
    
     return index.map(selectedJobs => {
    
        if (selectedJobs === 1) {
          return null
        } else { 
          return column(rows, selectedJobs)
        }
      })
    }
    // console.log(workHourReg)
    return(
        <tbody key={index}>
            {employeesRows.map((employee, rowId) => 
            <tr key={rowId} className='even'>
                <td className="first-col-rows"> 
                    {employee.name}
                </td>
                <td key={rowId}>
                    <label>
                        <input type="checkbox" name="checkboxName" value="on" 
                        onChange={(e) => {disableHandler(e); checkboxHandler(e, employee.name, rowId)}} 
                        id={rowId} 
                        style={{width:"20px", height:"20px", margin: "auto 20px"}}/>
                    </label>
                </td>
                
                <td > 
                    <label style={{display:"grid"}}>
                        <input 
                        disabled={!check[rowId]}   
                        type="number" id={rowId}
                        value={(((workHourReg[rowId] || {}).workHours || {})[0] || {}).time || "" }
                        className="jobs-input"
                        step="0.1" 
                        onChange={(e) => {handleInputChange(e, rowId, 0)}}/>
                    </label>
                </td>
                {columns(rowId)}
                <td >
                {parseFloat((((workHourReg[rowId] || {}).workHours || [])
                .reduce((prevVal,currentVal) => isNaN(prevVal) ? 0 : parseFloat(prevVal) 
                + parseFloat(currentVal.time), 0)) || 0)
                .toFixed(1)
                }
                </td>
                </tr>
            )}  
        </tbody>
    )
}
   
          
    
