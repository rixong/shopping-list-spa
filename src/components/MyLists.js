import React, { useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { XCircleFillIcon } from '@primer/octicons-react'

import { doCreateNewList, doRemoveList, doChangeCurrentList } from '../actions';

const MyLists = ({ curUser, lists, doCreateNewList, doRemoveList, doChangeCurrentList }) => {

  const sortedLists = [...lists].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const [queryTerm, setQueryTerm] = useState('');

  const onHandleChange = (e) => {
    setQueryTerm(e.target.value)
  }

  const onHandleSubmit = (e) => {
    e.preventDefault()
    doCreateNewList(queryTerm)
    setQueryTerm('')
  }

  const onSelectList = (listId) => {
      console.log(listId)
      doChangeCurrentList(listId)
  }

  const defaultClass = "list-group-item d-flex justify-content-between pl-0 py-2"

  return (
    <React.Fragment>
      <div className="header">Make a new list</div>
      <form>
        <div className="input-group">
          <input
            className="form-control"
            type="text"
            id="list-input"
            placeholder="list name..."
            value={queryTerm}
            onChange={(e) => onHandleChange(e)}
            // onFocus={() => clearNotification()}
            name="name"
            aria-label="enter list name"
            required
          ></input>
        </div>
        <button className="btn btn-primary btn-lg w-100 mt-3" onClick={(e) => onHandleSubmit(e)}>Add List</button>
      </form>
      <hr></hr>
      <div className="header">My lists</div>
      <ul className="list-group mx-5">
        {sortedLists.map(list =>
          (<li
            className={`${defaultClass} ${list.id === curUser.currentList ? 'bg-info' : null}`}
            key={list.id}
            role="button"
            onClick={() => onSelectList(list.id)}
            >
            <div className="col-8">
              <strong>{list.name}</strong> - {moment(list.created_at).format('ddd, MMM Do')}
            </div>
            <div className="col-2">
              <button
                type="button"
                className="close"
                aria-label="Delete"
                onClick={() => doRemoveList(list.id)}
              >
                <XCircleFillIcon size={24} />
              </button>
            </div>
          </li>)
        )}
      </ul>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    lists: state.lists,
    curUser: state.curUser
  }
};

export default connect(mapStateToProps, { doCreateNewList, doRemoveList, doChangeCurrentList })(MyLists);