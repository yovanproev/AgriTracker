import React, { Component } from 'react';

import FormInput from '../FormInput/FormInput';
import LogInButton from '../../../Components/LogInButton/LogInButton';
import Modal from "../../../Components/Modal/Modal"
import LineSpinner from "../../../Components/Spinners/Spinner2"
import { auth, signInWithGoogle } from '../../../Firebase/Firebase.utils';

import './SignIn.css';

class SignIn extends Component {
  state = {
      email: '',
      password: '',
      modal: false,
  };
 
  handleSubmit = async event => {
    event.preventDefault();

    const { email, password} = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: '', password: '', modal: true });
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