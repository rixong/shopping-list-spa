import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

import {doClearUser} from '../actions';

const Navbar = ({doClearUser}) => {

  const onLogout = () => {
    localStorage.removeItem('jwt')
    doClearUser()
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark pt-2">
      <Link className="nav-link" to="/">
        <div className="h2 text-light" >
          Cart Compass
          <img src='/shopping-cart-logo-lg.png' alt="shopping cart" style={{ width: "50px", height: "80px" }}></img>
        </div></Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to="/add">Add Items</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/sort">Categories</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/edit">My Items</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/mylists">My Lists</Link>
          </li>
          <li className="nav-item ">
            <div className="nav-link" role='button' onClick={onLogout}>Logout</div>
          </li>
        </ul>
      </div>
    </nav>
  )
}
export default connect (null, {doClearUser})(Navbar);