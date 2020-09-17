import React from 'react';
import { connect } from 'react-redux';
import { removeFromMasterList } from '../actions';

const EditMasterList = ({ masterList, categories, removeFromMasterList }) => {

  // const handleDeleteClick = () => {
  //   console.log("here")
  // } 

  return (
    <div className="mx-4">
      <div className="display-4 text-warning my-4">Edit Master List</div>

      <ul className="list-group-flush ml-0 pl-0" >
        {masterList.sort((a, b) => a.name.localeCompare(b.name))
          .map((item) => (
            <li
              className="list-group-item d-flex justify-content-between"
              key={item.id}>
              {item.name}
              <span className="">{(categories.find(el => el.id === item.category_id)).name}</span>
              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={() => removeFromMasterList(item.id)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
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
