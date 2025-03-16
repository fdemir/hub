import { LitElement, html, css } from "lit";
import { baseStyles } from "../styles/base";
import { setSearchQuery } from "../store/employee";
import { store } from "../store/app";
export class Home extends LitElement {
  static get properties() {
    return {
      view: { type: String },
      searchVisible: { type: Boolean },
    };
  }

  timeout = null;

  constructor() {
    super();
    this.view = "list";
  }

  handleSearch(event) {
    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      store.dispatch(setSearchQuery(event.detail.value));
    }, 300);
  }

  render() {
    return html`<hub-container>
      <section>
        <div class="header">
          <h1>Employee List</h1>
          <div class="actions">
            <hub-button
              variant="icon"
              @click=${() => (this.searchVisible = !this.searchVisible)}
            >
              <hub-icon name="search"></hub-icon>
            </hub-button>
            ${this.searchVisible
              ? html`<hub-input
                  label="Search"
                  @value-changed=${this.handleSearch}
                  type="search"
                ></hub-input>`
              : ""}
            <hub-button variant="icon" @click=${() => (this.view = "list")}>
              <hub-icon name="menu"></hub-icon>
            </hub-button>
            <hub-button variant="icon" @click=${() => (this.view = "grid")}>
              <hub-icon name="grid"></hub-icon>
            </hub-button>
          </div>
        </div>
      </section>

      <hub-employee-list .view=${this.view}> </hub-employee-list>
    </hub-container>`;
  }

  static styles = [
    baseStyles,
    css`
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 2rem 0;
      }

      h1 {
        margin: 0;
        font-size: 2rem;
        font-weight: 300;
        color: var(--primary-color);
        white-space: nowrap;
      }

      .actions {
        display: flex;
        gap: 0.5rem;
      }

      @media (max-width: 480px) {
        .header {
          flex-direction: column;
          align-items: flex-start;
          gap: 20px;
        }

        h1 {
          font-size: 1.5rem;
        }
      }
    `,
  ];
}

customElements.define("hub-home-view", Home);
