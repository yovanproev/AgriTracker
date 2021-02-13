import React from 'react';

import "./StartingPage.css"
import SignIn from "./SignIn/SignIn"
import SignUp from "./SignUp/SignUp"

  const startingPage = (props) => (
    <div className='sign-in-and-sign-up'>
      <SignIn setCredentialsHandler={props.setCredentialsHandler} stateProps={props.stateProps}
      postUserAuth={props.postUserAuth}/>
      <SignUp setCredentialsHandler={props.setCredentialsHandler} stateProps={props.stateProps}
      postUserAuth={props.postUserAuth}/>
    </div>
  )
  
  export default startingPage;