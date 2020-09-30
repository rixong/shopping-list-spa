import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { doLogin, clearNotification } from '../actions';
import Alert from './Alert';
import Spinner from './Spinner';


const Login = ({ notification, loading, doLogin, clearNotification }) => {

  const inputTextDefault = { email: '', password: '', password_confirmation: '' }

  const [passwordError, setPasswordError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [formType, setFormType] = useState('login');
  const [inputText, setInputText] = useState(inputTextDefault)

  const message = {
    login: "Don't have an account?",
    newUser: "Already have an account?"
  }

  const onHandleChange = (e) => {
    setPasswordError('');
    setEmailError('');
    setInputText({ ...inputText, [e.target.name]: e.target.value })
  }

  const onHandleSubmit = (e) => {
    e.preventDefault()
    const expression = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let validEmail = expression.test(inputText.email.toLowerCase());
    if (!validEmail) {
      setEmailError('Please enter a valid email')
    }
    else if (inputText.password.trim() === '') {
      setPasswordError('Please enter a valid password')
    }
    else {
      doLogin(inputText)
      setInputText(inputTextDefault)
      return <Redirect to="/" />
    }
  }

  return (
    <div className="login-box bg-light mt-4 shadow-lg rounded">
      <div className="row mt-4 justify-content-center" style={{ height: "100px" }}>
        <img src="shopping-cart-logo-lg.png" alt="cart" className="mt-5" style={{ width: "100px", height: "100px" }}></img>
      </div>
      <div className="display-3 text-center text-warning pt-5">Cart Compass</div>
      <div className="h3 text-center text-dark">Shop faster, shop smarter</div>

      <form>
        <div className="form-group login-form">
      
          <input
            type="email"
            name="email"
            className={
              emailError
                ? "form-control form-control-lg is-invalid"
                : "form-control form-control-lg"
            }
            aria-describedby="emailHelp"
            placeholder="Email"
            value={inputText.email}
            onChange={(e) => onHandleChange(e)}
            onFocus={() => clearNotification()}
          ></input>
          <div
            className={
              emailError ? "inline-errormsg text-danger" : "hidden"
            }
          >
            {emailError}
          </div>


          <input
            type="password"
            name="password"
            className={
              passwordError
                ? "form-control form-control-lg mt-3 is-invalid"
                : "form-control form-control-lg mt-3"
            }
            aria-describedby="passwordHelp"
            placeholder="Password"
            value={inputText.password}
            onChange={(e) => onHandleChange(e)}
            onFocus={() => clearNotification()}
          ></input>

          <div
            className={
              passwordError ? "inline-errormsg text-danger" : "hidden"
            }
          >
            {passwordError}
          </div>


          {formType === 'newUser' ?
            <input
              type="password"
              name="password_confirmation"
              className={
                passwordError
                  ? "form-control form-control-lg mt-3 is-invalid"
                  : "form-control form-control-lg mt-3"
              }
              aria-describedby="passwordHelp"
              placeholder="Confirm password"
              value={inputText.password_confirmation}
              onChange={(e) => onHandleChange(e)}
              onFocus={() => clearNotification()}
            ></input>

            : null
          }
          <button className="btn btn-primary btn-lg mt-3 w-100" type="submit" onClick={(e) => onHandleSubmit(e)}>Continue</button>
        </div>
      </form>
          { notification.error ? <Alert/> : null }
          { loading ? <Spinner/> : null }

      <div className="login-switch d-block">
        <p className="text-center">{message[formType]}</p>
        {formType === 'login' ?
          <div className="text-center text-primary h5" onClick={() => setFormType('newUser')} role="button">Create account</div>
          :
          <div className="text-center text-primary h5" onClick={() => setFormType('login')} role="button">Login</div>
        }
      </div>


    </div>
  )
}

const mapStateToProps = state => {
  return {
    notification: state.notification,
    loading: state.loading
  }
};

export default connect(mapStateToProps, { doLogin, clearNotification })(Login);