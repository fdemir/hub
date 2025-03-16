import { LitElement, html, css } from "lit";
import { classMap } from "lit/directives/class-map.js";

export class HubFormField extends LitElement {
  static properties = {
    label: { type: String },
    error: { type: String },
  };

  constructor() {
    super();
    this.label = "";
    this.error = "";
  }

  static styles = css`
    .form-field {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .error {
      color: red;
      margin: 0;
    }
  `;

  render() {
    const classes = {
      "form-field": true,
    };

    return html`<div class=${classMap(classes)}>
      <label>${this.label}</label>
      <slot></slot>
      ${this.error ? html`<p class="error">${this.error}</p>` : ""}
    </div>`;
  }
}

customElements.define("hub-form-field", HubFormField);
