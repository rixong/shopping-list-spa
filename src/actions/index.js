import axios from 'axios';
const baseURL = 'http://localhost:3000/api/v1'

// ACTIONS

export const getUser = () => async dispatch => {
  const response =  (await axios.get(`${baseURL}/users/1`)).data
  console.log(response);
  return {
    type: 'GET_USER',
    payload: response
  }
}


export const updateList = (listItem) => {
  // console.log('from Action', listItem)
  return {
    type: 'ADD_TO_LIST',
    payload: listItem
  }
}

export const changeStatus = (item) => {
  return {
    type: 'CHANGE_STATUS',
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
    type: 'ADD_NOTIFICATION',
    payload: {error: true, message}
  }
}