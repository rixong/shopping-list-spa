import React, { useState } from 'react';
import { connect } from 'react-redux';
import Alert from './Alert';

import { addItemToMasterList, addNotification, clearNotification } from '../actions';

const AddItems = ({
  addItemToMasterList,
  addNotification,
  clearNotification,
  masterList,
  lists,
  curUser,
  categories,
  notification
}) => {

  const queryDefault = { name: '', quantity: '', category: 0 }

  const curList = lists.find(list => list.current)

  const [queryTerm, setQueryTerm] = useState(queryDefault)
  const [searchResults, setSearchResults] = useState([]);

  const onHandleChange = (e) => {
    // clearNotification(); TODO - CLEAR FIELDS AFTER ERRORS
    let value = e.target.value
    setQueryTerm({ ...queryTerm, [e.target.name]: value.toLowerCase() })
    if (value !== '') {
      setSearchResults(masterList.filter(item => item.name.includes(value)));
    } else {
      setSearchResults('');
    }
  }

  const onSelectItem = (e) => {
    const item = masterList.find(item => item.name === e.target.textContent);
    // console.log(item)
    setQueryTerm({ ...queryTerm, name: item.name, category: item.category_id })
    setSearchResults('');
  }

  const onClickSubmit = () => {   // DRY Fail!

    if (queryTerm.category === 0) {
      addNotification("Choose a category!");
      return;
    }

    if (!queryTerm.name.trim()) {
      addNotification('Enter an item!');
      setQueryTerm(queryDefault);
      return;
    }

    const trimmedName = queryTerm.name.trim().toLowerCase();

    addItemToMasterList({
      name: trimmedName,
      category_id: queryTerm.category,
      quantity: queryTerm.quantity,
    }, curUser.id, curList.id);

    setQueryTerm(queryDefault);
  }

  return (
    <React.Fragment>

      <div className="header">Add items</div>
      <form>
        <div className="row">
          <div className="col-md-5 mb-3">
            <input
              className="form-control"
              type="text"
              id="name-input"
              placeholder="Search or add a new item..."
              value={queryTerm.name}
              onChange={(e) => onHandleChange(e)}
              onFocus={() => clearNotification()}
              name="name"
              aria-label="enter item name"
              required
            ></input>

            <ul className="list-group itemSearchList">
              {searchResults ?
                searchResults.map((item) =>
                  <li
                    key={item.id}
                    className="list-group-item role"
                    role="button"
                    onClick={(e) => onSelectItem(e)}
                    data-id={item.id}
                  >{item.name}</li>)
                : null}
            </ul>
          </div>
          <div className="col-md-3 mb-3">
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
          </div>

          <div className="col-md-4">
            <select
              className="form-control"
              onChange={(e) => onHandleChange(e)}
              name="category"
              id="category-select"
              value={queryTerm.category}
            >
              <option value="0">Category...</option>
              {categories.sort((a, b) => a.name.localeCompare(b.name)).map(cat => <option value={cat.id} key={cat.id}>{cat.name}</option>)}
            </select>
            <div className="row justify-content-center mt-3">
              <div className="input-group-append">
                <button
                  className="btn btn-primary"
                  type="button"
                  id="button-addon2"
                  onClick={onClickSubmit}
                >Add item</button>
              </div>
            </div>
          </div>

        </div>


      </form>
      {notification.error ? <Alert /> : null}
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    curUser: state.curUser,
    lists: state.lists,
    masterList: state.masterList,
    categories: state.categories,
    notification: state.notification
  }
}

export default connect(mapStateToProps, { addNotification, clearNotification, addItemToMasterList })(AddItems);