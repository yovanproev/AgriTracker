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
  let object = props.namesOfEmployees.map((x, index) => { 
    let selectedJobs = props.selectedMSJobDescriptionId
    return selectedJobs.map((y, i) => {

    let object1 = {
    id: props.lastId + index + i,
    date: props.date,
    typeOfHours: props.selectedTypeOfHoursName,
    location: props.selectedLocationName,
    project: props.selectedProjectName,
    
    jobDescription: y.name,
    manHours: Object.values(props.manHours)[index],
    namesOfEmployees: Object.values(x)[0],
    
    timeOfEntry: getDateAndTime()
    }
    return object1
  })
})
  return object
};

