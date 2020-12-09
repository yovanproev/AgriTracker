import React, { Component } from "react";

import axiosLocal from "../../AxiosInput";

import { 
  fetchMachineByName, 
  fetchLocationByName, 
  fetchOperatorsByName, 
  fetchProductsByName, 
  fetchAttachedMachineryByName } from "../../LocalData/InputFormsData";

import FuelConsumptionInput from "./InputForms/FuelConsumptionInputForm";
// import IrrigationInput from "./InputForms/IrrigationInputForm";
import MachineRegistrationInput from "./InputForms/MachineRegistrationInputForm";
// import WorkingHoursInput from "./InputForms/WorkingHoursInputForm";
import { getFullDataFromFirebase } from "../../Firebase/FetchDataFromFirebase";
import { fuelConsumptionInputObject, machineRegistrationInputObject } from "./DBObjectElements/ObjectsToPostToFirebase";
import Modal from "../../Components/Modal/Modal"

class InputSelection extends Component { 
  state = {
    submit: true,
    loading: false,
    submitButtonDisabled: "",
    lastId: "",
    
    kilometers: undefined,
    liters: undefined,
    tankNumber: undefined,
    line: undefined,
    block: undefined,
    date: undefined,
    timeOfEntry: undefined,

    selectedMachineId: undefined,
    selectedAttachedMachineryId: undefined,
    selectedLocationId: undefined,
    selectedProductId: undefined,
    selectedOperatorId: undefined,

    inputFields: [
      {id: 1, name: "Kilometers"},
      {id: 2, name: "Liters"},
      {id: 3, name: "Tank #"},
      {id: 4, name: "Line"},
      {id: 5, name: "Block"},
    ],
    
    selectFields: [
      {id: 1, name: "Machine"},
      {id: 2, name: "Attached machinery"},
      {id: 3, name: "Location"},
      {id: 4, name: "Product"},
      {id: 5, name: "Operator"},
    ]
  }
  
  UNSAFE_componentWillMount () {
  const fullData = getFullDataFromFirebase(this.props)
    if (this.props.stateProps.index1 || this.props.stateProps.index2) {  
    fullData.then(res => 
        this.setState({
          lastId: res === undefined ? parseInt(0) : parseInt(res.slice(-1)[0].id)  
        })
      )
    }
  }
      
  shouldComponentUpdate (nextProps, nextState) {
    // console.log("shouldComponent Update")
   return nextProps.lastId !== this.state.lastId 
  }

  updateId = () => {
    this.setState({
      lastId: parseInt(this.state.lastId) + parseInt(1)
    })
    // console.log("updateId", this.state.lastId)
  }

  selectFieldsHandler = (value, id) => {
    if (id === this.state.selectFields[0].id) {
       this.setState( {
        selectedMachineId: value,
        selectedMachineName: fetchMachineByName(value)})
    }
    else if (id === this.state.selectFields[1].id) {
      this.setState({
     selectedAttachedMachineryId: value,
     selectedAttachedMachineryName: fetchAttachedMachineryByName(value)})
    }
    else if (id === this.state.selectFields[2].id) {
      this.setState({
     selectedLocationId: value,
     selectedLocationName: fetchLocationByName(value)})
    }
    else if (id === this.state.selectFields[3].id) {
      this.setState({
        selectedProductId: value,
        selectedProductName: fetchProductsByName(value)})
    }
    else if (id === this.state.selectFields[4].id) {
      this.setState({
        selectedOperatorId: value,
        selectedOperatorName: fetchOperatorsByName(value)})
    }
  };
  
   inputFieldsHandler = (value, id) => {
     const noNegatives2DecimalsOnly = value.toString().split(".")
     .map((el,i)=>i?el.split("").slice(0,1).join(""):el).join(".")
     
    if (id === this.state.inputFields[0].id) {
      this.setState({
       kilometers: noNegatives2DecimalsOnly
      })
    } 
    else if (id === this.state.inputFields[1].id) {
      this.setState({
        liters: noNegatives2DecimalsOnly
      })
    }
    else if (id === this.state.inputFields[2].id) {
      this.setState({
        tankNumber: noNegatives2DecimalsOnly
      })
    }
    else if (id === this.state.inputFields[3].id) {
      this.setState({
        line: noNegatives2DecimalsOnly
      })
    }
    else if (id === this.state.inputFields[4].id) {
      this.setState({
        block: noNegatives2DecimalsOnly
      })
    }
  }

