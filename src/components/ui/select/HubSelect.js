import { LitElement, html, css } from "lit";
import { msg, updateWhenLocaleChanges } from "@lit/localize";
import { repeat } from "lit/directives/repeat.js";

export class HubSelect extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      /**
       * @type {Array<{value: string, label: string}>}
       */
      options: { type: Array },
      value: { type: String, reflect: true },
      block: { type: Boolean },
      open: { type: Boolean, state: true },
      noDefaultOption: { type: Boolean },
    };
  }

  constructor() {
    super();
    updateWhenLocaleChanges(this);

    this.name = "";
    this.options = [];
    this.value = "";
    this.open = false;
    this.block = false;
    this.noDefaultOption = false;
  }

  _handleSelect(value, label) {
    this.value = value;
    this.open = false;
    this.dispatchEvent(
      new CustomEvent("value-changed", {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  _toggleDropdown(e) {
    e.stopPropagation();
    this.open = !this.open;
  }

  _handleClickOutside(e) {
    if (!this.contains(e.target) && this.open) {
      this.open = false;
    }
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("click", this._handleClickOutside.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("click", this._handleClickOutside.bind(this));
  }

  _getSelectedLabel() {
    if (!this.value) return msg("Select an option");
    const selectedOption = this.options.find(
      (option) => option.value === this.value
    );
    return selectedOption ? selectedOption.label : msg("Select an option");
  }

  render() {
    return html`
      <div class="custom-select ${this.block ? "block" : ""}">
        <slot name="trigger" @click="${this._toggleDropdown}">
          <div
            class="select-selected ${this.open ? "active" : ""}"
            tabindex="0"
            role="combobox"
            aria-expanded="${this.open}"
            aria-haspopup="listbox"
          >
            ${this._getSelectedLabel()}
            <span class="select-arrow"></span>
          </div>
        </slot>
        <div
          class="select-items ${this.open ? "select-show" : "select-hide"}"
          role="listbox"
        >
          ${!this.noDefaultOption
            ? html` <div
                class="select-item"
                @click="${() =>
                  this._handleSelect("", msg("Select an option"))}"
                role="option"
                aria-selected="${!this.value}"
              >
                ${msg("Select an option")}
              </div>`
            : ""}
          ${this.options.length > 0
            ? repeat(
                this.options,
                (option) => option.value,
                (option) =>
                  html`<div
                    class="select-item ${option.value === this.value
                      ? "selected"
                      : ""}"
                    @click="${() =>
                      this._handleSelect(option.value, option.label)}"
                    role="option"
                    aria-selected="${option.value === this.value}"
                  >
                    ${option.label}
                  </div>`
              )
            : html`<slot name="options"></slot>`}
        </div>
        <input type="hidden" name="${this.name}" .value="${this.value}" />
      </div>
    `;
  }

  static styles = css`
    .custom-select {
      position: relative;
      box-sizing: border-box;
      font-size: 16px;
    }

    .custom-select.block {
      width: 100%;
    }

    .select-selected {
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
      box-sizing: border-box;
      width: 100%;
      cursor: pointer;
      user-select: none;
      min-width: 240px;
    }

    .select-selected:focus,
    .select-selected.active {
      outline: none;
      box-shadow: 0 0 0 2px rgba(255, 102, 0, 0.3);
    }

    .select-arrow {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid #666;
    }

    .select-items {
      position: absolute;
      background-color: white;
      top: 100%;
      left: 0;
      right: 0;
      z-index: 99;
      border: 1px solid #d0d0d0;
      border-radius: var(--input-radius);
      margin-top: 2px;
      max-height: 300px;
      overflow-y: auto;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      width: 100%;
    }

    .select-item {
      padding: 10px;
      cursor: pointer;
      user-select: none;
    }

    .select-item:hover,
    .select-item.selected {
      background-color: rgba(255, 102, 0, 0.1);
    }

    .select-hide {
      display: none;
    }

    .select-show {
      display: block;
    }

    .select-item.keyboard-focus {
      background-color: rgba(255, 102, 0, 0.2);
      outline: 1px solid rgba(255, 102, 0, 0.5);
    }
  `;
}

customElements.define("hub-select", HubSelect);
