import React, { Component } from 'react';

import FormInput from '../FormInput/FormInput';
import LogInButton from '../../../Components/LogInButton/LogInButton';
import Modal from "../../../Components/Modal/Modal"
import LineSpinner from "../../../Components/Spinners/Spinner2"
import { auth, signInWithGoogle } from '../../../Firebase/Firebase.utils.js';

import './SignIn.css';
import axios from 'axios';

class SignIn extends Component {
  
  state = {
      email: '',
      password: '',
      modal: false,
  };

  successfulSignIn = () => {
    const authData = {
      email: this.state.email,
      password: this.state.password,
      returnSecureToken: true
    }
    let url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAK38e0I2ui4E_FDQAAi6CbtQQQ0jmaPzI"
    // if (!isSignup) {
    //     url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAK38e0I2ui4E_FDQAAi6CbtQQQ0jmaPzI"
    // }
    axios.post(url, authData)
    .then(response => {
      const tokenId = response.data.idToken
      console.log(response.data.email)
      localStorage.setItem("tokenId", tokenId);
      this.props.tokenIdHandler(tokenId)
      this.setState({
        tokenId: tokenId
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.successfulSignIn()
    const { email, password} = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      
      this.setState({ 
        email: '', 
        password: '', 
        modal: true});
      } catch (error) {
        this.setState({ 
        modal: true,
        message: error.message,
        email: '', 
        password: '' 
      })
    }      
  };
  
  handleChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  hideModalHanlder = () => {
    this.setState({
      modal: false,
    })
  }

  render() {
    
    const errorModal = 
      <Modal 
        show={this.state.modal} 
        hide={this.hideModalHanlder}
      >{this.state.message}</Modal>
            
    return (
      <div className='sign-in'>
        {errorModal}
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name='email'
            type='email'
            handleChange={this.handleChange}
            value={this.state.email}
            label='email'
            required
          />
          <FormInput
            name='password'
            type='password'
            value={this.state.password}
            handleChange={this.handleChange}
            label='password'
            required
          />
          
          <div className='buttons'>
          <LogInButton type='submit'> Sign in </LogInButton> 
          {this.state.modal ? <Modal
            show={this.state.modal}  hide={this.hideModalHanlder}><LineSpinner /></Modal> : null}
          </div>

        </form>
        <span style={{marginTop: "-50px", marginLeft: "170px"}}>
          <LogInButton onClick={signInWithGoogle} isGoogleSignIn>
                Sign in with Google
          </LogInButton>
        </span>
      </div>
    );
  }
}

export default SignIn;