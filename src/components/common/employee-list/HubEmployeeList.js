import { LitElement, html, css } from "lit";
import { baseStyles } from "../../../styles/base";
import { connect } from "../../../mixins/connect";
import { store } from "../../../store/app";
import { setEmployees, removeEmployee } from "../../../store/employee";
import { EmployeeService } from "../../../services/employee";
import { repeat } from "lit/directives/repeat.js";
import { Router } from "@vaadin/router";
import { Task } from "@lit/task";
import { errorMessages } from "../../../error";

export class HubEmployeeList extends connect(store)(LitElement) {
  static properties = {
    employees: { type: Array },
    totalPages: { type: Number },
    currentPage: { type: Number },
    selectedEmployeeList: { type: Array },
    deleteDialogOpen: { type: Boolean },
    searchQuery: { type: String },

    /**
     * @type {"list" | "grid"}
     */
    view: { type: String },
  };

  constructor() {
    super();
    this.totalPages = 0;
    this.currentPage = 1;
    this.selectedEmployeeList = [];
    this.deleteDialogOpen = false;
    this.view = "list";
    this.searchQuery = "";
  }

  stateChanged(state) {
    this.employees = state.employee.employees;
    this.searchQuery = state.employee.searchQuery;
  }

  _fetchEmployeesTask = new Task(this, {
    args: () => [this.currentPage, this.searchQuery],
    task: async ([page, searchQuery]) => {
      const employees = await EmployeeService.getEmployees(
        page,
        10,
        searchQuery
      );
      this.totalPages = employees.totalPages;
      this.currentPage = employees.currentPage;
      store.dispatch(setEmployees(employees.data));
      return employees;
    },
  });

  async handlePageChange(event) {
    this.currentPage = event.detail.page;
  }

  /**
   *
   * @param {number} employeeId
   */
  handleRemove(employeeId) {
    if (!this.selectedEmployeeList.includes(employeeId)) {
      this.selectedEmployeeList = [...this.selectedEmployeeList, employeeId];
    }
    this.deleteDialogOpen = true;
  }

  handleDialogCancel() {
    this.deleteDialogOpen = false;
    this.selectedEmployeeList = [];
  }

  _handleEdit(employeeId) {
    Router.go(`/edit/${employeeId}`);
  }

  _handleSelect(employeeId) {
    if (!this.selectedEmployeeList.includes(employeeId)) {
      this.selectedEmployeeList = [...this.selectedEmployeeList, employeeId];
    }
  }

  actionTemplate(data) {
    // fix this inline style
    return html`<div style="display: flex; gap: 0.5rem;">
      <hub-button variant="icon" @click=${() => this._handleEdit(data.id)}>
        <hub-icon name="edit"></hub-icon>
      </hub-button>
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

  get dialogMessage() {
    return `Are you sure you want to delete these employees? (
    ${this.selectedEmployeeList
      .map((id) => {
        const employee = this.employees.find((e) => e.id === id);
        if (!employee) {
          return "Employee not found";
        }
        return `${employee.firstName} ${employee.lastName}`;
      })
      .join(", ")}
    )`;
  }

  render() {
    return html`
      <hub-dialog
        title="Are you sure?"
        message=${this.dialogMessage}
        approveText="Delete"
        cancelText="Cancel"
        @close=${this.handleDialogCancel}
        .open=${this.deleteDialogOpen}
        @approve=${this.handleDialogApprove}
      >
      </hub-dialog>

      ${this._fetchEmployeesTask.render({
        pending: () => html`<hub-spinner></hub-spinner>`,
        complete: () =>
          html` ${this.view === "list"
            ? html` <hub-table
                .columns=${[
                  { id: "firstName", label: "First Name" },
                  { id: "lastName", label: "Last Name" },
                  {
                    id: "dateOfEmployment",
                    label: "Date of Employment",
                    cell: (data) =>
                      html`${new Date(
                        data.dateOfEmployment
                      ).toLocaleDateString()}`,
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
              ></hub-table>`
            : html`
                <div class="employee-grid">
                  ${repeat(
                    this.employees,
                    (employee) => employee.id,
                    (employee) =>
                      html`<hub-employee-card
                        .employee=${employee}
                        @remove=${() => this.handleRemove(employee.id)}
                        @edit=${() => this._handleEdit(employee.id)}
                        @select=${() => this._handleSelect(employee.id)}
                        .selected=${this.selectedEmployeeList.includes(
                          employee.id
                        )}
                      ></hub-employee-card>`
                  )}
                </div>
              `}`,

        error: (error) => {
          console.log(error);
          return html`<span
            >Error: ${errorMessages?.[error.message] || "Unknown error"}</span
          >`;
        },
      })}
      <hub-pagination
        .totalPages=${this.totalPages}
        .currentPage=${this.currentPage}
        @page-change=${this.handlePageChange}
      ></hub-pagination>
    `;
  }

  static styles = [
    baseStyles,
    css`
      .employee-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
      }

      @media (max-width: 768px) {
        .employee-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (max-width: 480px) {
        .employee-grid {
          grid-template-columns: repeat(1, 1fr);
        }
      }
    `,
  ];
}

customElements.define("hub-employee-list", HubEmployeeList);
