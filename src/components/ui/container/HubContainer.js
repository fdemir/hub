import { LitElement, html, css } from "lit";
import { baseStyles } from "../../../styles/base";

export class HubContainer extends LitElement {
  render() {
    return html`<div class="container"><slot></slot></div>`;
  }

  static styles = [
    baseStyles,
    css`
      .container {
        width: 100%;
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto;
      }

      @media (min-width: 992px) {
        .container {
          max-width: 960px;
        }
      }

      @media (min-width: 1200px) {
        .container {
          max-width: 1200px;
        }
      }
    `,
  ];
}

customElements.define("hub-container", HubContainer);
