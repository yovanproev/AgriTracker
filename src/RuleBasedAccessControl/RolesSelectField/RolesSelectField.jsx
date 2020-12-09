import React, { Component } from "react"

import "./RolesSelectField.css"
import { fetchAllRoles } from "../../LocalData/InputFormsData"

class RolesSelectField extends Component {
  state = {
    allRoles: fetchAllRoles()
  }

  render () {
    return (
     <div >
       <select className="roles-select-div"
          onChange={e => this.props.roleHandler(e.target.value)}
          onClick={this.props.role}
         >
          <option key={0} value={0}>
            {"Select a role"}
          </option>
          {this.state.allRoles.map((fields) => (
          <option key={fields.id} value={fields.name}>
          {fields.name} 
          </option>)) 
          }  
        </select>
      </div>
    )
  }
}

export default RolesSelectField;