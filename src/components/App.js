import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Navbar from './Navbar';
import Login from './Login'
import Spinner from './Spinner';
import ListHome from './ListHome'
import SplitPanels from './SplitPanels'



import { doLogin } from '../actions';


const App = ({ loading, curUser, doLogin }) => {


  useEffect(() => {
    if (localStorage.getItem('jwt') && !curUser) {
      // console.log('token exists!')
      doLogin()
    }
  }, [doLogin, curUser])


  return (
    <Router>
      {!curUser && !loading ? <Login /> :
        <div className="container-fluid">
          <Navbar />
          {loading ?
            <Spinner />
            :
            <Switch>
              <Route exact path="/" component={ListHome}></Route>
              <SplitPanels/>
            </Switch>
          }
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

export default connect(mapStateToProps, { doLogin })(App);