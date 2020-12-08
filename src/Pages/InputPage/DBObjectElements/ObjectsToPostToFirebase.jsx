import { getDate, getTime } from "./GetDateTime";

export const fuelConsumptionInputObject = (props) => {
  let object = {
  id: props.lastId,
  machine: props.selectedMachineName,
  liters: props.liters,
  kilometers: props.kilometers,
  tankNumber: props.tankNumber,
  location: props.selectedLocationName,
  operator: props.selectedOperatorName,
  date: getDate(),
  timeOfEntry: getTime() 
  }
  return object
};
 
 export const machineRegistrationInputObject = (props) => {
  let object = {
  id: props.lastId,
  machine: props.selectedMachineName,
  attachedMachinery: props.selectedAttachedMachineryName,
  location: props.selectedLocationName,
  product: props.selectedProductName,
  kilometers: props.kilometers,
  line: props.line,
  block: props.block,
  operator: props.selectedOperatorName,
  date: getDate(),
  timeOfEntry: getTime() 
  }
  return object
};

