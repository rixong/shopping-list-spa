import React from 'react';

const Spinner = () => {
  return (
    <div className="text-center">
      <div className="spinner-border text-danger mt-3" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <div className="text-danger">Be patient. Server waking up.</div>
    </div>
  )
}
export default Spinner;