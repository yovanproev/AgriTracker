import Modal from "../Components/Modal/Modal"

export const RenderForAdmin = ({currentUser, ...other}) => {
  // console.log("render for admin")
if (currentUser.role === "Administrator") {
 return other.children
 } else return null
}

export const RenderForOperator = ({currentUser, ...other}) => {
  if (currentUser.role === "Operator") {
    return other.children
    } 
  else if (currentUser.role === "Administrator") {
    return other.children
  }
  else if (currentUser.role === "Disabled") {
   return <Modal show={true}>Your account is disabled, please contact the Administrator!</Modal>
  }
  return  <Modal show={true}>Please contact the Administrator to get authorization!</Modal>
}

