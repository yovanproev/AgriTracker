import React, {Fragment} from 'react';
import './App.css';
import {
  Switch, Route,
  Redirect, BrowserRouter as Router 
} from "react-router-dom";

import Header from "./Pages/Header/Header"
import StartingPage from "./Pages/SignInSignUp/StartingPage"
import HomePage from './Pages/HomePage/HomePage';

import SelectActivity from './Pages/SelectActivity';

import { resetCounter } from "./Firebase/FetchDataFromRealtimeDB";
import { auth, createUserProfileDocument } from "./Firebase/Firebase.utils"
import { RenderForAdmin, RenderForOperator } from './RoleBasedAccessControl/RoleBaseControl';
import Modal from "./Components/Modal/Modal"
import axiosLocal from "./AxiosInput";
import {usersAuthentication} from "./Pages/InputPage/DBObjectElements/ObjectsToPostToFirebase"

class App extends React.Component {
  state = {
      currentUser: null,
      inputMode: JSON.parse(sessionStorage.getItem( 'inputMode' )) || false,
      outputMode: JSON.parse(sessionStorage.getItem( 'outputMode' )) || false,
      inputForms: false,
      outputTable: false,
      adminMode: JSON.parse(sessionStorage.getItem( 'adminMode' )) || false,
      hideModal: false,
      activityBubbleState: [
        { name: "Fuel Registration"},
        { name: "Machine Registration"},
        { name: "Maintenance and Repair"},
        { name: "Working Hours Registration"},
        { name: "Purchase Requests"},
      ],
      adminActivity: [
        { name: "Users Management"},
        { name: "Fuel Management"},
        { name: "Machine Management"},
        { name: "Maintenance and Repair Management"},
        { name: "Working Hours Registration Management"},
        { name: "Add selection Fields"},
      ],
    } 
  
