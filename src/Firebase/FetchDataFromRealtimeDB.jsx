import { firebase_db_fuelConsump, firebase_db_machineReg, 
         firebase_db_maintenance, firebase_db_workHours, firebase_db_purchaseRequests,
        firebase_db_authenticatedUsers } from "./Firebase.utils";

export const getPaginatedTableData = (count, limit, props, errorOnDB, activity) => {
  return new Promise((resolve) => {
   
   count = count || 0; 
   limit = limit  || 10;

   const database = props.stateProps.selectedActivity === 0 && !props.stateProps.adminSection ? firebase_db_fuelConsump : 
   props.stateProps.selectedActivity === 1 && !props.stateProps.adminSection ? firebase_db_machineReg : 
   props.stateProps.selectedActivity === 2 && !props.stateProps.adminSection ? firebase_db_maintenance : 
   props.stateProps.selectedActivity === 4 && !props.stateProps.adminSection ? firebase_db_purchaseRequests : 
   activity === 4 ? firebase_db_purchaseRequests : null
   
    if (props.stateProps.selectedActivity === 3 && !props.stateProps.adminSection) {
      firebase_db_workHours.limitToLast(limit).once("value", function(snapshot) {
        let arr = []
        let origin = snapshot.val()
          Object.values(origin).forEach(child => 
            child.forEach((secondChild)=> {
              secondChild.map(x => arr.push(x))
            })
          )
          if (snapshot.val() === null) {errorOnDB()}
        resolve(arr)
      }).catch(err => {
        errorOnDB()
      })
    }
    else if (props.stateProps.homeMode === true && activity !== 4) {
      firebase_db_authenticatedUsers.orderByChild("email")
      .startAt(count).limitToLast(limit).once('value').then((snapshot)=>{
        if (snapshot.val() === null) {errorOnDB()}
        resolve(snapshot.val())
      }).catch(err => {
         errorOnDB()
      })
    }
    else if (activity === 4) {
      firebase_db_purchaseRequests.orderByChild("id")
      .equalTo(count).limitToLast(limit).once('value').then((snapshot)=>{
        if (snapshot.val() === null) {errorOnDB()}
        resolve(snapshot.val())
      }).catch(err => {
         errorOnDB()
      })
    }
    else {
      database?.orderByChild("id")
      .startAt(count).limitToLast(limit).once('value').then((snapshot)=>{
        if (snapshot.val() === null) {errorOnDB()}
        resolve(snapshot?.val())
      }).catch(err => {
         errorOnDB()
      })
    }
  })
}

export let counter = 10;
export const nextPage = () => {
 for (let i = 0; i < 1; i++) {
     return counter += 10;
 }
 return counter;
}

export const previousPage = () => {
  for (let i = 0; i < 1; i++) {
     if (counter > 10) {
    counter -= 10
  } 
  else return null
  }
  return counter;
}

export let pageCounter = 0;
export const countNextPage = () => {
   pageCounter += 1;
}
export const countPreviousPage = () => {
  pageCounter -= 1;
}

export const resetCounter = () => {
   counter = 10;
   pageCounter = 0;
}






