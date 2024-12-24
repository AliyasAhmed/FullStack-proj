// redux/studentsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  students: [],
  courses: [],
  formData: {
    id: '',
    name: '',
    cohort: 'AY 2024-25',
    courseIds: [],
    dateJoined: '',
    lastLogin: '',
    status: true,
  },
  showPopup: false,
};

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    setStudents(state, action) {
      state.students = action.payload;
    },
    setCourses(state, action) {
      state.courses = action.payload;
    },
    setFormData(state, action) {
      state.formData = { ...state.formData, ...action.payload };
    },
    addStudent(state, action) {
      state.students.push(action.payload);
    },
    updateStudent(state, action) {
      const index = state.students.findIndex((student) => student.id === action.payload.id);
      if (index !== -1) state.students[index] = action.payload;
    },
    deleteStudent(state, action) {
      state.students = state.students.filter((student) => student.id !== action.payload);
    },
    togglePopup(state, action) {
      state.showPopup = action.payload;
    },
  },
});

export const {
  setStudents,
  setCourses,
  setFormData,
  addStudent,
  updateStudent,
  deleteStudent,
  togglePopup,
} = studentsSlice.actions;

export default studentsSlice.reducer;
