import React from 'react';

const Spinner = () => {
  return (
    <div className="row justify-content-center">
    <div className="spinner-border text-danger mt-5" role="status">
      <span className="sr-only">Loading...</span>
    </div>
    </div>
  )
}
export default Spinner;