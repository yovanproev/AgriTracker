import axios from "axios";

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

