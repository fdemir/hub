import { LitElement, html, css } from "lit";
import { baseStyles } from "../../../styles/base";
import { updateWhenLocaleChanges } from "@lit/localize";
import { msg } from "@lit/localize";

export class HubNavbar extends LitElement {
  static properties = {
    title: { type: String },
    _mobileMenuOpen: { type: Boolean },
  };

  constructor() {
    super();
    this.title = "ING";
    this._mobileMenuOpen = false;
    updateWhenLocaleChanges(this);
  }

  toggleMobileMenu() {
    this._mobileMenuOpen = !this._mobileMenuOpen;
  }

  get links() {
    return [
      {
        label: msg("Employee"),
        href: "/",
        icon: "user",
      },
      {
        label: msg("Add New"),
        href: "/add",
        icon: "plus",
      },
    ];
  }

  render() {
    return html`<nav>
      <div class="start">
        <a href="/" class="home">
          <img src="/logo.svg" width="30" height="30" alt="logo" />
          <h1 class="title">${this.title}</h1>
        </a>
      </div>

      <button
        class="mobile-menu-toggle"
        @click=${this.toggleMobileMenu}
        aria-label="Toggle menu"
      >
        <hub-icon name=${this._mobileMenuOpen ? "x" : "menu"}></hub-icon>
      </button>

      <div class="end ${this._mobileMenuOpen ? "mobile-open" : ""}">
        ${this.links.map(
          (link) => html`<a href="${link.href}">
            <hub-icon name="${link.icon}"></hub-icon>
            ${link.label}
          </a>`
        )}
        <hub-locale-selector></hub-locale-selector>
      </div>
    </nav>`;
  }

  static styles = [
    baseStyles,
    css`
      nav {
        background-color: #fff;
        height: 60px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        position: relative;
      }

      .home {
        display: flex;
        align-items: center;
        gap: 10px;
        color: #000;
      }

      .start,
      .end {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .title {
        margin: 0;
        font-size: 1.2rem;
        font-weight: 600;
      }

      .end a {
        display: flex;
        align-items: center;
        gap: 10px;
        color: var(--primary-color);
        text-decoration: none;
        padding: 8px 12px;
        border-radius: 4px;
        transition: background-color 0.2s;
      }

      .end a:hover {
        background-color: rgba(0, 0, 0, 0.05);
      }

      .mobile-menu-toggle {
        display: none;
        background: none;
        border: none;
        cursor: pointer;
        color: var(--primary-color);
        padding: 8px;
      }

      @media (max-width: 768px) {
        .mobile-menu-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .end {
          position: absolute;
          top: 60px;
          right: 0;
          flex-direction: column-reverse;
          background-color: white;
          width: 100%;
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          z-index: 100;
          padding: 0;
          align-items: flex-start;
        }

        .end.mobile-open {
          max-height: 300px;
          padding: 10px 0;
        }

        .end a {
          width: 100%;
          padding: 12px 20px;
          border-radius: 0;
        }
      }
    `,
  ];
}

customElements.define("hub-navbar", HubNavbar);