  unsubscribeFromAuth = null

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth && !this.state.logOutError) {
        const userRef = await createUserProfileDocument(userAuth);
      
        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }, role: snapShot.data().role})});
      }
      this.setState({ currentUser: userAuth})})
      this.setCredentialsHandler()
      this.expiredToken()
  }

  expiredToken = () => {
    if (new Date(this.state.expirationDate) <= new Date()) {
    this.setState({ 
    role: "Disabled", logOutError: true})
    auth.signOut() }
  }

  componentWillUnmount() {this.unsubscribeFromAuth()}

 inputModeHandler = () => {
  //  console.log(mode)
   sessionStorage.setItem( 'inputMode', true )
   sessionStorage.setItem( 'outputMode', false )
   sessionStorage.setItem( 'adminMode', false )
   resetCounter();
  this.setState({
    inputMode: true, outputMode: false,
    outputTable: false, adminMode: false,
    adminSection: false, hideModal: true, })
}

  outputModeHandler = () => {
    sessionStorage.setItem( 'inputMode', false )
    sessionStorage.setItem( 'outputMode', true )
    sessionStorage.setItem( 'adminMode', false )
       this.setState({
      inputMode: false, outputMode: true,
      inputForms: false, adminMode: false,
      adminSection: false, hideModal: true })
  }

  adminModeHandler = () => {
    sessionStorage.setItem( 'inputMode', false )
    sessionStorage.setItem( 'outputMode', false )
    sessionStorage.setItem( 'adminMode', true )
    resetCounter();
    this.setState({
      inputMode: false, outputMode: false,
      outputTable: false, inputForms: false,
      adminMode: true, hideModal: true, })
   }

   homeModeHandler = () => {
    sessionStorage.setItem( 'inputMode', false )
    sessionStorage.setItem( 'outputMode', false )
    sessionStorage.setItem( 'adminMode', false )
     resetCounter();
    this.setState({
      inputMode: false, outputMode: false,
      outputTable: false, inputForms: false,
      adminMode: false, hideModal: false, 
    adminSection: false,})
   }

 activityHandler = (e) => {
   this.setState({ selectedActivity: [e][0] })
   this.expiredToken();
  if (this.state.inputMode) {
  this.setState({
    inputForms: true, outputTable: false,
    adminSection: false
  })} else if (this.state.outputMode) {
  this.setState({
    inputForms: false, outputTable: true,
    adminSection: false
  })} else if (this.state.adminMode) {
    this.setState({
      inputForms: false, outputTable: false,
      adminSection: true
    })}
 }
 
  backButtonHandler = () => {
   this.setState({
     outputTable: false, inputForms: false,
     adminSection: false,
   })}

  hideModalHanlder = () => {
    this.setState({
      hideModal: !this.state.hideModal, outputTable: false,
      inputForms: false, adminSection: false,
      logOutError: false
    })}

  setCredentialsHandler = () => {
    const cookieData = document.cookie?.split(';');
    const expirationDate = cookieData[1]?.includes("expirationDate") ? cookieData[1]?.split('=')[1] : 
    cookieData[0]?.includes("expirationDate") ? cookieData[0]?.split('=')[1] : cookieData[2]?.split('=')[1]
    const tokenId = cookieData[1]?.includes("tokenId") ? cookieData[1]?.split('=')[1] : 
    cookieData[0]?.includes("tokenId") ? cookieData[0]?.split('=')[1] : cookieData[2]?.split('=')[1]
    const email = cookieData[1]?.includes("email") ? cookieData[1]?.split('=')[1] : 
    cookieData[0]?.includes("email") ? cookieData[0]?.split('=')[1] : cookieData[2]?.split('=')[1]
    
    this.setState({
    expirationDate: expirationDate,
    tokenId: tokenId, email: email,}) 
 }

  postUserAuth = () => {
    axiosLocal.post('/authenticatedUsers.json', usersAuthentication(this.state))
  }

  signOutHandler = () => {
    this.setState({ currentUser: null})
    auth.signOut()}

   render() {
    // console.log(this.state)
    return (
      <div className="app" >
        {this.state.logOutError ? <Modal show={this.state.logOutError} >
         Your token has expired, please sign in again!</Modal> : null}
       
        <Router basename="/">
       
          <Header
           expiredToken={this.expiredToken} 
            signOutHandler={this.signOutHandler}
            modalHandler={this.hideModalHanlder}
            stateProps={this.state}
            inputMode={this.inputModeHandler}
            outputMode={this.outputModeHandler}
            adminMode={this.adminModeHandler}
            homeMode={this.homeModeHandler}
          />  
            
          <Switch>
            <Route exact path="/"> 
              {this.state.currentUser ? <Redirect to="/home" /> :
               <StartingPage
               postUserAuth={this.postUserAuth}
               stateProps={this.state}
                modal={this.hideModalHanlder}
                setCredentialsHandler={this.setCredentialsHandler}/>
              }
            </Route>

            <Route path="/home">
              {this.state.currentUser ? 
              <HomePage stateProps={this.state}/> : null} 
            </Route>

            {this.state.currentUser ?
              <Fragment>
                <RenderForAdmin stateProps={this.state}>
                  <Route path="/admin">
                    {this.state.currentUser ? 
                    <SelectActivity
                    modal={this.hideModalHanlder}
                    key={this.activityHandler}
                    stateProps={this.state}
                    onClick={this.activityHandler}
                    backButton={this.backButtonHandler}/> : <StartingPage />} 
                  </Route>
                </RenderForAdmin> 

                <RenderForOperator stateProps={this.state}>
                                              
                  <Route path="/inputs">
                      {this.state.currentUser ? 
                      <SelectActivity 
                      modal={this.hideModalHanlder}
                      key={this.activityHandler}
                      stateProps={this.state}
                      onClick={this.activityHandler} 
                      backButton={this.backButtonHandler}/> : <StartingPage />} 
                    </Route>
                </RenderForOperator>  
                
                <RenderForAdmin stateProps={this.state}>
                  <Route path="/reports">
                    {this.state.currentUser ? 
                    <SelectActivity
                    modal={this.hideModalHanlder}
                    key={this.activityHandler}
                    stateProps={this.state}
                    onClick={this.activityHandler}
                    backButton={this.backButtonHandler}/> : <StartingPage />} 
                  </Route>
                </RenderForAdmin> 
              </Fragment>: null 
            } 
          </Switch>
          
        </Router>
     </div>    
    );
  }
}

export default App;
