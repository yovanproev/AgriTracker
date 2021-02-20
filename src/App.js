import React, {Fragment} from 'react';
import './App.css';
import {
  Switch, Route,
  Redirect, BrowserRouter as Router 
} from "react-router-dom";

import Header from "./Header/Header"
import StartingPage from "./Pages/SignInSignUp/StartingPage"
import HomePage from './Pages/HomePage/HomePage';

import SelectActivity from './Pages/SelectActivity';

import { getPurchaseRequests, resetCounter } from "./Firebase/FetchDataFromRealtimeDB";
import { auth, createUserProfileDocument } from "./Firebase/Firebase.utils"
import { RenderForAdmin, RenderForOperator } from './RoleBasedAccessControl/RoleBaseControl';
import Modal from "./Components/Modal/Modal"
import axiosLocal from "./AxiosInput";
import {usersAuthentication} from "./Pages/InputPage/DBObjectElements/ObjectsToPostToFirebase"
import RequestApprovals from "./Pages/RequestApprovals/RequestApprovals"

class App extends React.Component {
  state = {
      currentUser: null,
      inputMode: JSON.parse(sessionStorage.getItem( 'inputMode' )) || false,
      outputMode: JSON.parse(sessionStorage.getItem( 'outputMode' )) || false,
      homeMode: JSON.parse(sessionStorage.getItem( 'homeMode' )) !== null ? 
      JSON.parse(sessionStorage.getItem( 'homeMode' )) : true,
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
       getPurchaseRequests(10, 10, this.state).then(purReq => {this.setState({purReq: Object.values(purReq)})})
  }

  expiredToken = () => {
    if (new Date(this.state.expirationDate) <= new Date()) {
    this.setState({ 
    role: "Disabled", logOutError: true})
    auth.signOut() }
  }

  componentWillUnmount() {this.unsubscribeFromAuth()}

 inputModeHandler = () => {
   sessionStorage.setItem( 'inputMode', true )
   sessionStorage.setItem( 'outputMode', false )
   sessionStorage.setItem( 'adminMode', false )
   sessionStorage.setItem( 'homeMode', false )
   resetCounter();
  this.setState({
    inputMode: true, outputMode: false,
    outputTable: false, adminMode: false,
    adminSection: false, hideModal: true, homeMode: false })
}

  outputModeHandler = () => {
    sessionStorage.setItem( 'inputMode', false )
    sessionStorage.setItem( 'outputMode', true )
    sessionStorage.setItem( 'adminMode', false )
    sessionStorage.setItem( 'homeMode', false )
       this.setState({
      inputMode: false, outputMode: true,
      inputForms: false, adminMode: false,
      adminSection: false, hideModal: true, homeMode: false })
  }

  adminModeHandler = () => {
    sessionStorage.setItem( 'inputMode', false )
    sessionStorage.setItem( 'outputMode', false )
    sessionStorage.setItem( 'adminMode', true )
    sessionStorage.setItem( 'homeMode', false )
    resetCounter();
    this.setState({
      inputMode: false, outputMode: false,
      outputTable: false, inputForms: false,
      adminMode: true, hideModal: true, homeMode: false})
   }

   homeModeHandler = () => {
    sessionStorage.setItem( 'inputMode', false )
    sessionStorage.setItem( 'outputMode', false )
    sessionStorage.setItem( 'adminMode', false )
    sessionStorage.setItem( 'homeMode', true )
     resetCounter();
    this.setState({
      inputMode: false, outputMode: false,
      outputTable: false, inputForms: false,
      adminMode: false, hideModal: false, 
    adminSection: false, homeMode: true})
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
    this.setState({ currentUser: null, adminMode: false, 
    outputMode: false, inputMode: false})
    sessionStorage.removeItem("inputMode")
    sessionStorage.removeItem("outputMode")
    sessionStorage.removeItem("adminMode")
    auth.signOut()}

   render() {
// console.log(this.state.purReq ? this.state.purReq  : null)

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

                {/* <RenderForAdmin stateProps={this.state}> */}
                {this.state.currentUser ? this.state.purReq?.map((request, id) => {
                  const approvedChoice = "Approved"
                  return <Route key={id} path={`/purRequest/${approvedChoice}/${request.id}`}>
                    {this.state.currentUser ? 
                    <RequestApprovals
                    approvedChoice={approvedChoice}
                    id={request.id}
                    modal={this.hideModalHanlder}
                    stateProps={this.state} /> : null} 
                  </Route> 
                  }) : null }
                {/* </RenderForAdmin>  */}

                {/* <RenderForAdmin stateProps={this.state}> */}
                {this.state.currentUser ? this.state.purReq?.map((request, id) => {
                  const declinedChoice = "Declined"
                  return <Route key={id} path={`/purRequest/${declinedChoice}/${request.id}`}>
                    {this.state.currentUser ? 
                    <RequestApprovals
                    declinedChoice={declinedChoice}
                    id={request.id}
                    modal={this.hideModalHanlder}
                    stateProps={this.state} /> : null} 
                  </Route> 
                  }) : null }
                {/* </RenderForAdmin>  */}

              </Fragment>: null 
            } 
          </Switch>
          
        </Router>
     </div>    
    );
  }
}

export default App;
