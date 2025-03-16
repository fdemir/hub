import { LitElement, html, css } from "lit";
import { baseStyles } from "../../../styles/base";

export class HubPagination extends LitElement {
  static properties = {
    /**
     * Current page number (1-based)
     */
    currentPage: { type: Number },

    /**
     * Total number of pages
     */
    totalPages: { type: Number },

    /**
     * Number of page buttons to show
     */
    visiblePages: { type: Number },

    /**
     * Whether to show the previous/next page buttons
     */
    showPrevNext: { type: Boolean },

    /**
     * Whether to disable the component
     */
    disabled: { type: Boolean },
  };

  constructor() {
    super();
    this.currentPage = 1;
    this.totalPages = 1;
    this.visiblePages = 5;
    this.showPrevNext = true;
    this.disabled = false;
  }

  _handlePageChange(page) {
    if (
      this.disabled ||
      page === this.currentPage ||
      page < 1 ||
      page > this.totalPages
    ) {
      return;
    }

    this.currentPage = page;

    this.dispatchEvent(
      new CustomEvent("page-change", {
        detail: { page },
        bubbles: true,
        composed: true,
      })
    );
  }

  _getVisiblePageNumbers() {
    const pages = [];
    const halfVisible = Math.floor(this.visiblePages / 2);

    let startPage = Math.max(1, this.currentPage - halfVisible);
    let endPage = Math.min(this.totalPages, startPage + this.visiblePages - 1);

    if (endPage - startPage + 1 < this.visiblePages) {
      startPage = Math.max(1, endPage - this.visiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  render() {
    if (this.totalPages <= 1) {
      return html``;
    }

    const visiblePages = this._getVisiblePageNumbers();
    const showStartEllipsis = visiblePages[0] > 1;
    const showEndEllipsis =
      visiblePages[visiblePages.length - 1] < this.totalPages;

    return html`
      <nav class="pagination ${this.disabled ? "disabled" : ""}">
        <ul>
          ${this.showPrevNext
            ? html`
                <li>
                  <button
                    class="page-button"
                    ?disabled="${this.currentPage === 1 || this.disabled}"
                    @click="${() =>
                      this._handlePageChange(this.currentPage - 1)}"
                  >
                    <hub-icon name="chevronLeft"></hub-icon>
                  </button>
                </li>
              `
            : ""}
          ${visiblePages.map(
            (page) => html`
              <li>
                <button
                  class="page-button page-number ${page === this.currentPage
                    ? "active"
                    : ""}"
                  ?disabled="${this.disabled}"
                  @click="${() => this._handlePageChange(page)}"
                >
                  ${page}
                </button>
              </li>
            `
          )}
          ${showEndEllipsis
            ? html`
                <li><span class="ellipsis">...</span></li>
                <li>
                  <button
                    class="page-button page-number"
                    ?disabled="${this.disabled}"
                    @click="${() => this._handlePageChange(this.totalPages)}"
                  >
                    ${this.totalPages}
                  </button>
                </li>
              `
            : ""}
          ${this.showPrevNext
            ? html`
                <li>
                  <button
                    class="page-button"
                    ?disabled="${this.currentPage === this.totalPages ||
                    this.disabled}"
                    @click="${() =>
                      this._handlePageChange(this.currentPage + 1)}"
                  >
                    <hub-icon name="chevronRight"></hub-icon>
                  </button>
                </li>
              `
            : ""}
        </ul>
      </nav>
    `;
  }

  static styles = [
    baseStyles,
    css`
      :host {
        display: block;
      }

      .pagination {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      ul {
        display: flex;
        justify-content: center;
        align-items: center;
        list-style: none;
        padding: 0;
        gap: 10px;
      }

      .page-button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        padding: 0;
        color: var(--primary-color);
        user-select: none;
      }

      .page-button:disabled {
        color: lightgray;
      }

      .page-number {
        color: #000;
        font-weight: 300;
        width: 25px;
        height: 25px;
        flex-shrink: 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .page-number.active {
        background-color: var(--primary-color);
        color: #fff;
        border-radius: 100px;
      }
    `,
  ];
}

customElements.define("hub-pagination", HubPagination);
