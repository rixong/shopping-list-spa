import React, { useState } from 'react';
import { store } from '../seed';
import {connect} from 'react-redux';

import {updateList} from '../actions';

const AddItems = ({updateList}) => {

  const [queryTerm, setQueryTerm] = useState({ name: '', quantity: '' })
  const [searchResults, setSearchResults] = useState([]);

  const onHandleChange = (e) => {
    // console.log(e.target.value)
    setQueryTerm({ ...queryTerm, [e.target.name]: e.target.value })
    if (e.target.value !== '') {
      setSearchResults(store.filter(item => item.includes(e.target.value)));
    } else {
      setSearchResults('');
    }
  }

  const onClickItem = (e) => {
    // console.log(e.target.textContent)
    setQueryTerm({ ...queryTerm, name: e.target.textContent })
    setSearchResults('');
  }

  const onClickSubmit = () => {
    updateList(queryTerm);
    if (!store.find(item => item === queryTerm.name)){
      store.push(queryTerm.name)
    }
    setQueryTerm({name:'', quantity:''});
  }

  return (
    <React-fragment>
      <div className="display-4 text-center text-dark mb-4">Add items</div>
      <form>
        <div className="input-group">
          <input
            className="form-control"
            id="name-input"
            type="text"
            placeholder="Search for item..."
            value={queryTerm.name}
            onChange={(e) => onHandleChange(e)}
            name="name"
            aria-label="enter item name"
            required
            ></input>
          <input
            className="form-control"
            id="quantity-input"
            type="text"
            placeholder="Quantity..."
            value={queryTerm.quantity}
            onChange={(e) => onHandleChange(e)}
            aria-label="enter quantity"
            name="quantity"
          ></input>
          <div className="input-group-append">
            <button
              className="btn btn-outline-primary"
              type="button"
              id="button-addon2"
              onClick={onClickSubmit}
            >Add item</button>
          </div>

        </div>
        <ul className="list-group-flush">
          {searchResults ?
            searchResults.map((item, idx) =>
              <li
                key={idx}
                className="list-group-item role"
                role="button"
                onClick={onClickItem}
              >{item}</li>)
            : null}
        </ul>
      </form>
    </React-fragment>
  )
}

export default connect(null, {updateList})(AddItems);