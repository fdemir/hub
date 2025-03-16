import { EmployeeService } from "./employee";
import { DepartmentService } from "./department";
import { PositionService } from "./position";
import { assert } from "@open-wc/testing";

const mockDepartments = [
  { value: "dept1", label: "Department 1" },
  { value: "dept2", label: "Department 2" },
];

const mockPositions = [
  { value: "pos1", label: "Position 1" },
  { value: "pos2", label: "Position 2" },
];

suite("EmployeeService", () => {
  let originalGetDepartments;
  let originalGetPositions;

  setup(() => {
    localStorage.clear();

    originalGetDepartments = DepartmentService.getDepartments;
    originalGetPositions = PositionService.getPositions;

    DepartmentService.getDepartments = async () => mockDepartments;
    PositionService.getPositions = async () => mockPositions;
  });

  teardown(() => {
    DepartmentService.getDepartments = originalGetDepartments;
    PositionService.getPositions = originalGetPositions;
  });

  test("getAllEmployees returns empty array when no employees exist", async () => {
    const employees = await EmployeeService.getAllEmployees();
    assert.isArray(employees);
    assert.isEmpty(employees);
  });

  test("addEmployee adds an employee to storage", async () => {
    const employee = {
      id: "1",
      name: "John Doe",
      department: "dept1",
      position: "pos1",
    };

    await EmployeeService.addEmployee(employee);
    const employees = await EmployeeService.getAllEmployees();

    assert.equal(employees.length, 1);
    assert.equal(employees[0].id, "1");
    assert.equal(employees[0].name, "John Doe");
    assert.equal(employees[0].department, "Department 1");
    assert.equal(employees[0].position, "Position 1");
  });

  test("getEmployees returns paginated results", async () => {
    for (let i = 1; i <= 15; i++) {
      await EmployeeService.addEmployee({
        id: i.toString(),
        name: `Employee ${i}`,
        department: "dept1",
        position: "pos1",
      });
    }

    const page1 = await EmployeeService.getEmployees(1, 10);
    assert.equal(page1.data.length, 10);
    assert.equal(page1.totalItems, 15);
    assert.equal(page1.totalPages, 2);
    assert.equal(page1.currentPage, 1);

    const page2 = await EmployeeService.getEmployees(2, 10);
    assert.equal(page2.data.length, 5);
    assert.equal(page2.currentPage, 2);
  });
});
