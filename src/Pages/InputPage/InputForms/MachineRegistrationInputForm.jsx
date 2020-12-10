import React, { useState, useEffect } from "react";

import "./InputForms.css"

import BackButton from "../../../Components/BackButton/BackButton"

import GroupOfTractors from "../../../Assets/groupOfTractors.jpg"

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
      props.localState.selectedLocationId && 
      props.localState.selectedOperatorId &&
      props.localState.kilometers && 
      props.localState.line &&
      props.localState.block)
  setDisableButtton(props.localState.submitButtonDisabled = true) 
  else {
    setDisableButtton(props.localState.submitButtonDisabled = false) }
  }, [props])

  const onButtonClick = () => {props.updateId()} 
  
 
      return (
      <div className="full-div">
        <BackButton onClick={props.onClick}/>
        <img src={GroupOfTractors} alt="img" className="pic"/>
       
        <div className="input-forms">
         <form onSubmit={props.formHandler}>
            <SelectField
             id={props.localState.selectFields[0].id}
             selectData={props.localState.selectFields}
             onChange={props.selectFieldsHandler}
             value={props.localState.selectedMachineId}
            />
            
            {props.localState.selectedMachineId ?
            <SelectField
             id={props.localState.selectFields[1].id}
             selectData={props.localState.selectFields}
             onChange={props.selectFieldsHandler}
             value={props.localState.selectedAttachedMachineryId}
            /> : null }

            {props.localState.selectedAttachedMachineryId ?
              <SelectField
              id={props.localState.selectFields[2].id}
              selectData={props.localState.selectFields}
              onChange={props.selectFieldsHandler}
              value={props.localState.selectedLocationId}
             /> : null
            }

            {props.localState.selectedLocationId ?
              <SelectField
              id={props.localState.selectFields[3].id}
              selectData={props.localState.selectFields}
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
                <InputField 
                  id={props.localState.inputFields[3].id}
                  onChange={props.inputFieldsHandler}
                  name={[props.localState.inputFields][0][3].name}/> 
                <InputField 
                  id={props.localState.inputFields[4].id}
                  onChange={props.inputFieldsHandler}
                  name={[props.localState.inputFields][0][4].name}/>
              </div>: null
            } 
           
            {props.localState.selectedProductId ?
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

export default MachineRegistrationInput;