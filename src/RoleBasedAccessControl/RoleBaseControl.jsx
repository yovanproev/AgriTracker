import Modal from "../Components/Modal/Modal"

export const RenderForAdmin = ({stateProps, ...other}) => {
  if (stateProps.role === "Administrator") {
 return other.children
 } else return null
}

export const RenderForOperator = ({stateProps, ...other}) => {
  if (stateProps.role === "Operator") {
    return other.children
    } 
  else if (stateProps.role === "Administrator") {
    return other.children
  }
  else if (stateProps.role === "Disabled") {
    return <Modal show={stateProps.role === "Disabled"}>Your account is disabled, please contact the Administrator!</Modal>
  }
  else return  <Modal show={stateProps.role === ""}>Please contact the Administrator to get authorization!</Modal>
}

