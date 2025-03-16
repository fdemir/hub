import { LitElement, html, css } from "lit";
import { baseStyles } from "../../../styles/base";
import { connect } from "../../../mixins/connect";
import { store } from "../../../store/app";
import { setEmployees, removeEmployee } from "../../../store/employee";
import { EmployeeService } from "../../../services/employee";
import { router } from "../../../router";

export class HubEmployeeList extends connect(store)(LitElement) {
  static properties = {
    employees: { type: Array },
    totalPages: { type: Number },
    currentPage: { type: Number },
    selectedEmployeeList: { type: Array },
    deleteDialogOpen: { type: Boolean },
  };

  constructor() {
    super();
    this.totalPages = 0;
    this.currentPage = 1;
    this.selectedEmployeeList = [];
    this.deleteDialogOpen = false;
  }

  stateChanged(state) {
    this.employees = state.employee.employees;
  }

  async fetchEmployees() {
    const employees = await EmployeeService.getEmployees();
    this.totalPages = employees.totalPages;
    this.currentPage = employees.currentPage;
    store.dispatch(setEmployees(employees.data));
  }

  async firstUpdated() {
    this.fetchEmployees();
  }

  handlePageChange(event) {
    const page = event.detail.page;
    const employees = EmployeeService.getEmployees(page);
    this.totalPages = employees.totalPages;
    this.currentPage = employees.currentPage;

    store.dispatch(setEmployees(employees.data));
  }

  /**
   *
   * @param {number} employeeId
   */
  handleRemove(employeeId) {
    this.selectedEmployeeList = [...this.selectedEmployeeList, employeeId];
    this.deleteDialogOpen = true;
  }

  handleDialogCancel() {
    this.deleteDialogOpen = false;
    this.selectedEmployeeList = [];
  }

  actionTemplate(data) {
    // fix this inline style
    return html`<div style="display: flex; gap: 0.5rem;">
      <a href=${`/edit/${data.id}`}>
        <hub-button variant="icon">
          <hub-icon name="edit"></hub-icon>
        </hub-button>
      </a>
      <hub-button variant="icon" @click=${() => this.handleRemove(data.id)}>
        <hub-icon name="trash"></hub-icon>
      </hub-button>
    </div>`;
  }

  handleSelectedChanged(event) {
    this.selectedEmployeeList = event.detail.selected;
  }

  handleDialogApprove() {
    this.deleteDialogOpen = false;

    EmployeeService.removeEmployee(...this.selectedEmployeeList);
    store.dispatch(removeEmployee(this.selectedEmployeeList));

    if (this.employees.length === 0) {
      this.fetchEmployees();
    }

    this.selectedEmployeeList = [];
  }

  render() {
    const dialogMessage =
      "Are you sure you want to delete these employees? ( " +
      this.selectedEmployeeList
        .map((id) => {
          const employee = this.employees.find((e) => e.id === id);
          if (!employee) {
            return "Employee not found";
          }
          return `${employee.firstName} ${employee.lastName}`;
        })
        .join(", ") +
      " )";

    return html`<hub-container>
      <hub-dialog
        title="Are you sure?"
        message=${dialogMessage}
        approveText="Delete"
        cancelText="Cancel"
        @close=${this.handleDialogCancel}
        .open=${this.deleteDialogOpen}
        @approve=${this.handleDialogApprove}
      >
      </hub-dialog>

      <section>
        <div class="header">
          <h1>Employee List</h1>
          <div class="actions">
            <hub-button variant="icon">
              <hub-icon name="menu"></hub-icon>
            </hub-button>
            <hub-button variant="icon">
              <hub-icon name="grid"></hub-icon>
            </hub-button>
          </div>
        </div>
      </section>

      <hub-table
        .columns=${[
          { id: "firstName", label: "First Name" },
          { id: "lastName", label: "Last Name" },
          {
            id: "dateOfEmployment",
            label: "Date of Employment",
            cell: (data) =>
              html`${new Date(data.dateOfEmployment).toLocaleDateString()}`,
          },
          {
            id: "dateOfBirth",
            label: "Date of Birth",
            cell: (data) =>
              html`${new Date(data.dateOfBirth).toLocaleDateString()}`,
          },
          { id: "phone", label: "Phone" },
          { id: "email", label: "Email" },
          { id: "department", label: "Department" },
          { id: "position", label: "Position" },
          {
            id: "actions",
            label: "Actions",
            cell: (data) => this.actionTemplate(data),
          },
        ]}
        .data=${this.employees}
        selectable
        .selected=${this.selectedEmployeeList}
        accessorkey="id"
        @selected-changed=${this.handleSelectedChanged}
      ></hub-table>
      <hub-pagination
        .totalPages=${this.totalPages}
        .currentPage=${this.currentPage}
        @page-change=${this.handlePageChange}
      ></hub-pagination>
    </hub-container>`;
  }

  static styles = [
    baseStyles,
    css`
      h1 {
        margin: 0;
        font-size: 2rem;
        font-weight: 300;
        color: var(--primary-color);
      }

      section {
        padding: 2rem 0;
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .actions {
        display: flex;
        gap: 0.5rem;
      }
    `,
  ];
}

customElements.define("hub-employee-list", HubEmployeeList);
