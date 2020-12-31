import React, { useState, useEffect } from "react";

import "./InputForms.css"

import BackButton from "../../../Components/BackButton/BackButton"

import SelectField from "../SelectField/SelectField";
import InputField from "../InputField/InputField";

import SubmitButton from "../../..//Components/SubmitButton/SubmitButton"

import Modal from "../../..//Components/Modal/Modal"
import GrapeSpinner1 from "../../..//Components/Spinners/GrapeSpinner"

const MachineRegistrationInput = (props) => {

  const [ , setDisableButtton ] = useState(false)

 useEffect(() => {
  if (props.localState.selectedMachineId && 
      props.localState.selectedAttachedMachineryId && 
      props.localState.selectedFarmId &&
      props.localState.kilometers && 
      props.localState.selectedOperatorId)
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
                  name={[props.localState.inputFields][0][0].name}/>
                {/* <InputField 
                  id={props.localState.inputFields[3].id}
                  onChange={props.inputFieldsHandler}
                  name={[props.localState.inputFields][0][3].name}/> 
                <InputField 
                  id={props.localState.inputFields[4].id}
                  onChange={props.inputFieldsHandler}
                  name={[props.localState.inputFields][0][4].name}/> */}
              </div>: null
            } 
           
            {props.localState.selectedProductId ?
              <SelectField
              id={props.localState.selectFields[4].id}
              onChange={props.selectFieldsHandler}
              value={props.localState.selectedOperatorId}
             /> : null
            }

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