import { HubEmployeeForm } from "./HubEmployeeForm.js";
import { fixture, html, assert, aTimeout } from "@open-wc/testing";
import { DepartmentService } from "../../../services/department";
import { PositionService } from "../../../services/position";

suite("HubEmployeeForm", () => {
  let element;
  let originalGetDepartments;
  let originalGetPositions;

  const mockDepartments = [
    { id: "1", name: "Tech" },
    { id: "2", name: "HR" },
  ];

  const mockPositions = [
    { id: "1", name: "Developer" },
    { id: "2", name: "Designer" },
  ];

  setup(async () => {
    // Save original methods
    originalGetDepartments = DepartmentService.getDepartments;
    originalGetPositions = PositionService.getPositions;

    // Mock service methods
    DepartmentService.getDepartments = () => Promise.resolve(mockDepartments);
    PositionService.getPositions = () => Promise.resolve(mockPositions);

    element = await fixture(html`<hub-employee-form></hub-employee-form>`);
    await aTimeout(0); // Wait for firstUpdated to complete
  });

  teardown(() => {
    // Restore original methods
    DepartmentService.getDepartments = originalGetDepartments;
    PositionService.getPositions = originalGetPositions;
  });

  test("initializes with default properties", () => {
    assert.deepEqual(element.employee, {
      firstName: "",
      lastName: "",
      dateOfEmployment: "",
      dateOfBirth: "",
      phoneNumber: "",
      email: "",
      department: "",
      position: "",
    });
    assert.deepEqual(element.errors, []);
    assert.deepEqual(element.departments, mockDepartments);
    assert.deepEqual(element.positions, mockPositions);
  });

  test("renders form fields correctly", () => {
    const formFields = element.shadowRoot.querySelectorAll("hub-form-field");
    assert.equal(formFields.length, 8);

    const labels = Array.from(formFields).map((field) =>
      field.getAttribute("label")
    );
    assert.deepEqual(labels, [
      "First Name",
      "Last Name",
      "Date of Employment",
      "Date of Birth",
      "Phone Number",
      "Email Address",
      "Department",
      "Position",
    ]);
  });

  test("updates employee data when input changes", async () => {
    const firstNameInput = element.shadowRoot.querySelector(
      'hub-input[name="firstName"]'
    );

    firstNameInput.dispatchEvent(
      new CustomEvent("value-changed", {
        detail: { value: "John" },
      })
    );

    assert.equal(element.employee.firstName, "John");
  });

  test("validates field on input change", async () => {
    const emailInput = element.shadowRoot.querySelector(
      'hub-input[name="email"]'
    );

    emailInput.dispatchEvent(
      new CustomEvent("value-changed", {
        detail: { value: "invalid-email" },
      })
    );

    assert.isArray(element.errors.email);
    assert.include(element.errors.email[0], "Invalid email address");
  });

  test("validates form on submit", async () => {
    const form = element.shadowRoot.querySelector("form");
    form.dispatchEvent(new Event("submit", { cancelable: true }));

    assert.isObject(element.errors);
    assert.isArray(element.errors.firstName);
    assert.isArray(element.errors.lastName);
  });

  test("_validateField updates errors for invalid field", () => {
    element.employee = {
      ...element.employee,
      email: "invalid",
    };

    element._validateField("email");

    assert.isArray(element.errors.email);
  });

  test("_validateForm returns validation result", () => {
    // Invalid form
    const invalidResult = element._validateForm();
    assert.isFalse(invalidResult.success);

    // Valid form
    element.employee = {
      firstName: "John",
      lastName: "Doe",
      dateOfEmployment: "2023-01-01",
      dateOfBirth: "1990-01-01",
      phoneNumber: "1234567890",
      email: "john.doe@example.com",
      department: "1",
      position: "1",
    };

    const validResult = element._validateForm();
    assert.isTrue(validResult.success);
  });
});
