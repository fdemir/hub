import { LitElement, html, css } from "lit";
import { baseStyles } from "../../../styles/base";
import { classMap } from "lit/directives/class-map.js";

export class HubButton extends LitElement {
  static properties = {
    type: { type: String },
    disabled: { type: Boolean },
    label: { type: String },
    /**
     * @type { "default" | "transparent" | "icon" | "outline" }
     */
    variant: { type: String },

    block: { type: Boolean },
  };

  constructor() {
    super();
    this.type = "button";
    this.disabled = false;
    this.label = "";
    this.variant = "default";
    this.block = false;
  }

  _handleClick(e) {
    if (this.disabled) {
      e.preventDefault();
      return;
    }

    if (this.type === "submit") {
      const form = this.closest("form");
      if (form) {
        form.dispatchEvent(new SubmitEvent("submit", { cancelable: true }));
      }
    }

    this.dispatchEvent(
      new CustomEvent("button-click", {
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    const buttonType =
      this.type === "submit" || this.type === "reset" ? this.type : "button";

    return html`<button
      type=${buttonType}
      ?disabled=${this.disabled}
      @click=${this._handleClick}
      class=${classMap({
        [this.variant]: true,
        block: this.block,
      })}
    >
      <slot></slot>
    </button>`;
  }

  static styles = [
    baseStyles,
    css`
      button {
        background-color: var(--primary-color);
        color: #fff;
        padding: 10px 20px;
        border: none;
        border-radius: var(--input-radius);
        color: #fff;
        font-weight: 600;
        cursor: pointer;
        transition: opacity 0.2s ease;
        font-size: 16px;
      }

      button.transparent {
        background-color: transparent;
        color: var(--primary-color);
      }

      button.icon {
        background-color: transparent;
        width: 40px;
        height: 40px;
        padding: 0;
        color: var(--primary-color);
      }

      button.outline {
        background-color: transparent;
        color: var(--secondary-color);
        border: 1px solid var(--secondary-color);
      }

      button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      button:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba(255, 102, 0, 0.3);
      }

      button.block {
        width: 100%;
      }
    `,
  ];
}

customElements.define("hub-button", HubButton);
