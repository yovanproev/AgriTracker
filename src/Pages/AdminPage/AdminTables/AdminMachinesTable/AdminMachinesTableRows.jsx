import React from 'react'
import "./AdminMachinesTable.css"

export const AdminMachinesTableRows = ({data, stateProps, fuelForComparison}) => {
    
  const object1 = {};
  let result = data?.reduce(function(prevValue, nextValue) {

    let key = nextValue.machine + "-" + nextValue.farmLocation 
    if(!object1[key]) {
      object1[key] = Object.assign({}, nextValue)
      prevValue.push(object1[key]);
    } else {
      object1[key].hoursSpentOnLastActivity += parseFloat(nextValue?.hoursSpentOnLastActivity); 
      }
      return prevValue;
  }, []);
  
  const reducedToUniqueMachine = [...new Set(data.map(date => date.machine))]; 
  // const reducedToUniqueLocation = [...new Set(data.map(date => date.farmLocation))]; 
  console.log(data, "data") // pocetnite 6 objekti, machine registration modulut, po masina, attachedmachinery, location, product, jobdescription
  console.log(result, "result") // 5 objekti, podeleni po masina i lokacija
  console.log(fuelForComparison, "fuelForComparison") // objekti deka so e spending fuel prikazano po masina i lokacija
  
  let hoursPerMachine =[]
    for (let i = 0; i < reducedToUniqueMachine.length; i++) {
      data.map(element => {
       if (element.machine === reducedToUniqueMachine[i]) {
        const obj = Object.assign({}, element);
        obj.percentages = (element?.hoursSpentOnLastActivity / result[i]?.hoursSpentOnLastActivity) * 100  
        return hoursPerMachine.push(obj)
      }
      else return null
    })
  }

// console.log(hoursPerMachine)
 return(
        <tbody key={Math.random() *1000}>
            {hoursPerMachine.map((object, rowId) => 
            <tr key={object.id} className='even'>
                <td className="first-col-rows"> {object.machine} </td>
                <td >{object.attachedMachinery}  </td>
                <td >{object.farmLocation} </td>
                <td >{object.product} </td>
                <td >{object.machinesJob} </td>
                <td >{object.hoursSpentOnLastActivity} </td>
                <td >{ parseFloat(hoursPerMachine[rowId].percentages).toFixed(2) + "%"}</td>
                
                <td>{fuelForComparison.map(machine => {
                    if (machine.machine === object.machine && machine.location === object.farmLocation) return Math.abs(machine.liters) 
                   else return null}) 
                }</td>

                <td>{fuelForComparison.map(machine => {
                  if (machine.machine === object.machine && machine.location === object.farmLocation) return (parseFloat(Math.abs(machine.liters)) 
                  * (hoursPerMachine[rowId].percentages / 100)).toFixed(2) + " Lit."
                 else return null}) }
                 </td>

                <td>{fuelForComparison.map(machine => {
                    if (machine.machine === object.machine && machine.location === object.farmLocation) return (object.hoursSpentOnLastActivity / Math.abs(machine.liters)).toFixed(2)
                   else return null})}</td>
            </tr>
            )}  
        </tbody>
    )
}
   
          
    
