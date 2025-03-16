import { LitElement, html, css } from "lit";
import { baseStyles } from "../../../styles/base";

export class HubEmployeeCard extends LitElement {
  static get properties() {
    return {
      employee: { type: Object },
      selected: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.employee = {
      id: "",
      firstName: "",
      lastName: "",
      dateOfEmployment: "",
      dateOfBirth: "",
      phoneNumber: "",
      email: "",
      department: "",
      position: "",
    };
    this.selected = false;
  }

  _handleEdit() {
    this.dispatchEvent(new CustomEvent("edit"));
  }

  _handleRemove() {
    this.dispatchEvent(new CustomEvent("remove"));
  }

  _handleSelect() {
    this.dispatchEvent(new CustomEvent("select"));
  }

  render() {
    return html`<div class="employee-card">
      <div class="employee-header">
        <input
          type="checkbox"
          @change=${this._handleSelect}
          .checked=${this.selected}
        />
        <div class="employee-actions">
          <hub-button variant="icon" @click=${this._handleEdit}>
            <hub-icon name="edit" width="20" height="20"></hub-icon>
          </hub-button>
          <hub-button variant="icon" @click=${this._handleRemove}>
            <hub-icon name="trash" width="20" height="20"></hub-icon>
          </hub-button>
        </div>
      </div>
      <div class="employee-info">
        <div class="employee-name">
          <span>${this.employee.firstName} ${this.employee.lastName}</span>
        </div>
        <div class="employee-department">
          <span>${this.employee.department} / ${this.employee.position}</span>
        </div>
        <div class="employee-phone">
          <span>Tel: ${this.employee.phoneNumber}</span>
        </div>
        <div class="employee-email">
          <span>${this.employee.email}</span>
        </div>
        <div class="employee-joined-date">
          Joined
          ${new Date(this.employee.dateOfEmployment).toLocaleDateString()}
        </div>
        <div class="employee-birthday">
          Birthday ${new Date(this.employee.dateOfBirth).toLocaleDateString()}
        </div>
      </div>
    </div>`;
  }

  static styles = [
    baseStyles,
    css`
      .employee-card {
        width: 100%;
        height: 100%;
        background-color: #fff;
        padding: 1rem;
        border-radius: var(--card-radius);
        display: flex;
        flex-direction: column;
      }

      .employee-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .employee-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
      }

      .employee-name {
        font-size: 1.5rem;
        font-weight: 600;
      }

      .employee-department {
        color: var(--secondary-color);
      }

      .employee-phone {
        color: var(--primary-color);
      }

      .employee-email {
        color: var(--secondary-color);
      }

      input[type="checkbox"] {
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        margin: 0;
        width: 16px;
        height: 16px;
        border: 1px solid var(--secondary-color);
        border-radius: 3px;
        background-color: #fff;
        cursor: pointer;
        position: relative;
      }

      input[type="checkbox"]:checked {
        background-color: var(--primary-color);
        border-color: var(--primary-color);
      }

      input[type="checkbox"]:checked::after {
        content: "";
        position: absolute;
        left: 4px;
        width: 5px;
        height: 9px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }

      input[type="checkbox"]:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba(255, 102, 0, 0.3);
      }
    `,
  ];
}

customElements.define("hub-employee-card", HubEmployeeCard);
