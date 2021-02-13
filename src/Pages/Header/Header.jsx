import React from 'react'
import { NavLink } from "react-router-dom";

import "./Header.css"
import Logo from "../../Assets/Logo.jpg";

import { RenderForAdmin, RenderForOperator } from '../../RoleBasedAccessControl/RoleBaseControl';

const Header = ({ stateProps, inputMode, outputMode, adminMode, homeMode, 
                  modalHandler, signOutHandler, expiredToken }) => {
  
  const signOutAndModalOff = () => {
    modalHandler()
    signOutHandler()
  }

  return (
    <nav className="nav-bar">
        
      {stateProps.currentUser ?  
        <NavLink to="/home" onClick={(e) => {homeMode(e); expiredToken()}}> 
        <img className="picture" src={Logo} 
        alt="Logo_image" width="100px" >
        </img></NavLink> : 
        <img className="picture" src={Logo} 
        alt="Logo_image" width="100px" >
        </img>}

      <h2 className="your-company">DFP Forms</h2>
      <div className="menu-wrap">
      
      {stateProps.currentUser ?  
      <RenderForAdmin stateProps={stateProps}>
      <ul className="ul-bar">
            <li className="list-item">
                <NavLink className="link-admin"  
                  activeClassName="active-style-admin"
                  onClick={(e) => {adminMode(e); expiredToken()}}
                  to="/admin"
                >ADMIN
                </NavLink> 
            </li> 
            </ul>
     </RenderForAdmin> : null}


        {stateProps.currentUser ?
          
        <ul className="ul-bar">
          <div className="item">
          <RenderForOperator stateProps={stateProps}>
            <li className="list-item">
              <NavLink className="link" 
                  activeClassName="active-style"
                  onClick={(e) => {inputMode(e); expiredToken()}}
                  to="/inputs"
                  > 
                  <div className="cherry cherry1"> Input Forms </div>
                  <div className="cherry-join"></div>
              </NavLink>
            </li>
            </RenderForOperator>
            <RenderForAdmin stateProps={stateProps}>
            <li className="list-item">
                <NavLink className="link"  
                  activeClassName="active-style"
                  onClick={(e) => {outputMode(e); expiredToken()}}
                  to="/reports"
                >
                  <div className="cherry cherry2">Reports</div>
                </NavLink> 
            </li> 
            </RenderForAdmin>
          </div>
        </ul>
         : null}

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
