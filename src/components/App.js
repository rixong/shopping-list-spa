import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Navbar from './Navbar';
import Spinner from './Spinner';
import ListHome from './ListHome';
import CurrentList from './CurrentList';
import AddItems from './AddItems';
import EditMasterList from './EditMasterList';
import CategorySortOrder from './CategorySortOrder';
import Login from './Login'


import { doAutoLogin } from '../actions';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


const App = ({ loading, curUser, doAutoLogin}) => {

  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)


  useEffect( () => {
    if (localStorage.getItem('jwt') && !curUser) {
      console.log('token exists!')
      doAutoLogin()
    }
  },[doAutoLogin, curUser])


  return (
    <Router>
        {!curUser || !localStorage.getItem('jwt') ? <Login/> : 
      <div className="container-fluid">
        <Navbar />
        {loading ?
          <Spinner />
          :
          <Switch>
            <Route exact path="/" component={ListHome}></Route>
            <div className="row justify-content-center">
              <div className="col-md pb-5 left-column">
                <Route exact path="/add" component={AddItems}></Route>
                <Route path="/edit" component={EditMasterList}></Route>
                <Route path="/sort" component={CategorySortOrder}></Route>
              </div>
              <div className="col-md overflow-auto bg-light" style={{ height: vh }}>
                <CurrentList />
              </div>
            </div>
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

export default connect(mapStateToProps, { doAutoLogin })(App);