  formSubmitHandler = (event) => {
      event.preventDefault()
  
      this.setState((prevState)=> ({ 
      ...prevState,
      submit: false,
      loading: true
      }))
         
      const checkForActivity = this.props.stateProps.index1 ? fuelConsumptionInputObject(this.state) 
      : this.props.stateProps.index2 ? machineRegistrationInputObject(this.state) : null 

      const URLPostSource = this.props.stateProps.index1 ? '/fuelConsumptionInput.json' 
      : this.props.stateProps.index2 ? '/machineRegistrationInput.json' : null 
      
      if (!isNaN(this.state.lastId)) {
      axiosLocal.post(URLPostSource, checkForActivity)
       .then(response => 
        {this.setState({
          loading: false,
          submit:true,
          selectedMachineId: undefined,
          selectedAttachedMachineryId: undefined,
          selectedLocationId: undefined,
          selectedProductId: undefined,
          selectedOperatorId: undefined,
          kilometers: undefined,
          liters: undefined,
          tankNumber:undefined,
          line: undefined,
          block: undefined,
          date: undefined,
          timeOfEntry: undefined,
          })})
       .catch(error => 
        {this.setState({
          loading: false,
          submit:true,
          selectedMachineId: undefined,
          selectedAttachedMachineryId: undefined,
          selectedLocationId: undefined,
          selectedProductId: undefined,
          selectedOperatorId: undefined,
          kilometers: undefined,
          liters: undefined,
          tankNumber:undefined,
          line: undefined,
          block: undefined,
          date: undefined,
          timeOfEntry: undefined,
          error: true,
        })})
      } else {
        throw new Error("last enrty ID couldn't be retrieved from the server, please refresh the page")
      }
  
    }


  render () {
    
    const moduleInProgress = <Modal show={this.props.stateProps.hideModal} 
    hide={this.props.modal}>Module Still In Progress</Modal> 
    const errorModal = <Modal show={this.state.error} 
    hide={this.props.modal}>Network error while posting data to Database, your entry is not recorded.</Modal> 

      return (
    <div>
      {errorModal}
      {this.props.stateProps.index1 === true ?
      <FuelConsumptionInput 
      updateId={this.updateId}
      onClick={this.props.onClick}
      stateProps={this.props.stateProps}
      localState={this.state}
      selectFieldsHandler={this.selectFieldsHandler}
      inputFieldsHandler={this.inputFieldsHandler} 
      formHandler={this.formSubmitHandler} /> : null}

      {this.props.stateProps.index2 === true ?
      <MachineRegistrationInput 
      updateId={this.updateId}
      onClick={this.props.onClick}
      stateProps={this.props.stateProps}
      localState={this.state}
      selectFieldsHandler={this.selectFieldsHandler}
      inputFieldsHandler={this.inputFieldsHandler} 
      formHandler={this.formSubmitHandler} /> : null}
      
      {this.props.stateProps.index3 === true ? 
      moduleInProgress 
      // <IrrigationInput 
      // updateId={this.updateId}
      // onClick={this.props.onClick}
      // stateProps={this.props.stateProps}
      // localState={this.state}
      // selectFieldsHandler={this.selectFieldsHandler}
      // inputFieldsHandler={this.inputFieldsHandler} 
      // formHandler={this.formSubmitHandler} /> 
      : null}

      {this.props.stateProps.index4 === true ?
       moduleInProgress 
      // <WorkingHoursInput 
      // updateId={this.updateId}
      // onClick={this.props.onClick}
      // stateProps={this.props.stateProps}
      // localState={this.state}
      // selectFieldsHandler={this.selectFieldsHandler}
      // inputFieldsHandler={this.inputFieldsHandler} 
      // formHandler={this.formSubmitHandler} /> 
      : null}
    </div>
  )
 }
}

export default InputSelection;