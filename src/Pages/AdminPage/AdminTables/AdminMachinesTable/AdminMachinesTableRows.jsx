import React, { useEffect, useState } from 'react'
// import { getSelectionByField } from '../../../../Firebase/FetchCollectionsFromFirestore';
import "./AdminMachinesTable.css"

export const AdminMachinesTableRows = ({data, stateProps}) => {
     const [ proba, setProba ] = useState([]) 
  
  useEffect(() => {
    const object1 = {};
    let result2 = data?.reduce(function(prevValue, nextValue) {

      let key = 
      // props.stateProps.stateProps.selectedActivity === 1 ? 
      // nextValue.machine + '-' + nextValue.attachedMachinery + '-' + nextValue.location : 
      stateProps.selectedActivity === 2 ? 
      nextValue.machine : null
      // props.stateProps.stateProps.selectedActivity === 3 ? 
      // nextValue.machine + '-' + nextValue.attachedMachinery + '-' + nextValue.jobDescription + '-' + nextValue.maintenanceOrRerairs : 
      // props.stateProps.stateProps.selectedActivity === 4 ? nextValue.date + '-' + nextValue.nameOfEmployee : null

      if(!object1[key]) {
        object1[key] = Object.assign({}, nextValue); // create a copy of next value
        prevValue.push(object1[key]);
      } else {
        // if (props.stateProps.stateProps.selectedActivity === 1) object1[key].liters += nextValue.liters 
        if (stateProps.selectedActivity === 2) object1[key].hoursSpentOnLastActivity += parseFloat(nextValue?.hoursSpentOnLastActivity); 
        // else if (props.stateProps.stateProps.selectedActivity === 3) {object1[key].costOfTechnician += nextValue.costOfTechnician
        // object1[key].workedHours += nextValue.workedHours}
        // else if (props.stateProps.stateProps.selectedActivity === 4) object1[key].manHours += nextValue.manHours || {}
        }
                        
      return prevValue;
    }, []);
    
    // console.log(result2)
    const a = result2[0]?.hoursSpentOnLastActivity
    // console.log(a)
    data.forEach(element => {
      if (element.machine === "TM-165") {
        const obj = Object.assign({}, element);
        obj.percentages = (element?.hoursSpentOnLastActivity / a) * 100  
        // console.log(element?.hoursSpentOnLastActivity / parseFloat(6196.6)); 
        setProba(obj)
      }
      else return null
    })
    
  }, [data, stateProps.selectedActivity])
    
  console.log(data, "data")
  console.log(proba, "proba")
    // const nameOfEmployee = "nameOfEmployee";
    // const dateOfWork = "date";

    // let result = data.reduce((prevValue, nextValue) => {
    //   if (!prevValue[nextValue[nameOfEmployee]]) prevValue[nextValue[nameOfEmployee]] = {};
    //     [].concat(nextValue[dateOfWork]).forEach(subEl => {
    //         if (!prevValue[nextValue[nameOfEmployee]][subEl]) prevValue[nextValue[nameOfEmployee]][subEl] = [];
    //         prevValue[nextValue[nameOfEmployee]][subEl].push(nextValue);
    //     });
    //     return prevValue;
    // }, {});
  
    // Person 1 -> [date1]: {manHours1}
    //          -> [date2]: {manHours2}
    
    // Person 2 -> [date1]: {manHours1}
    //          -> [date2]: {manHours2}
    
    // const column = (rowId, date, columnId, employee) => {
    //   return <td key={rowId+columnId}> 
    //             {result[employee] ? +parseFloat(((result[employee][date] || [])[rowId !== 0 ? 0 : rowId] || [])?.manHours).toFixed(1) || parseInt(0) : null}
    //          </td>
    // }

 return(
        <tbody key={Math.random() *1000}>
            {data.map((employee, rowId) => 
            <tr key={employee.id} className='even'>
                <td className="first-col-rows"> 
                    {employee.name}
                </td>
              {/* {data.map((date, columnId) => {
                 return column(rowId, date, columnId, employee.name)})} */}
            </tr>
            )}  
        </tbody>
    )
}
   
          
    
