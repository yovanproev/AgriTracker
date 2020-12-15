const FetchedRoleToInputField = (props) => {
    return (
     <div>
        <input style={{width: "100%"}} type="text" disabled 
          value={props.value || ""}/>
     </div>
    )
  
}

export default FetchedRoleToInputField;