import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect  
} from "react-router-dom";

import Header from "./Pages/Header/Header"
import StartingPage from "./Pages/SignInSignUp/StartingPage"
import HomePage from './Pages/HomePage/HomePage';

import SelectActivity from './Pages/SelectActivity';

import { auth, createUserProfileDocument } from "./Firebase/Firebase.utils"
import { RenderForOperator } from './RoleBasedAccessControl/RoleBaseControl';


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
      { name: "Irrigation"},
      { name: "Working Hours"},
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
          }
        });
      });
    }
    this.setState({ currentUser: userAuth });
    // console.log(this.state.currentUser.uid)
  });
}

componentWillUnmount() {
  this.unsubscribeFromAuth();
}

 inputModeHandler = (mode) => {
  localStorage.setItem( 'SelectedMode', mode.bubbles );
  this.setState({
    inputMode: true, 
    outputMode: false,
    outputTable: false,
    hideModal: true 
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
  switch (e) {
    case 0: 
    this.setState({
      index1: true,
      index2: false,
      index3: false,
      index4: false,
    });
    break;
    case 1: 
    this.setState({
      index1: false,
      index2: true,
      index3: false,
      index4: false,
    });
    break;
    case 2: 
    this.setState({
      index1: false,
      index2: false,
      index3: true,
      index4: false,
      hideModal: true 
    });
    break;
    case 3: 
    this.setState({
      index1: false,
      index2: false,
      index3: false,
      index4: true,
      hideModal: true 
    });
    break;
    default:
      this.setState({
        index1: false,
        index2: false,
        index3: false,
        index4: false,
        hideModal: true 
      });
  } 

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
     index1: false,
     index2: false,
     index3: false,
     index4: false,
    })
  }

  hideModalHanlder = () => {
    this.setState({
      hideModal: false,
      index3: false,
      index4: false,
      outputTable: false,
      inputForms: false,
    })
  }

  render() {
    return (
      <div className="app" >
        <Router>
       
          <Header 
            modalHandler={this.hideModalHanlder}
            currentUser={this.state.currentUser}
            inputMode={this.inputModeHandler}
            outputMode={this.outputModeHandler}/>  
            <Switch>
          
          <Route exact path="/"> 
             {this.state.currentUser ? <Redirect to="/Home" /> : 
             <StartingPage
              modal={this.hideModalHanlder}/>}
          </Route>

          <Route path="/Home">
               {this.state.currentUser ? <HomePage 
               stateProps={this.state}
               /> : <Redirect to="/" />}
             </Route>

          {this.state.currentUser ?
           <RenderForOperator currentUser={this.state.currentUser}>
                                      
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
              </RenderForOperator> : null }    

          </Switch>
        </Router>
     </div>    
    );
  }
}

export default App;
