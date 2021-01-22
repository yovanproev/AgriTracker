import React from 'react';

import "./HomePage.scss"
import BackDrop from "../../Components/Backdrop/Backdrop"

const HomePage = () => {
   
  return (
    <div>
     <BackDrop /> 
     <div className='home-page'>
       <h2>Hello!</h2>
       <div>
         <h4>Welcome to your App, to choose a module pick yourself a cherry.</h4>
       </div>
       - follow changes in modules in real time <br/>
       - set daily orders for employees
       
      </div> 
    </div>
  )
}
  
export default HomePage;