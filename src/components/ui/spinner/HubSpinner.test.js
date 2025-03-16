import "./HubSpinner.js";

import { fixture, html, assert } from "@open-wc/testing";

suite("HubSpinner", () => {
  test("renders the spinner component", async () => {
    const element = await fixture(html`<hub-spinner></hub-spinner>`);
    assert.exists(element);
  });
});
