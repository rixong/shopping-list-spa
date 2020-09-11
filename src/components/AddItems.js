import React, { useState } from 'react';
import { store } from '../seed';
import { connect } from 'react-redux';

import { updateList } from '../actions';

/// TODO - block duplicate entries
// new items to LowerCase

const AddItems = ({ updateList, curList }) => {

  const queryDefault = { name: '', quantity: '', category: 0, active: true }

  const [queryTerm, setQueryTerm] = useState(queryDefault)
  const [searchResults, setSearchResults] = useState([]);

  const onHandleChange = (e) => {
    let value = e.target.value
    setQueryTerm({ ...queryTerm, [e.target.name]: value.toLowerCase() })
    if (value !== '') {
      setSearchResults(store.filter(item => item.name.includes(value)));
    } else {
      setSearchResults('');
    }
  }

  const onSelectItem = (e) => {
    console.log(e.target.textContent)
    const item = store.find(item => item.name === e.target.textContent);
    console.log(item)
    setQueryTerm({ ...queryTerm, name: item.name, category: item.category })
    setSearchResults('');
  }

  const onClickSubmit = () => {   // DRY Fail!
    if (queryTerm.category === 0) {
      console.log("Choose a category!")
      return;
    }
    if (!queryTerm.name.trim()) {
      console.log('Enter an item!')
      setQueryTerm(queryDefault);
      return;
    }
    const trimmedName = queryTerm.name.trim().toLowerCase();
    if (curList.find(item => item.name.toLowerCase() === trimmedName)) {
      console.log('Item already exists')
      setQueryTerm(queryDefault);
      return;
    }

    updateList(queryTerm);  //Action

    // Add to master list if not yet present.
    if (!store.find(item => item === trimmedName)) {
      store.push({ name: trimmedName, category: queryTerm.category })
    }
    
    setQueryTerm(queryDefault);
  }

  return (
    <React-fragment>
      <div className="display-4 text-center text-warning mb-4">Add items</div>
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

const mapStateToProps = state => {
  return {
    curList: state.curList
  }
}


export default connect(mapStateToProps, { updateList })(AddItems);