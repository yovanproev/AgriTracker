import React from 'react';

import "./StartingPage.css"
import SignIn from "./SignIn/SignIn"
import SignUp from "./SignUp/SignUp"

  const startingPage = (props) => (
    <div className='sign-in-and-sign-up'>
      <SignIn tokenIdHandler={props.tokenIdHandler}/>
      <SignUp props={props}/>
    </div>
  )
  
  export default startingPage;