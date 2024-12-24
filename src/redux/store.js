import { configureStore } from '@reduxjs/toolkit';
import studentsReducer from '../redux/studentsSlice';

export const store = configureStore({
  reducer: {
    students: studentsReducer,
  },
});

export default store