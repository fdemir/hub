import { HubFormField } from "./HubFormField.js";
import { fixture, html, assert } from "@open-wc/testing";

suite("HubFormField", () => {
  let element;

  setup(async () => {
    element = await fixture(html`<hub-form-field></hub-form-field>`);
  });

  test("initializes with default properties", () => {
    assert.equal(element.label, "");
    assert.equal(element.error, "");
  });

  test("renders label when provided", async () => {
    element.label = "Test Label";
    await element.updateComplete;

    const label = element.shadowRoot.querySelector("label");
    assert.equal(label.textContent, "Test Label");
  });

  test("renders error message when error is provided", async () => {
    element.error = "This field is required";
    await element.updateComplete;

    const errorElement = element.shadowRoot.querySelector(".error");
    assert.exists(errorElement);
    assert.equal(errorElement.textContent, "This field is required");
  });

  test("does not render error message when error is empty", () => {
    const errorElement = element.shadowRoot.querySelector(".error");
    assert.notExists(errorElement);
  });

  test("applies form-field class to container", () => {
    const container = element.shadowRoot.querySelector(".form-field");
    assert.exists(container);
  });
});
