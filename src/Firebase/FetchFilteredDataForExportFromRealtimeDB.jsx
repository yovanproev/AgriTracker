import { firebase_db_fuelConsump, firebase_db_machineReg, 
         firebase_db_maintenance, firebase_db_workHours, firebase_db_purchaseRequests} from "./Firebase.utils";

export const getFilteredDataForExport = (startingDate, endDate, props) => {
  return new Promise((resolve, reject)=>{
    
    const database = props.stateProps.selectedActivity === 0 && props.stateProps.outputTable ? firebase_db_fuelConsump : 
    props.stateProps.selectedActivity === 1 && props.stateProps.outputTable ? firebase_db_machineReg : 
    props.stateProps.selectedActivity === 2 && props.stateProps.outputTable ? firebase_db_maintenance : 
    props.stateProps.selectedActivity === 4 && props.stateProps.outputTable ? firebase_db_purchaseRequests :
    props.stateProps.selectedActivity === 1 && props.stateProps.adminSection ? firebase_db_fuelConsump : 
    props.stateProps.selectedActivity === 2 && props.stateProps.adminSection ? firebase_db_machineReg : 
    props.stateProps.selectedActivity === 3 && props.stateProps.adminSection ? firebase_db_maintenance : null

    if (startingDate !== "null-null-null" && endDate !== "null-null-null") { 
      
      if (props.stateProps.selectedActivity === 3 && props.stateProps.outputTable) {
        firebase_db_workHours.once('value').then((snapshot)=>{
          let arr = []
          let secondArray = []
          let lengthOfArr = []
          let origin = snapshot.val()
            Object.values(origin).forEach(child => 
              child.forEach((secondChild)=> {
                secondChild.map(x => arr.push(x))
                secondArray.push(getFilteredArrayStartDate(startingDate, arr))
                const arrayLength = secondArray.length - 1
                lengthOfArr.push(arrayLength)
              })
            )
            resolve(getFilteredArray(endDate, secondArray[lengthOfArr.slice(-1)[0]]))
        }).catch(err => {
            reject(err)
        })
      } else if (props.stateProps.selectedActivity === 4 && props.stateProps.adminSection) {
        firebase_db_workHours.once('value').then((snapshot)=>{
          let arr = []
          let secondArray = []
          let lengthOfArr = []
          let origin = snapshot.val()
            Object.values(origin).forEach(child => 
              child.forEach((secondChild)=> {
                secondChild.map(x => arr.push(x))
                secondArray.push(getFilteredArrayStartDate(startingDate, arr))
                const arrayLength = secondArray.length - 1
                lengthOfArr.push(arrayLength)
              })
            )
            resolve(getFilteredArray(endDate, secondArray[lengthOfArr.slice(-1)[0]]))
        }).catch(err => {
          reject(err)
        })
      } 
      else if (props.stateProps.selectedActivity === 2 && props.stateProps.adminSection) {
          let mergeFuelAndMachineReg = []
          firebase_db_fuelConsump.orderByChild("date")
          .startAt(startingDate).once('value').then((snapshot)=>{
            const initialArray = snapshot.val() === null ? [] : Object.values(snapshot.val())
             mergeFuelAndMachineReg.push(getFilteredArray(endDate, initialArray))
            })
            
            firebase_db_machineReg.orderByChild("date")
            .startAt(startingDate).once('value').then((snapshot)=>{
              const initialArray = Object.values(snapshot.val())
              mergeFuelAndMachineReg.push(getFilteredArray(endDate, initialArray))
              resolve(mergeFuelAndMachineReg)
            }).catch(err => {
          reject(err)
        })
      }
       else {
        database.orderByChild("date")
        .startAt(startingDate).once('value').then((snapshot)=>{
          const initialArray = Object.values(snapshot.val())
          resolve(getFilteredArray(endDate, initialArray))
          }).catch(err => {
            reject(err)
          })
      }
    }
  })
}
 
// Firebase doesn't allow querying the base with start and end parameter at the same time,
// so this function filters the array fetched from the starting date to the end of the base
// by filtering with the set end date
const getFilteredArray = (endDate, initialArray) => {
  
  const endDay = endDate.slice(0, 2)
  const endMonth = endDate.slice(3, 5) - 1    
  const endYear = endDate.slice(6, 10)   
    
  const sortByDate = (a, b) => {
   return new Date(reformatDate(b.date)) - new Date(reformatDate(a.date)); // show in descending order
  };

  function reformatDate(date) {
      return date.split('-').reverse() // format ["2021", "01", "25"], in order to be able to create Data object
  }
    
//  function getByDate(date){
  //  return initialArray.filter(function (el) {
     //  console.log(el.date) // format 20-01-2021
      // console.log(date) // array od data od site objekti ["2021", "01", "25"]
      // console.log(new Date(date)) // sozdave data objekt
  //     return el.date === date;
  //   });
  // }
 
  let sortedDataByDate = initialArray.sort(sortByDate)

  const filteredDataByEndDate = [];
           
    for(const index in sortedDataByDate) {
        const obj = sortedDataByDate[index];
        const date = parseDate(obj.date);
  
        if(date <= new Date(endYear, endMonth, endDay))
         filteredDataByEndDate.push(obj);
    }

    function parseDate(dateStr) {
        const date = dateStr.split('-');
        const day = date[0];
        const month = date[1] - 1; //January = 0
        const year = date[2];
        return new Date(year, month, day); 
    }
    
   return filteredDataByEndDate;
}

const getFilteredArrayStartDate = (startDate, initialArray) => {
  
  const startingDay = startDate.slice(0, 2)    
  const startingMonth = startDate.slice(3, 5) - 1    
  const startingYear = startDate.slice(6, 10)    
  
  function getByDate(date){
    return initialArray.filter(function (el) {
      return el.date === date;
    });
  }
  
function reformatDate(date) {
    return getByDate(date.split('-').reverse());
  }
  
  const sortByDate = function (a, b) {
    return new Date(reformatDate(a.date)) - new Date(reformatDate(b.date));
  };
  
  const sortedDataByDate = initialArray.sort(sortByDate)
  
  const filteredDataByStartingDate = [];
           
    for(const index in sortedDataByDate) {
        const obj = sortedDataByDate[index];
        const date = parseDate(obj.date);
  
        if(date >= new Date(startingYear, startingMonth, startingDay))
         filteredDataByStartingDate.push(obj);
    }

    function parseDate(dateStr) {
        const date = dateStr.split('-');
        const day = date[0];
        const month = date[1] - 1; //January = 0
        const year = date[2];
        return new Date(year, month, day); 
    }
  
 return filteredDataByStartingDate;
}