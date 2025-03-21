import { DepartmentService } from "./department";
import { PositionService } from "./position";
import { sleep } from "../utils/sleep";
import { ERROR_CODES } from "../error";
const EMPLOYEES_KEY = "employees";

export class EmployeeService {
  static async getEmployees(page = 1, itemsPerPage = 10, searchQuery = "") {
    let employees = await this.getAllEmployees();

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    let paginatedEmployees = employees.slice(startIndex, endIndex);

    if (searchQuery) {
      paginatedEmployees = paginatedEmployees.filter(
        (employee) =>
          employee.firstName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          employee.lastName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return {
      data: paginatedEmployees,
      totalItems: employees.length,
      totalPages: Math.ceil(employees.length / itemsPerPage),
      currentPage: page,
    };
  }

  static async getEmployeeList() {
    let employees = [];

    try {
      const storedEmployees = localStorage.getItem(EMPLOYEES_KEY);
      if (storedEmployees) {
        employees = JSON.parse(storedEmployees);
      }
    } catch (error) {
      console.error("Error parsing employees from localStorage:", error);
    }

    return employees;
  }

  static async getAllEmployees() {
    const employees = await this.getEmployeeList();
    // simulate relations with departments and positions
    const departments = await DepartmentService.getDepartments();
    const positions = await PositionService.getPositions();

    employees.forEach((employee) => {
      employee.department = departments.find(
        (d) => d.value === employee.department
      )?.label;
      employee.position = positions.find(
        (p) => p.value === employee.position
      )?.label;
    });

    return employees;
  }

  static setEmployees(employees) {
    localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(employees));
  }

  static async addEmployee(employee) {
    const employees = await this.getAllEmployees();
    employees.push({
      id: crypto.randomUUID(),
      ...employee,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    this.setEmployees(employees);
  }

  static async removeEmployee(...ids) {
    let employees = await this.getAllEmployees();
    employees = employees.filter((employee) => !ids.includes(employee.id));
    this.setEmployees(employees);
  }

  static async getEmployee(id) {
    await sleep(400);
    const employees = await this.getEmployeeList();
    const item = employees.find((employee) => employee.id === id);

    if (!item) {
      throw new Error(ERROR_CODES.NOT_FOUND);
    }

    return item;
  }

  static async updateEmployee(id, employee) {
    const employees = await this.getEmployeeList();
    const index = employees.findIndex((e) => e.id === id);
    if (index !== -1) {
      employees[index] = { ...employees[index], ...employee };
    }
    this.setEmployees(employees);
  }
}
