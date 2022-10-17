import { configureStore } from '@reduxjs/toolkit';
import { phoneBookAPI } from './phoneBookAPI';
import filterReducer from './phoneBook';

const store = configureStore({
  reducer: {
    [phoneBookAPI.reducerPath]: phoneBookAPI.reducer,
    filter: filterReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(phoneBookAPI.middleware),
});

export { store };
