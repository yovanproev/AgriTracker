import { users, machines, attachedMachines, location, product,
         employees, jobDescriptions, technicians, projects,
         typeOfWorkOnTractors, typeOfStaff, spendingOrPurchaseOfFuel, 
         jobDescriptionsTractors} from './Firebase.utils';

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
  selectField === 11 ? projects : machines
  
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
  const field =  [selectField]?.slice(-1)[0];
  
  const selectionFields = field === 0 ? null :
  field === 1 ? machines :
  field === 2 ? attachedMachines :
  field === 3 ? location :
  field === 4 ? product :
  field === 5 ? employees :
  field === 6 ? location :
  field === 7 ? jobDescriptionsTractors  :
  field === 8 ? typeOfWorkOnTractors :
  field === 9 ? technicians :
  field === 10 ? typeOfStaff :
  field === 11 ? projects : 
  field === 12 ?  jobDescriptions: 
  field === 13 ? spendingOrPurchaseOfFuel : null
  
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