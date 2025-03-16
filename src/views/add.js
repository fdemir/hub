import { LitElement, html, css } from "lit";
import { connect } from "../mixins/connect";
import { store } from "../store/app";
import { addEmployee } from "../store/employee";
import { EmployeeService } from "../services/employee";
import { Router } from "@vaadin/router";

export class Add extends connect(store)(LitElement) {
  /**
   * Handle adding a new employee
   * @param {CustomEvent} event - Custom event containing employee data
   */
  async _handleAddEmployee({ detail }) {
    await EmployeeService.addEmployee(detail);
    store.dispatch(addEmployee(detail));
    Router.go("/");
  }

  render() {
    return html`
      <hub-container>
        <hub-employee-form
          @submit=${this._handleAddEmployee}
        ></hub-employee-form>
      </hub-container>
    `;
  }
}

customElements.define("hub-add-view", Add);
