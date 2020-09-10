import React from 'react';
import Navbar from './Navbar';
import AddItems from './AddItems';
import CurrentList from './CurrentList';

const App = () => {
  return (

    <div className="container">
      <Navbar />
      <div className="row shadow mt-4 pb-5">
        <div className="col-sm-8 border-right">
          <AddItems/>
        </div>
        <div className="col-sm-4 bg-light">
          <CurrentList/>
        </div>
      </div>

    </div>
  )
}
export default App;