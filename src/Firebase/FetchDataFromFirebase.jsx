import axios from "axios";
import { firebase_db_fuelConsump } from "./Firebase.utils";

export const urlSource1 = "https://input-output-data.firebaseio.com/fuelConsumptionInput.json" 
export const urlSource2 =  "https://input-output-data.firebaseio.com/machineRegistrationInput.json"

export const getFullDataFromFirebase = (props) => {
  const urls = [urlSource1, urlSource2]
  let requests = urls.map((url) => {
    return axios.get(url)
  });

return Promise.all(requests)
 .then((responses) => {
    const resOne = responses[0].data;
    const resTwo = responses[1].data;
        // console.log(Object.values(resOne))
    return (
      props.stateProps.index1 ? Object.values(resOne) 
      : props.stateProps.index2 ? Object.values(resTwo) 
      : null);
  })
  .catch((err) => {
    throw new Error(err)     
  })
}

export let counter = 10;
export const nextPage = () => {
 for (let i = 0; i < 1; i++) {
    counter += 10;
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

export const getPaginatedTableData =  (count,limit) => {
  return new Promise((resolve)=>{

  count = count || 0; 
  limit = limit  || 10;

    firebase_db_fuelConsump.orderByChild("id")
    .startAt(count).limitToFirst(limit).once('value').then((snapshot)=>{
      resolve(snapshot.val())
    })
  
  })
}






