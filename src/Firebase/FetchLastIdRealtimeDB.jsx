import { firebase_db_fuelConsump, firebase_db_machineReg, firebase_db_maintenance } from "./Firebase.utils";

export const getLastId = (props) => {
  return new Promise((resolve)=>{
 
   if (props.stateProps.index1) {
   firebase_db_fuelConsump.orderByChild("id")
     .startAt(1).limitToLast(1).once('value').then((snapshot)=>{
       resolve(snapshot.val())
     }).catch(err => {
       console.log(err)
     })
    }
    else if (props.stateProps.index2) {
      firebase_db_machineReg.orderByChild("id")
        .startAt(1).limitToLast(1).once('value').then((snapshot)=>{
          resolve(snapshot.val())
        }).catch(err => {
        console.log(err)
      })
    }
    else if (props.stateProps.index3) {
      firebase_db_maintenance.orderByChild("id")
        .startAt(1).limitToLast(1).once('value').then((snapshot)=>{
          resolve(snapshot.val())
        }).catch(err => {
        console.log(err)
      })
    }
  })
}

