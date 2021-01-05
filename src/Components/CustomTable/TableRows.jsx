import React, { useState } from 'react'
import { fetchAllOperators } from "../../LocalData/InputFormsData"

export const TableRows = (job, index, getHours) => {
    // initial hours for column 1
    const [ hours, setHours ] = useState(8)
    
    // hours on Click from column 1, on Click it gets the 
    // last state from hours, not to rerender on every onChange
    const [ firstColumnHours, setFirstColumnHours ] = useState(hours)
    // console.log(hours)
    const hourFromFirstColumn = () => {
        setFirstColumnHours(firstColumnHours + hours)
    }
    
    const [ 
        // lastHour 
        , setLastHour ] = useState("")
    const [ lastIndex, setLastIndex ] = useState("")
    const onBlurHandler = (i) => {
    setLastHour(hours)
    setLastIndex(i)
    }

      console.log(lastIndex)
      

    const [ idOfInput, setIdOfInput ] = useState("")
    console.log(idOfInput)

  const reducedIndex = index.reduce(x => x + x)
 
 const tableRow = (getHours, setHours) =>
 <td> 
   <label style={{display:"grid"}}>
     <input type="number" className="jobs-input"
     step="0.1"
     onClick={() => hourFromFirstColumn()}
     onChange={(e) => {getHours(e.target.value, parseInt(e.target.id)); 
        setHours(firstColumnHours + parseFloat(e.target.value))}}/>
   </label>
 </td>

const columns = (index) => {
    if (index === 2) return (<>{tableRow(getHours, setHours)}</>)
    else if (index === 4) return (<>{tableRow(getHours, setHours)}{tableRow(getHours, setHours)}</>)
    else if (index === 8) return (<>{tableRow(getHours, setHours)}{tableRow(getHours, setHours)}{tableRow(getHours, setHours)}</>)
}

    return(
        <tbody key={index}>
            {fetchAllOperators().map((x, i) => 
            <tr key = {i} className='even'>
                <td>
                    <label style={{display:"grid"}}>
                        <input type="checkbox" name="checkboxName" value="on"
                        style={{width:"20px", height:"20px", margin: "auto 20px"}}/>
                    </label>
                </td>
                <td> 
                    {x.name}
                </td>
                <td> 
                    <label style={{display:"grid"}}>
                        <input onClick={() => setIdOfInput(i)} type="number" defaultValue={"8.0"} className="jobs-input"
                        step="0.1" 
                        onBlur={() => onBlurHandler(i)}
                        onChange={(e) => {getHours(e.target.value, parseInt(e.target.id)); 
                        setHours(parseFloat(e.target.value))}}/>
                    </label>
                </td>
                {columns(reducedIndex)}
                <td>  
                 {i === idOfInput ? hours : firstColumnHours}
                </td>
                {/* {lastIndex === i ?
                <td>  
                {lastIndex !== idOfInput ? lastHour : null}
                </td> : null} */}
            </tr>
            )}  
        </tbody>
    )
}
   
          
    
