const inboxReducer = (state, { payload, type }) => {
  console.log(state, 'state', payload);
  switch (type) {
    case 'INBOX_LOADING':
      return {
        ...state,

        loading: true,
      };

    case 'GET_INBOX':
      return {
        ...state,
        data: payload,
        backUp: payload,
        loading: false,
      };

    case 'INBOX_ERROR':
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case 'GET_CHAT':
      return {
        ...state,
        chats: [
          ...new Map(
            state.chats.concat(payload).map((item) => [item.inboxId, item])
          ).values(),
        ],
        loading: false,
      };

    case 'ADD_MESSAGE':
      return {
        ...state,
        chats: state.chats.map((el) => {
          if (el.inboxId === payload.id) {
            return {
              ...el,
              messages: el.messages.concat(payload.data),
            };
          }
          return el;
        }),
        loading: false,
      };

    case 'READ_MESSAGE':
      return {
        ...state,
        data: state.data?.map((el) => {
          if (el.id === payload) {
            return {
              ...el,
              updatedChat: {
                ...el.updatedChat,
                isRead: 1,
              },
            };
          }
          return el;
        }),
        backUp: state.data?.map((el) => {
          if (el.id === payload) {
            return {
              ...el,
              updatedChat: {
                ...el.updatedChat,
                isRead: 1,
              },
            };
          }
          return el;
        }),
        chats: state.chats?.map((el) => {
          if (el.inboxId === payload) {
            return {
              ...el,
              messages: el?.messages.map((item) => {
                return {
                  ...item,
                  isRead: 1,
                };
              }),
            };
          }
          return el;
        }),
        loading: false,
      };

    case 'DELETE_MESSAGE':
      return {
        ...state,
        chats: state.chats.map((el) => {
          if (el.inboxId === payload.inboxId) {
            return {
              ...el,
              messages: el?.messages?.filter((item) => item?.id !== payload.id),
            };
          }
          return el;
        }),
      };

    case 'EDIT_MESSAGE':
      return {
        ...state,
        chats: state.chats.map((el) => {
          if (el.inboxId === payload.inboxId) {
            return {
              ...el,
              messages: el?.messages?.map((item) => {
                if (item.id === payload.id) {
                  return payload.data;
                }
                return item;
              }),
            };
          }
          return el;
        }),
      };

    case 'SEARCH_INBOX':
      return {
        ...state,
        backUp: state.data.filter((el) =>
          el.title.toLowerCase().includes(payload)
        ),
        data: state.backUp.filter((el) =>
          el.title.toLowerCase().includes(payload)
        ),
      };

    default:
      break;
  }
};

export default inboxReducer;
