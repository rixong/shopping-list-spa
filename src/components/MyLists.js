import React, { useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { XCircleFillIcon } from '@primer/octicons-react'

import {
  doCreateNewList,
  doRemoveList,
  doChangeCurrentList,
  addNotification,
  clearNotification
} from '../actions';

const MyLists = ({ curUser,
  lists,
  doCreateNewList,
  doRemoveList,
  doChangeCurrentList,
  addNotification,
  clearNotification
}) => {

  const sortedLists = [...lists].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const [queryTerm, setQueryTerm] = useState('');

  const onHandleChange = (e) => {
    setQueryTerm(e.target.value)
  }

  const onHandleSubmit = (e) => {
    e.preventDefault()
    if (!queryTerm.trim()) {
      addNotification('Enter a name for the list.')
    } else {
      doCreateNewList(queryTerm)
      setQueryTerm('')
    }
  }

  const onSelectList = (listId) => {
    clearNotification()
    doChangeCurrentList(listId)
  }

  const onClickDeleteList = (e, id) => {
    e.stopPropagation()
    if (id === curUser.currentList) {
      addNotification('You can not delete current list. Select another before deleting this list.')
    } else {
      doRemoveList(id)
    }
  }

  const defaultClass = "list-group-item d-flex justify-content-between pl-0 mb-2 rounded shadow"

  return (
    <React.Fragment>

      <ul className="list-group">
        {sortedLists.map(list =>
          (<li
            className={`${defaultClass} ${list.id === curUser.currentList ? 'bg-dark text-info' : 'text-primary'}`}
            key={list.id}
            role="button"
            onClick={() => onSelectList(list.id)}
          >
            <div className="col-10">
              <strong>{list.name}</strong> - {moment(list.created_at).format('ddd, MMM Do')}
            </div>
            {list.id === curUser.currentList ? null :
              <div className="col-2">
                <button
                  type="button"
                  className="close"
                  aria-label="Delete"
                  onClick={(e) => onClickDeleteList(e, list.id)}
                >
                  <XCircleFillIcon size={24} />
                </button>
              </div>
            }
          </li>)
        )}
      </ul>

      <hr></hr>

      {/* <div className="h4 text-center">Make a new list</div> */}
      <form>
        <div className="input-group">
          <input
            className="form-control"
            type="text"
            id="list-input"
            placeholder="List name..."
            value={queryTerm}
            onChange={(e) => onHandleChange(e)}
            onFocus={() => clearNotification()}
            name="name"
            aria-label="Enter a list name"
          ></input>
        </div>
        <button 
          className="btn btn-outline-primary btn-lg w-100 mt-3" 
          onClick={(e) => onHandleSubmit(e)}
        >
          Make a new list
        </button>
      </form>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    lists: state.lists,
    curUser: state.curUser
  }
};

export default connect(mapStateToProps, {
  doCreateNewList,
  doRemoveList,
  doChangeCurrentList,
  addNotification,
  clearNotification
})(MyLists);