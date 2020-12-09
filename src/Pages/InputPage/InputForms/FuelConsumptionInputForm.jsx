import React, { useState, useEffect } from "react";

import "./InputForms.css"

import BackButton from "../../../Components/BackButton/BackButton"

import FuelTankImage from "../../../Assets/greenPump.png"

import SelectField from "../SelectField/SelectField";
import InputField from "../InputField/InputField";

import SubmitButton from "../../../Components/SubmitButton/SubmitButton"

import Modal from "../../../Components/Modal/Modal"
import GrapeSpinner1 from "../../../Components/Spinners/GrapeSpinner"

const FuelConsumptionInput = (props) => {
 const [ disableButton, setDisableButtton ] = useState(false)

 useEffect(() => {
  if (props.localState.selectedMachineId && 
      props.localState.selectedLocationId && 
      props.localState.selectedOperatorId &&
      props.localState.kilometers && 
      props.localState.liters &&
      props.localState.tankNumber)
  setDisableButtton(props.localState.submitButtonDisabled = true) 
  else {
    setDisableButtton(props.localState.submitButtonDisabled = false) }
  }, [props])

  const onButtonClick = () => {props.updateId()} 
 
  // const fuelConsumption = this.state.inputFields.slice(0, 3).map((item) => item)
  // const machineRegistration = this.state.inputFields.slice(0, 3).map((item) => item)
  // console.log([this.state.inputFields][0][0].value)
  // console.log(fuelConsumption)
    return (
      <div className="full-div">
        <BackButton onClick={props.onClick}/>
        <img src={FuelTankImage} alt="img" className="pic"/>
       
        <div className="input-forms">
         <form onSubmit={props.formHandler}>
            <SelectField
             id={props.localState.selectFields[0].id}
             selectData={props.localState.selectFields}
             onChange={props.selectFieldsHandler}
             value={props.localState.selectedMachineId}
            />

            {props.localState.selectedMachineId ?
              <div className="input">
                <InputField 
                  id={props.localState.inputFields[0].id}
                  onChange={props.inputFieldsHandler}
                  name={[props.localState.inputFields][0][0].name}/>
                <InputField 
                  id={props.localState.inputFields[1].id}
                  onChange={props.inputFieldsHandler}
                  name={[props.localState.inputFields][0][1].name}/> 
                <InputField 
                  id={props.localState.inputFields[2].id}
                  onChange={props.inputFieldsHandler}
                  name={[props.localState.inputFields][0][2].name}/>
              </div>: null
            } 
            {/* {state.selectedMachineId ?
              <div className="input">
                {fuelConsumption.map((actitivity, index) => (
                <InputFields 
                id={actitivity.id}
                name={actitivity.name}
                // onChange={inputsHandler}
                onChange={inputsHandler}
                index={index}
                count={actitivity.value}
                children={actitivity.name}/>))} 
              </div> : null
            } */}
                        
            {props.localState.selectedMachineId ?
              <SelectField
              id={props.localState.selectFields[2].id}
              selectData={props.localState.selectFields}
              onChange={props.selectFieldsHandler}
              value={props.localState.selectedLocationId}
             /> : null
            }

            {props.localState.selectedMachineId && 
            props.localState.selectedLocationId ?
              <SelectField
              id={props.localState.selectFields[4].id}
              selectData={props.localState.selectFields}
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

export default FuelConsumptionInput;