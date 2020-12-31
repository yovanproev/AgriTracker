import React, { useEffect, useState } from 'react';

import "./HomePage.scss"
import BackDrop from "../../Components/Backdrop/Backdrop"
import Table from "../../Components/ReactTableLibrary/Table"
import { RenderForAdmin } from '../../RoleBasedAccessControl/RoleBaseControl';
import { getAllUsers } from "../../Firebase/FetchUsersFromFirestore"
import { updateUsersInFirestore } from '../../Firebase/UpdateUsersInFirestore';

const HomePage = (props) => {
   // get users table
  const [ user, setUser ] = useState([])

  
  useEffect(() => {
    getAllUsers().then(resolve => {
      setUser(resolve)
    })
    return () => {
      if (!props.stateProps.currentUser) {
              // console.log("cleanup")
      setUser(null)
    }
  }
}, [props.stateProps.currentUser])
    
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
     <BackDrop /> 
     <div className='home-page'>
       <h2>Hello!</h2>
       <div>
         <h4>Welcome to your App, to choose a module pick yourself a cherry.</h4>
       </div>
       <RenderForAdmin currentUser={props.stateProps.currentUser}>
       <Table
          stateProps={props.stateProps}
          data={user}
          getRoleValue={getRoleValue}
          onClick={onClickRowId}
          currentRole={role}
        />  
       </RenderForAdmin>
      </div> 
    </div>
  )
}
  
export default HomePage;