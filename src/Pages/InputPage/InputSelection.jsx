import React, { Component } from "react";

import axiosLocal from "../../AxiosInput";

import { 
  fetchMachineByName, 
  fetchLocationByName, 
  fetchOperatorsByName, 
  fetchProductsByName, 
  fetchAttachedMachineryByName,
  fetchMachineByImage,
  fetchAttachedMachineryByImage } from "../../LocalData/InputFormsData";

import FuelConsumptionInput from "./InputForms/FuelConsumptionInputForm";
// import IrrigationInput from "./InputForms/IrrigationInputForm";
import MachineRegistrationInput from "./InputForms/MachineRegistrationInputForm";
// import WorkingHoursInput from "./InputForms/WorkingHoursInputForm";
import { getLastId } from "../../Firebase/FetchLastIdRealtimeDB";
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
    selectedFarmId: undefined,

    inputFields: [
      {id: 1, name: "Kilometers on Machine"},
      {id: 2, name: "Liters"},
      {id: 3, name: "Tank #"},
   ],
    
    selectFields: [
      {id: 1, name: "Machine"},
      {id: 2, name: "Attached machinery"},
      {id: 3, name: "Location"},
      {id: 4, name: "Product"},
      {id: 5, name: "Operator"},
      {id: 6, name: "Farm"},
    ]
  }
  
  UNSAFE_componentWillMount () {
  const fullData = getLastId(this.props)
  if (this.props.stateProps.index1 || this.props.stateProps.index2) {  
     fullData.then(res => { 
       this.setState({
          lastId: res === null ? parseInt(0) : parseInt(Object.values(res).slice(-1)[0].id)  
        })
      }).catch(err => {
        throw new Error(err)
      })
   }
  }
      
  shouldComponentUpdate (nextProps, ) {
    // console.log("shouldComponent Update")
   return nextProps.lastId !== this.state.lastId 
  }

  updateId = () => {
    this.setState({
      lastId: parseInt(this.state.lastId) + parseInt(1)
    })
  }

  selectFieldsHandler = (value, id) => {
    if (id === this.state.selectFields[0].id) {
       this.setState( {
        selectedMachineId: value,
        selectedMachineName: fetchMachineByName(value),
        selectedMachineImage: fetchMachineByImage(value)})
    }
    else if (id === this.state.selectFields[1].id) {
      this.setState({
     selectedAttachedMachineryId: value,
     selectedAttachedMachineryName: fetchAttachedMachineryByName(value),
     selectedAttachedMachineryByImage: fetchAttachedMachineryByImage(value)})
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
    else if (id === this.state.selectFields[5].id) {
      this.setState({
        selectedFarmId: value,
        selectedFarmName: fetchLocationByName(value)})
    }
  };
  
   inputFieldsHandler = (value, id) => {
     const oneDecimalOnly = value.toString().split(".")
     .map((el,i)=>i?el.split("").slice(0,1).join(""):el).join(".")
     
    if (id === this.state.inputFields[0].id) {
      this.setState({
       kilometers: oneDecimalOnly
      })
    } 
    else if (id === this.state.inputFields[1].id) {
      this.setState({
        liters: oneDecimalOnly
      })
    }
    else if (id === this.state.inputFields[2].id) {
      this.setState({
        tankNumber: oneDecimalOnly
      })
    }
    else if (id === this.state.inputFields[3].id) {
      this.setState({
        line: oneDecimalOnly
      })
    }
    else if (id === this.state.inputFields[4].id) {
      this.setState({
        block: oneDecimalOnly
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
      // console.log(this.props.stateProps.tokenId, this.props.stateProps.email)
      const queryParams = '?auth=' + this.props.stateProps.tokenId + '&auth.token.email=' + this.props.stateProps.email;
    
      const URLPostSource = this.props.stateProps.index1 ? ('/fuelConsumptionInput.json' + queryParams) 
      : this.props.stateProps.index2 ? ('/machineRegistrationInput.json' + queryParams) : null 
      
      if (!isNaN(this.state.lastId)) {
      axiosLocal.post(URLPostSource, checkForActivity)
       .then(response => 
        {this.setState({
          loading: false,
          submit:true,
          selectedMachineId: undefined,
          selectedAttachedMachineryId: undefined,
          selectedLocationId: undefined,
          selectedFarmId: undefined,
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
          selectedFarmId: undefined,
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