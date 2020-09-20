import React from 'react';
import { connect } from 'react-redux';
import { XCircleFillIcon } from '@primer/octicons-react'

import { removeFromMasterList } from '../actions';

const EditMasterList = ({ masterList, categories, removeFromMasterList }) => {

  // const handleDeleteClick = () => {
  //   console.log("here")
  // } 

  return (
    <div className="">
      <div className="header">Edit master list</div>

      <ul className="list-group-flush pl-0 w-75" >
        {masterList.sort((a, b) => a.name.localeCompare(b.name))
          .map((item) => (
            <li
              className="list-group-item d-flex justify-content-between pl-0 py-2"
              // style={{width: '70%'}}
              key={item.id}>
              <div className="col-5">{item.name}</div>
              <div className="col-5">{(categories.find(el => el.id === item.category_id)).name}</div>
              <div className="col-2">
                <button
                  type="button"
                  className="close"
                  aria-label="Delete"
                  onClick={() => removeFromMasterList(item.id)}
                >
                  <XCircleFillIcon size={24} />
                </button>
              </div>
            </li>)
          )}
      </ul>

    </div>
  )
}

const mapStateToProps = state => {
  return {
    masterList: state.masterList,
    categories: state.categories
  }
};

export default connect(mapStateToProps, { removeFromMasterList })(EditMasterList);
