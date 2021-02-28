import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import TableContainer from './TableContainer';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./ReactTable.css"

import  { conditionalTableColumns, usersCollection, selectionFieldsCollection }  from "./ConditionalTableColumns"

const Table = (props) => {
  const [ tableColumns, setTableColumns ] = useState([])
  
  const [ tableBody, setTableBody ] = useState([])
  const [ parentNode, setParentNode ] = useState([])
  
  useEffect(() => {
    setTableColumns(conditionalTableColumns(props))
    if (props.stateProps.selectedActivity === 0 && props.stateProps.adminSection) setTableColumns(usersCollection);
    if (props.stateProps.selectedActivity === 5 && props.stateProps.adminSection)  setTableColumns(selectionFieldsCollection(props.selectFieldToModify)) 
    
    if (props.stateProps.selectedActivity === 4 && props.stateProps.adminSection === false) {
      setTableBody([].concat(...props.data))
      setParentNode(props.data)      
    }
  }, [props])
  
  const renderRowSubComponent = React.useCallback(
    (postedData) => (
      <pre
        style={{
          fontSize: '10px',
        }}
      >
        <code><h6>{JSON.stringify({ postedEntries: postedData?.original.posted }, null, 2)
        .replace(/[{}]/g, '').replace(/[""]/g, '')}</h6></code>
      </pre>
    ),
    []
  )

  return (
    <Container style={{ margin: "auto", whiteSpace: "nowrap"}} >
    {tableColumns ?  <TableContainer 
    updateFuelPriceHandler={props.updateFuelPriceHandler}
    fuelPrice={props.fuelPrice}
    subcategorySelectField={props.subcategorySelectField}
    categorySelectField={props.categorySelectField}
    updateSubcategoryOfMaterialsByRow={props.updateSubcategoryOfMaterialsByRow}
    subcategoryOfMaterials={props.subcategoryOfMaterials}
    updateCategoryOfMaterialsByRow={props.updateCategoryOfMaterialsByRow}
    categoryOfMaterials={props.categoryOfMaterials} 
        updateStatusOfPurchaseRequestHandler={props.updateStatusOfPurchaseRequestHandler}
        statusHandler={props.statusHandler}
        onClickRowId={props.onClickRowId}
        blockNextButton={props.blockNextButton}
        counter={props.counter}
        nextPageLoad={props.nextPageLoad}
        previousPageLoad={props.previousPageLoad}
        stateProps={props.stateProps}
        currentUser={props.stateProps.currentUser}
        onDelete={props.onDelete}
        columns={tableColumns}
        data={props.stateProps.selectedActivity === 4 && props.stateProps.adminSection === false ? 
          tableBody : props.data}
        parentNode={parentNode}
        getRoleValue={props.getRoleValue}
        onClick={props.onClick}
        currentRole={props.currentRole}
        renderRowSubComponent={renderRowSubComponent}
        updatePRNumByRow={props.updatePRNumByRow}
        purchaseNumber={props.purchaseNumber}
        updateInvoiceNumByRow={props.updateInvoiceNumByRow}
        invoiceNumber={props.invoiceNumber}
        errorOnDB={props.errorOnDB}
        outputMode={props.outputMode}
        />
         : null} 
    </Container>
  );
};

export default Table;