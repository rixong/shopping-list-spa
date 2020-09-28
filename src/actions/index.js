import axios from 'axios';
import { config } from '../const';
import {instance} from '../api/axios';

const baseURL = config.url.API_URL

// LOGINS / NEW USERS

export const doLogin = (user) => async dispatch => {
  
  let response;
  // console.log('from action', user)
  try {
    if (user.password_confirmation) {
      // console.log('New user')
      response = (await axios.post(`${baseURL}/users`, user)).data
    } else {
      // console.log('Login')
      response = (await axios.post(`${baseURL}/login`, user)).data
    }
    if (response.status === 'ok') {
      localStorage.setItem('jwt', response.jwt);
      dispatch({
        type: "ADDED_CURRENT_USER",
        payload: response.user
      })
    } else {
      dispatch(addNotification(response.message));
    }
  }
  catch (e) {
    console.log('server error', e.message)
  }
  // dispatch({ type: 'FINISHED_LOADING' });
}


export const doAutoLogin = (token) => async dispatch => {
  dispatch({ type: 'STARTED_LOADING' });
  try {
    const response = (await instance.get('/profile')).data;
    if (response.status === 'ok') {
      dispatch({
        type: "ADDED_CURRENT_USER",
        payload: response.user
      })
    } else {
      console.log(response.message)
    }
  }
  catch (e) {
    console.log('server error', e.message)
  }
    dispatch({ type: 'FINISHED_LOADING' });
}

export const doLogoutUser = () => {
  return {
    type: "USER_CLEARED",
  }
}

// LIST REQUESTS

export const doCreateNewList = (name) => async dispatch => {
  try {
    const response = (await instance.post('/lists', {name})).data
    dispatch({
      type: 'ADDED_NEW_LIST',
      payload: response.list
    })
  }
  catch (e) {
    console.log('server error', e.message)
  }
}

export const doChangeCurrentList = (list_id) => async dispatch => {
  // console.log('From action')
  try {
    const response = (await instance.patch(`${baseURL}/users`, {list_id})).data
    if (response.status === 'ok') {
      dispatch({
        type: "CHANGED_CURRENT_LIST",
        payload: list_id
      })
    } else {
      dispatch(addNotification(response.message))
    }
  }
  catch (e) {
    console.log('server error', e.message)
  }
}

export const doRemoveList = (listId) => async dispatch => {
  try {
    await instance.delete(`/lists/${listId}`)
    dispatch({
      type: 'REMOVED_LIST',
      payload: listId
    })
  }
  catch (e) {
    console.log('Remove list - server error', e.message)
  }
}


/// MASTER_LIST REQUESTS

export const doAddItemToMasterList = (item, user_id, list_id) => async dispatch => {
  try {
    const response = (await instance.post('/items', {
      user_id: user_id,
      name: item.name,
      category_id: item.category_id
    })).data
    if (response.status !== 'exists') {
      // console.log(response)
      dispatch({
        type: 'ADDED_ITEM_TO_MASTERLIST',
        payload: response.item
      })
    }
    dispatch(doAddItemToCurrentList({ item_id: response.item.id, list_id, quantity: item.quantity }))
  }
  catch (e) {
    dispatch(addNotification(e.message))
  }
}

export const doRemoveFromMasterList = (itemId) => async dispatch => {
  try {
    await instance.delete(`/items/${itemId}`)  //Removes from master list and list_items
    dispatch(doRemoveItemFromCurList(itemId))
    dispatch({
      type: 'REMOVED_FROM_MASTER_LIST',
      payload: itemId
    })
  }
  catch (e) {
    dispatch(addNotification(e.message))
  }
}

/// CATEGORY REQUESTS

export const doReorderCategories = (userId, newOrder) => async dispatch => {
  // console.log('from action', newOrder)
  await instance.post('/categories', { user_id: userId, order: newOrder.join(',') })

  dispatch({
    type: 'REORDERED_CATEGORIES',
    payload: newOrder
  })
}

// CURRENT LIST_ITEM REQUESTS
export const doGetCurrentListItems = (list_id) => async dispatch => {
  try {
    const response = (await axios.get(`${baseURL}/lists/current/${list_id}`)).data
    dispatch({
      type: 'RETRIEVED_LIST_ITEMS',
      payload: response
    })
  }
  catch (e) {
    console.log('server error', e.message)
  }
}

export const doAddItemToCurrentList = (listItem) => async dispatch => {
  try {
    const response = (await instance.post('/list_items', {
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

export const doRemoveItemFromCurList = (itemId) => {
  return {
    type: 'REMOVED_ITEMS_FROM_CUR_LIST',
    payload: itemId
  }
}

export const doChangeItemStatus = (item) => async dispatch => {
  try {
    const response = (await instance.patch(`/list_items/${item.id}`)).data
    // console.log(response)
    dispatch({
      type: 'CHANGED_ITEMS_STATUS',
      payload: response.item
    })
  }
  catch (e) {
    dispatch(addNotification(e.message))
  }
}

/// UTLITIES
export const addNotification = (message) => {
  return {
    type: 'ADDED_NOTIFICATION',
    payload: { error: true, message }
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEARED_NOTIFICATION',
    payload: { error: false, message: '' }
  }
}