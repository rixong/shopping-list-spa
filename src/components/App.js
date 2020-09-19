import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Navbar from './Navbar';
import AddItems from './AddItems';
import CurrentList from './CurrentList';
import EditMasterList from './EditMasterList';
import CategorySortOrder from './CategorySortOrder';
import Spinner from './Spinner';


import { getUser } from '../actions';
import { BrowserRouter as Router, Route } from 'react-router-dom'


const App = ({ loading, getUser }) => {

  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

  useEffect(() => {
    getUser()

  }, [getUser])


  return (
    <Router>
      <div className="container-fluid">
        <Navbar />
        {loading ?
          <Spinner /> 
          :

          <div className="row justify-content-center">
            <div className="col-md border-right">
              <Route exact path="/" component={AddItems}></Route>
              <Route path="/edit" component={EditMasterList}></Route>
              <Route path="/sort" component={CategorySortOrder}></Route>
            </div>
            <div className="col-md overflow-auto " style={{ height: vh }}>
              <CurrentList />
            </div>
          </div>

        }
      </div>
    </Router>
  )
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading
  }
}

export default connect(mapStateToProps, { getUser })(App);