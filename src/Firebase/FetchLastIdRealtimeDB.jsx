import { firebase_db_fuelConsump, firebase_db_machineReg, 
         firebase_db_maintenance, firebase_db_workHours } from "./Firebase.utils";

export const getLastId = (props) => {
  return new Promise((resolve)=>{
 
   if (props.stateProps.index1) {
   firebase_db_fuelConsump.orderByChild("id")
     .startAt(1).limitToLast(1).once('value').then((snapshot)=>{
       let lastId = snapshot.val()  === null || snapshot.val()  === undefined ? 
       parseInt(0) : Object.values(snapshot.val()).slice(-1)[0].id
       resolve(lastId)
     }).catch(err => {
       console.log(err)
     })
    }
    else if (props.stateProps.index2) {
      firebase_db_machineReg.orderByChild("id")
        .startAt(1).limitToLast(1).once('value').then((snapshot)=>{
          let lastId = snapshot.val()  === null || snapshot.val()  === undefined ? 
          parseInt(0) : Object.values(snapshot.val()).slice(-1)[0].id
          resolve(lastId)
        }).catch(err => {
        console.log(err)
      })
    }
    else if (props.stateProps.index3) {
      firebase_db_maintenance.orderByChild("id")
        .startAt(1).limitToLast(1).once('value').then((snapshot)=>{
          let lastId = snapshot.val()  === null || snapshot.val()  === undefined ? 
          parseInt(0) : Object.values(snapshot.val()).slice(-1)[0].id
          resolve(lastId)
        }).catch(err => {
        console.log(err)
      })
    }
    else if (props.stateProps.index4) {
      firebase_db_workHours.limitToLast(1).once('value').then((snapshot)=>{
           // resolve(snapshot.val())
          let origin = snapshot.val() === null || snapshot.val() === undefined ? parseInt(0) : snapshot.val()
          if (origin !== 0) { 
          const lastId = Object.values(origin).slice(-1)[0].slice(-1)[0].slice(-1)[0].id
          resolve(lastId)
          } else resolve(parseInt(0))
      }).catch(err => {
        console.log(err)
      })
    }
  })
}

