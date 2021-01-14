import React, { useState, useEffect } from "react";

import "./InputForms.css"

import BackButton from "../../../Components/BackButton/BackButton"

import SelectField from "../SelectField/SelectField";
import InputField from "../InputField/InputField";

import SubmitButton from "../../../Components/SubmitButton/SubmitButton"

import Modal from "../../../Components/Modal/Modal"
import GrapeSpinner1 from "../../../Components/Spinners/GrapeSpinner"
import Calendar from "../../../Components/Calendar/Calendar";

const FuelConsumptionInput = (props) => {
 const [ , setDisableButtton ] = useState(false)

 useEffect(() => {
  if (props.localState.selectedMachineId && 
      props.localState.selectedAttachedMachineryId && 
      props.localState.selectedLocationId && 
      props.localState.selectedOperatorId &&
      props.localState.kilometersOnMachine && 
      props.localState.liters &&
      props.localState.tankNum && 
      props.localState.date !== "null-null-null")
  setDisableButtton(props.localState.submitButtonDisabled = true) 
  else {
    setDisableButtton(props.localState.submitButtonDisabled = false) }
  }, [props])

  const onButtonClick = () => {props.updateId()} 
 
   return (
      <div className="full-div">
        <BackButton onClick={props.onClick}/>
        <h2>Fuel Consumption</h2>
               
        <div className="input-forms">
         <form onSubmit={props.formHandler}>
            <SelectField
             id={props.localState.selectFields[0].id}
             onChange={props.selectFieldsHandler}
             value={props.localState.selectedMachineId}
             machineImage={props.localState.selectedMachineImage}
             statename={props.localState.selectFields[0].statename}
             selectedId={props.localState.selectFields[0].value}
             selectedMachineImage={props.localState.selectFields[0].image}
            />

            {props.localState.selectedMachineId ?
            <SelectField
             id={props.localState.selectFields[1].id}
             machineImage={props.localState.selectedAttachedMachineryImage}
             onChange={props.selectFieldsHandler}
             value={props.localState.selectedAttachedMachineryId}
             statename={props.localState.selectFields[1].statename}
             selectedId={props.localState.selectFields[1].value}
             selectedMachineImage={props.localState.selectFields[1].image}
            /> : null }

            {props.localState.selectedAttachedMachineryId ?
              <div className="input">
                <InputField 
                  id={props.localState.inputFields[0].id}
                  onChange={props.inputFieldsHandler}
                  name={[props.localState.inputFields][0][0].name}
                  statename={[props.localState.inputFields][0][0].statename}/>
                <InputField 
                  id={props.localState.inputFields[1].id}
                  onChange={props.inputFieldsHandler}
                  name={[props.localState.inputFields][0][1].name}
                  statename={[props.localState.inputFields][0][1].statename}/> 
                <InputField 
                  id={props.localState.inputFields[2].id}
                  onChange={props.inputFieldsHandler}
                  name={[props.localState.inputFields][0][2].name}
                  statename={[props.localState.inputFields][0][2].statename}/>
              </div>: null
            } 
                                    
            {props.localState.selectedAttachedMachineryId ?
              <SelectField
              id={props.localState.selectFields[2].id}
              onChange={props.selectFieldsHandler}
              value={props.localState.selectedLocationId}
              selectedId={props.localState.selectFields[2].value}
              statename={props.localState.selectFields[2].statename}
            /> : null
            }

            {props.localState.selectedMachineId && 
            props.localState.selectedLocationId ?
              <SelectField
              id={props.localState.selectFields[4].id}
              onChange={props.selectFieldsHandler}
              value={props.localState.selectedOperatorId}
              selectedId={props.localState.selectFields[4].value}
              statename={props.localState.selectFields[4].statename}
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

export default FuelConsumptionInput;