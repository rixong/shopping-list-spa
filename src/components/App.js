import React from 'react';
import Navbar from './Navbar';
import AddItems from './AddItems';
import CurrentList from './CurrentList';

const App = () => {
  return (

    <div className="container">
      <Navbar />
      <div className="row mt-4">
        <div className="col-8">
          <AddItems/>
        </div>
        <div className="col-4 bg-alert">
          <CurrentList/>
        </div>
      </div>

    </div>
  )
}
export default App;