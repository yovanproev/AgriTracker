import { getDateAndTime } from "./GetDateTime";

export const fuelConsumptionInputObject = (props) => {
  let object = {
  id: props.lastId,
  machine: props.selectedMachineName,
  attachedMachinery: props.selectedAttachedMachineryName,
  liters: props.liters,
  kilometers: props.kilometers,
  tankNumber: props.tankNumber,
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
  kilometers: props.kilometers,
  operator: props.selectedOperatorName,
  date: props.date,
  timeOfEntry: getDateAndTime()
  }
  return object
};

