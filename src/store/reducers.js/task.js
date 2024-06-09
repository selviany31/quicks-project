const taskReducer = (state, { payload, type }) => {
  switch (type) {
    case 'TASK_LOADING':
      return {
        ...state,
        loading: true,
      };

    case 'GET_TASK':
      return {
        ...state,
        data: payload,
        loading: false,
      };

    case 'TASK_ERROR':
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case 'ADD_TASK':
      return {
        ...state,
        data: state.data.concat(payload),
        loading: false,
      };

    case 'EDIT_TASK':
      return {
        ...state,
        data: state.data.map((el) => {
          if (el.id === payload.id) {
            return payload;
          }
          return el;
        }),
        loading: false,
      };

    case 'DELETE_TASK':
      return {
        ...state,
        data: state.data?.filter((el) => el.id !== payload),
      };

    case 'FILTER_TASK':
      return {
        ...state,
        filter: payload?.length
          ? state.data?.filter((el) =>
              el.bookmark.some((e) => payload.includes(e))
            )
          : state.data,
      };

    default:
      break;
  }
};

export default taskReducer;
