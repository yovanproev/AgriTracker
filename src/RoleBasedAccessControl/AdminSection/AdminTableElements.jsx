import FetchedRoles from "./FetchedRoles/FetchedRoles"
import RolesSelectField from "./RolesSelectField/RolesSelectField"

const AdminTableElements = (props) => {
   
  return (
     <div>
        <table>
          <tbody>
            <tr>
              <td>
              <FetchedRoles id={props.id}/>
                </td>
                <td>
                {props.stateProps.outputTable ? null : 
                <RolesSelectField 
                getRoleValue={props.getRoleValue} 
                onClick={() => props.onClick}
                currentRole={props.currentRole}
                currentUser={props.stateProps.currentUser}/>
                }
                </td>
               </tr>
             </tbody>
            </table>
        </div>
    )
  
}

export default AdminTableElements;
