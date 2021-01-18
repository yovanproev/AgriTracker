import React from 'react';
import './App.css';
import {
  Switch, Route,
  Redirect, HashRouter as Router 
} from "react-router-dom";

import Header from "./Pages/Header/Header"
import StartingPage from "./Pages/SignInSignUp/StartingPage"
import HomePage from './Pages/HomePage/HomePage';

import SelectActivity from './Pages/SelectActivity';

import { resetCounter } from "./Firebase/FetchDataFromRealtimeDB";
import { auth, createUserProfileDocument } from "./Firebase/Firebase.utils"
import { RenderForOperator } from './RoleBasedAccessControl/RoleBaseControl';
import Modal from "./Components/Modal/Modal"

class App extends React.Component {
  state = {
      currentUser: null,
      inputMode: JSON.parse(localStorage.getItem( 'SelectedMode' )),
      outputMode: undefined,
      inputForms: false,
      outputTable: false,
      hideModal: true,
      activityBubbleState: [
        { name: "Fuel Consumption"},
        { name: "Machine Registration"},
        { name: "Maintenance and Repair"},
        { name: "Working Hours Registration"},
      ],
    } 
  
  unsubscribeFromAuth = null

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }, role: snapShot.data().role});
        });
      }
      this.setState({ currentUser: userAuth})})
      
      const cookieData = document.cookie?.split(';');
      const expirationDate = cookieData[1]?.includes("expirationDate") ? cookieData[1]?.split('=')[1] : 
      cookieData[0]?.includes("expirationDate") ? cookieData[0]?.split('=')[1] : cookieData[2]?.split('=')[1]
      const tokenId = cookieData[1]?.includes("tokenId") ? cookieData[1]?.split('=')[1] : 
      cookieData[0]?.includes("tokenId") ? cookieData[0]?.split('=')[1] : cookieData[2]?.split('=')[1]
      const email = cookieData[1]?.includes("email") ? cookieData[1]?.split('=')[1] : 
      cookieData[0]?.includes("email") ? cookieData[0]?.split('=')[1] : cookieData[2]?.split('=')[1]  
      
      this.setState({ 
        expirationDate: expirationDate,
        tokenId: tokenId,
        email: email })
        console.log("componentDidMount")
  }

  expiredToken = () => {this.setState({ 
    role: "Disabled", logOutError: true})
    auth.signOut()
  }

  // componentDidUpdate(prevState) {
  //   console.log("component did update")
  //   if (new Date(this.state.expirationDate) <= new Date()) {
  //    if (prevState.selectedActivity !== this.state.selectedActivity) {
  //     this.expiredToken()
  //    } else return null
  //   } else return null
  // }

  componentWillUnmount() {this.unsubscribeFromAuth()}

 inputModeHandler = (mode) => {
  localStorage.setItem( 'SelectedMode', mode.bubbles );
  resetCounter();
  this.setState({
    inputMode: true, 
    outputMode: false,
    outputTable: false,
    hideModal: true, 
  })
 }

  outputModeHandler = () => {
    localStorage.setItem( 'SelectedMode', false );
    this.setState({
      inputMode: false, 
      outputMode: true,
      inputForms: false,
      hideModal: true 
    })
  }

 activityHandler = (e) => {
   this.setState({ selectedActivity: [e][0] })
 
  if (this.state.inputMode) {
  this.setState({
    inputForms: true,
    outputTable: false,
  })} else if (!this.state.inputMode) {
  this.setState({
    inputForms: false,
    outputTable: true,
  })}}
 
  backButtonHandler = () => {
   this.setState({
     outputTable: false,
     inputForms: false,
   })}

  hideModalHanlder = () => {
    this.setState({
      hideModal: false,
      outputTable: false,
      inputForms: false,
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
    tokenId: tokenId,
    email: email,}) 
  }

  signOutHandler = () => {
    this.setState({ currentUser: null})
    auth.signOut()}

   render() {
    return (
      <div className="app" >
        {this.state.logOutError ? <Modal show={this.state.logOutError} >
         Your token has expired, please sign in again!</Modal> : null}
        <Router basename="/">
       
          <Header 
            signOutHandler={this.signOutHandler}
            modalHandler={this.hideModalHanlder}
            stateProps={this.state}
            inputMode={this.inputModeHandler}
            outputMode={this.outputModeHandler}
          />  
            
          <Switch>
            <Route exact path="/"> 
              {this.state.currentUser ? <Redirect to="/Home" /> :
               <StartingPage
                modal={this.hideModalHanlder}
                setCredentialsHandler={this.setCredentialsHandler}/>
              }
            </Route>

            <Route path="/Home">
              {this.state.currentUser ? 
              <HomePage stateProps={this.state}/> : null} 
            </Route>

            {this.state.currentUser ?
             <RenderForOperator stateProps={this.state}>
                                          
             <Route path="/Inputs">
                {this.state.currentUser ? 
                <SelectActivity 
                modal={this.hideModalHanlder}
                key={this.activityHandler}
                stateProps={this.state}
                onClick={this.activityHandler} 
                backButton={this.backButtonHandler}/> : <StartingPage />} 
              </Route>

              <Route path="/Reports">
                {this.state.currentUser ? 
                <SelectActivity
                modal={this.hideModalHanlder}
                key={this.activityHandler}
                stateProps={this.state}
                onClick={this.activityHandler}
                backButton={this.backButtonHandler}/> : <StartingPage />} 
              </Route>
              </RenderForOperator> : null 
            }    
          </Switch>

        </Router>
     </div>    
    );
  }
}

export default App;
