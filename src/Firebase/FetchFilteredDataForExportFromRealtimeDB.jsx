import { firebase_db_fuelConsump, 
  // firebase_db_machineReg 
} from "./Firebase.utils";

export const getFilteredDataForExport =  (startingDate, endDate, props) => {
  return new Promise((resolve)=>{
   
  endDate = 0    
  if (props.stateProps.index1) {
   firebase_db_fuelConsump.orderByChild("date")
     .startAt(startingDate).once('value').then((snapshot)=>{
       resolve(snapshot.val())
        //  console.log(Object.values().filter(date => date.date >= endDate))
     })
   }
  //  else if (props.stateProps.index2) {
    // firebase_db_machineReg.orderByChild("date")
    //   .startAt(startingDate).limitToLast(endDate).once('value').then((snapshot)=>{
    //     resolve(snapshot.val())
    //   }).catch(err => {
    //     console.log(err)
    //   })
  //  }
  })
}
 
const startDate = "01-12-2020"
const endDate = "01-01-2021"
getFilteredDataForExport(startDate, endDate)