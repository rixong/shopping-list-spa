import axios from 'axios';
import {config} from '../const';

const baseURL = config.url.API_URL

// ACTIONS

export const doLogin = (user) => async dispatch => {
  let response;
  console.log('new', user)
  try {
    if(user.password_confirmation){
      response = (await axios.post(`${baseURL}/users`, user)).data
    } else {
      response = (await axios.post(`${baseURL}/login`, user)).data
    }
    console.log('login response', response)
    dispatch({
      type: "ADDED_CURRENT_USER",
      payload: response.user
    })
  }
  catch(e) {
    console.log('server error', e.message)
  }
}

// export const doCreateNewUser = (user) => async dispatch => {
//   try {
//     const response = (await axios.post(`${baseURL}/users`, user)).data
//     console.log('resonse', response)
//     dispatch({
//       type: "ADDED_CURRENT_USER",
//       payload: response.user
//     })
//   }
//   catch(e) {

//   }
// }

// export const getUser = () => async dispatch => {
//   try {
//     dispatch(loading());
//     const response = (await axios.get(`${baseURL}/users/1`)).data
//     // console.log(response);
//     dispatch({
//       type: 'GOT_USER',
//       payload: response
//     })
//   }
//   catch (e) {
//     console.log('server error', e.message)
//   }
// }


export const addItem = (listItem) => async dispatch => {
  try {
    const response = (await axios.post(`${baseURL}/list_items`, {
      item_id: listItem.item_id,
      list_id: listItem.list_id,
      quantity: listItem.quantity
    })).data
    // console.log(response)
    if (response.status === 'exists') {
      dispatch(addNotification(response.message))
    } else {
      dispatch({
        type: 'ADDED_ITEM_TO_CUR_LIST',
        payload: response.listItem
      })
    }
  }
  catch (e) {
    dispatch(addNotification(e.message))
  }
}

const removeItemFromCurList = (itemId) => {
  return {
    type: 'REMOVED_ITEMS_FROM_CUR_LIST',
    payload: itemId
  }
}

export const addItemToMasterList = (item, user_id, list_id) => async dispatch => {
  try {
    const response = (await axios.post(`${baseURL}/items`, {
      user_id: user_id,
      name: item.name,
      category_id: item.category_id
    })).data
    if (response.status !== 'exists') {
      dispatch({
        type: 'ADDED_ITEM_TO_MASTERLIST',
        payload: response.item
      })
    }
    dispatch(addItem({ item_id: response.item.id, list_id, quantity: item.quantity }))
  }
  catch (e) {
    dispatch(addNotification(e.message))
  }
}

export const changeStatus = (item) => async dispatch => {
  try {
    const response = (await axios.patch(`${baseURL}/list_items/${item.id}`)).data
    // console.log(response)
    dispatch({
      type: 'CHANGED_STATUS',
      payload: response.item
    })
  }
  catch (e) {
    dispatch(addNotification(e.message))
  }
}

export const doReorderCategories = (userId, newOrder) => async dispatch=> {
  console.log('from action', newOrder)
await axios.post(`${baseURL}/categories`, {user_id: userId, order: newOrder.join(',')})
  
dispatch({
    type: 'REORDERED_CATEGORIES',
    payload: newOrder
  })
}

export const removeFromMasterList = (itemId) => async dispatch => {
  try {
    await axios.delete(`${baseURL}/items/${itemId}`)
    dispatch(removeItemFromCurList(itemId))
    dispatch({
      type: 'REMOVED_FROM_MASTER_LIST',
      payload: itemId
    })
  }
  catch (e) {
    dispatch(addNotification(e.message))
  }
}

export const loading = () => {
  return {
    type: 'LOADING'
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