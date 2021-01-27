import React, { useEffect, useState } from 'react';

import "./SelectFieldsData.scss"
import SelectField from "./SelectField/SelectField"
import BackButton from "../../../Components/BackButton/BackButton"
import Table from "../../../Components/ReactTableLibrary/Table"
import { getAllSelectionFields } from "../../../Firebase/FetchCollectionsFromFirestore"
import { updateUsersInFirestore } from '../../../Firebase/UpdateUsersInFirestore';

const SelectionFieldsUpdate = (props) => {
  const [ selectFieldValue, setSelectFieldValue ] = useState('')

   const [ fieldToModify, setfieldToModify ] = useState([])

  useEffect(() => {
    getAllSelectionFields(selectFieldValue).then(resolve => {
      setfieldToModify(resolve)})
    // return () => {
    //   if (!props.stateProps.currentUser) {
    //   setfieldToModify(null)
    //}
  // }
}, [selectFieldValue])
console.log(fieldToModify)    

  // get the table row number 
  const [ rowIdValue, setRowId ] = useState(undefined);
  const onClickRowId = (rowId) => {
    if (rowId.id !== undefined) setRowId(rowId.id)
    else return 0
  }

  // get the name of the Role from Firebase based on the id of the row
  const [ role, setRole ] = useState([])
  const getRoleValue = (roleValue) => {
    setRole(roleValue)
  }

  // post the new role to Firebase
  useEffect(() => {
    const rolesPosting = (rowId) => {
      updateUsersInFirestore(rowId, role)
    }
   if (rowIdValue !== undefined) rolesPosting(rowIdValue)
  }, [role, rowIdValue])

  return (
    <div>
     {/* <BackDrop />  */}
     <div className='home-page'>
       <BackButton onClick={props.onClick}/>
       <SelectField onChange={setSelectFieldValue} value={selectFieldValue}/>
      <Table
          stateProps={props.stateProps}
          selectFieldToModify={selectFieldValue}
          data={fieldToModify}
          getRoleValue={getRoleValue}
          onClick={onClickRowId}
          currentRole={role}
        />  
      </div> 
    </div>
  )
}
  
export default SelectionFieldsUpdate;