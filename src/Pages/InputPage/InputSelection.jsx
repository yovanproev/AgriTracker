import React, { Component } from "react";

import axiosLocal from "../../AxiosInput";
import { fetchAllSelectFields, fetchAllinputFields} from "../../LocalData/InputFormsData";

import FuelConsumptionInput from "./InputForms/FuelConsumptionInputForm";
import MachineRegistrationInput from "./InputForms/MachineRegistrationInputForm";
import MaintenanceAndRepairInputForm from "./InputForms/MaintenanceAndRepairInputForm";
import WorkingHoursInputForm from "./InputForms/WorkingHoursInputForm";

import { getSelectionByField } from "../../Firebase/FetchCollectionsFromFirestore";
import { getLastId } from "../../Firebase/FetchLastIdRealtimeDB";
import { getLitersMissing, getTankResidual, workedHoursPerMachine } from "../../Firebase/FetchLastFuelEntryRealtimeDB"
import { getImage, getNamesOfImages } from "../../Firebase/FetchAndUpdateImagesFromStorage";

import { addZero } from "./DBObjectElements/GetDateTime";
import { fuelConsumptionInputObject, machineRegistrationInputObject, 
         maintenanceAndRepairsInputObject, workingHoursInputObject } from "./DBObjectElements/ObjectsToPostToFirebase";
import Modal from "../../Components/Modal/Modal"

import { initialState } from "./InitialState"

class InputSelection extends Component { 
  constructor (props) {
    super(props)
    const fullData = getLastId(this.props)
      this.state = {
      submit: true,
      loading: false,
      submitButtonDisabled: "",
      lastId: fullData.then(res => res),
      disableMultiSelectOption: false,
      stopComponentDidUpdate: false,    
      date: new Date(),
      inputFields: fetchAllinputFields(),
      selectFields: fetchAllSelectFields(),
    }
}
  
  componentDidMount() {
    const fullData = getLastId(this.props)
      fullData.then((res, rej) => { this.setState({lastId: res, error: rej })})
   getTankResidual(this.state.selectedLocationName).then(liters => {
       this.setState({ tankResidual: parseFloat(liters) })})
    getLitersMissing(this.state.selectedLocationName).then(tankNum => {
      this.setState({ lastTankNumber: parseFloat(tankNum) })})
    workedHoursPerMachine(this.state.selectedMachineName).then(hours => {
      this.setState({ hoursSpentOnLastActivity: parseFloat(hours) })})
    getNamesOfImages(this.state.idOfSelectField).then(fullList => {
      this.setState({ namesOfImages: fullList})
    })
  }

  stopComponentDidUpdate = () => {
     this.setState(({ prevState }) => ({ stopComponentDidUpdate: !prevState }))
  }
      
  componentDidUpdate(prevState) {
    if (prevState.stopComponentDidUpdate !== this.state.stopComponentDidUpdate) {
      getTankResidual(this.state.selectedLocationName).then(liters => {
        this.setState({ tankResidual: parseFloat(liters)})}) 
      getLitersMissing(this.state.selectedLocationName).then(tankNum => {
        this.setState({ lastTankNumber: parseFloat(tankNum), 
          stopComponentDidUpdate: prevState.stopComponentDidUpdate })})
      workedHoursPerMachine(this.state.selectedMachineName).then(hours => {
          this.setState({ hoursSpentOnLastActivity: parseFloat(hours)})})
      getNamesOfImages(this.state.idOfSelectField).then(fullList => {
         this.setState({ namesOfImages: fullList, 
          stopComponentDidUpdate: prevState.stopComponentDidUpdate})
      })
    }
  }

  shouldComponentUpdate (nextProps, ) {
    // console.log("shouldComponent Update")
   return nextProps.lastId !== this.state.lastId 
  }

  updateId = () => {this.setState({lastId: parseInt(this.state.lastId) + parseInt(1)})}

  onFocusHandler = (idOfSelectField) => {
     getNamesOfImages(parseInt(idOfSelectField)).then(fullList => {
        this.setState({ namesOfImages: fullList}) })}

  selectFieldsHandler = (idOfOptionElement, idOfSelectField, statename, selectedid, selectedmachineimage) => {
    this.setState({ [selectedid]: idOfOptionElement, idOfSelectField: idOfSelectField })
    
    if (idOfOptionElement !== 0) {
      getSelectionByField(idOfSelectField).then(selectField => {
        selectField.filter(id => {
          if (id.id === idOfOptionElement) { 
            this.setState({ [statename]: id.name })
            getImage(idOfSelectField, idOfOptionElement, this.state.namesOfImages, id.name)
             .then(res => this.setState({ [selectedmachineimage]: res }))
          }
          return null
        })
     })  
   }
 }

  multiSelectHandler = (value) => {this.setState({ selectedMSJobDescriptionId: value })}
  
   inputFieldsHandler = (value, id, statename) => {
     const oneDecimalOnly = value.toString().split(".")
     .map((el,i)=>i?el.split("").slice(0,1).join(""):el).join(".")
    
     this.setState({
     [statename] : oneDecimalOnly
     })
  }

  dateHandler = (value) => {
    const startingDay = value !== null ? addZero(value.getDate()) : null
    const startingMonth = value !== null ? addZero(value.getMonth()+1) : null
    const startingYear = value !== null ? value.getFullYear() :null
    const final = startingDay + "-" + startingMonth + "-" + startingYear 
    this.setState({ date: final })
  }

