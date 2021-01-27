import { machineDB } from "./MachineDB.js"
import { attachedMachineryDB } from "./AttachedMachineryDB"
import operatorsDB from "./OperatorsDB.json"
import jobDescriptionEmployeesDB from "./JobDescriptionsEmployees.json"
import rolesDB from "./Roles.json"
import inputFieldsDB from "./InputFields.json"
import selectFieldsDB from "./SelectFields.json"

export const fetchMachineByImage = machineId => {
  const data = machineDB.filter(machine => machine.id === parseInt(machineId));
  if (data.length > 0) {
    return data[0].image;
  } else {
    return data;
  }
};

export const fetchAttachedMachineryByImage = aMachineId => {
  const data = attachedMachineryDB.filter(aMachine => aMachine.id === parseInt(aMachineId));
  if (data.length > 0) {
    return data[0].image;
  } else {
    return data;
  }
};

export const fetchAllOperators = () => {
  return operatorsDB.data;
}

export const fetchOperatorsByTypeOfWorker = typeOfWork => {
  const data = operatorsDB.data.filter(operators => operators.typeOfWorker === typeOfWork);
     return data;
};

export const fetchAllRoles = () => {
  return rolesDB.data;
}

export const fetchRolesByName = rolesId => {
  const data = rolesDB.data.filter(roles => roles.id === parseInt(rolesId));
  if (data.length > 0) {
    return data[0].name;
  } else {
    return data;
  }
};

export const fetchAllJobDescriptionsEmployees = () => {
  return jobDescriptionEmployeesDB.data;
}

export const fetchAllinputFields = () => {
  return inputFieldsDB.inputFields;
}

export const fetchAllSelectFields = () => {
  return selectFieldsDB.selectFields;
}

export const fetchSelectFieldsToBeModified = () => {
  return selectFieldsDB.selectFields;
}

