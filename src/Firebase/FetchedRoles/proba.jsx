import { users } from '../Firebase.utils';

const usersDB = users();
export const oo = usersDB.get()
   .then(function(querySnapshot) {
    const a = []
     querySnapshot.forEach(function(doc) {
       const objectKey = doc.data().id 
        const objectRole = doc.data().Role
        // updateDefaultRole(prev => [...prev, {objectRole, objectKey} ])
        
        return a.push({"objectKey": objectKey, "objectRole": objectRole})
     })
     return a
})


export const proba2 = oo.then(resolve => resolve)
    