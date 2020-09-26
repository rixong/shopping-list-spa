import React, { useState } from 'react';
import MyLists from './MyLists';
import { ChevronDownIcon, ChevronUpIcon } from '@primer/octicons-react'

const Collapse = () => {

  const [collapsed, setCollasped] = useState(true);

  return (
    <div className="row w-75 mx-auto mt-5" >
      <div className="col">
        <button
          className="btn btn-outline-primary w-100"
          type="button"
          onClick={() => setCollasped(!collapsed)}
          data-toggle="collapse"
          data-target="#collapseExample"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          My Lists {collapsed ? <ChevronDownIcon size={24} /> : <ChevronUpIcon size={24} />}
        </button>
        <div className="collapse" id="collapseExample">
          <div className="card card-body" style={{ backgroundColor: "rgb(210, 210, 210)" }}>
            <MyLists />
          </div>
        </div>
      </div>
    </div>
  )
}


export default Collapse;

