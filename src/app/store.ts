import { configureStore } from '@reduxjs/toolkit';
import { showReducer } from '../store/showSlice';

export const store = configureStore({
  reducer: {
    show: showReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
