export const RenderForAdmin = (props) => {
 if (props.currentUser.Role === "Administrator") {
 return props.children
 } else return null
}

export const RenderForOperator = (props) => {
  if (props.currentUser.Role === "Operator" || props.currentUser.Role === "Administrator") {
    return props.children
    } 
  else return null
}

export const NoAuthorizationGiven = (props) => {
    if (props.currentUser.Role === "" || props.currentUser.Role === "Disabled") {
      return null
    }
    return null
 }