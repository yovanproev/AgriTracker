import React from 'react';

import "./HomePage.scss"
import BackDrop from "../../Components/Backdrop/Backdrop"
import SelectReport from '../ReportsPage/SelectReport';
import { RenderForAdmin } from '../../RoleBasedAccessControl/RoleBaseControl';

const HomePage = (props) => {

     return (
    <div>
     <BackDrop /> 
     <div className='home-page'>
       <h2>Hello!</h2>
       <div>
         <h4>Welcome to your App, to choose a module pick yourself a cherry.</h4>
       </div>
       <RenderForAdmin stateProps={props.stateProps}>
        <SelectReport
          modal={props.modal}
          stateProps={props.stateProps}
          onClick={props.backButton}/>
        </RenderForAdmin>
       {/* - set daily orders for employees */}
       
      </div> 
    </div>
  )
}
  
export default HomePage;