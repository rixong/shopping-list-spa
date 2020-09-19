import React from 'react';
import { connect } from 'react-redux';

const Alert = ({ notification }) => {
  return (
    <div className="alert alert-warning mt-4" role="alert">
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