import { LitElement, html, css } from "lit";
import { baseStyles } from "../../../styles/base";

export class HubSpinner extends LitElement {
  render() {
    return html`
      <span class="spinner-container">
        <svg
          class="spinner-icon"
          xmlns="http://www.w3.org/2000/svg"
          width=${50}
          height=${50}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-loader-circle"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
      </span>
    `;
  }

  static styles = [
    baseStyles,
    css`
      .spinner-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 1rem;
      }

      .spinner-icon {
        animation: spin 1s linear infinite;
        color: var(--primary-color);
      }

      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ];
}

customElements.define("hub-spinner", HubSpinner);
