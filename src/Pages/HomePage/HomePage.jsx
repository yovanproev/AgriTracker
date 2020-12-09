import React, { useEffect, useState } from 'react';

import "./HomePage.scss"
import BackDrop from "../../Components/Backdrop/Backdrop"
// import PivotTableDemo from "../ReportsPage/PivotTable/PivotTable"
import { users } from '../../Firebase/Firebase.utils';
import Table from "../ReportsPage/TableGenerator/Table"
import { Admin } from '../../RuleBasedAccessControl/RoleBaseControl';
import 'firebase/firestore';


  const HomePage = (props) => {
  const [ user, setUser ] = useState([])

  useEffect(() => {
    async function getAllUsers() {
      const snapshot = await users().get();
       return new Promise (resolve => {
        const result = snapshot.docs.map(x => {
            const obj = x.data();
            delete obj.createdAt
            return obj;
        });
        return resolve(result);
      })
    }
    getAllUsers().then(resolve => {
      setUser(resolve)
    })
  }, [props])
    

  const [ role, setRole ] = useState([])
    const getRoleValue = (event) => {
    setRole(event)}
   
  const proba = (rowId) => {
    let roleDiff = ""
    if (role === "Administrator") roleDiff = "Administrator"
    else if (role === "Operator") roleDiff = "Operator"

    const usersDB = users();

    usersDB.get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          console.log(doc.id, " => ", doc.data().id);
         let randomKey = doc.id;
         
         const objectKey = doc.data().id
         const rows = user.filter((row) => row.id !== objectKey);
         console.log(rows)
         console.log(objectKey)

        if (rows !== objectKey) {
            usersDB.doc(randomKey).update({
              Roles: roleDiff 
          })
        }
       })
    })
  }

    // const deleteRowHandler = (rowId) => {
  //   const rows = table.filter((row) => row.id !== rowId);
    
  //    let db = firestore.ref();
  //    if (props.stateProps.index1) {
  //    let query = users.orderByKey();
  //    query.once("value")
  //      .then(function(snapshot) {
  //        console.log(snapshot)
  //        snapshot.forEach(function(childSnapshot) {
  //        let randomKeyOnObject = childSnapshot.key
  //        let objectId = childSnapshot.val().id
  //        if(rowId === objectId) {
  //         db.child("fuelConsumptionInput/"+randomKeyOnObject).remove();
  //         return true}
  //        })
  //       })
  //     }
  //   }
  
    return (
    <div>
     <BackDrop /> 
     <div className='home-page'>
       <h2>Hello!</h2>
       <div>
         <h4>Welcome to your App, to choose a module pick yourself a cherry.</h4>
       </div>
       <Admin currentUser={props.stateProps.currentUser}>
       <Table
          stateProps={props.stateProps}
          data={user}
          roleHandler={getRoleValue}
          role={proba}
          // onDelete={deleteRowHandler()} 
       />  
       </Admin>
      </div> 
      {/* <PivotTableDemo /> */}
    </div>
  )
}
  
  export default HomePage;