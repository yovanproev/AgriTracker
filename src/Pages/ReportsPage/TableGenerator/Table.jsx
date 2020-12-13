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
  const [data, setData] = useState([]);
  const dataApp = props.data
  const onDelete = props.onDelete

  useEffect(() => {
    setData(dataApp);
  }, [dataApp]);

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
    () => mode,[mode]);

  return (
    <Container style={{ marginTop: "30px" }}>
      <TableContainer
        stateProps={props.stateProps}
        currentUser={props.stateProps.currentUser}
        onDelete={onDelete}
        columns={columns}
        data={data}
        roleHandler={props.roleHandler}
        onClick={props.onClick}
        currentRole={props.currentRole}
        defaultRole={props.defaultRole}
        // renderRowSubComponent={renderRowSubComponent}
      />
    </Container>
  );
};

export default App;