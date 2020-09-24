import React, { useState} from 'react';
import { connect } from 'react-redux';
import { doLogin} from '../actions';


const Login = ({ doLogin }) => {

  const inputTextDefault = { email: '', password: '', password_confirmation: '' }

  const [formType, setFormType] = useState('login');
  const [inputText, setInputText] = useState(inputTextDefault)

  const message = {
    login: "Don't have an account?",
    newUser: "Already have an account?"
  }

  const onHandleChange = (e) => {
    setInputText({ ...inputText, [e.target.name]: e.target.value })
  }

  const onHandleSubmit = (e) => {
    e.preventDefault()
    console.log('from login', inputText)
    doLogin(inputText)
    setInputText(inputTextDefault)
  }

  return (
    <div className="login-box bg-light mt-4 shadow-lg rounded">
      <div className="row mt-4 justify-content-center" style={{height:"100px"}}>
        <img src="shopping-cart-logo.png" alt="cart" className="mt-5" style={{ width: "80px" }}></img>
      </div>
      <div className="display-3 text-center text-warning pt-5">Cart Compass</div>
      <div className="h3 text-center text-dark">Shop faster, shop smarter</div>

      <form>
        <div className="form-group login-form">
          <input
            type="email"
            name="email"
            className="form-control form-control-lg my-3"
            aria-describedby="emailHelp"
            placeholder="Email"
            value={inputText.email}
            onChange={(e) => onHandleChange(e)}
          ></input>

          <input
            type="password"
            name="password"
            className="form-control form-control-lg mb-3"
            aria-describedby="passwordHelp"
            placeholder="Password"
            value={inputText.password}
            onChange={(e) => onHandleChange(e)}
          ></input>

          {formType === 'newUser' ?
            <input
              type="password"
              name="password_confirmation"
              className="form-control form-control-lg mb-3"
              aria-describedby="passwordHelp"
              placeholder="Confirm password"
              value={inputText.password_confirmation}
              onChange={(e) => onHandleChange(e)}
            ></input>

            : null
          }
          <button className="btn btn-primary btn-lg w-100" onClick={(e) => onHandleSubmit(e)}>Continue</button>
        </div>
      </form>

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

export default connect(null, { doLogin })(Login);