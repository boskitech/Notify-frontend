import { configureStore } from '@reduxjs/toolkit';
// import chatRuducer from '../features/chatSlice'
import usersReducer from '../features/usersSlice';
import { apiSlice } from '../features/apiSlice.js';

export const store = configureStore({
  reducer: {
    // chat: chatRuducer,
    users: usersReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: getDefaultMiddleware => 
    getDefaultMiddleware().concat(apiSlice.middleware)
});

