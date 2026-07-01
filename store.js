import { configureStore } from '@reduxjs/toolkit';
import navReducer from './slices/navSlice';
import historyReducer from './slices/historySlice'; // 🟢 1. Importe o novo slice do histórico

export const store = configureStore({
  reducer: {
    nav: navReducer,
    history: historyReducer, // 
  },
});