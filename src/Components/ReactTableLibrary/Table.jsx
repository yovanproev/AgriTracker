import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import TableContainer from './TableContainer';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./ReactTable.css"

import  { conditionalTableColumns, usersCollection, selectionFieldsCollection }  from "./ConditionalTableColumns"

const Table = (props) => {
  const [ tableData, setTableData ] = useState([])
  
    useEffect(() => {
    setTableData(conditionalTableColumns(props))
    if (props.stateProps.selectedActivity === 0 && props.stateProps.adminSection) setTableData(usersCollection);
    if (props.stateProps.selectedActivity === 5 && props.stateProps.adminSection)  setTableData(selectionFieldsCollection(props.selectFieldToModify)) 
    }, [props])
    
 
  return (
    <Container style={{ margin: "30px auto", whiteSpace: "nowrap"}} >
      <TableContainer
        updateDataByRowHandler={props.updateDataByRowHandler}
        statusHandler={props.statusHandler}
        onClickRowId={props.onClickRowId}
        blockNextButton={props.blockNextButton}
        counter={props.counter}
        nextPageLoad={props.nextPageLoad}
        previousPageLoad={props.previousPageLoad}
        stateProps={props.stateProps}
        currentUser={props.stateProps.currentUser}
        onDelete={props.onDelete}
        columns={tableData}
        data={props.data}
        getRoleValue={props.getRoleValue}
        onClick={props.onClick}
        currentRole={props.currentRole}
         />
    </Container>
  );
};

export default Table;