import React, { useEffect, useState } from 'react';

import './ManagementReports.css';

import { TableHeaderAdmin } from './TableHeaderAdmin/TableHeaderAdmin'

// import { ExportCSV } from './ExcelExport/ExcelExport'
import Table from "../../../Components/ReactTableLibrary/Table"
import Modal from "../../../Components/Modal/Modal"
import Spinner2 from "../../../Components/Spinners/Spinner2"

import BackButton from '../../../Components/BackButton/BackButton';
import Calendar from '../../../Components/Calendar/Calendar';
import { getFilteredDataForExport } from '../../../Firebase/FetchFilteredDataForExportFromRealtimeDB';
import { addZero } from '../../InputPage/DBObjectElements/GetDateTime';
import AdminWorkHoursTable from '../AdminTables/AdminWorkHoursTable/AdminWorkHoursTable';

const ManagementReports = (props) => {
  const [ loading, setLoading ] = useState(true)
  const [ error, setError ] = useState(null)
  const [ nameOfModule, setName ] = useState(null)

  const [ dataPaginatedByDate, updateDataPaginatedByDate ] = useState([]) 

  const [ startingDate, updateStartingDate ] = useState([])
  const [ endDate, updateEndDate ] = useState([])
  
  const fetchFilteredDateForExport = (startingDate, endDate) => {
   updateStartingDate(startingDate)
   updateEndDate(endDate)
  }

  const hideModal = () => {
    setError(false)
  }

  useEffect(() => {
    setName(props.stateProps.stateProps.adminActivity[props.stateProps.stateProps.selectedActivity].name)
    
    const getStartingDate = () => {
      const startingDay = startingDate?.length !== 0 ? addZero(startingDate?.getDate()) : null
      const startingMonth = startingDate?.length !== 0 ? addZero(startingDate?.getMonth()+1) : null
      const startingYear = startingDate?.length !== 0 ? addZero(startingDate?.getFullYear()) : null
        return startingDay + "-" + startingMonth + "-" + startingYear
    }

    const getEndDate = () => {
      const endDay = endDate?.length !== 0 ? addZero(endDate?.getDate()) : null
      const endMonth = endDate?.length !== 0 ? addZero(endDate?.getMonth()+1) : null
      const endYear = endDate?.length !== 0 ? addZero(endDate?.getFullYear()) : null
        return endDay + "-" + endMonth + "-" + endYear
    }
    
    if (endDate !== null) {getFilteredDataForExport(getStartingDate(), getEndDate(), props.stateProps)
      .then(fullData => {
        let fullDataArray=[]

          Object.keys(fullData).forEach((key)=>{
            fullDataArray.push(fullData[key]);
            const onlyFuelConsumption = props.stateProps.stateProps.selectedActivity === 1 ? 
            fullDataArray.filter(machine => machine.machine) : fullDataArray
                        
            const object = {}; 
              
            let result = onlyFuelConsumption.reduce(function(prevValue, nextValue) {

                let key = props.stateProps.stateProps.selectedActivity === 1 ? 
                nextValue.machine + '-' + nextValue.attachedMachinery + '-' + nextValue.location : 
                props.stateProps.stateProps.selectedActivity === 2 ? 
                nextValue.machine + '-' + nextValue.attachedMachinery + '-' + nextValue.location + '-' + nextValue.product :
                props.stateProps.stateProps.selectedActivity === 3 ? 
                nextValue.machine + '-' + nextValue.attachedMachinery + '-' + nextValue.jobDescription + '-' + nextValue.maintenanceOrRerairs : 
                props.stateProps.stateProps.selectedActivity === 4 ? nextValue.date + '-' + nextValue.nameOfEmployee : null

                if(!object[key]) {
                  object[key] = Object.assign({}, nextValue); // create a copy of next value
                  prevValue.push(object[key]);
                } else {
                  if (props.stateProps.stateProps.selectedActivity === 1) object[key].liters += nextValue.liters 
                  else if (props.stateProps.stateProps.selectedActivity === 2) object[key].hoursSpentOnLastActivity -= nextValue.hoursSpentOnLastActivity 
                  else if (props.stateProps.stateProps.selectedActivity === 3) {object[key].costOfTechnician += nextValue.costOfTechnician
                  object[key].workedHours += nextValue.workedHours}
                  else if (props.stateProps.stateProps.selectedActivity === 4) object[key].manHours += nextValue.manHours || {}
                  }                 
                return prevValue;
              }, []);
            updateDataPaginatedByDate(result)
            setLoading(false)
          })
      }).catch(err => {
            setError(true)
            setLoading(false)
      })
    }
  }, [endDate, props.stateProps, startingDate])
  
  const loadingModal = <Modal show={loading} 
    hide={hideModal}><Spinner2 /></Modal> 
  const errorModal = <Modal show={error} 
  hide={hideModal}>No records in the selected time period.</Modal> 

  return (
    <div className="table-report">
      {loadingModal}
      {errorModal}
      <TableHeaderAdmin>{nameOfModule}</TableHeaderAdmin>
          <div style={{border: "solid 3px", padding: "10px", margin: "15px"}}>
            <h5>Choose a date</h5>
           <div style={{display: "inline-flex"}}> 
             <Calendar onChange={fetchFilteredDateForExport} stateProps={props.stateProps.stateProps}/>
           </div>
            {/* <ExportCSV  csvData={excelData} 
            fileName={nameOfModule} /> */}
          </div>
      
        {props.stateProps.stateProps.selectedActivity === 4 ?  
        <AdminWorkHoursTable 
            stateProps={props.stateProps.stateProps}
            data={dataPaginatedByDate}
            modeChange={props.modeChange}
            /> : null}
          {props.stateProps.stateProps.selectedActivity !== 4 ? <Table
            stateProps={props.stateProps.stateProps}
            data={dataPaginatedByDate}
            modeChange={props.modeChange}
           /> : null }
      <BackButton onClick={props.onClick}/>
    </div>
  )
}

export default ManagementReports;