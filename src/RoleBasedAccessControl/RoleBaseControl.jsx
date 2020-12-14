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

