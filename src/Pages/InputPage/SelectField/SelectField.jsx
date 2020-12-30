import React, { useState, useEffect } from "react"

import { 
  fetchAllMachines, 
  fetchAllAttachedMachinery, 
  fetchAllLocations, 
  fetchAllProducts, 
  fetchAllOperators } from "../../../LocalData/InputFormsData";
import "./SelectField.css"

const SelectField = ({id, onChange, value, machineImage}) => {
  const [ fethcedData, updateFetchedData ] = useState([]);
  
  useEffect(() => {
    const fetching = id === 1 ? fetchAllMachines() :
    id === 2 ? fetchAllAttachedMachinery() :
    id === 3 ? fetchAllLocations() :
    id === 4 ? fetchAllProducts() :
    id === 5 ? fetchAllOperators() : "Error"
   updateFetchedData(fetching)
 }, [id])

 
  const defaultValue = id === 1 ? "Select a machine" : 
  id === 2 ? "Select attached machinery" : 
  id === 3 ? "Select location" :
  id === 4 ? "Select a product" :
  id === 5 ? "Select an operator" : "Error"
 
   return (
      <div >
        {id === 1 || id === 2 ? <img alt="" src={value ? machineImage : ""} className="select-picture"/> : null}
        <select className="select-div"
          onChange={(e) => onChange(parseInt(e.target.value), parseInt(e.target.id))}
          value={value ? value : ""}
          id={id}
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