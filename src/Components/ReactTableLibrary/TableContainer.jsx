import React, { Fragment, useState } from 'react';
import {
  useTable, useSortBy, useFilters, 
  useExpanded, usePagination,
} from 'react-table';
import { Table, Row, Col, Button, Input, 
  // CustomInput 
} from 'reactstrap';
import { Filter, DefaultColumnFilter } from './TableFilters';
import { fetchStatusOfPurchaseByName } from "../../LocalData/InputFormsData"

import { pageCounter, countNextPage, countPreviousPage } from "../../Firebase/FetchDataFromRealtimeDB"
import DeleteButton from '../DeleteButton/DeleteButton';
import AdminTableElements from '../../RoleBasedAccessControl/AdminSection/AdminTableElements';
import SelectFieldTable from './SelectFieldTable/SelectFieldTable';
import InputFieldTable from './InputFieldTable/InputFieldTable';
import { updateByRowId } from '../../Firebase/UpdateRowsInRealtimeDB';
import { RenderForManager } from '../../RoleBasedAccessControl/RoleBaseControl';

const TableContainer = ({ 
  columns, data, onDelete, 
  currentUser, stateProps,
  getRoleValue, onClick,
  currentRole, nextPageLoad,
  previousPageLoad, counter,
  blockNextButton, updateDataByRowHandler,
  statusHandler, onClickRowId,
  renderRowSubComponent, updatePRNumByRow,
  purchaseNumber, updateInvoiceNumByRow,
  invoiceNumber, errorOnDB, outputMode, 
  updateSubcategoryOfMaterialsByRow,
  subcategoryOfMaterials, updateCategoryOfMaterialsByRow,
  categoryOfMaterials, categorySelectField,
  subcategorySelectField
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
      renderRowSubComponent, updatePRNumByRow,
      purchaseNumber, updateInvoiceNumByRow,
      invoiceNumber, errorOnDB, outputMode,
      updateSubcategoryOfMaterialsByRow,
      subcategoryOfMaterials, updateCategoryOfMaterialsByRow,
      categoryOfMaterials, categorySelectField,
      subcategorySelectField
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

   const [ rowId, updateRowId ] = useState("")
   const getRowId = (value) => {
    updateRowId(value)
   }

    const managerApprovalHandler = (numberOfItem) => {
     const update = {managerApproved: true}
    updateByRowId(rowId, stateProps, null, null, update, 4, errorOnDB, numberOfItem)
   }
 
   return (
    <Fragment>
      <Table bordered hover striped responsive {...getTableProps()} style={{marginTop: "20px"}}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              
              {stateProps.outputTable && stateProps.selectedActivity === 4 ? <th
              style={{verticalAlign: "baseline"}}>PR #</th> : null}
              {stateProps.outputTable && stateProps.selectedActivity === 4 ? <th
              style={{verticalAlign: "baseline"}}>Invoice #</th> : null}
              {stateProps.outputTable && stateProps.selectedActivity === 4 ? <th
              style={{verticalAlign: "baseline"}}>Select status</th> : null}
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} style={{verticalAlign: "baseline"}}>
                  <div {...column.getSortByToggleProps()}>
                    {column.render('Header')}
                    {generateSortingIndicator(column)}
                  </div>
                  {!column.canSort ? <Filter column={column}/> : null}
                  
                </th>
              ))}
              {stateProps.outputTable && stateProps.selectedActivity === 4 ? <th
              style={{verticalAlign: "baseline"}}>Select category</th> : null}
              {stateProps.outputTable && stateProps.selectedActivity === 4 ? <th
              style={{verticalAlign: "baseline"}}>Select subcategory</th> : null}
              <RenderForManager stateProps={stateProps}>
              {stateProps.outputTable && stateProps.selectedActivity === 4 ? <th
              style={{verticalAlign: "baseline"}}>Checked by Manager</th> : null}
              </RenderForManager>
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            // console.log(data[row.id])
            prepareRow(row);
            return (
              <Fragment key={row.getRowProps().key}>
                <tr>
                 {/* input of PR # and invoice # for Purchase Requests */}
                {!stateProps.adminSection && stateProps.inputMode === false && 
                stateProps.outputMode === true && stateProps.selectedActivity === 4 ?
                <td>
                <InputFieldTable onChange={updatePRNumByRow} value={purchaseNumber} 
                onFocus={() => onClickRowId(data[row.id], data[row.id].numberOfItem)} 
                id={data[row.id].id} stateProps={stateProps}
                /> </td>
                 : null}

                {!stateProps.adminSection && stateProps.inputMode === false && 
                stateProps.outputMode === true && stateProps.selectedActivity === 4 ?
                <td>
                <InputFieldTable onChange={updateInvoiceNumByRow} value={invoiceNumber} 
                onFocus={() => onClickRowId(data[row.id], data[row.id].numberOfItem)} 
                id={data[row.id].id} stateProps={stateProps}
                /> </td>
                 : null}
                 {/* Selection of status for Purchase Request*/}
                {!stateProps.adminSection && stateProps.inputMode === false && 
                stateProps.outputMode === true && stateProps.selectedActivity === 4 ?
                <td>
                <SelectFieldTable onChange={updateDataByRowHandler} value={statusHandler} 
                nameOfStatus={fetchStatusOfPurchaseByName(statusHandler)} 
                onFocus={() => onClickRowId(data[row.id], data[row.id].numberOfItem)} 
                id={data[row.id].id} stateProps={stateProps}
                /> </td>
                 : null}

                {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>
                        {isNaN(cell.render('Cell').props.value) === false ? 
                      +parseFloat(cell.render('Cell').props.value).toFixed(1) || "" 
                      : cell.render('Cell')}
                      </td>
                    );
                  })}
                {/* <RenderForAdmin stateProps={stateProps}>   */}
                
                {/* Selection of user's role */}
                {stateProps.outputTable === true || stateProps.adminSection === false || 
                stateProps.selectedActivity !== 0 ? null :                 
                <td>
                <AdminTableElements 
                stateProps={stateProps} id={data[row.id].id} 
                currentUser={currentUser} getRoleValue={getRoleValue} 
                onClick={() => onClick(data[row.id])}
                currentRole={currentRole}
                /> </td> }
                
                {/* Selection of category*/}
                {!stateProps.adminSection && stateProps.inputMode === false && 
                stateProps.outputMode === true && stateProps.selectedActivity === 4 ?
                <td>
                <SelectFieldTable onChange={(e) => {updateCategoryOfMaterialsByRow(e); 
                outputMode()}} // on refreshing output mode it calls all items again
                value={categoryOfMaterials} 
                nameOfStatus={categorySelectField[categoryOfMaterials]?.name} 
                selectOptions={categorySelectField} selectIdentity={16}
                onFocus={() => {onClickRowId(data[row.id], data[row.id].numberOfItem)}} 
                id={data[row.id].id} stateProps={stateProps}
                /> </td>
                 : null}

                {/* Selection of subcategory*/}
                {!stateProps.adminSection && stateProps.inputMode === false && 
                stateProps.outputMode === true && stateProps.selectedActivity === 4 ?
                <td>
                <SelectFieldTable onChange={updateSubcategoryOfMaterialsByRow} 
                value={subcategoryOfMaterials} selectIdentity={17}
                categoryOfMaterials={data[row.id]?.category}
                nameOfStatus={subcategorySelectField[subcategoryOfMaterials]?.name} 
                onFocus={() => onClickRowId(data[row.id], data[row.id].numberOfItem)} 
                id={data[row.id].id} stateProps={stateProps}
                /> </td>
                 : null}


                {/* Check button for manager*/}
                <RenderForManager stateProps={stateProps}>
                {stateProps.outputTable && stateProps.selectedActivity === 4 ?
                <td style={{verticalAlign: "inherit"}}> 
                 {data[row.id]?.managerApproved ? <span>&#10004;</span> :
                 <button onClick={() => {managerApprovalHandler(data[row.id].numberOfItem); outputMode()}} 
                  onFocus={() => getRowId(data[row.id].id)}
                  id={data[row.id].id}>Checked</button>}
                </td> : null} 
                </RenderForManager>

                {/* Delete button for reports page*/}
                {stateProps.outputTable ?
               <td style={{verticalAlign: "inherit"}}> 
                 <DeleteButton onClick={() => {onDelete(data[row.id].id, 
                  data[row.id].numberOfEmployee, data[row.id].numberOfJob, 
                  data[row.id].numberOfItem, data[row.id].parentId)}}
                  id={data[row.id].id} stateProps={stateProps}/>
                </td> : null}
                
                {/* Delete button for admin section, add select fields */}
                {stateProps.adminSection && stateProps.selectedActivity === 5 ?
               <td style={{verticalAlign: "inherit"}}> 
                 <DeleteButton onClick={() => onDelete(data[row.id].id)}
                 id={data[row.id].id} stateProps={stateProps}/>
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
       <span className={stateProps.outputTable || stateProps.homeMode ? "outputTable" : "page-columns"}>
       
        <Col md={3}>
          {stateProps.outputTable || stateProps.homeMode ? 
          <Button color='primary' onClick={()=> nextPageClick()}
          disabled={blockNextButton} style={{marginBottom: "10px"}} >
            {'Previous Entries'}
          </Button> :
          <Button color='primary' onClick={nextPage} 
           disabled={!canNextPage} style={{marginBottom: "10px"}} >
           {'<'}
         </Button>  
          }
        </Col>
        
        <span className={stateProps.outputTable || stateProps.homeMode
          ? "buttons1" : "buttons-in-table"}>
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
        {stateProps.outputTable || stateProps.homeMode ? 
         <Button className="second-button"
         color='primary'
         onClick={() => previousPageClick()}
         disabled={counter === 10 ? true : false}>
         {'Next Entries'}
         </Button> :
         <Button style={{marginBottom: "10px"}} 
          color='primary' onClick={previousPage}
          disabled={!canPreviousPage}>
           {'>'}
         </Button>}
        </Col>
        </span>
      </Row>
    </Fragment>
  );
};

export default TableContainer;