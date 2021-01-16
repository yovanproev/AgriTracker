import { users } from './Firebase.utils';

export async function getAllUsers(props) {
  // console.log(props.stateProps)
  const snapshot = await users.get();
  let arr = []
  snapshot.forEach((data) => {
     const tableData = data.data()
    // console.log(data.id, "=>", data.data())
    if (props.stateProps)
    arr.push(tableData)
  })
  return arr
}
  