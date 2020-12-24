import React, { Component } from 'react';

import FormInput from '../FormInput/FormInput';
import LogInButton from '../../../Components/LogInButton/LogInButton';

import { auth, createUserProfileDocument } from '../../../Firebase/Firebase.utils.js';
import Modal from "../../../Components/Modal/Modal"

import './SignUp.css';
import axios from 'axios';

class SignUp extends Component {
  state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
      modal: false
  };
  
  successfulSignUp = () => {
    const authData = {
      email: this.state.email,
      password: this.state.password,
      returnSecureToken: true
    }
    let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAK38e0I2ui4E_FDQAAi6CbtQQQ0jmaPzI"
    axios.post(url, authData)
    .then(response => {
      const tokenId = response.data.idToken
      const email = response.data.email
      console.log(response.data.email)
      console.log(response.data.idToken)
      localStorage.setItem("tokenId", tokenId);
      localStorage.setItem("email", email);
      this.props.tokenIdHandler(tokenId, email)
   })
    .catch(err => {
      console.log(err)
    })
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.successfulSignUp()
    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await createUserProfileDocument(user, { displayName });
      this.setState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
        modal: true
      });
    } catch (error) {
      this.setState({
        modal: true,
        message: error.message,
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
      })      
    }
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  hideModalHanlder = () => {
    this.setState({
      modal: false,
    })
  }

  render() {
      const { displayName, email, password, confirmPassword } = this.state;
      const errorModal = 
      <Modal 
        show={this.state.modal} 
        hide={this.hideModalHanlder}
      >{this.state.message}</Modal>

    return (
      <div className='sign-up'>
        {errorModal}
        <h2 className='title'>I do not have an account</h2>
        <span>Sign up with your email and password</span>
        <form className='sign-up-form' onSubmit={this.handleSubmit}>
          <FormInput
            type='text'
            name='displayName'
            value={displayName}
            onChange={this.handleChange}
            label='Display Name'
            required
          />
          <FormInput
            type='email'
            name='email'
            value={email}
            onChange={this.handleChange}
            label='Email'
            required
          />
          <FormInput
            type='password'
            name='password'
            value={password}
            onChange={this.handleChange}
            label='Password'
            required
          />
          <FormInput
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={this.handleChange}
            label='Confirm Password'
            required
          />
          <LogInButton type='submit'>SIGN UP</LogInButton>
        </form>
      </div>
    );
  }
}

export default SignUp;