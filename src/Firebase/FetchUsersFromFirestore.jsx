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
  


