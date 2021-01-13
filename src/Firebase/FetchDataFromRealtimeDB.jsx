import { firebase_db_fuelConsump, firebase_db_machineReg, 
         firebase_db_maintenance, firebase_db_workHours } from "./Firebase.utils";

export const getPaginatedTableData = (count, limit, props) => {
  return new Promise((resolve)=>{
   
   count = count || 0; 
   limit = limit  || 10;
   
   if (props.stateProps.index1) {
   firebase_db_fuelConsump.orderByChild("id")
     .startAt(count).limitToLast(limit).once('value').then((snapshot)=>{
       resolve(snapshot.val())
     })
   }
   else if (props.stateProps.index2) {
    firebase_db_machineReg.orderByChild("id")
      .startAt(count).limitToLast(limit).once('value').then((snapshot)=>{
        resolve(snapshot.val())
      }).catch(err => {
        console.log(err)
      })
   }
   else if (props.stateProps.index3) {
    firebase_db_maintenance.orderByChild("id")
      .startAt(count).limitToLast(limit).once('value').then((snapshot)=>{
        resolve(snapshot.val())
      }).catch(err => {
        console.log(err)
      })
   }
   else if (props.stateProps.index4) {
      firebase_db_workHours.limitToLast(limit).once("value", function(snapshot) {
        let arr = []
        let origin = snapshot.val()
          Object.values(origin).forEach(child => 
            child.forEach((secondChild)=> {
              secondChild.map(x => arr.push(x))
            })
          )
        resolve(arr)
    })
    .catch(err => {
        console.log(err)
      })
   }
  })
}

let secondCounter = 1;
export const workHoursNextPage = () => {
  for (let i = 0; i < 1; i++) {
    secondCounter += 1;
  }
  return secondCounter 
}

export const workHoursPreviousPage = () => {
  for (let i = 0; i < 1; i++) {
    secondCounter -= 1;
  }
   return secondCounter
}


export let counter = 10;
export const nextPage = (props) => {
 for (let i = 0; i < 1; i++) {
  if (props.stateProps.index4) {
    counter = 10
    secondCounter++
    return counter += (counter - 20) + secondCounter}  
  else {
    // counter = 10;
    return counter += 10;
   }
  }
 return counter;
}

export const previousPage = (props) => {
  for (let i = 0; i < 1; i++) {
    if (props.stateProps.index4) {
      counter = 0
    secondCounter--
    return counter -= (counter) - secondCounter
  }
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






