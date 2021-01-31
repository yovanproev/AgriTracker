import { users, machines, attachedMachines, location, product,
  employees, jobDescriptions, technicians, projects } from './Firebase.utils';

export function updateUsersInFirestore(rowId, role) {
  users.orderBy("id").startAt(rowId).limit(1).get()
  .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
      // console.log(doc.id, " => ", doc.data());
      const randomKey = doc.id; 
       users.doc(randomKey).update({
            role: role
       })
    })
  })
}

export async function updateSelectFieldsInFirestore(selectField, newEntry, newSubCategory, hideModal) {
  const selectionFields = selectField === 0 ? null : 
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
       const tableData = data.data().id
      if (selectField)
      arr.push(tableData)
    })
  const lastId = Math.max(...arr)

  const category = selectField === 5 ? 
  {id: lastId + parseInt(1),
  name: newEntry,
  typeOfWorker: newSubCategory} : 
  selectField === 7 ? 
   {id: lastId + parseInt(1),
    name: newEntry,
    costCenter: newSubCategory} : 
    selectField !== 7 && selectField !== 5 ? 
   {id: lastId + parseInt(1),
    name: newEntry} : null

  selectionFields.doc().set({
   ...category
  })
  hideModal()
}

  

  
