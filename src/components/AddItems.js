import React, { useState } from 'react';
import { store } from '../seed';

const AddItems = () => {

  const [queryTerm, setQueryTerm] = useState('')
  const [searchResults, setSearchResults] = useState([]);

  const onHandleChange = (e) => {
    console.log(e.target.value)
    setQueryTerm(e.target.value)
    if (e.target.value !== '') {
      setSearchResults(store.filter(item => item.includes(e.target.value)));
    } else {
      setSearchResults('');
    }
  }

  const onClickItem = (e) => {
    console.log(e.target.textContent)
    setQueryTerm(e.target.textContent)
    setSearchResults('');
  }

  return (
    <React-fragment>
      <div className="display-4 text-center text-primary">Add items</div>
      <form>
        <div className="input-group">
          <input
            className="form-control"
            type="text"
            placeholder="Search for item..."
            value={queryTerm}
            onChange={(e) => onHandleChange(e)}
          // aria-label="enter item"
          >
          </input>
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