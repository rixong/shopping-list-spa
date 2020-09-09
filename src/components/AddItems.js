import React, { useState } from 'react';
import { store } from '../seed';
import { connect } from 'react-redux';

import { updateList } from '../actions';

const AddItems = ({ updateList }) => {

  const [queryTerm, setQueryTerm] = useState({ name: '', quantity: '', category: 0, active: true })
  const [searchResults, setSearchResults] = useState([]);

  const onHandleChange = (e) => {
    // console.log(e.target.value)
    setQueryTerm({ ...queryTerm, [e.target.name]: e.target.value })
    if (e.target.value !== '') {
      setSearchResults(store.filter(item => item.name.includes(e.target.value)));
    } else {
      setSearchResults('');
    }
  }

  const onSelectItem = (e) => {
    console.log(e.target.textContent)
    const item = store.find(item => item.name === e.target.textContent);
    console.log(item)
    setQueryTerm({...queryTerm, name: item.name, category: item.category})
    setSearchResults('');
  }

  const onClickSubmit = () => {
    if(queryTerm.category === 0) {
      console.log("Choose a category!")
      return;
    }

    updateList(queryTerm);
    if (!store.find(item => item === queryTerm.name)) {
      store.push({name: queryTerm.name, category: queryTerm.category})
    }
    setQueryTerm({ name: '', quantity: '', category: 0 });
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

          <select 
            className="form-control" 
            onChange={(e) => onHandleChange(e)} 
            name="category" 
            id="category-select"
            value={queryTerm.category}
            >
            <option value="0">Category...</option>
            <option value="1">Produce</option>
            <option value="2">Meat</option>
            <option value="3">Dairy</option>
            <option value="4">Bakery</option>
            <option value="5">Housewares</option>
          </select>


          <div className="input-group-append">
            <button
              className="btn btn-outline-primary"
              type="button"
              id="button-addon2"
              onClick={onClickSubmit}
            >Add item</button>
          </div>

        </div>
        <ul className="list-group-flush itemSearchList">
          {searchResults ?
            searchResults.map((item, idx) =>
              <li
                key={idx}
                className="list-group-item role"
                role="button"
                onClick={(e) => onSelectItem(e)}
              >{item.name}</li>)
            : null}
        </ul>
      </form>
    </React-fragment>
  )
}

export default connect(null, { updateList })(AddItems);