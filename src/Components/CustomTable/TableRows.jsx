import React, { useEffect, useState } from 'react'
import { fetchAllOperators } from "../../LocalData/InputFormsData"
import "./InputTable.css"

export const TableRows = (job, index, onChange) => {
    // names of employees checked   
    const [ checkedFields, updateCheckedFields ] = useState('')
    
    const checkboxHandler = (e, name, rowId) => {
      const { id , checked} = e.target;
       updateCheckedFields({
        ...checkedFields, 
        [id] : name})
        if(checked === false){ 
          workHourReg[rowId].workHours = [{ type: job[0], time: 8}];
          setWorkHourReg(workHourReg);
        } 
     }

    let i = 0;
    
    const [employeesRows, setEmployeesRows] = useState([]);
    const [workHourReg, setWorkHourReg] = useState([]);

    useEffect(()=>{
      let employees =[];
      setEmployeesRows(fetchAllOperators());
      
      do {
        employees.push({name:'Person '+ i, workHours:[{ type: job[0], time: 8.0}]});
        i++;
      } while(i < employeesRows.length);

      setWorkHourReg(employees)
    }, [employeesRows.length, i, job])

    
    // console.log(workHourReg)
    const handleInputChangeTwo = (e, rowId, columnId) => {
      const { value } = e.target;
      const workHours = (workHourReg[rowId] || {}).workHours || [];
      if(!workHours[columnId]){
         workHours.push({type: job[columnId], time: value });
      } else {
        workHours[columnId].time = value;
      }
      // console.log("Handle input: ", value, workHours);
      setWorkHourReg({
           ...workHourReg,
           workHours,
         });
      };
       
      // disable handler
      const [ check, setCheck ] = useState(true)
      const disableHandler = (e) => {
        const { id, checked } = e.target;
        setCheck({
          ...check,
          [id]: checked,
        });
      };

    const column = (rows, columnindex) =>  
      <td key={rows+columnindex}> 
        <label style={{display:"grid"}}>
          <input type="number" className="jobs-input"
          step="0.1" id={'input'+rows+columnindex} 
          min="0"
          value={(((workHourReg[rows] || {}).workHours || {})[columnindex-1] || {}).time || 0 }
          disabled={!Object.values(check)[rows]}   
          onChange={(e) => {handleInputChangeTwo(e, rows, columnindex - 1)}}
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
                        onChange={(e) => {disableHandler(e); checkboxHandler(e, employee.name, rowId)}} id={rowId} 
                        style={{width:"20px", height:"20px", margin: "auto 20px"}}/>
                    </label>
                </td>
                
                <td > 
                    <label style={{display:"grid"}}>
                        <input 
                        disabled={!Object.values(check)[rowId]}   
                        type="number" 
                        value={(((workHourReg[rowId] || {}).workHours || {})[0] || {}).time || 8 }
                        className="jobs-input"
                        step="0.1"
                        
                        onChange={(e) => {handleInputChangeTwo(e, rowId, 0)}}/>
                    </label>
                </td>
                {columns(rowId)}
                <td >
                {parseFloat((((workHourReg[rowId] || {}).workHours || [])
                .reduce((prevVal,currentVal)=> parseFloat(prevVal) + parseFloat(currentVal.time), 0)) || 8)
                .toFixed(1)}
                </td>
                </tr>
            )}  
        </tbody>
    )
}
   
          
    
