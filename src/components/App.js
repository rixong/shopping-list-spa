import React from 'react';
import Navbar from './Navbar';
import AddItems from './AddItems';
import CurrentList from './CurrentList';
import EditMasterList from './EditMasterList';

const App = () => {

  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

  return (

    <div className="container position-fixed">
      {/* <Navbar />
      <div className="row shadow mt-4 pb-5">
      <div className="col-sm-8 border-right">
        <AddItems />
      </div>
      <div className="col-sm-4 bg-light overflow-auto" style={{ height: vh }}>
        <CurrentList />
      </div>
      </div> */}
      <EditMasterList />
    </div>
  )
}
export default App;