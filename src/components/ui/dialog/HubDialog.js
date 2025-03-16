import { LitElement, html, css } from "lit";
import { baseStyles } from "../../../styles/base";

export class HubDialog extends LitElement {
  static properties = {
    title: { type: String },
    message: { type: String },
    open: { type: Boolean },
    approveText: { type: String },
    cancelText: { type: String },
  };

  constructor() {
    super();
    this.title = "";
    this.message = "";
    this.open = false;
    this.approveText = "Approve";
    this.cancelText = "Cancel";
  }

  show() {
    document.body.appendChild(this);
    document.body.style.overflow = "hidden";
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.parentElement !== document.body && this.open) {
      this.show();
    }
  }

  shouldUpdate(changedProperties) {
    if (changedProperties.has("open")) {
      if (this.open) {
        this.show();
      } else {
        this.closeDialog();
      }
    }
    return true;
  }

  closeDialog() {
    this.open = false;
    document.body.style.overflow = "auto";
    this.remove();

    this.dispatchEvent(new CustomEvent("close"));
  }

  handleApprove() {
    this.dispatchEvent(
      new CustomEvent("approve", {
        detail: {},
      })
    );
  }

  render() {
    if (!this.open) return html``;

    return html`
      <div class="dialog">
        <div class="dialog-content">
          <div class="dialog-header">
            <h2 class="dialog-title">${this.title}</h2>
            <span @click=${() => this.closeDialog()} class="dialog-close">
              <hub-icon name="x"></hub-icon>
            </span>
          </div>
          <p class="dialog-message">${this.message}</p>
          <div class="dialog-actions">
            <hub-button variant="primary" block @click=${this.handleApprove}
              >${this.approveText}</hub-button
            >
            <hub-button
              variant="outline"
              block
              @click=${() => this.closeDialog()}
              >${this.cancelText}</hub-button
            >
          </div>
        </div>
      </div>
    `;
  }

  static styles = [
    baseStyles,
    css`
      .dialog {
        position: fixed;
        width: 100vw;
        height: 100vh;
        z-index: 2000;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0;
        left: 0;
      }

      .dialog-content {
        max-width: 500px;
        width: 100%;
        background-color: white;
        padding: 20px;
        border-radius: 5px;
      }

      .dialog-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .dialog-title {
        font-size: 24px;
        font-weight: 600;
        color: var(--primary-color);
        margin: 0;
      }
      .dialog-message {
        font-size: 16px;
        color: #666;
        margin-bottom: 20px;
      }

      .dialog-close {
        cursor: pointer;
        font-size: 24px;
        color: var(--primary-color);
      }

      .dialog-actions {
        display: flex;
        flex-direction: column;
        gap: 5px;
      }
    `,
  ];
}

customElements.define("hub-dialog", HubDialog);
