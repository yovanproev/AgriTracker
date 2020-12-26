import { users } from './Firebase.utils';

export async function updateUsersInFirestore(rowId, role) {
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

// export async function updateUsersInFirestore(rowId, role) {
//   users.get()
//   .then(function(querySnapshot) {
//     querySnapshot.forEach(function(doc) {
//       // console.log(doc.id, " => ", doc.data());
//       const randomKey = doc.id; 
//       const objectKey = doc.data().id
//      if (rowId === objectKey) {
//         users.doc(randomKey).update({
//             role: role
//         })
//       }
//     })
//   })
// }
  
