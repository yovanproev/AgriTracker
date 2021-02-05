import { getDateAndTime } from "./GetDateTime";

 
export const fuelConsumptionInputObject = (props) => {
  let object
   
  const toNegativeNumber = (num) => -Math.abs(num);
  
  props.selectedSpendingOrPurchaseId === 1 ?
  object = {
    id: props.lastId,
    fuelChoice: props.spendingOrPurchase,
    machine: props.selectedMachineName,
    attachedMachinery: props.selectedAttachedMachineryName,
    liters: toNegativeNumber(props.liters),
    kilometers: props.kilometersOnMachine,
    tankNumber: props.tankNum,
    location: props.selectedLocationName,
    operator: props.selectedOperatorName,
    date: props.date,
    tankResidual: props.tankResidual ? 
    (+parseFloat(props.tankResidual) - +parseFloat(props.liters)).toFixed(1) : parseInt(0),
    litersMissing: (+parseFloat(props.tankNum) - +parseFloat(props.lastTankNumber)).toFixed(1) - +parseFloat(props.liters),
    timeOfEntry: getDateAndTime()
  } :
  object = {
    id: props.lastId,
    date: props.date,
    fuelChoice: props.spendingOrPurchase,
    operator: props.selectedOperatorName,
    supplierOfFuel: props.supplierOfFuel,
    liters: props.liters,
    tankNumber: props.tankNum,
    location: props.selectedLocationName,
    tankResidual: props.tankResidual ? 
    (+parseFloat(props.tankResidual) + +parseFloat(props.liters)).toFixed(1) : parseFloat(props.liters),
    deliveryNote: props.deliveryNote,
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
  machinesJob: props.machinesJobs,
  hoursSpentOnLastActivity: props.hoursSpentOnLastActivity ? 
  (+parseFloat(props.hoursSpentOnLastActivity) - +parseFloat(props.kilometersOnMachine)).toFixed(1) : parseInt(0),
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
  workedHours: +parseFloat(props.workedHours).toFixed(1),
  location: props.selectedLocationName,
  farmLocation: props.selectedFarmName,
  maintenanceOrRerairs: props.selectedMaintenanceName,
  explainTheActivity: props.explainTheActivity,
  technician: props.selectedTechnicianName,
  // manHours: props.manHours,
  costOfTechnician: +parseFloat(props.costOfTechnician).toFixed(1),
  jobDescription: props.selectedJobName,
  date: props.date,
  timeOfEntry: getDateAndTime()
  }
  return object
};

export const workingHoursInputObject = (props) => {
  
  let object = props.nameOfEmployee.map((nameOfEmployee, index) => { 
    let arr = []
    for (let i = 0; i <= index; i++) {
     arr.push(i)
    }
    let increaseIdForNextEmployee = arr.slice(-1)[0]
    
    let selectedJobs = props.selectedMSJobDescriptionId
    return selectedJobs.map((jobDescription, i) => {
    let object1 = {
    id: props.lastId + i + index + increaseIdForNextEmployee,
    date: props.date,
    typeOfHours: props.selectedTypeOfHoursName,
    location: props.selectedLocationName,
    project: props.selectedProjectName,
    costCenter: jobDescription.costCenter,
    
    jobDescription: jobDescription.name,
    manHours: parseFloat((props.manHours[index].workHours[i] || []).time) || parseInt(0),
    nameOfEmployee: nameOfEmployee,
    
    // numberOfEmployee: index,
    // numberOfJob: i,

    timeOfEntry: getDateAndTime()
    }
    return object1
  })
})
  return object
};

export const purcahseRequestsInputObject = (props) => {
  let object = {
  id: props.lastId,
  date: props.date,
  operator: props.selectedOperatorName,
  supplier: props.supplier,
  categoryOfMaterials: props.categoryOfMaterials,
  subCategoryOfMaterials: props.subCategoryOfMaterials,
  quantity: props.quantity,
  price: props.price,
  purposeOfPurchase: props.purposeOfPurchase,
  statusOfRequest: "Pending",
  timeOfEntry: getDateAndTime()
  }
  return object
};