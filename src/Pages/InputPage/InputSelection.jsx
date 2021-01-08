import React, { Component } from "react";

import axiosLocal from "../../AxiosInput";

import { 
  fetchMachineByName, fetchLocationByName, 
  fetchOperatorsByName, fetchProductsByName, 
  fetchAttachedMachineryByName, fetchMachineByImage,
  fetchAttachedMachineryByImage, fetchMaintenanceByName,
  fetchJobDescriptionsByName, fetchExternalTechnicianByName,
  fetchJobDescriptionsEmployeesByName, fetchProjectsByName,
  fetchTypeOfHoursByName, 
  fetchAllOperators} from "../../LocalData/InputFormsData";

import FuelConsumptionInput from "./InputForms/FuelConsumptionInputForm";
import MachineRegistrationInput from "./InputForms/MachineRegistrationInputForm";
import MaintenanceAndRepairInputForm from "./InputForms/MaintenanceAndRepairInputForm";
import WorkingHoursInputForm from "./InputForms/WorkingHoursInputForm";
import { getLastId } from "../../Firebase/FetchLastIdRealtimeDB";
import { fuelConsumptionInputObject, machineRegistrationInputObject, 
         maintenanceAndRepairsInputObject, workingHoursInputObject } from "./DBObjectElements/ObjectsToPostToFirebase";
import Modal from "../../Components/Modal/Modal"
import { addZero } from "./DBObjectElements/GetDateTime";
import { initialState } from "./InitialState"

class InputSelection extends Component { 
  state = {
    submit: true,
    loading: false,
    submitButtonDisabled: "",
    lastId: "",
    
    timeOfEntry: undefined,
    date: new Date(),

    selectedMachineId: undefined,
    selectedAttachedMachineryId: undefined,
    selectedLocationId: undefined,
    selectedProductId: undefined,
    selectedOperatorId: undefined,
    selectedFarmId: undefined,
    operators: fetchAllOperators(),

    inputFields: [
      {id: 1, name: "kilometersOnMachine"},
      {id: 2, name: "liters"},
      {id: 3, name: "tankNum"},
      {id: 4, name: "workedHours"},
      {id: 5, name: "explainTheActivity"},
      {id: 6, name: "manHours"},
   ],
    
    selectFields: [
      {id: 1, name: "Machine"},
      {id: 2, name: "Attached Machinery"},
      {id: 3, name: "Location"},
      {id: 4, name: "Product"},
      {id: 5, name: "Operator"},
      {id: 6, name: "Farm"},
      {id: 7, name: "Job Description"},
      {id: 8, name: "Maintenance or Repairs"},
      {id: 9, name: "External Technician"},
      {id: 10, name: "Type of Hours"},
      {id: 11, name: "Project"},
      {id: 12, name: "Multiple Selection Job Decription"},
    ]
  }
  
  UNSAFE_componentWillMount () {
  const fullData = getLastId(this.props)
  // if (this.props.stateProps.index1 || this.props.stateProps.index2 || this.props.stateProps.index3) {  
     fullData.then(res => { 
       this.setState({
          lastId: res === null ? parseInt(0) : parseInt(Object.values(res).slice(-1)[0].id)  
        })
      }).catch(err => {
        throw new Error(err)
      })
  //  }
  }

