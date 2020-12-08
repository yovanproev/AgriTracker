import React, { Component } from "react"

import { 
  fetchAllMachines, 
  fetchAllAttachedMachinery, 
  fetchAllLocations, 
  fetchAllProducts, 
  fetchAllOperators } from "../../../LocalData/InputFormsData";
import "./SelectField.css"

class SelectField extends Component {
  state = {
    machineChosen: [],
    aMachineChosen: [],
    locationChosen: [],
    productChosen: [],
    operatorChosen: [],    
  }

  componentDidMount() {
    const machineData = fetchAllMachines();
    const aMachineData = fetchAllAttachedMachinery();
    const locationData = fetchAllLocations();
    const productData = fetchAllProducts();
    const operatorData = fetchAllOperators();
    this.setState({ 
      machineChosen: machineData,
      aMachineChosen: aMachineData,
      locationChosen: locationData,
      productChosen: productData,
      operatorChosen: operatorData
     });
  }

 render () {
  const machineData = 
   this.props.id === 1 ? 
            <select className="select-div"
             onChange={(e) => this.props.onChange(parseInt(e.target.value), parseInt(e.target.id))}
             value={this.props.value ? this.props.value : ""}
             id={this.props.id}
             >
              <option key={0} value={0}>
               {"Select a machine"}
              </option>
                {this.state.machineChosen.map((fields) => (
                <option key={fields.id} value={fields.id}>
                {fields.name} 
                </option>
               )) }
            </select>
           : null
 
  const aMachineryData = 
  this.props.id === 2 ? 
  <select className="select-div"
    onChange={(e) => this.props.onChange(parseInt(e.target.value), parseInt(e.target.id))}
    value={this.props.value ? this.props.value : ""}
    id={this.props.id}
    >
    <option key={0} value={0}>
      {"Select attached machinery"}
    </option>
      {this.state.aMachineChosen.map((fields) => (
      <option key={fields.id} value={fields.id}>
      {fields.name} 
      </option>
      )) }
  </select>
  : null

  const locationData = 
  this.props.id === 3 ? 
  <select className="select-div"
    onChange={(e) => this.props.onChange(parseInt(e.target.value), parseInt(e.target.id))}
    value={this.props.value ? this.props.value : ""}
    id={this.props.id}
    >
    <option key={0} value={0}>
      {"Select location"}
    </option>
      {this.state.locationChosen.map((fields) => (
      <option key={fields.id} value={fields.id}>
      {fields.name} 
      </option>
      )) }
  </select>
  : null

  const productData = 
  this.props.id === 4 ? 
  <select className="select-div"
    onChange={(e) => this.props.onChange(parseInt(e.target.value), parseInt(e.target.id))}
    value={this.props.value ? this.props.value : ""}
    id={this.props.id}
    >
    <option key={0} value={0}>
      {"Select a product"}
    </option>
      {this.state.productChosen.map((fields) => (
      <option key={fields.id} value={fields.id}>
      {fields.name} 
      </option>
      )) }
  </select>
  : null

  const operatorData = 
  this.props.id === 5 ? 
  <select className="select-div"
    onChange={(e) => this.props.onChange(parseInt(e.target.value), parseInt(e.target.id))}
    value={this.props.value ? this.props.value : ""}
    id={this.props.id}
    >
    <option key={0} value={0}>
      {"Select an operator"}
    </option>
      {this.state.operatorChosen.map((fields) => (
      <option key={fields.id} value={fields.id}>
      {fields.name} 
      </option>
      )) }
  </select>
  : null

  return (
          <div >
               {machineData}
               {aMachineryData}
               {locationData}
               {productData}
               {operatorData}
          </div>
)
}
}

export default SelectField;