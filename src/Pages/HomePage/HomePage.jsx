import React from 'react';

import "./HomePage.scss"
import BackDrop from "../../Components/Backdrop/Backdrop"
import SelectReport from '../ReportsPage/SelectReport';

const HomePage = (props) => {

     return (
    <div>
     <BackDrop /> 
     <div className='home-page'>
       <h2>Hello!</h2>
       <div>
         <h4>Welcome to your App, to choose a module pick yourself a cherry.</h4>
       </div>
       <SelectReport
        modal={props.modal}
        stateProps={props.stateProps}
        onClick={props.backButton}/>

       {/* - set daily orders for employees */}
       
      </div> 
    </div>
  )
}
  
export default HomePage;