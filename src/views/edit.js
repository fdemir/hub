import { LitElement, html } from "lit";
import { EmployeeService } from "../services/employee";
import { Router } from "@vaadin/router";
import { router } from "../router";
import { Task } from "@lit/task";
import { msg } from "@lit/localize";

export class Edit extends LitElement {
  static get properties() {
    return {
      employee: { type: Object },
      dialogOpen: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.dialogOpen = false;
    this.employee = {};
  }

  _employeeTask = new Task(this, {
    task: async ([employeeId], { signal }) => {
      if (!employeeId) return null;
      return await EmployeeService.getEmployee(employeeId);
    },
    args: () => [router.location.params.id],
  });

  async _handleEditEmployee(event) {
    event.preventDefault();
    try {
      const employee = event.detail;
      this.employee = employee;
      this.dialogOpen = true;
    } catch (error) {
      console.error(error);
    }
  }

  async _handleDialogApprove() {
    this.dialogOpen = false;
    await EmployeeService.updateEmployee(
      router.location.params.id,
      this.employee
    );
    Router.go("/");
  }

  render() {
    return html`
      <hub-container>
        <hub-dialog
          .title=${msg("Edit Employee")}
          .message=${msg("Are you sure you want to edit this employee?")}
          @approve=${this._handleDialogApprove}
          .open=${this.dialogOpen}
          @close=${() => (this.dialogOpen = false)}
        >
          <hub-spinner></hub-spinner>
        </hub-dialog>

        ${this._employeeTask.render({
          pending: () => html`<hub-spinner></hub-spinner>`,
          complete: (employee) => html`
            <hub-employee-form
              .employee=${employee}
              @submit=${this._handleEditEmployee}
              mode="edit"
            ></hub-employee-form>
          `,
          error: (error) => html`<p>Error loading employee: ${error}</p>`,
        })}
      </hub-container>
    `;
  }
}

customElements.define("hub-edit-view", Edit);
