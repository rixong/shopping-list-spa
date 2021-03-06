import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './Navbar';
import Login from './Login';
import Spinner from './Spinner';
import ListHome from './ListHome';
import SplitPanels from './SplitPanels';
import Footer from './Footer';

import { doAutoLogin } from '../actions';


const App = ({ loading, curUser, doAutoLogin }) => {

  useEffect(() => {
    if (localStorage.getItem('jwt') && !curUser) {
      doAutoLogin()
    }
  }, [doAutoLogin, curUser]);

  return (
    <Router>
      {!curUser && !localStorage.getItem('jwt')? <Login /> :
        <div className="container shadow bg-dark">
          <Navbar />
          {!curUser || loading ?
            <Spinner />
            :
            <Switch>
              <Route exact path="/" component={ListHome}></Route>
              <SplitPanels/>
            </Switch>
          }
          <Footer />
        </div>
      }
    </Router>
  )
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    curUser: state.curUser
  }
}

export default connect(mapStateToProps, { doAutoLogin })(App);