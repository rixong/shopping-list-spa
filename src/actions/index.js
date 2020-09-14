import axios from 'axios';
const baseURL = 'http://localhost:3000/api/v1'

// ACTIONS

export const getUser = () => async dispatch => {
  const response =  (await axios.get(`${baseURL}/users/1`)).data
  // console.log(response);
  dispatch ({
    type: 'GET_USER',
    payload: response
  })
}


export const addItem = (listItem) => {
  // console.log('from Action', listItem)
  return {
    type: 'ADDED_ITEM',
    payload: listItem
  }
}

export const addItemToMasterList = (item) => {
  return {
    type: 'ADDED_ITEM_TO_MASTERLIST',
    payload: item
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
  console.log("Add note")
  return {
    type: 'ADDED_NOTIFICATION',
    payload: {error: true, message}
  }
}