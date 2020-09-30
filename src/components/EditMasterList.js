import React, { useState } from 'react';
import { connect } from 'react-redux';
import { XCircleFillIcon } from '@primer/octicons-react'

import { doRemoveFromMasterList } from '../actions';

const EditMasterList = ({ masterList, categories, doRemoveFromMasterList }) => {

  const [sortType, setSortType] = useState('name')

  const sort = () => {
    if (sortType === 'name') {
      return [...masterList].sort((a, b) => a.name.localeCompare(b.name))
    } else {
      return [...masterList].sort((a, b) => a.category_id - b.category_id)
    }
  }

  return (
    <React.Fragment>
      <div className="header">Edit master list</div>
      <div className="h5 text-center">Deleting items here will delete item from ALL of your lists!</div>
      <div className="row justify-content-center">
        <div className="d-flex justify-content-between rounded mt-3">
          <div className="py-2 px-5 hover-btn" role="button" onClick={() => setSortType('name')}>NAME</div>
          <div className="py-2 px-5 hover-btn"  role="button" onClick={() => setSortType('category')}>CATEGORY</div>
        </div>
        <div className=" pl-0 mt-3 " >
          {sort().map((item) => (
            <div
              className=" d-flex justify-content-between pl-0 py-1 mb-2 rounded shadow"
              key={item.id}>
              <div className="ml-3">{item.name.split(' ').map(ele => ele.slice(0,1).toUpperCase() + ele.slice(1).toLowerCase()).join(' ')}</div>
              <div className="">{(categories.find(el => el.id === item.category_id)).name}</div>
              <div className="">
                <button
                  type="button"
                  className="close"
                  aria-label="Delete"
                  onClick={() => doRemoveFromMasterList(item.id)}
                >
                  <XCircleFillIcon size={24} />
                </button>
              </div>
            </div>)
          )}
        </div>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    masterList: state.masterList,
    categories: state.categories
  }
};

export default connect(mapStateToProps, { doRemoveFromMasterList })(EditMasterList);
