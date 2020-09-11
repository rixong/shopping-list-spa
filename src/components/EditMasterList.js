import React from 'react';
import { connect } from 'react-redux';
import {removeFromMasterList} from '../actions';

const EditMasterList = ({ masterList, removeFromMasterList }) => {

  // const handleDeleteClick = () => {
  //   console.log("here")
  // } 

  return (
    <div className="row justify-content-center">
      <ul className="list-group" >
        {masterList.sort((a, b) => a.name.localeCompare(b.name))
          .map((item, idx) => (
            <li
              className="list-group-item"
              key={idx}>{
              item.name}
              <button 
                type="button" 
                className="close" 
                aria-label="Close"
                onClick={() => removeFromMasterList(item)}
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
    masterList: state.masterList
  }
};

export default connect(mapStateToProps, {removeFromMasterList})(EditMasterList);
