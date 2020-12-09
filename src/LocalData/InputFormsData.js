import machineDB from "./MachineDB.json"
import locationDB from "./LocationDB.json"
import attachedMachineryDB from "./AttachedMachineryDB.json"
import productsDB from "./ProductsDB.json"
import operatorsDB from "./OperatorsDB.json"
import rolesDB from "./Roles.json"

export const fetchAllMachines = () => {
  return machineDB.data;
}

export const fetchMachineByName = machineId => {
  const data = machineDB.data.filter(machine => machine.id === parseInt(machineId));
  if (data.length > 0) {
    return data[0].name;
  } else {
    return data;
  }
};

export const fetchAllLocations = () => {
  return locationDB.data;
}

export const fetchLocationByName = locationId => {
  const data = locationDB.data.filter(location => location.id === parseInt(locationId));
  if (data.length > 0) {
    return data[0].name;
  } else {
    return data;
  }
};

export const fetchAllAttachedMachinery = () => {
  return attachedMachineryDB.data;
}

export const fetchAttachedMachineryByName = aMachineId => {
  const data = attachedMachineryDB.data.filter(aMachine => aMachine.id === parseInt(aMachineId));
  if (data.length > 0) {
    return data[0].name;
  } else {
    return data;
  }
};

export const fetchAllProducts = () => {
  return productsDB.data;
}

export const fetchProductsByName = productsId => {
  const data = productsDB.data.filter(products => products.id === parseInt(productsId));
  if (data.length > 0) {
    return data[0].name;
  } else {
    return data;
  }
};

export const fetchAllOperators = () => {
  return operatorsDB.data;
}

export const fetchOperatorsByName = operatorsId => {
  const data = operatorsDB.data.filter(operators => operators.id === parseInt(operatorsId));
  if (data.length > 0) {
    return data[0].name;
  } else {
    return data;
  }
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