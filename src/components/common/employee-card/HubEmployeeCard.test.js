import { fixture, html, assert } from "@open-wc/testing";
import "./HubEmployeeCard.js";

suite("HubEmployeeCard", () => {
  let element;
  const mockEmployee = {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    dateOfEmployment: "2022-01-01",
    dateOfBirth: "1990-01-01",
    phoneNumber: "123-456-7890",
    email: "john.doe@example.com",
    department: "Engineering",
    position: "Developer",
  };

  setup(async () => {
    element = await fixture(html`
      <hub-employee-card .employee=${mockEmployee}></hub-employee-card>
    `);
  });

  test("renders with employee data", () => {
    const nameElement = element.shadowRoot.querySelector(".employee-name span");
    const departmentElement = element.shadowRoot.querySelector(
      '[data-testid="employee-department"] span'
    );
    const phoneElement = element.shadowRoot.querySelector(
      '[data-testid="employee-phone"] span'
    );
    const emailElement = element.shadowRoot.querySelector(
      '[data-testid="employee-email"] span'
    );

    assert.equal(nameElement.textContent, "John Doe");
    assert.equal(departmentElement.textContent, "Engineering / Developer");
    assert.equal(phoneElement.textContent, "Tel: 123-456-7890");
    assert.equal(emailElement.textContent, "john.doe@example.com");
  });

  test("formats dates correctly", () => {
    const joinedDateElement = element.shadowRoot.querySelector(
      '[data-testid="employee-joined-date"]'
    );
    const birthdayElement = element.shadowRoot.querySelector(
      '[data-testid="employee-birthday"]'
    );

    assert.include(joinedDateElement.textContent.trim(), "Joined");
    assert.include(birthdayElement.textContent.trim(), "Birthday");
  });

  test("dispatches edit event when edit button is clicked", async () => {
    let editEventFired = false;
    element.addEventListener("edit", () => {
      editEventFired = true;
    });

    const editButton = element.shadowRoot.querySelector(
      'hub-button[variant="icon"]'
    );
    editButton.click();

    assert.isTrue(editEventFired);
  });

  test("dispatches remove event when remove button is clicked", async () => {
    let removeEventFired = false;
    element.addEventListener("remove", () => {
      removeEventFired = true;
    });

    const buttons = element.shadowRoot.querySelectorAll(
      'hub-button[variant="icon"]'
    );
    const removeButton = buttons[1];
    removeButton.click();

    assert.isTrue(removeEventFired);
  });

  test("dispatches select event when checkbox is changed", async () => {
    let selectEventFired = false;
    element.addEventListener("select", () => {
      selectEventFired = true;
    });

    const checkbox = element.shadowRoot.querySelector('input[type="checkbox"]');
    checkbox.dispatchEvent(new Event("change"));

    assert.isTrue(selectEventFired);
  });

  test("reflects selected property to checkbox state", async () => {
    const checkbox = element.shadowRoot.querySelector('input[type="checkbox"]');
    assert.isFalse(checkbox.checked);

    element.selected = true;
    await element.updateComplete;

    assert.isTrue(checkbox.checked);
  });
});
