import { machines, attachedMachines, location, product,
  employees, jobDescriptions, technicians, projects, jobsWithAMachine,
  suppliers, categoryOfMaterials, subCategoryOfMaterials } from './Firebase.utils';

export function deleteByRowId (rowId, selectField) {
  
  const selectionFields = selectField === 0 ? null : 
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

 selectionFields.orderBy("id").startAt(rowId).limit(1).get()
  .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
      // console.log(doc.id, " => ", doc.data());
      const randomKey = doc.id;
      selectionFields.doc(randomKey).delete()
          })
  })

  
    
  
}



