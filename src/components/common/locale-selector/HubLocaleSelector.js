import { LitElement, html, css, getCompatibleStyle } from "lit";
import { baseStyles } from "../../../styles/base";
import { allLocales } from "../../../generated/locale-codes";
import { getLocale, setLocale } from "../../../localization";
import { updateWhenLocaleChanges } from "@lit/localize";

export class HubLocaleSelector extends LitElement {
  static get properties() {
    return {
      locale: { type: String },
    };
  }

  _locales = allLocales.map((locale) => ({
    label: locale,
    value: locale,
  }));

  constructor() {
    super();
    updateWhenLocaleChanges(this);
    this.locale = getLocale();
  }

  _handleLocaleChange(locale) {
    setLocale(locale);
  }

  updated() {
    this.locale = getLocale();
  }

  render() {
    return html`<div>
      <hub-select noDefaultOption>
        <div slot="trigger" class="trigger">
          <img
            src="/flags/${this.locale}.svg"
            alt="${this.locale}"
            width="30"
            height="30"
          />
        </div>
        <div slot="options" class="options">
          ${this._locales.map(
            (locale) => html`
              <div
                class="option"
                @click=${() => this._handleLocaleChange(locale.value)}
              >
                <img
                  src="/flags/${locale.value}.svg"
                  alt="${locale.label}"
                  width="100%"
                  height="30"
                />
              </div>
            `
          )}
        </div>
      </hub-select>
    </div>`;
  }

  static styles = [
    baseStyles,
    css`
      .trigger {
        width: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }

      .options {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 10px;
      }
    `,
  ];
}

customElements.define("hub-locale-selector", HubLocaleSelector);
