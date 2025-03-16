// import "./HubEmployeeList";
// import { fixture, html, assert, aTimeout } from "@open-wc/testing";
// import { store } from "../../../store/app";
// import { EmployeeService } from "../../../services/employee";

// suite("HubEmployeeList", () => {
//   let element;
//   let originalGetEmployees;
//   let originalRemoveEmployee;
//   let originalDispatch;

//   const mockEmployees = {
//     data: [
//       {
//         id: "1",
//         firstName: "John",
//         lastName: "Doe",
//         dateOfEmployment: "2020-01-01",
//         dateOfBirth: "1990-01-01",
//         phone: "123-456-7890",
//         email: "john.doe@example.com",
//         department: "Tech",
//         position: "Developer",
//       },
//       {
//         id: "2",
//         firstName: "Jane",
//         lastName: "Smith",
//         dateOfEmployment: "2021-02-15",
//         dateOfBirth: "1992-05-10",
//         phone: "987-654-3210",
//         email: "jane.smith@example.com",
//         department: "Analytics",
//         position: "Designer",
//       },
//     ],
//     totalPages: 1,
//     currentPage: 1,
//     totalItems: 2,
//   };

//   setup(async () => {
//     originalGetEmployees = EmployeeService.getEmployees;
//     originalRemoveEmployee = EmployeeService.removeEmployee;
//     originalDispatch = store.dispatch;

//     EmployeeService.getEmployees = () => Promise.resolve(mockEmployees);
//     EmployeeService.removeEmployee = () => Promise.resolve();

//     const dispatchCalls = [];
//     store.dispatch = (action) => {
//       dispatchCalls.push(action);
//       return action;
//     };

//     element = await fixture(html`<hub-employee-list></hub-employee-list>`);
//     await aTimeout(10);
//   });

//   teardown(() => {
//     // Restore original methods
//     EmployeeService.getEmployees = originalGetEmployees;
//     EmployeeService.removeEmployee = originalRemoveEmployee;
//     store.dispatch = originalDispatch;
//   });

//   test("initializes with default properties", () => {
//     assert.equal(element.totalPages, 1);
//     assert.equal(element.currentPage, 1);
//     assert.deepEqual(element.selectedEmployeeList, []);
//     assert.isFalse(element.deleteDialogOpen);
//   });

//   test("fetches employees on first update", () => {
//     // We can't directly check if methods were called without sinon
//     // Instead, we verify the state was updated correctly
//     assert.equal(element.totalPages, mockEmployees.totalPages);
//     assert.equal(element.currentPage, mockEmployees.currentPage);
//   });

//   test("renders employee table with correct columns", () => {
//     const table = element.shadowRoot.querySelector("hub-table");
//     assert.exists(table);
//     assert.equal(table.columns.length, 9);
//     assert.equal(table.columns[0].id, "firstName");
//     assert.equal(table.columns[1].id, "lastName");
//   });

//   test("handles page change", async () => {
//     const updatedMockEmployees = {
//       ...mockEmployees,
//       currentPage: 2,
//     };

//     // Temporarily override getEmployees for this test
//     EmployeeService.getEmployees = (page) => {
//       assert.equal(page, 2);
//       return updatedMockEmployees;
//     };

//     element.handlePageChange({ detail: { page: 2 } });

//     // Check that the component state was updated
//     assert.equal(element.currentPage, 2);
//   });

//   test("handles employee removal", () => {
//     element.handleRemove("1");

//     assert.deepEqual(element.selectedEmployeeList, ["1"]);
//     assert.isTrue(element.deleteDialogOpen);
//   });

//   test("handles dialog cancel", () => {
//     element.selectedEmployeeList = ["1"];
//     element.deleteDialogOpen = true;

//     element.handleDialogCancel();

//     assert.deepEqual(element.selectedEmployeeList, []);
//     assert.isFalse(element.deleteDialogOpen);
//   });

//   test("handles dialog approve", () => {
//     let removeEmployeeCalled = false;
//     let removeEmployeeArgs = [];

//     EmployeeService.removeEmployee = (...args) => {
//       removeEmployeeCalled = true;
//       removeEmployeeArgs = args;
//     };

//     element.employees = mockEmployees.data;
//     element.selectedEmployeeList = ["1"];
//     element.deleteDialogOpen = true;

//     element.handleDialogApprove();

//     assert.isTrue(removeEmployeeCalled);
//     assert.deepEqual(removeEmployeeArgs, ["1"]);
//     assert.isFalse(element.deleteDialogOpen);
//     assert.deepEqual(element.selectedEmployeeList, []);
//   });

//   test("handles selected changed event", () => {
//     element.handleSelectedChanged({ detail: { selected: ["1", "2"] } });

//     assert.deepEqual(element.selectedEmployeeList, ["1", "2"]);
//   });
// });
