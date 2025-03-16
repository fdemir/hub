import { LitElement, html, css } from "lit";
import { msg, updateWhenLocaleChanges } from "@lit/localize";

export class HubInput extends LitElement {
  static properties = {
    name: { type: String },
    block: { type: Boolean },
    type: { type: String },
    value: { type: String },
    type: { type: String },
  };

  constructor() {
    super();
    updateWhenLocaleChanges(this);

    this.name = "";
    this.block = false;
    this.type = "text";
    this.value = "";
  }

  _handleInput(e) {
    this.value = e.target.value;
    this.dispatchEvent(
      new CustomEvent("value-changed", {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`<input
      placeholder=${msg("Type")}
      name=${this.name}
      type=${this.type}
      .value=${this.value}
      @input=${this._handleInput}
    />`;
  }

  static styles = css`
    input {
      position: relative;
      outline: 0 none;
      border: 1px solid #d0d0d0;
      border-radius: var(--input-radius);
      padding: 0 10px;
      height: 40px;
      resize: none;
      vertical-align: middle;
      font-size: 16px;
      line-height: 40px;
      min-width: 240px;
      box-sizing: border-box;
      width: 100%;
    }

    input:focus {
      outline: none;
      box-shadow: 0 0 0 2px rgba(255, 102, 0, 0.3);
    }
  `;
}

customElements.define("hub-input", HubInput);
