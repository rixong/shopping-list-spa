import React,{useState} from 'react';

const Login = () => {

  const [formType, setFormType] = useState('login');
  const message = {
    login: "Don't have an account?",
    newUser: "Already have an account?"
  }

  return (
    <div className="login-box bg-light mt-4 shadow-lg rounded">
      <div className="row mt-4 justify-content-center">
        <img src="shopping-cart-logo.png" className="mt-5" style={{ width: "100px" }}></img>
      </div>
      <div className="display-3 text-center text-warning pt-5">Cart Compass</div>
      <div className="h3 text-center text-dark">Shop faster</div>
      <form>
        <div className="form-group login-form">
          <input type="email" className="form-control form-control-lg my-3" aria-describedby="emailHelp" placeholder="Email"></input>
          <input type="password" className="form-control form-control-lg mb-3" aria-describedby="passwordHelp" placeholder="Password"></input>
          { formType === 'newUser' ?
            <input type="password" className="form-control form-control-lg mb-3" aria-describedby="passwordHelp" placeholder="Confirm password"></input>
            : null
          }
          <button type="submit" class="btn btn-primary btn-lg w-100">Continue</button>
        </div>
      </form>
      <div className="mt-5 d-block">
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

export default Login;