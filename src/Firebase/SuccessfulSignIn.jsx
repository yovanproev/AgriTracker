import React, { Component } from "react";
import axios from 'axios';


class SuccessfulSignIn extends Component {
  state = {
    email: "",
    password: ""
  }

  methid() {
  const authData = {
    email: this.state.email,
    password: this.state.password,
    returnSecureToken: true,
    returnIdpCredential: true
  }
  let url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=AIzaSyAK38e0I2ui4E_FDQAAi6CbtQQQ0jmaPzI"
  axios.post(url, authData)
  .then(response => {
    console.log(response)
    // const tokenId = response.data.idToken
    // const email = response.data.email
    
    // document.cookie = `tokenId=${tokenId}`
    // document.cookie = `email=${email}`
    // this.props.tokenIdHandler()
 })
  .catch(err => {
    throw new Error(err)
  })
 }

  render () {
    return (
      <div></div>
    )

  }
}

export default SuccessfulSignIn;