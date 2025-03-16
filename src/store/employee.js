import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: [],
  searchQuery: "",
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setEmployees: (state, action) => {
      state.employees = action.payload;
    },
    addEmployee: (state, action) => {
      state.employees.push(action.payload);
    },
    updateEmployee: (state, action) => {
      const index = state.employees.findIndex(
        (employee) => employee.id === action.payload.id
      );
      state.employees[index] = action.payload;
    },
    removeEmployee: (state, action) => {
      state.employees = state.employees.filter(
        (employee) => !action.payload.includes(employee.id)
      );
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  setEmployees,
  addEmployee,
  updateEmployee,
  removeEmployee,
  setSearchQuery,
} = employeeSlice.actions;

export default employeeSlice.reducer;
