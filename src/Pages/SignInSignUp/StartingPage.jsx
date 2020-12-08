import React from 'react';

import "./StartingPage.css"
import SignIn from "./SignIn/SignIn"
import SignUp from "./SignUp/SignUp"

  const startingPage = () => (
    <div className='sign-in-and-sign-up'>
      <SignIn />
      <SignUp />
    </div>
  )
  
  export default startingPage;