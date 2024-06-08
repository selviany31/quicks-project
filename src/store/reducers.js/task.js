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
        backUp: payload,
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
        backUp: state.data.concat(payload),
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
        backUp: state.data.map((el) => {
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
        backUp: state.data?.filter((el) => el.id !== payload),
      };

    case 'ADD_BOOKMARK':
      return {
        ...state,
        backUp: state.data.map((el) => {
          if (el.id === payload.id) {
            return {
              ...el,
              bookmark: el.bookmark.concat(payload.data),
            };
          }
          return el;
        }),
        data: state.data.map((el) => {
          if (el.id === payload.id) {
            return {
              ...el,
              bookmark: el.bookmark.concat(payload.data),
            };
          }
          return el;
        }),
      };

    case 'FILTER_TASK':
      return {
        ...state,
        data: payload?.length
          ? state.backUp?.filter((el) =>
              el.bookmark.some((e) => payload.includes(e))
            )
          : state.backUp,
      };

    default:
      break;
  }
};

export default taskReducer;