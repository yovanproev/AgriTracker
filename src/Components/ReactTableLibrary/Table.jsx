import React, { useEffect, useState, useMemo } from 'react';
import {
  Container,
  // Card,
  // CardImg,
  // CardText,
  // CardBody,
  // CardTitle,
} from 'reactstrap';
import TableContainer from './TableContainer';
import 'bootstrap/dist/css/bootstrap.min.css';

import  { conditionalTableColumns, usersCollection }  from "./ConditionalTableColumns"

const App = (props) => {
    
  const [mode, setMode] = useState(usersCollection);

    useEffect(() => {
    if (props.modeChange !== undefined) setMode(conditionalTableColumns(props)) 
    }, [props])
  
  // const renderRowSubComponent = (row) => {
  //      return (
  //     <Card style={{ width: '18rem', margin: '0 auto' }}>
  //       <CardImg top src={operator} alt='Card image cap' />
  //       <CardBody>
  //         <CardTitle>
  //           {/* <strong>{`${machine}`} </strong> */}
  //         </CardTitle>
  //         <CardText>
  //           <strong>Phone</strong>:  <br />
  //           <strong>Address:</strong>{' '}
  //           {/* {`${location}`} */}
  //         </CardText>
  //       </CardBody>
  //     </Card>
  //   );
  // };

  const columns = useMemo(
    () => mode, [mode]);

  return (
    <Container style={{ marginTop: "30px" }}>
      <TableContainer
        blockNextButton={props.blockNextButton}
        counter={props.counter}
        nextPageLoad={props.nextPageLoad}
        previousPageLoad={props.previousPageLoad}
        stateProps={props.stateProps}
        currentUser={props.stateProps.currentUser}
        onDelete={props.onDelete}
        columns={columns}
        data={props.data}
        getRoleValue={props.getRoleValue}
        onClick={props.onClick}
        currentRole={props.currentRole}
        // renderRowSubComponent={renderRowSubComponent}
      />
    </Container>
  );
};

export default App;