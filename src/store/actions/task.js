import axios from 'axios';

export const getDataTask = async (dispatch) => {
  dispatch({
    type: 'TASK_LOADING',
  });

  // do fetch
  await axios
    .get(`https://my-json-server.typicode.com/selviany31/quicks-mock/todo`)
    .then((res) => {
      const result = res.data;

      // set user info
      dispatch({
        type: 'GET_TASK',
        payload: result,
      });
    })
    .catch((error) => {
      const result = error;

      // set error if has any
      dispatch({
        type: 'TASK_LOADING',
        payload: error.response,
      });
    });
};

export const addTask = (dispatch, data) => {
  dispatch({
    type: 'ADD_TASK',
    payload: data,
  });
};

export const editTask = (dispatch, data) => {
  dispatch({
    type: 'EDIT_TASK',
    payload: data,
  });
};

export const deleteTask = (dispatch, id) => {
  dispatch({
    type: 'DELETE_TASK',
    payload: id,
  });
};

export const addBookmark = (dispatch, id, data) => {
  dispatch({
    type: 'ADD_BOOKMARK',
    payload: {
      id: id,
      data: data,
    },
  });
};

export const filterTask = (dispatch, data) => {
  dispatch({
    type: 'FILTER_TASK',
    payload: data,
  });
};
