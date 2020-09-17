import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Navbar from './Navbar';
import AddItems from './AddItems';
import CurrentList from './CurrentList';
import EditMasterList from './EditMasterList';

import { getUser } from '../actions';
import { BrowserRouter as Router, Route } from 'react-router-dom'

const App = ({ notification, getUser }) => {

  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

  useEffect(() => {
    getUser()

  }, [getUser])


  return (
    <Router>
      <div className="container">
      <Navbar />
        <div className="row">
        <div className="col-sm-8 border-right">
          <Route exact path="/" component={AddItems}></Route>
          <Route path="/edit" component={EditMasterList}></Route>
        </div>
        <div className="col-sm-4 overflow-auto pl-5" style={{ height: vh }}>
          <CurrentList />
        </div>
        </div>
      </div>
    </Router>
  )
}

const mapStateToProps = (state) => {
  return {
    // notification: state.notification
  }
}

export default connect(mapStateToProps, { getUser })(App);