  componentDidMount() {
    this.setState({operators: fetchAllOperators()})
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
    // console.log(id)
    if (id === this.state.selectFields[0].id) {
       this.setState({
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
    else if (id === this.state.selectFields[6].id) {
      this.setState({
        selectedJobDescriptionId: value,
        selectedJobName: fetchJobDescriptionsByName(value)})
    }
    else if (id === this.state.selectFields[7].id) {
      this.setState({
        selectedMaintenanceId: value,
        selectedMaintenanceName: fetchMaintenanceByName(value)})
    }
    else if (id === this.state.selectFields[8].id) {
      this.setState({
        selectedExternalTechnicianId: value,
        selectedExternalTechinicianName: fetchExternalTechnicianByName(value)})
    }
    else if (id === this.state.selectFields[9].id) {
      this.setState({
        selectedTypeOfHoursId: value,
        selectedTypeOfHoursName: fetchTypeOfHoursByName(value)})
    }
    else if (id === this.state.selectFields[10].id) {
      this.setState({
        selectedProjectId: value,
        selectedProjectName: fetchProjectsByName(value)})
    }
    else  {
      this.setState({
        selectedMSJobDescriptionId: value,
        selectedMSJobDescriptionName: fetchJobDescriptionsEmployeesByName(value)})
    }
  };
  
   inputFieldsHandler = (value, id, name) => {
     const oneDecimalOnly = value.toString().split(".")
     .map((el,i)=>i?el.split("").slice(0,1).join(""):el).join(".")
    
     this.setState({
     [name] : oneDecimalOnly
     })
  }

  dateHandler = (value) => {
    const startingDay = value !== null ? addZero(value.getDate()) : null
    const startingMonth = value !== null ? addZero(value.getMonth()+1) : null
    const startingYear = value !== null ? value.getFullYear() :null
    const final = startingDay + "-" + startingMonth + "-" + startingYear 
    this.setState({
      date: final
    })
  }

  tableRowsHandler = (hours, namesOfEmployees) => {
    // console.log(namesOfEmployees[0] ? namesOfEmployees : null)
    var objs = [];
    // put names of employees into an array
    Object.keys(namesOfEmployees).forEach(function(key) {
      var match = key.match(/(.*)(\d.*)$/);
      var newKey = match[0];
      var index = parseInt(match[2]);
      objs[index] = objs[index] || {};
      objs[index][newKey] = namesOfEmployees[key];
    })
    console.log(objs);

    this.setState({
      manHours: hours,
      namesOfEmployees: objs
    })
  };

  resetState = () => {
    this.setState({
         ...initialState
    })
  }

  formSubmitHandler = (event) => {
      event.preventDefault()
  
      this.setState((prevState)=> ({ 
      ...prevState,
      submit: false,
      loading: true
      }))
         
      const checkForActivity = this.props.stateProps.index1 ? fuelConsumptionInputObject(this.state) 
      : this.props.stateProps.index2 ? machineRegistrationInputObject(this.state) 
      : this.props.stateProps.index3 ? maintenanceAndRepairsInputObject(this.state) 
      : this.props.stateProps.index4 ? workingHoursInputObject(this.state): null 
      
      const queryParams = '?auth=' + this.props.stateProps.tokenId + '&auth.token.email=' + this.props.stateProps.email;
    
      const URLPostSource = this.props.stateProps.index1 ? ('/fuelConsumptionInput.json' + queryParams) 
      : this.props.stateProps.index2 ? ('/machineRegistrationInput.json' + queryParams)
      : this.props.stateProps.index3 ? ('/maintenanceAndRepairsInput.json' + queryParams) 
      : this.props.stateProps.index4 ? ('/workingHoursInput.json' + queryParams) : null 
      
      if (!isNaN(this.state.lastId)) {
      axiosLocal.post(URLPostSource, checkForActivity)
       .then(response => this.resetState())  
       .catch(error => this.resetState())
      } else {
        throw new Error("last enrty ID couldn't be retrieved from the server, please refresh the page")
      }
  }

  render () {
    // const moduleInProgress = <Modal show={this.props.stateProps.hideModal} 
    // hide={this.props.modal}>Module Still In Progress</Modal> 
    const errorModal = <Modal show={this.state.error} 
    hide={this.props.modal}>Network error while posting data to Database, your entry is not recorded.</Modal> 
     
   return (
     <div>
      {errorModal}
      {this.props.stateProps.index1 === true ?
      <FuelConsumptionInput 
      dateHandler={this.dateHandler}
      updateId={this.updateId}
      onClick={this.props.onClick}
      stateProps={this.props.stateProps}
      localState={this.state}
      selectFieldsHandler={this.selectFieldsHandler}
      inputFieldsHandler={this.inputFieldsHandler} 
      formHandler={this.formSubmitHandler} /> : null}

      {this.props.stateProps.index2 === true ?
      <MachineRegistrationInput 
      dateHandler={this.dateHandler}
      updateId={this.updateId}
      onClick={this.props.onClick}
      stateProps={this.props.stateProps}
      localState={this.state}
      selectFieldsHandler={this.selectFieldsHandler}
      inputFieldsHandler={this.inputFieldsHandler} 
      formHandler={this.formSubmitHandler} /> : null}
      
      {this.props.stateProps.index3 === true ?
      <MaintenanceAndRepairInputForm
      dateHandler={this.dateHandler}
      updateId={this.updateId}
      onClick={this.props.onClick}
      stateProps={this.props.stateProps}
      localState={this.state}
      selectFieldsHandler={this.selectFieldsHandler}
      inputFieldsHandler={this.inputFieldsHandler} 
      formHandler={this.formSubmitHandler} /> : null}

      {this.props.stateProps.index4 === true ?
      //  moduleInProgress 
      <WorkingHoursInputForm 
      onChange={this.tableRowsHandler}
      dateHandler={this.dateHandler}
      updateId={this.updateId}
      onClick={this.props.onClick}
      stateProps={this.props.stateProps}
      localState={this.state}
      selectFieldsHandler={this.selectFieldsHandler}
      inputFieldsHandler={this.inputFieldsHandler} 
      formHandler={this.formSubmitHandler} /> : null}
    </div>
  )
 }
}

export default InputSelection;