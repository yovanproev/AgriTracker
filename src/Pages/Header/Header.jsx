import React from 'react'
import { NavLink } from "react-router-dom";

import "./Header.css"
import Logo from "../../Assets/Logo.jpg";

import { auth } from "../../Firebase/Firebase.utils"

const Header = ({ currentUser, inputMode, outputMode, modalHandler }) => {
  const signOutAndModalOff = () => {
    auth.signOut()
    modalHandler()
  }

  return (
      <nav className="nav-bar">

      {!currentUser ?  
        <img className="picture" src={Logo} 
        alt="Logo_image" width="100px" >
        </img> : 
        <NavLink to="/Home"> 
        <img className="picture" src={Logo} 
        alt="Logo_image" width="100px" >
        </img></NavLink>}

      <h2 className="your-company">Your Company Name</h2>
      <div className="menu-wrap">
       <ul className="ul-bar">
        <div className="item">
         <li className="list-item">
           {currentUser  ? 
           <NavLink className="link" 
             activeClassName="active-style"
             onClick={inputMode}
             to="/Inputs"
            > 
            <div className="cherry cherry1"> Input Forms </div>
            <div className="cherry-join"></div>
           </NavLink>: null}
         </li>
         <li className="list-item">
          {currentUser ? 
          <NavLink className="link"  
          activeClassName="active-style"
          onClick={outputMode}
          to="/Reports"
           >
            <div className="cherry cherry2">Reports</div>
          </NavLink> : null}
         </li> </div>
         <li className="list-item"> 
           {currentUser ? (
           <NavLink className="link"  
            to="/"
            onClick={() => signOutAndModalOff()}>
            <i className="fas fa-sign-out-alt"></i>SIGN OUT
            </NavLink>
            ) : null}
         </li>
        </ul>
      </div>
    </nav>
  )
}

export default Header;
