import { firebase_db, firebase_db_fuelConsump, firebase_db_machineReg, 
         firebase_db_maintenance, firebase_db_workHours, firebase_db_purchaseRequests,
        firebase_db_authenticatedUsers } from "./Firebase.utils";

export const updateByRowId = (rowId, props, numberOfEmployee, numberOfJob, updates, activity, errorOnDB) => {
  return new Promise((resolve, reject)=>{
    let db = firebase_db.ref();
    
    const database = props.stateProps.selectedActivity === 0 ? firebase_db_fuelConsump : 
    props.stateProps.selectedActivity === 1 ? firebase_db_machineReg : 
    props.stateProps.selectedActivity === 2 ? firebase_db_maintenance : 
    props.stateProps.selectedActivity === 4 || activity === 4 ? firebase_db_purchaseRequests : null

    const firstChild = props.stateProps.selectedActivity === 0 ? "fuelConsumptionInput/" : 
    props.stateProps.selectedActivity === 1 ? "machineRegistrationInput/" : 
    props.stateProps.selectedActivity === 2 ? "maintenanceAndRepairsInput/" :
    props.stateProps.selectedActivity === 4 || activity === 4 ? "purchaseRequests/" : null

    if (props.stateProps.selectedActivity === 3) {
      firebase_db_workHours.orderByChild("id")
      .endAt(rowId).limitToLast(1).once('value').then((snapshot)=>{
       const randomKey = Object.keys(snapshot.val())
       db.child("workingHoursInput/"+ randomKey + "/" + numberOfEmployee + "/" + numberOfJob).update(updates)
       resolve(snapshot.val())
      }).catch(err => {
        reject(err)
      })
     }
     else {
      database.orderByChild("id")
        .equalTo(rowId).limitToLast(1).once('value').then((snapshot)=>{
          if (snapshot.val() === null || snapshot.val() === undefined) {errorOnDB()}  
          else {const randomKey = Object.keys(snapshot.val())
          db.child(firstChild + randomKey).update(updates)
         resolve(snapshot.val()) }
        }).catch(err => {
          errorOnDB()
          reject(err)
        })
     }
  })
}

export const updateAuthUsers = (updates, email) => {
  return new Promise((resolve, reject)=>{
    let db = firebase_db.ref();
    
    firebase_db_authenticatedUsers.orderByChild("email")
        .endAt(email).limitToLast(1).once('value').then((snapshot)=>{
          // console.log(rowId)
          const randomKey = Object.keys(snapshot.val())
          const posted = "posted"
          db.child('authenticatedUsers/' + randomKey + "/" + posted).update(updates)
          resolve(snapshot.val())
        }).catch(err => {
          reject(err)
        })
     })
}
