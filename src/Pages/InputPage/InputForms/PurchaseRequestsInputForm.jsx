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


const PurchaseRequestsInput = (props) => {

  const [ , setDisableButtton ] = useState(false)

 useEffect(() => {
  if (props.localState.selectedOperatorId && 
      props.localState.supplier &&
      props.localState.selectedCategoryOfMaterialsId && 
      props.localState.selectedSubcategoryOfMaterialsId &&
      props.localState.quantity &&
      props.localState.price &&
      props.localState.purposeOfPurchase &&
      props.localState.date !== "null-null-null")
  setDisableButtton(props.localState.submitButtonDisabled = true) 
  else {
    setDisableButtton(props.localState.submitButtonDisabled = false) }
  }, [props])

  const onButtonClick = () => {props.updateId()} 
  
 
  return (
      <div className="full-div">
        <BackButton onClick={props.onClick}/>
        <h2>Purchase Requests</h2>
        
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
              id={props.localState.selectFields[4].id}
              onChange={props.selectFieldsHandler}
              value={props.localState.selectedOperatorId}
              selectedId={props.localState.selectFields[4].value}
              statename={props.localState.selectFields[4].statename}
             /> 
            
            {props.localState.selectedOperatorId ?
            <SelectField
             id={props.localState.selectFields[14].id}
             onChange={props.selectFieldsHandler}
             value={props.localState.selectedSupplierId}
             selectedId={props.localState.selectFields[14].value}
             statename={props.localState.selectFields[14].statename}
             /> : null }

             {props.localState.selectedSupplierId ?
            <SelectField
             id={props.localState.selectFields[15].id}
             onChange={props.selectFieldsHandler}
             value={props.localState.selectedCategoryOfMaterialsId}
             selectedId={props.localState.selectFields[15].value}
             statename={props.localState.selectFields[15].statename}
             /> : null }

             {props.localState.selectedCategoryOfMaterialsId ?
            <SelectField
             id={props.localState.selectFields[16].id}
             onChange={props.selectFieldsHandler}
             value={props.localState.selectedSubcategoryOfMaterialsId}
             selectedId={props.localState.selectFields[16].value}
             statename={props.localState.selectFields[16].statename}
             /> : null }

            {props.localState.selectedSubcategoryOfMaterialsId ?
              <div className="input">
                <InputField 
                  id={props.localState.inputFields[9].id}
                  onChange={props.inputFieldsHandler}
                  name={[props.localState.inputFields][0][9].name}
                  statename={[props.localState.inputFields][0][9].statename}/>
                <InputField 
                  id={props.localState.inputFields[10].id}
                  onChange={props.inputFieldsHandler}
                  name={[props.localState.inputFields][0][10].name}
                  statename={[props.localState.inputFields][0][10].statename}/>
                <TextField 
                  id={props.localState.inputFields[11].id}
                  onChange={props.inputFieldsHandler}
                  name={[props.localState.inputFields][0][11].name}
                  statename={[props.localState.inputFields][0][11].statename}/>
              </div>: null} 
           
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

export default PurchaseRequestsInput;