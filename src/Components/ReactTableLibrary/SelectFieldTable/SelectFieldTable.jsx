import React from "react"
import {fetchStatusOfPurchase} from "../../../LocalData/InputFormsData"

import "./SelectFieldTable.css"

const SelectFieldTable = ({onChange, value, onFocus, id}) => {
  const status = fetchStatusOfPurchase()

  return (
      <div >
        <select className="select-div-table"
          onChange={(e) => onChange(parseInt(e.target.value))}
          // value={value ? value : ""}
          onFocus={onFocus}
          id={id}
          >
          <option key={0} value={0}> Select a status </option>
          {status.map((fields) => (
            <option key={fields.id} value={fields.id}>
            {fields.name} 
            </option>
            )) }
        </select>
      </div>
    )
  
}

export default SelectFieldTable;