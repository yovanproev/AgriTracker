import React, { useState } from 'react'
import { fetchAllOperators } from "../../LocalData/InputFormsData"

export const TableRows = (job, index, onChange) => {
    
    const [ , setIdOfInput ] = useState("")
   
    // const initialValues = {
    //     company: "",
    //     position: "",
    //     link: "",
    //     date: "",
    //     note: "",
    //   };

    const [values, setValues] = useState("");
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setValues({
          ...values,
          [id]: value,
        });
      };

    const [secondValue, setSecondValue] = useState("");
    const handleInputChangeTwo = (e) => {
        const { id, value } = e.target;
        setSecondValue({
          ...secondValue,
          [id]: value,
        });
      };


    //   console.log(secondValue)
    //   console.log(Object.values(secondValue))
    const reducedIndex = index.reduce(x => x + x)
 
 const tableRow = (index) => 
 <td> 
   <label style={{display:"grid"}}>
     <input type="number" className="jobs-input"
     step="0.1" id={index}
     onClick={() => setIdOfInput(index)}
     onChange={(e) => {handleInputChangeTwo(e)}}
        />
   </label>
 </td>

    const columns = (index, i) => {
        if (index === 2) return (<>{tableRow(i)}</>)
        else if (index === 4) return (<>{tableRow(i)}{tableRow(i)}</>)
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
                        id={i} 
                        onChange={(e) => handleInputChange(e)}/>
                    </label>
                </td>
                {columns(reducedIndex, i)}
                <td>
                {values !== "" ? parseFloat(Object.values(values)[i]) + (secondValue !== "" ? parseFloat(Object.values(secondValue)[i]) : parseInt(0)) : 8}
                </td>
                </tr>
            )}  
        </tbody>
    )
}
   
          
    
