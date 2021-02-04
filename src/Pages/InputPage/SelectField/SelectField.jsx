import React, { useState, useEffect } from "react"
import { getSelectionByField } from "../../../Firebase/FetchCollectionsFromFirestore";

import "./SelectField.css"

const SelectField = ({id, onChange, value, machineImage, statename, selectedId, 
                       selectedMachineImage, stopComponentDidUpdate, onFocusHandler }) => {
  
  const [ fetchedData, updateFetchedData ] = useState([]);
  
  useEffect(() => {
    getSelectionByField(id).then(resolve => {
      updateFetchedData(resolve)})
  }, [id])
  
  const arrayOfZeroValueOnSelectField = ["Select a machine", "Select attached machinery", "Select location",
  "Select a product", "Select an operator", "Select a farm", "Select a job description", "Select activity",
  "Select a Technician", "Select Type of Hours", "Select a Project", "", "Select type of entry", "Select a job",
"Select a supplier", "Select Category of Materials", "Select Subcategory of Materials"]

  const defaultValue = arrayOfZeroValueOnSelectField[id - 1]

   return (
      <div >
        {id === 1 || id === 2 ? <img alt="" src={value ? machineImage : ""} className="select-picture"/> : null}
        <select className="select-div"
          onChange={(e) => {onChange(parseInt(e.target.value), parseInt(e.target.id), 
            e.target.name, selectedId, selectedMachineImage); 
            if(id === 1 || id === 2 || id === 3) {stopComponentDidUpdate()}
           }
          }
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