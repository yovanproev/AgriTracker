import React, { useState } from 'react'
import { fetchAllOperators } from "../../LocalData/InputFormsData"
import "./InputTable.css"

export const TableRows = (job, index, onChange) => {
    // names of employees checked   
    const [ checkedFields, updateCheckedFields ] = useState('')
    
    const checkboxHandler = (e, name) => {
      const { id } = e.target;
       updateCheckedFields({
        ...checkedFields, 
        [id] : name})
     }

// console.log(checkedFields)

     const initialValues = {
        0: "",
        1: "",
        2: "",
        3: "",
     };


    // values of first column
    const [values, setValues] = useState(initialValues);
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setValues({
          ...values,
          [id]: value,
        })
    };

    // values of second column
    const [secondValue, setSecondValue] = useState("");
    const [thirdValue, setThirdValue] = useState("");
    
    const handleInputChangeTwo = (e) => {
      const { id, value } = e.target; 
      
      index.map(i => { 
        console.log(i)    
          return job.length === 2 ? 
         setSecondValue({
           ...secondValue,
           [id]: value,
         }) : job.length === 3 ? 
         setThirdValue({
           ...thirdValue,
           [id]: value,
         }) :  null
       })        
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

    // makes single digit out of array of id's from
    // the multi selection field 
    // const reducedIndex = index.reduce(x => x + x)
 
    // console.log("second", secondValue)
    // console.log("third", thirdValue)
     
    const column = (x, index) =>  
 <td key={x}> 
   <label style={{display:"grid"}}>
     <input type="number" className="jobs-input"
     step="0.1" id={index} 
     min="0"
    //  onBlur={()=>setThirdValue(secondValue, x)}
     disabled={!Object.values(check)[index]}   
    //  onClick={() => setIdOfInput(index)}
     onChange={(e) => {handleInputChangeTwo(e)}}
        />
   </label>
 </td>
 
  const columns = (i) => {
      return index.map(x => {
        if (x === 1) {
          return null}
        else return column(x, i)
      })
    }

    return(
        <tbody key={index}>
            {fetchAllOperators().map((x, i) => 
            <tr key={i} className='even'>
                <td className="first-col-rows"> 
                    {x.name}
                </td>
                <td key={i}>
                    <label>
                        <input type="checkbox" name="checkboxName" value="on" 
                        onChange={(e) => {disableHandler(e); checkboxHandler(e, x.name)}} id={i} 
                        style={{width:"20px", height:"20px", margin: "auto 20px"}}/>
                    </label>
                </td>
                
                <td > 
                    <label style={{display:"grid"}}>
                        <input 
                        // onClick={() => setIdOfInput(i)}
                        disabled={!Object.values(check)[i]}   
                        type="number" defaultValue={"8.0"} className="jobs-input"
                        step="0.1"
                        id={i} 
                        onChange={(e) => {handleInputChange(e); onChange(values, checkedFields)}}/>
                    </label>
                </td>
                {columns(i)}
                <td >
                {values !== "" ? ((+parseFloat(Object.values(values)[i]).toFixed(1) || parseInt(8)) + 
                (+parseFloat(Object.values(secondValue)[i]).toFixed(1) || parseInt(0))  +
                (+parseFloat(Object.values(thirdValue)[i]).toFixed(1) || parseInt(0)) 
                // +(+parseFloat(Object.values(fourthValue)[i]).toFixed(1) || parseInt(0))
                ) 
                : 8}
                </td>
                </tr>
            )}  
        </tbody>
    )
}
   
          
    
