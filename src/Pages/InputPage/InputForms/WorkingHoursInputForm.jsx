import React, { Component } from "react";

import "./InputForms.css"

import BackButton from "../../../Components/BackButton/BackButton"

import WorkingHours from "../../../Assets/workinghours.png"

import SelectField from "../SelectField/SelectField";
import InputField from "../InputField/InputField";

import SubmitButton from "../../../Components/SubmitButton/SubmitButton"

import Modal from "../../..//Components/Modal/Modal"
import GrapeSpinner1 from "../../../Components/Spinners/GrapeSpinner"

class WorkingHoursInput extends Component {


  UNSAFE_componentWillUpdate(nextProps, nextState) {
    nextProps.localState.submitButtonDisabled = (
     nextProps.localState.selectedMachineId && 
     nextProps.localState.selectedAttachedMachineryId &&
     nextProps.localState.selectedLocationId && 
     nextProps.localState.selectedOperatorId &&
     nextProps.localState.selectedProductId &&
     nextProps.localState.kilometers && 
     nextProps.localState.line &&
     nextProps.localState.blok);
   }

 render() {
      return (
      <div className="full-div">
        <BackButton onClick={this.props.onClick}/>
        <img src={WorkingHours} alt="img" className="pic"/>
       
        <div className="input-forms">
         <form onSubmit={this.props.formHandler}>
            
            <SelectField
             id={this.props.localState.selectFields[0].id}
             selectData={this.props.localState.selectFields}
             onChange={this.props.selectFieldsHandler}
             value={this.props.localState.selectedMachineId}
            />
            
            {this.props.localState.selectedMachineId ?
            <SelectField
             id={this.props.localState.selectFields[1].id}
             selectData={this.props.localState.selectFields}
             onChange={this.props.selectFieldsHandler}
             value={this.props.localState.selectedAttachedMachineryId}
            /> : null }

            {this.props.localState.selectedAttachedMachineryId ?
              <SelectField
              id={this.props.localState.selectFields[2].id}
              selectData={this.props.localState.selectFields}
              onChange={this.props.selectFieldsHandler}
              value={this.props.localState.selectedLocationId}
             /> : null
            }

            {this.props.localState.selectedLocationId ?
              <SelectField
              id={this.props.localState.selectFields[3].id}
              selectData={this.props.localState.selectFields}
              onChange={this.props.selectFieldsHandler}
              value={this.props.localState.selectedProductId}
             /> : null
            }

            {this.props.localState.selectedProductId ?
              <div className="input">
                <InputField 
                  id={this.props.localState.inputFields[0].id}
                  onChange={this.props.inputFieldsHandler}
                  name={[this.props.localState.inputFields][0][0].name}/>
                <InputField 
                  id={this.props.localState.inputFields[3].id}
                  onChange={this.props.inputFieldsHandler}
                  name={[this.props.localState.inputFields][0][3].name}/> 
                <InputField 
                  id={this.props.localState.inputFields[4].id}
                  onChange={this.props.inputFieldsHandler}
                  name={[this.props.localState.inputFields][0][4].name}/>
              </div>: null
            } 
           
            {this.props.localState.selectedProductId ?
              <SelectField
              id={this.props.localState.selectFields[4].id}
              selectData={this.props.localState.selectFields}
              onChange={this.props.selectFieldsHandler}
              value={this.props.localState.selectedOperatorId}
             /> : null
            }

             {this.props.localState.submit ?
              <SubmitButton 
              disabled={!this.props.localState.submitButtonDisabled}
              type="submit"/> 
              : <Modal
              show={this.props.localState.loading}>
                <GrapeSpinner1 />
              </Modal>
             }
             
          </form>
        </div>
      </div>
    )
  }
}

export default WorkingHoursInput;