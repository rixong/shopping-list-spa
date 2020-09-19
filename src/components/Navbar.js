import React from 'react';
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light pt-4">
      <Link className="nav-link" to="/">
        <div className="h2" >
          Cart Compass
          <img src='/shopping-cart-logo.png' alt="shopping cart" style={{ width: '50px' }}></img>
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
            <Link className="nav-link" to="/sort">Reorder Categories</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/edit">Edit Master List</Link>
          </li>
          <li className="nav-item ">
            <Link className="nav-link" to="/">Logout</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
export default Navbar;