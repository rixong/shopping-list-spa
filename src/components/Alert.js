import React from 'react';
import { connect } from 'react-redux';

const Alert = ({ notification }) => {
  return (
    <div className="alert alert-warning m-4 text-center" role="alert">
      {notification.message}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Alert);