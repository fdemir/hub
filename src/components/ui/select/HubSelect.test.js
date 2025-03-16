import "./HubSelect.js";
import { expect } from "@open-wc/testing";
import { fixture, html, oneEvent } from "@open-wc/testing-helpers";

suite("HubSelect", () => {
  let element;
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  setup(async () => {
    element = await fixture(html`
      <hub-select .options=${options}></hub-select>
    `);
  });

  test("renders with default properties", () => {
    expect(element.name).to.equal("");
    expect(element.value).to.equal("");
    expect(element.open).to.be.false;
    expect(element.block).to.be.false;
    expect(element.options).to.deep.equal(options);
  });

  test("displays the placeholder text when no value is selected", () => {
    const selectedText = element.shadowRoot.querySelector(".select-selected");
    expect(selectedText.textContent.trim()).to.include("Select an option");
  });

  test("displays the selected option label when a value is selected", async () => {
    element.value = "option2";
    await element.updateComplete;
    const selectedText = element.shadowRoot.querySelector(".select-selected");
    expect(selectedText.textContent.trim()).to.include("Option 2");
  });

  test("toggles dropdown when clicked", async () => {
    const selectElement = element.shadowRoot.querySelector(".select-selected");
    expect(element.open).to.be.false;

    selectElement.click();
    await element.updateComplete;
    expect(element.open).to.be.true;

    selectElement.click();
    await element.updateComplete;
    expect(element.open).to.be.false;
  });

  test("selects an option when clicked", async () => {
    element.shadowRoot.querySelector(".select-selected").click();
    await element.updateComplete;

    const option = element.shadowRoot.querySelectorAll(".select-item")[1]; // Option 1

    const valueChangedPromise = oneEvent(element, "value-changed");

    option.click();

    const { detail } = await valueChangedPromise;

    expect(element.value).to.equal("option1");
    expect(detail.value).to.equal("option1");
    expect(element.open).to.be.false;
  });

  test("applies block class when block property is true", async () => {
    element.block = true;
    await element.updateComplete;
    const selectContainer = element.shadowRoot.querySelector(".custom-select");
    expect(selectContainer.classList.contains("block")).to.be.true;
  });

  test("sets hidden input value", async () => {
    element.name = "test-select";
    element.value = "option3";
    await element.updateComplete;

    const hiddenInput = element.shadowRoot.querySelector(
      'input[type="hidden"]'
    );
    expect(hiddenInput.name).to.equal("test-select");
    expect(hiddenInput.value).to.equal("option3");
  });

  test("closes dropdown when clicking outside", async () => {
    element.shadowRoot.querySelector(".select-selected").click();
    await element.updateComplete;
    expect(element.open).to.be.true;

    const outsideClickEvent = new MouseEvent("click", {
      bubbles: true,
      composed: true,
    });
    document.body.dispatchEvent(outsideClickEvent);

    await element.updateComplete;
    expect(element.open).to.be.false;
  });

  test("handles keyboard focus correctly", async () => {
    const selectElement = element.shadowRoot.querySelector(".select-selected");
    expect(selectElement.getAttribute("role")).to.equal("combobox");
    expect(selectElement.getAttribute("aria-expanded")).to.equal("false");

    selectElement.click();
    await element.updateComplete;

    expect(selectElement.getAttribute("aria-expanded")).to.equal("true");

    const listbox = element.shadowRoot.querySelector(".select-items");
    expect(listbox.getAttribute("role")).to.equal("listbox");

    const options = element.shadowRoot.querySelectorAll(".select-item");
    options.forEach((option) => {
      expect(option.getAttribute("role")).to.equal("option");
    });
  });
});
