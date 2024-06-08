import { type } from '@testing-library/user-event/dist/type';
import axios from 'axios';

export const getDataInbox = async (dispatch) => {
  dispatch({
    type: 'INBOX_LOADING',
  });

  // do fetch
  await axios
    .get(`https://my-json-server.typicode.com/selviany31/quicks-mock/inbox`)
    .then((res) => {
      const result = res.data;

      // set user info
      dispatch({
        type: 'GET_INBOX',
        payload: result,
      });
    })
    .catch((error) => {
      const result = error;

      // set error if has any
      dispatch({
        type: 'INBOX_LOADING',
        payload: error.response,
      });
    });
};

export const getDataChats = async (dispatch, id) => {
  dispatch({
    type: 'INBOX_LOADING',
  });

  // do fetch
  await axios
    .get(
      `https://my-json-server.typicode.com/selviany31/quicks-mock/chats?inboxId=${id}`
    )
    .then((res) => {
      const result = res.data;

      // set user info
      dispatch({
        type: 'GET_CHAT',
        payload: result,
      });
    })
    .catch((error) => {
      const result = error;

      // set error if has any
      dispatch({
        type: 'INBOX_LOADING',
        payload: error.response,
      });
    });
};

export const addMessage = (dispatch, id, data) => {
  dispatch({
    type: 'ADD_MESSAGE',
    payload: {
      id: id,
      data: data,
    },
  });
};

export const readMessage = (dispatch, id) => {
  dispatch({
    type: 'READ_MESSAGE',
    payload: id,
  });
};

export const deleteMessage = (dispatch, inboxId, id) => {
  dispatch({
    type: 'DELETE_MESSAGE',
    payload: {
      inboxId: inboxId,
      id: id,
    },
  });
};

export const editMessage = (dispatch, inboxId, id, data) => {
  dispatch({
    type: 'EDIT_MESSAGE',
    payload: {
      inboxId: inboxId,
      id: id,
      data: data,
    },
  });
};

export const searchInbox = (dispatch, data) => {
  dispatch({
    type: 'SEARCH_INBOX',
    payload: data,
  });
};
