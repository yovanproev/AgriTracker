import FetchedRoles from "../../Firebase/FetchedRoles"

const AdminTableElements = (props) => {
  
  return (
    <div>
      <FetchedRoles id={props.id}
        getRoleValue={props.getRoleValue} 
        onClick={() => props.onClick}
        currentRole={props.currentRole}
        currentUser={props.stateProps.currentUser}
      />
    </div>
  )
}

export default AdminTableElements;
