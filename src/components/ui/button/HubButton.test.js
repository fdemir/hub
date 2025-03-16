import { HubButton } from "./HubButton.js";
import { fixture, html, assert } from "@open-wc/testing";

suite("HubButton", () => {
  test("renders with default properties", async () => {
    const el = await fixture(html`<hub-button></hub-button>`);

    assert.equal(el.type, "button");
    assert.isFalse(el.disabled);
    assert.equal(el.label, "");
    assert.equal(el.variant, "default");
    assert.isFalse(el.block);
  });

  test("renders with custom properties", async () => {
    const el = await fixture(html`
      <hub-button
        type="submit"
        ?disabled=${true}
        label="Submit"
        variant="outline"
        ?block=${true}
      >
        Click Me
      </hub-button>
    `);

    assert.equal(el.type, "submit");
    assert.isTrue(el.disabled);
    assert.equal(el.label, "Submit");
    assert.equal(el.variant, "outline");
    assert.isTrue(el.block);
  });

  test("applies correct classes based on variant", async () => {
    const el = await fixture(
      html`<hub-button variant="transparent"></hub-button>`
    );
    const button = el.shadowRoot.querySelector("button");

    assert.isTrue(button.classList.contains("transparent"));
  });

  test("applies block class when block property is true", async () => {
    const el = await fixture(html`<hub-button ?block=${true}></hub-button>`);
    const button = el.shadowRoot.querySelector("button");

    assert.isTrue(button.classList.contains("block"));
  });

  test("dispatches button-click event when clicked", async () => {
    const el = await fixture(html`<hub-button></hub-button>`);

    let eventFired = false;
    el.addEventListener("button-click", () => {
      eventFired = true;
    });

    const button = el.shadowRoot.querySelector("button");
    button.click();

    assert.isTrue(eventFired);
  });

  test("does not dispatch button-click event when disabled", async () => {
    const el = await fixture(html`<hub-button ?disabled=${true}></hub-button>`);

    let eventFired = false;
    el.addEventListener("button-click", () => {
      eventFired = true;
    });

    const button = el.shadowRoot.querySelector("button");
    button.click();

    assert.isFalse(eventFired);
  });
});
