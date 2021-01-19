import React from 'react'
import { NavLink } from "react-router-dom";

import "./Header.css"
import Logo from "../../Assets/Logo.jpg";

import { RenderForOperator } from '../../RoleBasedAccessControl/RoleBaseControl';

const Header = ({ stateProps, inputMode, outputMode, modalHandler, signOutHandler, expiredToken }) => {
  const signOutAndModalOff = () => {
    modalHandler()
     signOutHandler()
   }

  return (
    <nav className="nav-bar">
        
      {stateProps.currentUser ?  
        <NavLink to="/Home" onClick={inputMode}> 
        <img className="picture" src={Logo} 
        alt="Logo_image" width="100px" >
        </img></NavLink> : 
        <img className="picture" src={Logo} 
        alt="Logo_image" width="100px" >
        </img>}

      <h2 className="your-company">Your Company Name</h2>
      <div className="menu-wrap">

        {stateProps.currentUser ?
          <RenderForOperator stateProps={stateProps}>
        <ul className="ul-bar">
          <div className="item">
            <li className="list-item">
              <NavLink className="link" 
                  activeClassName="active-style"
                  onClick={(e) => {inputMode(e); expiredToken()}}
                  to="/Inputs"
                  > 
                  <div className="cherry cherry1"> Input Forms </div>
                  <div className="cherry-join"></div>
              </NavLink>
            </li>
            <li className="list-item">
                <NavLink className="link"  
                  activeClassName="active-style"
                  onClick={(e) => {outputMode(e); expiredToken()}}
                  to="/Reports"
                >
                  <div className="cherry cherry2">Reports</div>
                </NavLink> 
            </li> 
          </div>
        </ul>
        </RenderForOperator> : null}

         {stateProps.currentUser || stateProps.logOutError ?        
        <NavLink className="sign-out-link"  
          to="/"
          onClick={() => signOutAndModalOff()}>
          <i className="fas fa-sign-out-alt"></i>SIGN OUT
          </NavLink> : null }
      </div>
    </nav>
  )
}

export default Header;
