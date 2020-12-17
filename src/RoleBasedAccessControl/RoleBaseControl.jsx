import Modal from "../Components/Modal/Modal"

export const RenderForAdmin = (props) => {
if (props.currentUser.Role === "Administrator") {
 return props.children
 } else return null
}

export const RenderForOperator = (props) => {
  if (props.currentUser.Role === "Operator") {
    return props.children
    } 
  else if (props.currentUser.Role === "Administrator") {
    return props.children
  }
  return props.currentUser ? <Modal show={true}>Please contact the Administrator to get authorization!</Modal> : null
}

