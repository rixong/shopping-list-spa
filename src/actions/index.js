import axios from 'axios';

const baseURL = 'http://localhost:3000/api/v1'

// ACTIONS

export const getUser = () => async dispatch => {
  try {
    const response = (await axios.get(`${baseURL}/users/1`)).data
    // console.log(response);
    dispatch({
      type: 'GET_USER',
      payload: response
    })
  }
  catch (e) {
    console.log('server error', e.message)
  }
}


export const addItem = (listItem) => async dispatch => {
  console.log('from Add Item', listItem)
  try {
    const response = (await axios.post(`${baseURL}/list_items`, {
      item_id: listItem.item_id,
      list_id: listItem.list_id,
      quantity: listItem.quantity
    })).data
    console.log(response)
    if (response.status === 'exists'){
      dispatch(addNotification(response.message))
    } else {
      dispatch({
        type: 'ADDED_ITEM',
        payload: response.listItem
      })
    }
  }
  catch (e) {
    console.log('server error', e.message)
  }
}

export const addItemToMasterList = (item, user_id, list_id) => async dispatch => {
  try {
    const response = (await axios.post(`${baseURL}/items`, {
      user_id,
      name: item.name,
      category_id: item.category_id
    })).data
    console.log(response)
    if (response.status !== 'exists') {
      dispatch({
        type: 'ADDED_ITEM_TO_MASTERLIST',
        payload: response.item
      })
    }
    dispatch(addItem({ item_id: response.item.id, list_id, quantity: item.quantity }))
  }
  catch (e) {
    console.log('server error', e.message)
  }
}

export const changeStatus = (item) => {
  return {
    type: 'CHANGED_STATUS',
    payload: item
  }
}

export const removeFromMasterList = (item) => {
  return {
    type: 'REMOVE_FROM_MASTER_LIST',
    payload: item
  }
}

export const addNotification = (message) => {
  // console.log("Add note")
  return {
    type: 'ADDED_NOTIFICATION',
    payload: { error: true, message }
  }
}

export const clearNotification = () => {
  console.log("clear message")
  return {
    type: 'CLEARED_NOTIFICATION',
    payload: { error: false, message: '' }
  }
}