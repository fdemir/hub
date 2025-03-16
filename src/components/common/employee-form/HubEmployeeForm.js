import { LitElement, html, css } from "lit";
import { baseStyles } from "../../../styles/base";
import { z } from "zod";
import { DepartmentService } from "../../../services/department";
import { PositionService } from "../../../services/position";
import { msg } from "@lit/localize";
import { updateWhenLocaleChanges } from "@lit/localize";
const employeeForm = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfEmployment: z.string().min(1, "Date of employment is required").date(),
  dateOfBirth: z.string().min(1, "Date of birth is required").date(),
  phoneNumber: z.string().min(10, "Phone number is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  department: z.string().min(1, "Department is required"),
  position: z.string().min(1, "Position is required"),
});

export class HubEmployeeForm extends LitElement {
  static properties = {
    /**
     * The employee object
     * @type {Object}
     */
    employee: { type: Object },
    /**
     * The errors object
     * @type {Object}
     */
    errors: { type: Object },
    /**
     * The departments array
     * @type {Array}
     */
    departments: { type: Array },
    /**
     * The mode of the form
     * @type {"add" | "edit"}
     */
    mode: { type: String },
  };

  constructor() {
    super();
    this.employee = {
      firstName: "",
      lastName: "",
      dateOfEmployment: "",
      dateOfBirth: "",
      phoneNumber: "",
      email: "",
      department: "",
      position: "",
    };
    this.errors = [];
    this.departments = [];
    this.positions = [];
    this.mode = "add";
    updateWhenLocaleChanges(this);
  }

  async firstUpdated() {
    try {
      this.positions = await PositionService.getPositions();
      this.departments = await DepartmentService.getDepartments();
    } catch (error) {
      console.error(error);
    }
  }

  _handleValueChanged(event, field) {
    this.employee = {
      ...this.employee,
      [field]: event.detail.value,
    };

    this._validateField(field);
  }

  _validateField(field) {
    const result = employeeForm.safeParse({
      [field]: this.employee[field],
    });

    if (!result.success) {
      this.errors = {
        ...this.errors,
        [field]: result.error.flatten().fieldErrors[field],
      };
    }
  }

  _validateForm() {
    const isValid = employeeForm.safeParse(this.employee);

    if (!isValid.success) {
      this.errors = isValid.error.flatten().fieldErrors;
    }

    return isValid;
  }

  _handleSubmit(event) {
    event.preventDefault();

    const validationResult = this._validateForm();

    if (!validationResult.success) {
      return;
    }

    this.dispatchEvent(
      new CustomEvent("submit", {
        detail: this.employee,
        bubbles: true,
        composed: true,
      })
    );
  }

  get title() {
    return this.mode === "add" ? msg("Add Employee") : msg("Edit Employee");
  }

  get buttonText() {
    return this.mode === "add" ? msg("Add") : msg("Update");
  }

  render() {
    return html`
      <div class="form-container">
        <h1>${this.title}</h1>

        <form @submit=${this._handleSubmit}>
          <hub-form-field
            label=${msg("First Name")}
            .error=${this.errors.firstName}
          >
            <hub-input
              name="firstName"
              .value=${this.employee.firstName}
              @value-changed=${(e) => this._handleValueChanged(e, "firstName")}
            ></hub-input>
          </hub-form-field>
          <hub-form-field
            label=${msg("Last Name")}
            .error=${this.errors.lastName}
          >
            <hub-input
              name="lastName"
              .value=${this.employee.lastName}
              @value-changed=${(e) => this._handleValueChanged(e, "lastName")}
            ></hub-input>
          </hub-form-field>
          <hub-form-field
            label=${msg("Date of Employment")}
            .error=${this.errors.dateOfEmployment}
          >
            <hub-input
              name="dateOfEmployment"
              type="date"
              .value=${this.employee.dateOfEmployment}
              @value-changed=${(e) =>
                this._handleValueChanged(e, "dateOfEmployment")}
            ></hub-input>
          </hub-form-field>
          <hub-form-field
            label=${msg("Date of Birth")}
            .error=${this.errors.dateOfBirth}
          >
            <hub-input
              name="dateOfBirth"
              type="date"
              .value=${this.employee.dateOfBirth}
              @value-changed=${(e) =>
                this._handleValueChanged(e, "dateOfBirth")}
            ></hub-input>
          </hub-form-field>
          <hub-form-field
            label=${msg("Phone Number")}
            .error=${this.errors.phoneNumber}
          >
            <hub-input
              name="phoneNumber"
              type="tel"
              .value=${this.employee.phoneNumber}
              @value-changed=${(e) =>
                this._handleValueChanged(e, "phoneNumber")}
            ></hub-input>
          </hub-form-field>
          <hub-form-field
            label=${msg("Email Address")}
            .error=${this.errors.email}
          >
            <hub-input
              name="email"
              type="email"
              .value=${this.employee.email}
              @value-changed=${(e) => this._handleValueChanged(e, "email")}
            ></hub-input>
          </hub-form-field>
          <hub-form-field
            label=${msg("Department")}
            .error=${this.errors.department}
          >
            <hub-select
              name="department"
              .options=${this.departments}
              .value=${this.employee.department}
              @value-changed=${(e) => this._handleValueChanged(e, "department")}
            ></hub-select>
          </hub-form-field>
          <hub-form-field
            label=${msg("Position")}
            .error=${this.errors.position}
          >
            <hub-select
              name="position"
              .options=${this.positions}
              .value=${this.employee.position}
              @value-changed=${(e) => this._handleValueChanged(e, "position")}
            ></hub-select>
          </hub-form-field>
          <div class="form-footer">
            <hub-button type="submit">${this.buttonText}</hub-button>
          </div>
        </form>
      </div>
    `;
  }

  static styles = [
    baseStyles,
    css`
      .form-container {
        padding: 2rem;
        background-color: #fff;
        max-width: 500px;
        margin: 2rem auto;
      }

      .form-footer {
        display: flex;
        justify-content: flex-end;
      }

      h1 {
        margin-top: 0;
        font-size: 2rem;
        font-weight: 300;
        margin-bottom: 2rem;
        color: var(--primary-color);
      }

      .error-message {
        color: red;
        margin-bottom: 1rem;
      }
    `,
  ];
}

customElements.define("hub-employee-form", HubEmployeeForm);
