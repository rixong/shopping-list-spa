import React, {useEffect} from 'react';
import { connect } from 'react-redux';


import Navbar from './Navbar';
import AddItems from './AddItems';
import CurrentList from './CurrentList';
import EditMasterList from './EditMasterList';
import Alert from './Alert';
import { getUser } from '../actions';

const App = ({ notification, getUser }) => {

  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

  useEffect (() => {
    getUser()

  }, [getUser])


  return (

    <div className="container">
      <Navbar />
      <div className="row shadow mt-4 pb-5">
        <div className="col-sm-8 border-right">
          <AddItems />
          {notification.error ? <Alert /> : null}
        </div>
        <div className="col-sm-4 bg-light overflow-auto" style={{ height: vh }}>
          <CurrentList />
        </div>
      </div>
      <EditMasterList />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps, {getUser})(App);