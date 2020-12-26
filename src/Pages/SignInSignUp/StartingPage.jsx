import React from 'react';

import "./StartingPage.css"
import SignIn from "./SignIn/SignIn"
import SignUp from "./SignUp/SignUp"

  const startingPage = (props) => (
    <div className='sign-in-and-sign-up'>
      <SignIn tokenIdHandler={props.tokenIdHandler}/>
      <SignUp tokenIdHandler={props.tokenIdHandler}/>
    </div>
  )
  
  export default startingPage;