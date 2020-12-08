import React, { Component } from "react"

import "./RolesSelectField.css"
import { users } from "../../Firebase/Firebase.utils"
import 'firebase/firestore';
import firebase from 'firebase/app';

class RolesSelectField extends Component {
  state = {
    roles: [
      {name: "Administrator"},
      {name: "Operator"}
    ]
  }

  selectRolesFieldHandler = (event) => {
    this.setState({value: event.target.value })
  }

  rolesHandler = () => {
    const usersDB = users().doc("7Rg9OYltabdm4loqFvarsJMkJk83");
    
    return usersDB.update({
        "Roles": this.state.roles[0]
    }) 
    .then(function() {
        console.log("Document successfully updated!");
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
  }

  render () {
    return (
     <div >
       <select className="roles-select-div"
          onChange={this.selectRolesFieldHandler}
          value={this.state.value}
          onClick={this.rolesHandler}
          // id={this.props.id}
          >
          <option key={0} value={0}>
            {"Select a role"}
          </option>
          {this.state.roles.map((fields) => (
          <option key={Math.random() * 1000} value={fields.id}>
          {fields.name} 
          </option>)) 
          }  
        </select>
      </div>
    )
  }
}

export default RolesSelectField;