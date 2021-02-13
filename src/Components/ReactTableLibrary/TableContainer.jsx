import React, { Fragment, useState } from 'react';
import {
  useTable, useSortBy, useFilters, 
  useExpanded, usePagination,
} from 'react-table';
import { Table, Row, Col, Button, Input, 
  // CustomInput 
} from 'reactstrap';
import { Filter, DefaultColumnFilter } from './TableFilters';

import { pageCounter, countNextPage, countPreviousPage } from "../../Firebase/FetchDataFromRealtimeDB"
import DeleteButton from '../DeleteButton/DeleteButton';
import AdminTableElements from '../../RoleBasedAccessControl/AdminSection/AdminTableElements';
import SelectFieldTable from './SelectFieldTable/SelectFieldTable';

const TableContainer = ({ 
  columns, data, onDelete, 
  currentUser, stateProps,
  getRoleValue, onClick,
  currentRole, nextPageLoad,
  previousPageLoad, counter,
  blockNextButton, updateDataByRowHandler,
  statusHandler, onClickRowId,
  renderRowSubComponent
   }) => {
  const {
    getTableProps, getTableBodyProps,
    headerGroups, page, prepareRow,
    visibleColumns, canNextPage,
    canPreviousPage, pageOptions,
    // pageCount,
    gotoPage, nextPage, previousPage,
    // setPageSize,
    state: { pageIndex, 
      // pageSize,
    },
  } = useTable(
    {
      columns, data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: { pageIndex: pageCounter, pageSize: 10, sortBy: [
        {
          id: "id",
          desc:true
        }
      ] 
    },
      onDelete, currentUser,
      stateProps, getRoleValue,
      onClick, currentRole,
      nextPageLoad, previousPageLoad,
      counter, blockNextButton,
      updateDataByRowHandler,
      statusHandler, onClickRowId,
      renderRowSubComponent     
    },
    useFilters, useSortBy,
    useExpanded, usePagination
  );

  const generateSortingIndicator = (column) => {
     return column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : '';
  };

 const [ pageNumber, setPageNumber ] = useState('')
  const onChangeInInput = (event) => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0;
    setPageNumber(event.target.value)
    gotoPage(page);
  };

  const nextPageClick = () => {
    nextPageLoad()
    countNextPage()
    return gotoPage(pageIndex)
   };

   const previousPageClick = () => {
    previousPageLoad()
    countPreviousPage()
    return gotoPage(pageIndex)
   };

   return (
    <Fragment>
      <Table bordered hover striped responsive {...getTableProps()} style={{marginTop: "20px"}}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} style={{verticalAlign: "baseline"}}>
                  <div {...column.getSortByToggleProps()}>
                    {column.render('Header')}
                    {generateSortingIndicator(column)}
                  </div>
                  {!column.canSort ? <Filter column={column}/> : null}
                  
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            // console.log(row.cell.getCellProps())
            prepareRow(row);
            return (
              <Fragment key={row.getRowProps().key}>
                <tr>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{isNaN(cell.render('Cell').props.value) === false ? 
                      +parseFloat(cell.render('Cell').props.value).toFixed(1) || "" : cell.render('Cell')}</td>
                    );
                  })}
                {/* <RenderForAdmin stateProps={stateProps}>   */}
                {stateProps.outputTable === true || stateProps.adminSection === false || 
                stateProps.selectedActivity !== 0 ? null :                 
                <td>
                <AdminTableElements 
                // stateProps={stateProps}
                id={data[row.id].id} 
                currentUser={currentUser}
                getRoleValue={getRoleValue} 
                onClick={() => onClick(data[row.id])}
                currentRole={currentRole}/>
                </td> }
                
                {!stateProps.adminSection && stateProps.selectedActivity === 4 ?
                <td>
                <SelectFieldTable onChange={updateDataByRowHandler} value={statusHandler} 
                onFocus={() => onClickRowId(data[row.id])} id={data[row.id].id}
                /> 
                  </td> : null}

                {stateProps.outputTable ?
                <td>
                  <DeleteButton onClick={() => {onDelete(data[row.id].id, 
                  data[row.id].numberOfEmployee, data[row.id].numberOfJob); }}/>
                </td> : null}
                
                {stateProps.adminSection && stateProps.selectedActivity === 5 ?
                <td>  
                 <DeleteButton onClick={() => onDelete(data[row.id].id)}/>
                </td> : null}
                {/* </RenderForAdmin> */}
                </tr>
                
                {row.isExpanded ? (
                  <tr>
                    <td colSpan={visibleColumns.length}>
                      {renderRowSubComponent(row)}
                    </td>
                  </tr>
                ) : null}
              </Fragment>
            );
          })}
        </tbody>
      </Table>

      <Row style={{ maxWidth: 1000, margin: '10px auto', textAlign: 'center' }}>
       <span className={!stateProps.outputTable ? "page-columns" : "outputTable"}>
        <Col md={3}>
          {/* <Button
            color='primary'
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            {'<<'}
          </Button> */}
          {stateProps.outputTable === false ? 
          <Button color='primary' onClick={nextPage} 
           disabled={!canNextPage} style={{marginBottom: "10px"}} >
           {'<'}
         </Button> : 
          <Button color='primary' onClick={()=> nextPageClick()}
          disabled={blockNextButton} style={{marginBottom: "10px"}} >
            {'Previous Entries'}
          </Button>}
        </Col>
        
        <span className={!stateProps.outputTable ? "buttons-in-table" : "buttons1"}>
        <Col md={2}>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </Col>
        <Col md={2}>
          Records{' '}
          <strong>
            {data.length}
          </strong>
        </Col>
        <Col md={2} >
          <Input
            list="defaultNumbers"
            type='number'
            placeholder={"Page"}
            min={1}
            style={{ width: 80, margin: "auto" }}
            max={pageOptions.length}
            value={pageNumber}
            onChange={onChangeInInput}
            
          />
          {/* <datalist id="defaultNumbers">
            {[pageIndex].map(x=> <option value={x +1}></option>)}
          </datalist> */}
        </Col>
        </span>
        {/* <Col md={2}> 
          <CustomInput
            id={Math.random() * 10000}
            type='select'
            value={pageSize}
            onChange={onChangeInSelect}
          >
            
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
           </CustomInput>
        </Col> */}
        <Col md={3} >
        {stateProps.outputTable === false ? 
          <Button style={{marginBottom: "10px"}} 
          color='primary' onClick={previousPage}
          disabled={!canPreviousPage}>
           {'>'}
         </Button> :
         <Button className="second-button"
            color='primary'
            onClick={() => previousPageClick()}
            disabled={counter === 10 ? true : false}
          >
            {'Next Entries'}
          </Button>}
          
          {/* <Button
            color='primary'
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {'>>'}
          </Button> */}
        </Col>
        </span>
      </Row>
    </Fragment>
  );
};

export default TableContainer;