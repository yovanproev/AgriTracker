import React, { useState, useEffect } from 'react'
import { fetchAllOperators } from "../../LocalData/InputFormsData"

export const TableRows = (job, index, getHours) => {
    // initial hours for column 1
    const [ hours, setHours ] = useState(8)

    // hours for column 2 on
    const [ hoursColumnTwoAndOn, setHoursColumnTwoAndOn ] = useState([])
    const hourFromRestOfTheColumns = (e) => {
        setHoursColumnTwoAndOn(e)
    }

    useEffect(()=> {
        
        getHours(hours + hoursColumnTwoAndOn)
    })

    const [ idOfInput, setIdOfInput ] = useState("")
    const [ idOfSecondInput, setIdOfSecondInput ] = useState("")
    // console.log(idOfInput)
    // console.log(idOfSecondInput)
    const [ finalValue, setFinalValue ] = useState("")
    const onBlurHandler = (e) => {
       setFinalValue(e)
    }
    // function handleChange(evt) {
    //     const value = evt.target.value;
    //     setState({
    //       ...state,
    //       [evt.target.name]: value
    //     });
    //   }

  const reducedIndex = index.reduce(x => x + x)
 
 const tableRow = 
 <td> 
   <label style={{display:"grid"}}>
     <input type="number" className="jobs-input"
     step="0.1"
     onClick={() => setIdOfSecondInput(index)}
     onChange={(e) => {hourFromRestOfTheColumns(parseFloat(e.target.value))}}
        />
   </label>
 </td>

const columns = (index) => {
    if (index === 2) return (<>{tableRow}</>)
    else if (index === 4) return (<>{tableRow}{tableRow}</>)
    else if (index === 8) return (<>{tableRow}{tableRow}{tableRow}</>)
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
                        <input onClick={() => setIdOfInput(i)} 
                        type="number" defaultValue={"8.0"} className="jobs-input"
                        step="0.1" 
                        onBlur={(e) => onBlurHandler(e.target.value)}
                        onChange={(e) => {getHours(e.target.value, parseInt(e.target.id)); 
                        setHours(parseFloat(e.target.value))}}/>
                    </label>
                </td>
                {columns(reducedIndex)}
                <td key={i}>  
                 {i === idOfInput ? hours + hoursColumnTwoAndOn :  
                  finalValue}
                </td>
                </tr>
            )}  
        </tbody>
    )
}
   
          
    
