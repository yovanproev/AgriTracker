import React, { useState} from "react"
import { Multiselect } from 'multiselect-react-dropdown';
import { fetchAllJobDescriptionsEmployees} from "../../../LocalData/InputFormsData"

const MultiSelectField = ({ onSelect, id, value }) => {
 const [ selectedValue, updateSelectedValue ] = useState([])

 const state = {
    options: fetchAllJobDescriptionsEmployees()
 };

  const onSelectHandler = (selectedList) => {
   onSelect(selectedList) 
   updateSelectedValue(selectedList)
  }

  const onRemove = (selectedList) => {
    onSelect(selectedList) 
    updateSelectedValue(selectedList) 
  }

  return (
    <Multiselect
    value={value}
    id={id}
    style={{multiselectContainer: 
      {width: "50%", margin: "auto", marginTop: "20px"}}}
    options={state.options} // Options to display in the dropdown
    selectedValues={selectedValue} // Preselected value to persist in dropdown
    onSelect={onSelectHandler} // Function will trigger on select event
    onRemove={onRemove} // Function will trigger on remove event
    displayValue="name" // Property name to display in the dropdown options
    />
  )
}

export default MultiSelectField;