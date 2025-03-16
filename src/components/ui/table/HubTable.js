import { LitElement, html, css } from "lit";
import { baseStyles } from "../../../styles/base";
import { msg, updateWhenLocaleChanges } from "@lit/localize";

export class HubTable extends LitElement {
  static get properties() {
    return {
      /**
       * Array of column definitions
       * @type {Array<{id: string, label: string, width: string, cell: (data: Object) => string}>}
       */
      columns: { type: Array },

      /**
       * Array of data objects to display in the table
       * @type {Array<Object>}
       */
      data: { type: Array },

      /**
       * Whether the table is selectable
       * @type {boolean}
       */
      selectable: { type: Boolean },

      /**
       * Array of selected items
       * @type {Array<Object>}
       */
      selected: { type: Array },

      /**
       * The accessor key for the selected items
       * @type {string}
       */
      accessorkey: { type: String },
    };
  }

  constructor() {
    super();
    this.selected = [];
    this.accessorkey = "id";
    this.selectable = false;
    updateWhenLocaleChanges(this);
  }

  handleSelectAll(event) {
    this.selected = event.target.checked
      ? this.data.map((row) => row[this.accessorkey])
      : [];
  }

  handleSelect(row) {
    this.selected = this.selected.includes(row[this.accessorkey])
      ? this.selected.filter((item) => item !== row[this.accessorkey])
      : [...this.selected, row[this.accessorkey]];
  }

  shouldUpdate(changedProperties) {
    if (changedProperties.has("selected")) {
      this.dispatchEvent(
        new CustomEvent("selected-changed", {
          detail: { selected: this.selected },
        })
      );
    }
    return true;
  }

  render() {
    return html`
      <div class="table-container">
        <table>
          <thead>
            <tr>
              ${this.selectable
                ? html`<th class="checkbox-column">
                    <input
                      type="checkbox"
                      @change=${this.handleSelectAll}
                      .checked=${this.selected?.length === this.data.length &&
                      this.data.length > 0}
                    />
                  </th>`
                : ""}
              ${this.columns.map((column) => html`<th>${column.label}</th>`)}
            </tr>
          </thead>
          <tbody>
            ${this.data.length > 0
              ? this.data.map(
                  (row) =>
                    html`<tr>
                      ${this.selectable
                        ? html`<td class="checkbox-column">
                            <input
                              type="checkbox"
                              @change=${() => this.handleSelect(row)}
                              .checked=${this.selected.includes(
                                row[this.accessorkey]
                              )}
                            />
                          </td>`
                        : ""}
                      ${this.columns.map(
                        (column) =>
                          html`<td>
                            ${column.cell ? column.cell(row) : row[column.id]}
                          </td>`
                      )}
                    </tr>`
                )
              : html`<tr>
                  <td colspan="${this.columns.length}" data-testid="no-data">
                    ${msg("No data")}
                  </td>
                </tr>`}
          </tbody>
        </table>
      </div>
    `;
  }

  static styles = [
    baseStyles,
    css`
      .table-container {
        overflow-x: auto;
      }

      table {
        width: 100%;
        background-color: #fff;
        border-collapse: collapse;
        font-size: 14px;
        border-radius: 5px;
      }

      th,
      td {
        padding: 20px 12px;
        text-align: left;
        border-bottom: 1px solid #e0e0e0;
      }

      tr:last-child td {
        border-bottom: none;
      }

      th {
        white-space: nowrap;
      }

      th {
        font-weight: 600;
        color: var(--primary-color);
        font-size: 15px;
      }
      .checkbox-column {
        width: 48px;
        text-align: center;
      }
      input[type="checkbox"] {
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        margin: 0;
        width: 16px;
        height: 16px;
        border: 1px solid var(--secondary-color);
        border-radius: 3px;
        background-color: #fff;
        cursor: pointer;
        position: relative;
      }

      input[type="checkbox"]:checked {
        background-color: var(--primary-color);
        border-color: var(--primary-color);
      }

      input[type="checkbox"]:checked::after {
        content: "";
        position: absolute;
        left: 4px;
        width: 5px;
        height: 9px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }

      input[type="checkbox"]:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba(255, 102, 0, 0.3);
      }
    `,
  ];
}

customElements.define("hub-table", HubTable);
