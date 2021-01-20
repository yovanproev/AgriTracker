import { machineDB } from "./MachineDB.js"
import locationDB from "./LocationDB.json"
import { attachedMachineryDB } from "./AttachedMachineryDB"
import productsDB from "./ProductsDB.json"
import operatorsDB from "./OperatorsDB.json"
import technicianDB from "./TechnicianDB.json"
import jobDescriptionDB from "./JobDescriptionDB.json"
import maintenanceDB from "./MaintenanceDB.json"
import jobDescriptionEmployeesDB from "./JobDescriptionsEmployees.json"
import projectsDB from "./Projects.json"
import typeOfHoursDB from "./TypeOfHours.json"
import rolesDB from "./Roles.json"
import inputFieldsDB from "./InputFields.json"
import selectFieldsDB from "./SelectFields.json"
import fuelChoice from "./FuelChoice.json"
// import costCenters from "./CostCenters.json"

export const fetchAllMachines = () => {
  return machineDB;
}

export const fetchMachineByName = machineId => {
  const data = machineDB.filter(machine => machine.id === parseInt(machineId));
  if (data.length > 0) {
    return data[0].name;
  } else {
    return data;
  }
};

export const fetchMachineByImage = machineId => {
  const data = machineDB.filter(machine => machine.id === parseInt(machineId));
  if (data.length > 0) {
    return data[0].image;
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
  return attachedMachineryDB;
}

export const fetchAttachedMachineryByName = aMachineId => {
  const data = attachedMachineryDB.filter(aMachine => aMachine.id === parseInt(aMachineId));
  if (data.length > 0) {
    return data[0].name;
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

export const fetchAllMaintenance = () => {
  return maintenanceDB.data;
}

export const fetchMaintenanceByName = maintenanceId => {
  const data = maintenanceDB.data.filter(maintenance => maintenance.id === parseInt(maintenanceId));
  if (data.length > 0) {
    return data[0].name;
  } else {
    return data;
  }
};

export const fetchAllExternalTechnicians = () => {
  return technicianDB.data;
}

export const fetchExternalTechnicianByName = techniciansId => {
  const data = technicianDB.data.filter(techicians => techicians.id === parseInt(techniciansId));
  if (data.length > 0) {
    return data[0].name;
  } else {
    return data;
  }
};

export const fetchAlljobDescriptions = () => {
  return jobDescriptionDB.data;
}

export const fetchJobDescriptionsByName = jobDescriptionsId => {
  const data = jobDescriptionDB.data.filter(jobDescription => jobDescription.id === parseInt(jobDescriptionsId));
  if (data.length > 0) {
    return data[0].name;
  } else {
    return data;
  }
};

export const fetchAllJobDescriptionsEmployees = () => {
  return jobDescriptionEmployeesDB.data;
}

export const fetchJobDescriptionsEmployeesByName = jobDescriptionsEmployesId => {
  const data = jobDescriptionEmployeesDB.data.filter(jobDescriptionEmployees => jobDescriptionEmployees.id === parseInt(jobDescriptionsEmployesId));
  if (data.length > 0) {
    return data[0].name;
  } else {
    return data;
  }
};

export const fetchAllProjects = () => {
  return projectsDB.data;
}

export const fetchProjectsByName = projectsId => {
  const data = projectsDB.data.filter(projects => projects.id === parseInt(projectsId));
  if (data.length > 0) {
    return data[0].name;
  } else {
    return data;
  }
};

export const fetchAllTypeOfHours = () => {
  return typeOfHoursDB.data;
}

export const fetchTypeOfHoursByName = typeOfHoursId => {
  const data = typeOfHoursDB.data.filter(typeOfHours => typeOfHours.id === parseInt(typeOfHoursId));
  if (data.length > 0) {
    return data[0].name;
  } else {
    return data;
  }
};

export const fetchAllinputFields = () => {
  return inputFieldsDB.inputFields;
}

export const fetchAllSelectFields = () => {
  return selectFieldsDB.selectFields;
}

export const fetchAllFuelChoices = () => {
  return fuelChoice.data;
}

export const fetchFuelChoicesByName = fuelChoiceId => {
  const data = fuelChoice.data.filter(fuelChoice => fuelChoice.id === parseInt(fuelChoiceId));
  if (data.length > 0) {
    return data[0].name;
  } else {
    return data;
  }
};

