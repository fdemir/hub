import { HubTable } from "./HubTable.js";
import { fixture, html, assert } from "@open-wc/testing";

suite("HubTable", () => {
  test("renders with basic data", async () => {
    const columns = [
      { id: "name", label: "Name" },
      { id: "age", label: "Age" },
    ];

    const data = [
      { id: "1", name: "John Doe", age: 30 },
      { id: "2", name: "Jane Smith", age: 25 },
    ];

    const el = await fixture(html`
      <hub-table .columns=${columns} .data=${data}></hub-table>
    `);

    const tableRows = el.shadowRoot.querySelectorAll("tbody tr");
    assert.equal(tableRows.length, 2);
  });

  test("renders empty state correctly", async () => {
    const columns = [{ id: "name", label: "Name" }];
    const data = [];

    const el = await fixture(html`
      <hub-table .columns=${columns} .data=${data}></hub-table>
    `);

    const emptyMessage = el.shadowRoot.querySelector("tbody td");

    assert.equal(emptyMessage.getAttribute("data-testid"), "no-data");
  });
});
