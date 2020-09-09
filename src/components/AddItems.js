import React, { useState } from 'react';
import { store } from '../seed';

const AddItems = () => {

  const [queryTerm, setQueryTerm] = useState({ item: '', quantity: '' })
  const [searchResults, setSearchResults] = useState([]);
  const [myList, setMyList] = useState([]);

  const onHandleChange = (e) => {
    console.log(e.target.value)
    setQueryTerm({ ...queryTerm, [e.target.name]: e.target.value })
    if (e.target.value !== '') {
      setSearchResults(store.filter(item => item.includes(e.target.value)));
    } else {
      setSearchResults('');
    }
  }

  const onClickItem = (e) => {
    console.log(e.target.textContent)
    setQueryTerm({ ...queryTerm, item: e.target.textContent })
    setSearchResults('');
  }

  const onClickSubmit = () => {
    setMyList([...myList.concat(queryTerm)]);
    setQueryTerm({item:'', quantity:''});
    console.log(myList);
  }

  return (
    <React-fragment>
      <div className="display-4 text-center text-dark mb-4">Add items</div>
      <form>
        <div className="input-group">
          <input
            className="form-control"
            id="item-input"
            type="text"
            placeholder="Search for item..."
            value={queryTerm.item}
            onChange={(e) => onHandleChange(e)}
            name="item"
            aria-label="enter item"
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
            >Submit</button>
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

export default AddItems;