  tableRowsHandler = (workingHours) => {
    let employeesNames = []
    // put names of employees into an array
    Object.keys(workingHours).forEach(function(key) {
       employeesNames.push(workingHours[key].name) })    
    this.setState({
      manHours: workingHours,
      nameOfEmployee: employeesNames,
    })
  };

  disableMultiSelectOptionHandler = () => {
    this.setState({ disableMultiSelectOption: true})
  }

  restartFormHandler = () => {
    this.setState((prevState)=> ({ 
      ...prevState, 
      selectedTypeOfHoursId: undefined,
      selectedLocationId: undefined,
      selectedProjectId:undefined,
      selectedMSJobDescriptionId: undefined,
      namesOfEmployees: undefined,
      manHours: undefined,
      disableMultiSelectOption: false }))
  }

   formSubmitHandler = (event) => {
      event.preventDefault()
 
      this.setState((prevState)=> ({ 
      ...prevState,
      submit: false,
      loading: true
      }))
         
      const checkForActivity = this.props.stateProps.selectedActivity === 0 ? fuelConsumptionInputObject(this.state) 
      : this.props.stateProps.selectedActivity === 1 ? machineRegistrationInputObject(this.state) 
      : this.props.stateProps.selectedActivity === 2 ? maintenanceAndRepairsInputObject(this.state) 
      : this.props.stateProps.selectedActivity === 3 ? workingHoursInputObject(this.state): null 
      
      const queryParams = '?auth=' + this.props.stateProps.tokenId + '&auth.token.email=' + this.props.stateProps.email;
    
      const URLPostSource = this.props.stateProps.selectedActivity === 0 ? ('/fuelConsumptionInput.json' + queryParams) 
      : this.props.stateProps.selectedActivity === 1 ? ('/machineRegistrationInput.json' + queryParams)
      : this.props.stateProps.selectedActivity === 2 ? ('/maintenanceAndRepairsInput.json' + queryParams) 
      : this.props.stateProps.selectedActivity === 3 ? ('/workingHoursInput.json' + queryParams) : null 
      
      if (!isNaN(this.state.lastId)) {
      axiosLocal.post(URLPostSource, checkForActivity)
       .then(response => this.setState({...initialState}))  
       .catch(error => this.setState({...initialState, error: true}))
      } else {
        throw new Error("last enrty ID couldn't be retrieved from the server, please refresh the page")
      }
  }

  render () {
    const moduleInProgress = <Modal show={this.props.modal} 
    hide={this.props.modal}>Module Still In Progress</Modal> 
    const errorModal = <Modal show={this.state.error} 
    hide={this.props.modal}>Network error while posting data to Database, your entry is not recorded.</Modal> 
    // console.log(this.state.idOfSelectField)
    
    return (
     <div>
      {errorModal}
      {this.props.stateProps.selectedActivity === 0 ?
      <FuelConsumptionInput 
      stopComponentDidUpdate={this.stopComponentDidUpdate}
      dateHandler={this.dateHandler}
      updateId={this.updateId}
      onClick={this.props.onClick}
      stateProps={this.props.stateProps}
      localState={this.state}
      selectFieldsHandler={this.selectFieldsHandler}
      inputFieldsHandler={this.inputFieldsHandler} 
      formHandler={this.formSubmitHandler} 
      onFocusHandler={this.onFocusHandler}/> : null}

      {this.props.stateProps.selectedActivity === 1 ?
      <MachineRegistrationInput 
      stopComponentDidUpdate={this.stopComponentDidUpdate}
      dateHandler={this.dateHandler}
      updateId={this.updateId}
      onClick={this.props.onClick}
      stateProps={this.props.stateProps}
      localState={this.state}
      selectFieldsHandler={this.selectFieldsHandler}
      inputFieldsHandler={this.inputFieldsHandler} 
      formHandler={this.formSubmitHandler}
      onFocusHandler={this.onFocusHandler} /> : null}
      
      {this.props.stateProps.selectedActivity === 2 ?
      <MaintenanceAndRepairInputForm
      stopComponentDidUpdate={this.stopComponentDidUpdate}
      dateHandler={this.dateHandler}
      updateId={this.updateId}
      onClick={this.props.onClick}
      stateProps={this.props.stateProps}
      localState={this.state}
      selectFieldsHandler={this.selectFieldsHandler}
      inputFieldsHandler={this.inputFieldsHandler} 
      formHandler={this.formSubmitHandler} 
      onFocusHandler={this.onFocusHandler}/> : null}

      {this.props.stateProps.selectedActivity === 3 ?
      <WorkingHoursInputForm 
      stopComponentDidUpdate={this.stopComponentDidUpdate}
      tableRowsHandler={this.tableRowsHandler}
      dateHandler={this.dateHandler}
      updateId={this.updateId}
      onClick={this.props.onClick}
      stateProps={this.props.stateProps}
      localState={this.state}
      selectFieldsHandler={this.selectFieldsHandler}
      inputFieldsHandler={this.inputFieldsHandler} 
      formHandler={this.formSubmitHandler} 
      disableMultiSelectOptionHandler={this.disableMultiSelectOptionHandler}
      restartFormHandler={this.restartFormHandler}
      multiSelectHandler={this.multiSelectHandler}/> : null}

      {this.props.stateProps.selectedActivity === 4 ?
       moduleInProgress : null }

    </div>
  )
 }
}

export default InputSelection;