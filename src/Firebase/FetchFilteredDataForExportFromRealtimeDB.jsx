import { firebase_db_fuelConsump, firebase_db_machineReg, 
         firebase_db_maintenance, firebase_db_workHours} from "./Firebase.utils";

export const getFilteredDataForExport = (startingDate, endDate, props) => {
  return new Promise((resolve)=>{
  
    if (props.stateProps.index1) {
   firebase_db_fuelConsump.orderByChild("date")
   .startAt(startingDate).once('value').then((snapshot)=>{
     const initialArray = Object.values(snapshot.val())
    resolve(getFilteredArray(endDate, initialArray))
    }).catch(err => {
    console.log(err)
    })
   }
   else if (props.stateProps.index2) {
    firebase_db_machineReg.orderByChild("date")
      .startAt(startingDate).once('value').then((snapshot)=>{
        const initialArray = Object.values(snapshot.val())
        resolve(getFilteredArray(endDate, initialArray))
      }).catch(err => {
        console.log(err)
      })
   }
   else if (props.stateProps.index3) {
    firebase_db_maintenance.orderByChild("date")
      .startAt(startingDate).once('value').then((snapshot)=>{
        const initialArray = Object.values(snapshot.val())
        resolve(getFilteredArray(endDate, initialArray))
      }).catch(err => {
        console.log(err)
      })
   }
   else if (props.stateProps.index4) {
    firebase_db_workHours.orderByChild("date")
      .startAt(startingDate).once('value').then((snapshot)=>{
        const initialArray = Object.values(snapshot.val())
        console.log(initialArray)
        resolve(getFilteredArray(endDate, initialArray))
      }).catch(err => {
        console.log(err)
      })
   }
  })
}
 
const getFilteredDataForExport1 = () => {
  firebase_db_workHours
  // .orderByChild("date")
   // .startAt("13-01-2021")
  .once('value').then((snapshot)=>{
    const initialArray = Object.values(snapshot.val())[0][1][1]
    console.log(initialArray)
    console.log(snapshot.val())
  })
  }

  getFilteredDataForExport1()


// Firebase doesn't allow querying the base with start and end parameter at the same time,
// so this function filters the array fetched from the starting date to the end of the base
// by filtering with the set end date
const getFilteredArray = (endDate, initialArray) => {
  // console.log(startingDate, endDate)
  let endDay = endDate.slice(0, 2)    
  let endMonth = endDate.slice(3, 5) - 1    
  let endYear = endDate.slice(6, 10)    
  
  function getByDate(date){
    return initialArray.filter(function (el) {
      return el.date === date;
    });
  }
  
function reformatDate(date) {
    return getByDate(date.split('-').reverse());
  }
  
  var sortByDate = function (a, b) {
    return new Date(reformatDate(a.date)) - new Date(reformatDate(b.date));
  };
  
  let sortedDataByDate = initialArray.sort(sortByDate)
  
  var filteredDataByEndDate = [];
           
    for(var index in sortedDataByDate) {
        var obj = sortedDataByDate[index];
        var date = parseDate(obj.date);
  
        if(date <= new Date(endYear, endMonth, endDay))
         filteredDataByEndDate.push(obj);
    }

    function parseDate(dateStr) {
        var date = dateStr.split('-');
        var day = date[0];
        var month = date[1] - 1; //January = 0
        var year = date[2];
        return new Date(year, month, day); 
    }
  
 return filteredDataByEndDate;
}