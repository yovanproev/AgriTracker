import React, { useEffect, useState } from 'react';

import "./SelectFieldsData.scss"
import SelectField from "./SelectField/SelectField"
import BackButton from "../../../Components/BackButton/BackButton"
import Table from "../../../Components/ReactTableLibrary/Table"
import { getAllSelectionFields } from "../../../Firebase/FetchCollectionsFromFirestore"
import { updateSelectFieldsInFirestore } from '../../../Firebase/SetAndUpdateCollectionsInFirestore';
import { deleteByRowId } from '../../../Firebase/DeleteRowsInFirestore';

const SelectionFieldsUpdate = (props) => {
  const [ selectFieldId, setSelectFielId ] = useState('')

  const [ categoryOfSelection, setCategoryOfSelection ] = useState([])

  useEffect(() => {
    getAllSelectionFields(selectFieldId).then(resolve => {
      setCategoryOfSelection(resolve)})
 }, [selectFieldId])
 
  const [ newEntry, setNewEntry ] = useState('')

  const onChangeHandler = (value) => {
   setNewEntry(value)
  }

  const [ newSubEntry, setNewSubEntry ] = useState('')

  const onChangeHandlerForSubEntry = (value) => {
    setNewSubEntry(value)
  }

  const [ newImage, setNewImage ] = useState('')

  const onChangeHandlerForImage = (value) => {
    setNewImage(value)
  }

  const deleteRowHandler = (rowId) => {
    const rows = categoryOfSelection.filter((row) => row.id !== rowId);
    deleteByRowId(rowId, selectFieldId)
    setCategoryOfSelection(rows) 
  }

    return (
    <div>
     {/* <BackDrop />  */}
     <div className='home-page'>
       <BackButton onClick={props.onClick}/>
       <SelectField onChange={setSelectFielId} value={selectFieldId}/>
      <Table
          stateProps={props.stateProps}
          selectFieldToModify={selectFieldId}
          data={categoryOfSelection}
          onDelete={deleteRowHandler}
       /> 
       <label className="form-check-label">
       <input type="text" className="form-control" placeholder="name" value={newEntry} 
       onChange={(e) => onChangeHandler(e.target.value)}/>
       </label>
       {(selectFieldId !== 5 && selectFieldId !== 7 && selectFieldId !== 1 && selectFieldId !== 2) ? 
       <button type="submit" className="btn btn-success" 
       onClick={() => updateSelectFieldsInFirestore(selectFieldId, newEntry) }
       >Submit new field</button> : null } 
       

       
       {selectFieldId === 5 || selectFieldId === 7 ? 
       <div style={{margin: "20px 0"}}>
       <label className="form-check-label">
       <input type="text" className="form-control" value={newSubEntry} placeholder="subcategory" 
       onChange={(e) => onChangeHandlerForSubEntry(e.target.value)}/>
       </label>
       <button type="submit" className="btn btn-success" 
       onClick={() => updateSelectFieldsInFirestore(selectFieldId, newEntry, newSubEntry) }
       >Submit new field</button> 
       </div> : null}

       {selectFieldId === 1 || selectFieldId === 2 ? 
       <div style={{margin: "20px 0"}}>
       <label htmlFor="exampleFormControlFile1">
       <input  type="file" className="form-control-file" value={newImage} placeholder="subcategory" 
       onChange={(e) => onChangeHandlerForImage(e.target.value)}/>
       </label>
       <button type="submit" className="btn btn-success" 
       onClick={() => updateSelectFieldsInFirestore(selectFieldId, newEntry) }
       >Submit new field</button> 
       </div> : null}    
       
      </div> 
    </div>
  )
}
  
export default SelectionFieldsUpdate;