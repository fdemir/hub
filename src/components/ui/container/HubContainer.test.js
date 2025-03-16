import { HubContainer } from "./HubContainer.js";
import { fixture, html, assert } from "@open-wc/testing";

suite("HubContainer", () => {
  test("is defined", () => {
    const container = document.createElement("hub-container");
    document.body.appendChild(container);
    assert.isDefined(container);
  });

  test("renders with slot content", async () => {
    const el = await fixture(html`<hub-container>Test content</hub-container>`);
    const containerDiv = el.shadowRoot.querySelector(".container");

    assert.exists(containerDiv);
    assert.equal(el.textContent, "Test content");
  });
});
