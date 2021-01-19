import { firebase_db_fuelConsump } from "./Firebase.utils";

export const getTankResidual = (location) => {
  return new Promise((resolve, reject)=>{
 
    firebase_db_fuelConsump.orderByChild("location")
     .endAt(location).limitToLast(1).once('value').then((snapshot)=>{
       let lastLocation = snapshot.val()  === null || snapshot.val()  === undefined ? 
       parseInt(0) : Object.values(snapshot.val()).slice(-1)[0].tankResidual
      console.log(lastLocation)
       resolve(lastLocation)
     }).catch(err => {
      reject(err)
     })
 })
}

