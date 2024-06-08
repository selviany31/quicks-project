import { createContext, useReducer } from 'react';
import inboxReducer from './reducers.js/inbox';
import inbox, { inboxInitialState } from './initialstates/inbox';
import taskReducer from './reducers.js/task';
import task from './initialstates/task';

export const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
  const [inboxState, inboxDispatch] = useReducer(
    inboxReducer,
    inboxInitialState
  );
  const [taskState, taskDispatch] = useReducer(taskReducer, task);

  return (
    <GlobalContext.Provider
      value={{
        inboxState,
        inboxDispatch,
        taskState,
        taskDispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
