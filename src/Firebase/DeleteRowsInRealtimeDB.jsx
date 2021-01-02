import { firebase_db, firebase_db_fuelConsump, firebase_db_machineReg, firebase_db_maintenance } from "./Firebase.utils";

export const deleteByRowId =  (rowId, props) => {
  return new Promise((resolve)=>{
    let db = firebase_db.ref();
    
   if (props.stateProps.index1) {
   firebase_db_fuelConsump.orderByChild("id")
     .endAt(rowId).limitToLast(1).once('value').then((snapshot)=>{
      //  console.log(Object.keys(snapshot.val()))
       const randomKeyFuel = Object.keys(snapshot.val())
       db.child("fuelConsumptionInput/"+randomKeyFuel).remove()
       resolve(snapshot.val())
     })
    }
   else if (props.stateProps.index2) {
     firebase_db_machineReg.orderByChild("id")
      .endAt(rowId).limitToLast(1).once('value').then((snapshot)=>{
       const randomKeyMach = Object.keys(snapshot.val())
        db.child("machineRegistrationInput/"+randomKeyMach).remove()
        resolve(snapshot.val())
      })
    }
    else if (props.stateProps.index3) {
      firebase_db_maintenance.orderByChild("id")
       .endAt(rowId).limitToLast(1).once('value').then((snapshot)=>{
        const randomKeyMach = Object.keys(snapshot.val())
         db.child("maintenanceAndRepairsInput/"+randomKeyMach).remove()
         resolve(snapshot.val())
       })
     }
  })
}
