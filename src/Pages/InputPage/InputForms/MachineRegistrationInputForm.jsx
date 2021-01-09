import React, { useState, useEffect } from "react";

import "./InputForms.css"

import BackButton from "../../../Components/BackButton/BackButton"

import SelectField from "../SelectField/SelectField";
import InputField from "../InputField/InputField";

import SubmitButton from "../../..//Components/SubmitButton/SubmitButton"

import Modal from "../../..//Components/Modal/Modal"
import GrapeSpinner1 from "../../..//Components/Spinners/GrapeSpinner"
import Calendar from "../../../Components/Calendar/Calendar";

const MachineRegistrationInput = (props) => {

  const [ , setDisableButtton ] = useState(false)

 useEffect(() => {
  if (props.localState.selectedMachineId && 
      props.localState.selectedAttachedMachineryId && 
      props.localState.selectedFarmId &&
      props.localState.kilometersOnMachine && 
      props.localState.selectedOperatorId &&
      props.localState.date !== "null-null-null")
  setDisableButtton(props.localState.submitButtonDisabled = true) 
  else {
    setDisableButtton(props.localState.submitButtonDisabled = false) }
  }, [props])

  const onButtonClick = () => {props.updateId()} 
  
 
  return (
      <div className="full-div">
        <BackButton onClick={props.onClick}/>
        <h2>Machine Registration</h2>
        
        <div className="input-forms">
         <form onSubmit={props.formHandler}>
            <SelectField
             id={props.localState.selectFields[0].id}
             machineImage={props.localState.selectedMachineImage}
             onChange={props.selectFieldsHandler}
             value={props.localState.selectedMachineId}
            />
            
            {props.localState.selectedMachineId ?
            <SelectField
             id={props.localState.selectFields[1].id}
             machineImage={props.localState.selectedAttachedMachineryByImage}
             onChange={props.selectFieldsHandler}
             value={props.localState.selectedAttachedMachineryId}
            /> : null }

            {props.localState.selectedAttachedMachineryId ?
              <SelectField
              id={props.localState.selectFields[5].id}
              onChange={props.selectFieldsHandler}
              value={props.localState.selectedFarmId}
             /> : null
            }

            {props.localState.selectedFarmId ?
              <SelectField
              id={props.localState.selectFields[3].id}
              onChange={props.selectFieldsHandler}
              value={props.localState.selectedProductId}
             /> : null
            }

            {props.localState.selectedProductId ?
              <div className="input">
                <InputField 
                  id={props.localState.inputFields[0].id}
                  onChange={props.inputFieldsHandler}
                  name={[props.localState.inputFields][0][0].name}
                  statename={[props.localState.inputFields][0][0].statename}/>
              </div>: null} 
           
            {props.localState.selectedProductId ?
              <SelectField
              id={props.localState.selectFields[4].id}
              onChange={props.selectFieldsHandler}
              value={props.localState.selectedOperatorId}
             /> : null
            }

            <div style={{marginTop: "20px"}}>  
            {props.localState.selectedOperatorId ?
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

export default MachineRegistrationInput;