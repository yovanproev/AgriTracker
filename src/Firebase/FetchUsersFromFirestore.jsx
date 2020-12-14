import { users } from './Firebase.utils';

export async function getAllUsers() {
  const snapshot = await users().get();
   return new Promise (resolve => {
    const result = snapshot.docs.map(x => {
        const obj = x.data();
        delete obj.createdAt
        return obj;
    });
    return resolve(result);
  })
}