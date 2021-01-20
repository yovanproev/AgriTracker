import React, { Fragment, useState } from 'react';
import {
  useTable,
  useSortBy,
  useFilters,
  useExpanded,
  usePagination,
} from 'react-table';
import { Table, Row, Col, Button, Input, 
  // CustomInput 
} from 'reactstrap';
import { Filter, DefaultColumnFilter } from './TableFilters';

import { pageCounter, countNextPage, countPreviousPage } from "../../Firebase/FetchDataFromRealtimeDB"
import { RenderForAdmin } from "../../RoleBasedAccessControl/RoleBaseControl"
import DeleteButton from '../DeleteButton/DeleteButton';
import AdminTableElements from '../../RoleBasedAccessControl/AdminSection/AdminTableElements';

const TableContainer = ({ 
  columns, 
  data, 
  onDelete, 
  currentUser, 
  stateProps,
  getRoleValue,
  onClick,
  currentRole,
  nextPageLoad,
  previousPageLoad,
  counter,
  blockNextButton 
   }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    visibleColumns,
    canNextPage,
    canPreviousPage,
    pageOptions,
    // pageCount,
    gotoPage,
    nextPage,
    previousPage,
    // setPageSize,
    state: { pageIndex, 
      // pageSize 
    },
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: { pageIndex: pageCounter, pageSize: 10, sortBy: [
        {
          id: "id",
          desc:true
        }
      ] 
    },
      onDelete,
      currentUser,
      stateProps,
      getRoleValue,
      onClick,
      currentRole,
      nextPageLoad,
      previousPageLoad,
      counter,
      blockNextButton      
    },
    useFilters,
    useSortBy,
    useExpanded,
    usePagination
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
      <Table bordered hover striped responsive {...getTableProps()}>
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
            prepareRow(row);
            return (
              <Fragment key={row.getRowProps().key}>
                <tr>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    );
                  })}
                <RenderForAdmin stateProps={stateProps}>  
                {stateProps.outputTable === true ? null : 
                <td>
                <AdminTableElements 
                // stateProps={stateProps}
                id={data[row.id].id} 
                currentUser={currentUser}
                getRoleValue={getRoleValue} 
                onClick={() => onClick(data[row.id])}
                currentRole={currentRole}/>
                </td> }
                
                {stateProps.outputTable === true ?
                <td>  
                 <DeleteButton onClick={() => onDelete(data[row.id].id, 
                  data[row.id].numberOfEmployee, data[row.id].numberOfJob)}/>
                </td> : null}
                </RenderForAdmin>
                </tr>
                
                {row.isExpanded && (
                  <tr>
                    <td colSpan={visibleColumns.length}>
                      {/* {renderRowSubComponent(row)} */}
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </Table>

      <Row style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
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
          disabled={!canNextPage}>
           {'<'}
         </Button> : 
          <Button color='primary' onClick={()=> nextPageClick()}
           disabled={blockNextButton}>
            {'Previous Entries'}
          </Button>}
        </Col>
        <Col md={2} style={{ marginTop: 7 }}>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </Col>
        <Col md={2} style={{ margin: "7px auto" }}>
          Records{' '}
          <strong>
            {data.length}
          </strong>
        </Col>
        <Col md={2}>
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
        <Col md={2}>
        {stateProps.outputTable === false ? 
          <Button style={{margin: "10px auto" }}
          color='primary' onClick={previousPage}
           disabled={!canPreviousPage}>
           {'>'}
         </Button> :
         <Button
            style={{margin: "7px auto" }} 
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
      </Row>
    </Fragment>
  );
};

export default TableContainer;