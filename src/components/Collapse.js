import React, { useState } from 'react';
import MyLists from './MyLists';
import { ChevronDownIcon, ChevronUpIcon } from '@primer/octicons-react'

const Collapse = () => {

  const [collapsed, setCollasped] = useState(true);

  return (
    <div className="row mx-auto mt-3" >
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
          My Lists &nbsp;&nbsp;{collapsed ? <ChevronDownIcon size={24} /> : <ChevronUpIcon size={24} />}
        </button>
        <div className="collapse" id="collapseExample">
          <div className="card card-body border-0" style={{ backgroundColor: "rgb(210, 210, 210)" }}>
            <MyLists />
          </div>
        </div>
      </div>
    </div>
  )
}


export default Collapse;

