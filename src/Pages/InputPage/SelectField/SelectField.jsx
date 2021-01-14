import React, { useState, useEffect } from "react"

import { 
  fetchAllMachines, fetchAllAttachedMachinery, 
  fetchAllLocations, fetchAllProducts, 
  fetchAllOperators, fetchAllExternalTechnicians,
  fetchAlljobDescriptions, fetchAllMaintenance,
  fetchAllTypeOfHours, fetchAllProjects } from "../../../LocalData/InputFormsData";
import "./SelectField.css"

const SelectField = ({id, onChange, value, machineImage, statename, selectedId, selectedMachineImage}) => {
  const [ fethcedData, updateFetchedData ] = useState([]);
  
  useEffect(() => {
    const fetching = id === 1 ? fetchAllMachines() :
    id === 2 ? fetchAllAttachedMachinery() :
    id === 3 ? fetchAllLocations() :
    id === 4 ? fetchAllProducts() :
    id === 5 ? fetchAllOperators() : 
    id === 6 ? fetchAllLocations() : 
    id === 7 ? fetchAlljobDescriptions() : 
    id === 8 ? fetchAllMaintenance() : 
    id === 9 ? fetchAllExternalTechnicians() :
    id === 10 ? fetchAllTypeOfHours() :
    id === 11 ? fetchAllProjects() : "Error"
   updateFetchedData(fetching)
 }, [id])

 
  const defaultValue = id === 1 ? "Select a machine" : 
  id === 2 ? "Select attached machinery" : 
  id === 3 ? "Select location" :
  id === 4 ? "Select a product" :
  id === 5 ? "Select an operator" : 
  id === 6 ? "Select a farm" : 
  id === 7 ? "Select a job description" :
  id === 8 ? "Select activity" :
  id === 9 ? "Select an External Technician" : 
  id === 10 ? "Select Type of Hours" :
  id === 11 ? "Select a Project" : "Error"
 
   return (
      <div >
        {id === 1 || id === 2 ? <img alt="" src={value ? machineImage : ""} className="select-picture"/> : null}
        <select className="select-div"
          onChange={(e) => onChange(parseInt(e.target.value), parseInt(e.target.id), e.target.name, selectedId, selectedMachineImage)}
          value={value ? value : ""}
          id={id}
          name={statename}
          selectedid={selectedId}
          selectedmachineimage={selectedMachineImage}
          >
          <option key={0} value={0}>
            {defaultValue}
          </option>
            {fethcedData.map((fields) => (
            <option key={fields.id} value={fields.id}>
            {fields.name} 
            </option>
            )) }
        </select>
      </div>
    )
  
}

export default SelectField;