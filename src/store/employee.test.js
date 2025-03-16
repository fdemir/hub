import { configureStore } from "@reduxjs/toolkit";
import employeeReducer, {
  setEmployees,
  addEmployee,
  updateEmployee,
  removeEmployee,
} from "./employee";
import { assert } from "@open-wc/testing";

suite("employee reducer", () => {
  let store;

  setup(() => {
    store = configureStore({
      reducer: {
        employee: employeeReducer,
      },
    });
  });

  test("should return the initial state", () => {
    const state = store.getState().employee;
    assert.deepEqual(state.employees, []);
  });

  test("should handle setEmployees", () => {
    const employees = [
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Smith" },
    ];
    store.dispatch(setEmployees(employees));
    const state = store.getState().employee;
    assert.deepEqual(state.employees, employees);
  });

  test("should handle addEmployee", () => {
    const employee = { id: 1, name: "John Doe" };
    store.dispatch(addEmployee(employee));
    const state = store.getState().employee;
    assert.deepEqual(state.employees, [employee]);
  });

  test("should handle updateEmployee", () => {
    const initialEmployee = { id: 1, name: "John Doe" };
    const updatedEmployee = { id: 1, name: "John Updated" };

    store.dispatch(addEmployee(initialEmployee));
    store.dispatch(updateEmployee(updatedEmployee));

    const state = store.getState().employee;
    assert.deepEqual(state.employees, [updatedEmployee]);
  });

  test("should handle removeEmployee", () => {
    const employees = [
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Smith" },
    ];

    store.dispatch(setEmployees(employees));
    store.dispatch(removeEmployee([1]));

    const state = store.getState().employee;
    assert.deepEqual(state.employees, [{ id: 2, name: "Jane Smith" }]);
  });
});
