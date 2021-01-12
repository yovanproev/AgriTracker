import { getDateAndTime } from "./GetDateTime";

export const fuelConsumptionInputObject = (props) => {
  let object = {
  id: props.lastId,
  machine: props.selectedMachineName,
  attachedMachinery: props.selectedAttachedMachineryName,
  liters: props.liters,
  kilometers: props.kilometersOnMachine,
  tankNumber: props.tankNum,
  location: props.selectedLocationName,
  operator: props.selectedOperatorName,
  date: props.date,
  timeOfEntry: getDateAndTime()
  }
  return object
};
 
 export const machineRegistrationInputObject = (props) => {
  let object = {
  id: props.lastId,
  machine: props.selectedMachineName,
  attachedMachinery: props.selectedAttachedMachineryName,
  farmLocation: props.selectedFarmName,
  product: props.selectedProductName,
  kilometers: props.kilometersOnMachine,
  operator: props.selectedOperatorName,
  date: props.date,
  timeOfEntry: getDateAndTime()
  }
  return object
};

export const maintenanceAndRepairsInputObject = (props) => {
  let object = {
  id: props.lastId,
  machine: props.selectedMachineName,
  attachedMachinery: props.selectedAttachedMachineryName,
  workedHours: props.workedHours,
  location: props.selectedLocationName,
  farmLocation: props.selectedFarmName,
  maintenanceOrRerairs: props.selectedMaintenanceName,
  explainTheActivity: props.explainTheActivity,
  externalTechnician: props.selectedExternalTechinicianName,
  manHours: props.manHours,
  jobDescription: props.selectedJobName,
  date: props.date,
  timeOfEntry: getDateAndTime()
  }
  return object
};

export const workingHoursInputObject = (props) => {
  // console.log(props)
  let object = props.nameOfEmployee.map((nameOfEmployee, index) => { 
    let arr = []
    for (let i = 0; i <= index; i++) {
     arr.push(i)
    }
    let increaseIdForNextEmployee = arr.slice(-1)[0]
    console.log("index", index)
    
    let selectedJobs = props.selectedMSJobDescriptionId
    return selectedJobs.map((jobDescription, i) => {
      
      console.log("i", i)
      // console.log(props.manHours[index].workHours[i].time)

    let object1 = {
    id: props.lastId + i + index + increaseIdForNextEmployee,
    date: props.date,
    typeOfHours: props.selectedTypeOfHoursName,
    location: props.selectedLocationName,
    project: props.selectedProjectName,
    
    jobDescription: jobDescription.name,
    manHours: (props.manHours[index].workHours[i] || []).time || 0,
    nameOfEmployee: nameOfEmployee,
    
    timeOfEntry: getDateAndTime()
    }
    return object1
  })
})
  return object
};

