import React, { useState, useEffect } from "react";
import Modal from "../../Components/Modal/Modal";
import AdminTables from "./AdminTables/AdminTables";

import { getFullDatabase } from "../../Firebase/FetchCumulativeDataFromRealtimeDB";


import UsersData from "./UsersData/UsersData";

const CumulateData = (props) => {
  const [ table, setTable ] = useState([])
  
  // const [ error, setError ] = useState(undefined)

    // const toNegativeNumber = (num) => Math.abs(num);
  useEffect(() => {
    getFullDatabase(0, 10, props).then((fullData)=>{
            let fullDataArray=[]
            if (props.stateProps.selectedActivity === 1) {
            Object.keys(fullData).forEach((key)=>{
             fullDataArray.push(fullData[key]);
              const onlyFuelConsumption = fullDataArray.filter(machine => machine.machine)
            
              // console.log(ifNotFuelManagement)
              const object = {}; //(1)
                let result = onlyFuelConsumption.reduce(function(prevValue, nextValue) {
                  let key = nextValue.machine + '-' + nextValue.attachedMachinery + '-' + nextValue.location 
                  if(!object[key]) {
                    object[key] = Object.assign({}, nextValue); // create a copy of next value
                    prevValue.push(object[key]);
                  } else {
                     object[key].liters += nextValue.liters
                    //  object[key].tankResidual -= nextValue.tankResidual;
                  }                 
                  return prevValue;
                }, []);
              setTable(result)
            })
          } else if (props.stateProps.selectedActivity === 2) {
              Object.keys(fullData).forEach((key)=>{
              
              fullDataArray.push(fullData[key]);
              // const onlyFuelConsumption = fullDataArray.filter(machine => machine.machine)
              // const ifNotFuelManagement = props.stateProps.selectedActivity === 1 ? onlyFuelConsumption : fullDataArray
              // console.log(ifNotFuelManagement)
              
              const object = {}; //(1)
                let result = fullDataArray.reduce(function(prevValue, nextValue) {
                  let key = nextValue.machine + '-' + nextValue.attachedMachinery + '-' 
                  + nextValue.location + '-' + nextValue.product;
                  
                  if(!object[key]) {
                    object[key] = Object.assign({}, nextValue); // create a copy of next value
                    prevValue.push(object[key]);
                  } else {
                    // object[key].liters += nextValue.liters
                    object[key].hoursSpentOnLastActivity -= nextValue.hoursSpentOnLastActivity
                  }
                
                  return prevValue;
                }, []);
              setTable(result)
            })
          } else if (props.stateProps.selectedActivity === 3) {
            Object.keys(fullData).forEach((key)=>{
             fullDataArray.push(fullData[key]);
            const object = {}; //(1)
              let result = fullDataArray.reduce(function(prevValue, nextValue) {
                let key = nextValue.machine + '-' + nextValue.attachedMachinery + '-' 
                + nextValue.jobDescription + '-' + nextValue.maintenanceOrRerairs;
                
                if(!object[key]) {
                  object[key] = Object.assign({}, nextValue); // create a copy of next value
                  prevValue.push(object[key]);
                } else {
                  object[key].costOfTechnician += nextValue.costOfTechnician
                  object[key].workedHours += nextValue.workedHours
                }
              
                return prevValue;
              }, []);
            setTable(result)
          })
        }
          else if (props.stateProps.selectedActivity === 4) {
            Object.keys(fullData).forEach((key)=>{
               fullDataArray.push(fullData[key]);
              const object = {}; //(1)
                let result = fullDataArray.reduce(function(prevValue, nextValue) {
                  let key = nextValue.date + '-' + nextValue.nameOfEmployee 
                  // + '-' + nextValue.project
                  // + '-' + nextValue.jobDescription 
                  // + '-' + nextValue.costCenter  ;
                  // console.log(prevValue, "prev")
                  // console.log(nextValue, "next")
                  if(!object[key]) {
                    object[key] = Object.assign({}, nextValue); // create a copy of next value
                    prevValue.push(object[key]);
                  } else {
                    // object[key].jobDescription += nextValue.jobDescription
                    object[key].manHours += parseFloat(nextValue.manHours) 
                  }
                
                  return prevValue;
                }, []);
              setTable(result)
            })
          }
        }).catch(err => err)
          // setError(" or no data in the Module."))
  }, [props]);

// console.log(table)

 const [modeChange, setModeChange] = useState('');
 useEffect(() => {
   setModeChange(props.stateProps.outputMode)
 }, [props.stateProps.outputMode])

 const moduleInProgress = <Modal show={props.modal} hide={props.modal}>
   Module Still Not Built</Modal> 
  //  const errorModal = table.length === 0 || table === undefined ? <Modal show={props.stateProps.hideModal} 
  //   hide={props.modal}>User has no authorization to read data{error}</Modal> : null
    
    return (
   <div className="table-reports">

     {props.stateProps.selectedActivity === 0 ?
     <UsersData stateProps={props.stateProps} onClick={props.onClick}/> : null}
     
     {props.stateProps.selectedActivity === 1 ||
     props.stateProps.selectedActivity === 2  || 
     props.stateProps.selectedActivity === 3  ||
     props.stateProps.selectedActivity === 4 ? 
     <AdminTables 
        stateProps={props}
        modeChange={modeChange}
        tableData={table}
        onClick={props.onClick}/> : null }
    
    {props.stateProps.selectedActivity === 5 ? moduleInProgress : null}
     
    </div>
  ) 
}

export default CumulateData;