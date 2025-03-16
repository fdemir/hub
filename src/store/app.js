import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./employee";

export const store = configureStore({
  reducer: {
    employee: employeeReducer,
  },
});
