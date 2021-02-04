import { users, machines, attachedMachines, location, product,
         employees, jobDescriptions, technicians, projects,
         typeOfWorkOnTractors, typeOfStaff, spendingOrPurchaseOfFuel, 
         jobDescriptionsTractors, jobsWithAMachine, suppliers, 
        categoryOfMaterials, subCategoryOfMaterials} from './Firebase.utils';

export async function getAllUsers(props) {
  const snapshot = await users.get();
  let arr = []
  snapshot.forEach((data) => {
     const tableData = data.data()
    if (props.stateProps)
    arr.push(tableData)
  })
  return arr
}
 
export async function getAllSelectionFields(selectField) {
  
  const selectionFields = selectField === 0 ? machines :
  selectField === 1 ? machines :
  selectField === 2 ? attachedMachines :
  selectField === 3 ? location :
  selectField === 4 ? product :
  selectField === 5 ? employees :
  selectField === 7 ? jobDescriptions :
  selectField === 9 ? technicians :
  selectField === 11 ? projects : 
  selectField === 14 ? jobsWithAMachine : 
  selectField === 15 ? suppliers : 
  selectField === 16 ? categoryOfMaterials :
  selectField === 17 ? subCategoryOfMaterials : machines
  
  const snapshot = await selectionFields.get();
  let arr = []
  snapshot.forEach((data) => {
     const tableData = data.data()
    // console.log(data.id, "=>", data.data())
    if (selectField)
    arr.push(tableData)
  })
  return arr
}

export async function getSelectionByField(selectField) {
  const field = [selectField]?.slice(-1)[0];
  
  const selectionFields = [null, machines, attachedMachines, location, product, employees,
  location, jobDescriptionsTractors, typeOfWorkOnTractors, technicians, typeOfStaff, projects,
  jobDescriptions, spendingOrPurchaseOfFuel, jobsWithAMachine, suppliers, categoryOfMaterials, 
subCategoryOfMaterials]

  const selectionField = selectionFields[field]
  
  const snapshot = await selectionField.get();
  let arr = []
  snapshot.forEach((data) => {
     const tableData = data.data()
    // console.log(data.id, "=>", data.data())
    if (selectField)
    arr.push(tableData)
  })
  return arr
}