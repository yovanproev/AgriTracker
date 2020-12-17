import { users } from './Firebase.utils.jsx';

export async function getAllUsers() {
  const snapshot = await users().get();
   return new Promise (resolve => {
    const result = snapshot.docs.map(x => {
        const obj = x.data();
        delete obj.createdAt
        return obj;
    });
    return resolve(result)
  })
}

// export async function getUsersKey() {
//   await users().get()
//   .then((querySnapshot) => {
//       querySnapshot.forEach((doc) => 
//       new Promise(resolve => {
//           const result = doc.id;
//           console.log(result)
//           return resolve(result);
//         }));
//     })
// }

export let array = []
export function getUsersId() {
  const snapshot = users().get()
  return new Promise(resolve => {
  const result = snapshot.then((querySnapshot) => {
    // console.log(snapshot) // promise fullfield
    // console.log(querySnapshot) // promise fullfield
    querySnapshot.forEach((doc) => {
     const obj = doc.data().id;
      array.push(obj);
      // console.log(array)
      resolve(array)
    })
  })
    return result
  })
}
  
       

//  export async function lastUserId() {
//   let arr = [getUsersId().then(res => res)];
//   // console.log(arr) rejected promise
//   const results = await Promise.all(arr.reduce(function (flat, toFlatten) {
//      return flat.concat(toFlatten);
//    }, []));
//    return results;
// }
  
      // console.log(lastUserId())
