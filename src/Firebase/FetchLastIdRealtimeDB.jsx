import { firebase_db_fuelConsump, firebase_db_machineReg, 
         firebase_db_maintenance, firebase_db_workHours } from "./Firebase.utils";

export const getLastId = (props) => {
  return new Promise((resolve, reject)=>{
 
    const database = props.stateProps.selectedActivity === 0 ? firebase_db_fuelConsump : 
    props.stateProps.selectedActivity === 1 ? firebase_db_machineReg : 
    props.stateProps.selectedActivity === 2 ? firebase_db_maintenance : 
    props.stateProps.selectedActivity === 4 ? firebase_db_maintenance : null

    if (props.stateProps.selectedActivity === 3) {
      firebase_db_workHours.limitToLast(1).once('value').then((snapshot)=>{
          let origin = snapshot.val() === null || snapshot.val() === undefined ? parseInt(0) : snapshot.val()
          if (origin !== 0) { 
          const lastId = Object.values(origin).slice(-1)[0].slice(-1)[0].slice(-1)[0].id
          console.log(lastId)
          resolve(lastId)
          } else resolve(parseInt(0))
      }).catch(err => {
        reject(err)
      })
    }

  else {
    database.orderByChild("id")
     .startAt(1).limitToLast(1).once('value').then((snapshot)=>{
       let lastId = snapshot.val()  === null || snapshot.val()  === undefined ? 
       parseInt(0) : Object.values(snapshot.val()).slice(-1)[0].id
       resolve(lastId)
     }).catch(err => {
      reject(err)
     })
    }
  })
}

