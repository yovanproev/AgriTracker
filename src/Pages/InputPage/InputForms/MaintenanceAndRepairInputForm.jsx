import React, { useState, useEffect } from "react";

import "./InputForms.css"

import BackButton from "../../../Components/BackButton/BackButton"

import SelectField from "../SelectField/SelectField";
import InputField from "../InputField/InputField";
import TextField from "../InputField/InputTextField";

import SubmitButton from "../../../Components/SubmitButton/SubmitButton"

import Modal from "../../../Components/Modal/Modal"
import GrapeSpinner1 from "../../../Components/Spinners/GrapeSpinner"
import Calendar from "../../../Components/Calendar/Calendar";

const MaintenanceAndRepairsInput = (props) => {
 const [ , setDisableButtton ] = useState(false)

 useEffect(() => {
  if (props.localState.selectedMachineId && 
      props.localState.selectedAttachedMachineryId && 
      props.localState.workedHours &&
      props.localState.selectedLocationId && 
      props.localState.selectedExternalTechnicianId &&
      props.localState.selectedMaintenanceId &&
      props.localState.selectedJobDescriptionId &&
      props.localState.manHours && 
      props.localState.explainTheActivity &&  
      props.localState.date !== "null-null-null")
  setDisableButtton(props.localState.submitButtonDisabled = true) 
  else {
    setDisableButtton(props.localState.submitButtonDisabled = false) }
  }, [props])

  const onButtonClick = () => {props.updateId()} 
 
   return (
      <div className="full-div">
        <BackButton onClick={props.onClick}/>
        <h2>Maintenance and Repairs</h2>
               
        <div className="input-forms">
         <form onSubmit={props.formHandler}>
            <SelectField
             id={props.localState.selectFields[0].id}
             onChange={props.selectFieldsHandler}
             value={props.localState.selectedMachineId}
             machineImage={props.localState.selectedMachineImage}
            />

            {props.localState.selectedMachineId ?
            <SelectField
             id={props.localState.selectFields[1].id}
             machineImage={props.localState.selectedAttachedMachineryByImage}
             onChange={props.selectFieldsHandler}
             value={props.localState.selectedAttachedMachineryId}
            /> : null }

            {props.localState.selectedAttachedMachineryId ?
              <div className="input">
               <InputField 
                id={props.localState.inputFields[3].id}
                onChange={props.inputFieldsHandler}
                name={[props.localState.inputFields][0][3].name}/>
              </div> : null }

           {props.localState.selectedAttachedMachineryId ?
              <SelectField
              id={props.localState.selectFields[2].id}
              onChange={props.selectFieldsHandler}
              value={props.localState.selectedLocationId}
             /> : null
            }

            {props.localState.selectedLocationId ?
              <SelectField
              id={props.localState.selectFields[8].id}
              onChange={props.selectFieldsHandler}
              value={props.localState.selectedExternalTechnicianId}
             /> : null
            }

            {props.localState.selectedExternalTechnicianId ?
              <SelectField
              id={props.localState.selectFields[7].id}
              onChange={props.selectFieldsHandler}
              value={props.localState.selectedMaintenanceId}
             /> : null
            }

            {props.localState.selectedMaintenanceId ?
              <SelectField
              id={props.localState.selectFields[6].id}
              onChange={props.selectFieldsHandler}
              value={props.localState.selectedJobDescriptionId}
             /> : null
            }            

            {props.localState.selectedJobDescriptionId ?
              <div className="input">
                <InputField 
                  id={props.localState.inputFields[5].id}
                  onChange={props.inputFieldsHandler}
                  name={[props.localState.inputFields][0][5].name}/> 
                <TextField 
                  id={props.localState.inputFields[4].id}
                  onChange={props.inputFieldsHandler}
                  name={[props.localState.inputFields][0][4].name}/>
              </div>: null
            } 
          
            <div style={{marginTop: "20px"}}>  
            {props.localState.selectedJobDescriptionId ?
              <Calendar
              stateProps={props.stateProps}
              onChange={props.dateHandler}
              value={props.localState.date}
            /> : null
            }
            </div>

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

export default MaintenanceAndRepairsInput;