import rolesDB from "./Roles.json"
import inputFieldsDB from "./InputFields.json"
import selectFieldsDB from "./SelectFields.json"

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

export const fetchAllinputFields = () => {
  return inputFieldsDB.inputFields;
}

export const fetchAllSelectFields = () => {
  return selectFieldsDB.selectFields;
}

export const fetchSelectFieldsToBeModified = () => {
  return selectFieldsDB.selectFields;
}

