import React, { useState, useEffect } from "react"
import { getSelectionByField } from "../../../Firebase/FetchCollectionsFromFirestore";

import "./SelectField.css"

const SelectField = ({id, onChange, value, machineImage, statename, selectedId, 
                       selectedMachineImage, stopComponentDidUpdate, onFocusHandler }) => {
  
  const [ fetchedData, updateFetchedData ] = useState([]);
  
  useEffect(() => {
    getSelectionByField(id).then(resolve => {
      updateFetchedData(resolve)})
    // return () => {
    //   if (!props.stateProps.currentUser) {
    //   updateFetchedData(null)
    //}
  // }
}, [id])
  
 const defaultValue = id === 1 ? "Select a machine" : 
  id === 2 ? "Select attached machinery" : 
  id === 3 ? "Select location" :
  id === 4 ? "Select a product" :
  id === 5 ? "Select an operator" : 
  id === 6 ? "Select a farm" : 
  id === 7 ? "Select a job description" :
  id === 8 ? "Select activity" :
  id === 9 ? "Select a Technician" : 
  id === 10 ? "Select Type of Hours" :
  id === 11 ? "Select a Project" : 
  id === 13 ? "Select type of entry" : "Error"
 
   return (
      <div >
        {id === 1 || id === 2 ? <img alt="" src={value ? machineImage : ""} className="select-picture"/> : null}
        <select className="select-div"
          onChange={(e) => {onChange(parseInt(e.target.value), parseInt(e.target.id), 
            e.target.name, selectedId, selectedMachineImage); if(id === 3 || id === 1) 
            {stopComponentDidUpdate()}}}
          value={value ? value : ""}
          id={id}
          name={statename}
          selectedid={selectedId}
          selectedmachineimage={selectedMachineImage}
          onFocus={(e) => id === 1 || id === 2 ? onFocusHandler(e.target.id) : null}
          >
          <option key={0} value={0}>
            {defaultValue}
          </option>
            {fetchedData.map((fields) => (
            <option key={fields.id} value={fields.id}>
            {fields.name} 
            </option>
            )) }
        </select>
      </div>
    )
  
}

export default SelectField;