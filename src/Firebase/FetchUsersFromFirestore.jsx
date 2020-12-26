import { users } from './Firebase.utils';

export async function getAllUsers() {
  const snapshot = await users.get();
  let arr = []
  snapshot.forEach((data) => {
     const tableData = data.data()
    // console.log(data.id, "=>", data.data())
    arr.push(tableData)
  })
  return arr
}
  
// export function getAllUsers() {
//   return new Promise((resolve) => {
//   // const snapshot = await users.get();
//   let arr = []
//   users.onSnapshot((querySnapshot) => {
//      querySnapshot.forEach((doc) => {
//         console.log(doc.data())
//      return resolve(arr.push(doc.data()))
      
//       })
     
//   }, (err) => {
//     console.log(err)
//      return null
//   })
  
// })
//   // snapshot.forEach((data) => {
//   //   // console.log(data)
//   //   const tableData = data.data()
//   //   // console.log(data.id, "=>", data.data())
//   //   arr.push(tableData)
//   // })
//   // return arr
// }

// // getAllUsers1()