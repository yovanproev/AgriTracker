import React, { Component } from "react"

import "./RolesSelectField.css"
import { fetchAllRoles } from "../../LocalData/InputFormsData"
import { users } from '../../Firebase/Firebase.utils';

class RolesSelectField extends Component {
  state = {
    allRoles: fetchAllRoles(),
    currentRole: this.props.role()
  }

  proba = (rowId) => {
    console.log(rowId)
    const usersDB = users();
     usersDB.get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          // console.log(doc.id, " => ", doc.data());
         const randomKey = doc.id; 
         const objectKey = doc.data().id 
        console.log(randomKey)
        if (rowId === objectKey) {
            usersDB.doc(randomKey)
        }
       })
    })
  }


  render () {
    const a = this.state.currentRole 
    console.log(this.proba(1))
    return (
     <div >
       {a}
       <select className="roles-select-div"
          onChange={e => {this.props.roleHandler(e.target.value); this.props.role()}}
          // onClick={this.props.onClick}
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