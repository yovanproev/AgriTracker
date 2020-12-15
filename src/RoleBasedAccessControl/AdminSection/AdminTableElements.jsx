import FetchedRoles from "../../Firebase/FetchedRoles/FetchedRoles"

const AdminTableElements = (props) => {
  
  return (
    <span>
      <FetchedRoles id={props.id}
        getRoleValue={props.getRoleValue} 
        onFocus={() => props.onClick}
        currentRole={props.currentRole}
        currentUser={props.stateProps.currentUser}
      />
    </span>
  )
}

export default AdminTableElements;
