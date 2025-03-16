import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: [],
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
  },
});

export const { setEmployees, addEmployee, updateEmployee, removeEmployee } =
  employeeSlice.actions;

export default employeeSlice.reducer;
