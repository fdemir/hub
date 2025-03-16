import { HubInput } from "./HubInput.js";
import { fixture, html, assert, oneEvent } from "@open-wc/testing";

suite("HubInput", () => {
  test("is defined", () => {
    const input = document.createElement("hub-input");
    document.body.appendChild(input);
    assert.isDefined(input);
  });

  test("updates value when input changes", async () => {
    const el = await fixture(html`<hub-input></hub-input>`);
    const inputElement = el.shadowRoot.querySelector("input");

    inputElement.value = "test value";
    inputElement.dispatchEvent(new Event("input"));

    assert.equal(el.value, "test value");
  });

  test("fires value-changed event when input changes", async () => {
    const el = await fixture(html`<hub-input></hub-input>`);
    const inputElement = el.shadowRoot.querySelector("input");

    setTimeout(() => {
      inputElement.value = "new value";
      inputElement.dispatchEvent(new Event("input"));
    });

    const { detail } = await oneEvent(el, "value-changed");
    assert.equal(detail.value, "new value");
  });

  test("initializes with default values", async () => {
    const el = await fixture(html`<hub-input></hub-input>`);

    assert.equal(el.name, "");
    assert.equal(el.type, "text");
    assert.equal(el.value, "");
    assert.isFalse(el.block);
  });
});
