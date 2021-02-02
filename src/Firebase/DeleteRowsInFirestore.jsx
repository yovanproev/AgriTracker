import { machines, attachedMachines, location, product,
  employees, jobDescriptions, technicians, projects, jobsWithAMachine } from './Firebase.utils';

export function deleteByRowId (rowId, selectField) {
  // console.log(selectField, "select")
  // console.log(rowId, "row")
  
  const selectionFields = selectField === 0 ? null : 
  selectField === 1 ? machines :
  selectField === 2 ? attachedMachines :
  selectField === 3 ? location :
  selectField === 4 ? product :
  selectField === 5 ? employees :
  selectField === 7 ? jobDescriptions :
  selectField === 9 ? technicians :
  selectField === 11 ? projects :
  selectField === 14 ? jobsWithAMachine : machines

 selectionFields.orderBy("id").startAt(rowId).limit(1).get()
  .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
      // console.log(doc.id, " => ", doc.data());
      const randomKey = doc.id;
      selectionFields.doc(randomKey).delete()
          })
  })

  
    
  
}



