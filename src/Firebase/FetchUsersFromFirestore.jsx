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

export function getUsersId() {
  const snapshot = users().get()
  const result = snapshot.then((querySnapshot) => {
    let arr = []
    querySnapshot.forEach((doc) => {
     const obj = doc.data().id;
      arr.push(obj);
      return arr   
      })
      return arr
   })
    return result
}
  
  
    
  export const lastUserId = () => {
    let arr = [getUsersId().then(res => res)]
     return Promise.all(arr.reduce(function(a, b) { 
       return a.concat(b); }, []))
     .then(function(results) {
       // results are in a flattened array
       return Math.max(...results[0])
   })
     
  }

  //  console.log(lastUserId())
