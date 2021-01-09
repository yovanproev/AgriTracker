import React, { useState, useEffect } from "react";

import "./InputForms.css"

import BackButton from "../../../Components/BackButton/BackButton"

import SelectField from "../SelectField/SelectField";
import MultiSelectField from "../MultipleSelectField/MultipleSelectField";

import SubmitButton from "../../../Components/SubmitButton/SubmitButton"

import Modal from "../../../Components/Modal/Modal"
import GrapeSpinner1 from "../../../Components/Spinners/GrapeSpinner"
import Calendar from "../../../Components/Calendar/Calendar";
import CustomTable from "../../../Components/CustomTable/InputTable";

const WorkingHoursInput = (props) => {
 const [ , setDisableButtton ] = useState(false)

  useEffect(() => {
    if (props.localState.date !== "null-null-null" &&
        props.localState.selectedTypeOfHoursId && 
        props.localState.selectedLocationId && 
        props.localState.selectedProjectId &&
        props.localState.selectedMSJobDescriptionId &&
        props.localState.namesOfEmployees && 
        props.localState.manHours)
    setDisableButtton(props.localState.submitButtonDisabled = true) 
    else {
      setDisableButtton(props.localState.submitButtonDisabled = false) }
  }, [props])

  const onButtonClick = () => {props.updateId()} 

  const arrayOfNames = props.localState.selectedMSJobDescriptionId ? props.localState.selectedMSJobDescriptionId.map(x => x.name) : null
  const arrayOfIds = props.localState.selectedMSJobDescriptionId ? props.localState.selectedMSJobDescriptionId.map(x => x.id) : null
   
  return (
      <div className="full-div">
        <BackButton onClick={props.onClick}/>
        <h2>Working Hours Registration</h2>
               
        <div className="input-forms">
         <form onSubmit={props.formHandler}>

           <div style={{marginTop: "20px"}}>  
              <Calendar
                stateProps={props.stateProps}
                onChange={props.dateHandler}
                value={props.localState.date}
              /> 
            </div>

            <SelectField
             id={props.localState.selectFields[9].id}
             onChange={props.selectFieldsHandler}
             value={props.localState.selectedTypeOfHoursId}
            />

            {props.localState.selectedTypeOfHoursId ?
              <SelectField
              id={props.localState.selectFields[2].id}
              onChange={props.selectFieldsHandler}
              value={props.localState.selectedLocationId}
              /> : null
            }

            {props.localState.selectedLocationId ?
            <SelectField
             id={props.localState.selectFields[10].id}
             onChange={props.selectFieldsHandler}
             value={props.localState.selectedProjectId}
            /> : null }

            {props.localState.selectedProjectId ?
             <MultiSelectField
              id={props.localState.selectFields[11].id}
              onSelect={props.selectFieldsHandler}
              value={props.localState.selectedMSJobDescriptionId}
             /> : null
            }

            {props.localState.selectedMSJobDescriptionId ?
            <CustomTable 
            jobActivities={props.localState.selectedMSJobDescriptionId}
            onChange={props.onChange}
            names={arrayOfNames}
            id={arrayOfIds}
            /> 
            : null} 
              
             {props.localState.submit ?
              <SubmitButton 
              disabled={!props.localState.submitButtonDisabled}
              onClick={onButtonClick}
              type="submit"/> 
              : <Modal
              show={props.localState.loading}>
                <GrapeSpinner1 />
              </Modal>
             }           
          </form>
        </div>
      </div>
    )
  
}

export default WorkingHoursInput;