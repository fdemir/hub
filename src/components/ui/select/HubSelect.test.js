import "./HubSelect.js";
import { expect } from "@open-wc/testing";
import { fixture, html, oneEvent } from "@open-wc/testing-helpers";

describe("HubSelect", () => {
  let element;
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  beforeEach(async () => {
    element = await fixture(html`
      <hub-select .options=${options}></hub-select>
    `);
  });

  it("renders with default properties", () => {
    expect(element.name).to.equal("");
    expect(element.value).to.equal("");
    expect(element.open).to.be.false;
    expect(element.block).to.be.false;
    expect(element.options).to.deep.equal(options);
  });

  it("displays the placeholder text when no value is selected", () => {
    const selectedText = element.shadowRoot.querySelector(".select-selected");
    expect(selectedText.textContent.trim()).to.include("Select an option");
  });

  it("displays the selected option label when a value is selected", async () => {
    element.value = "option2";
    await element.updateComplete;
    const selectedText = element.shadowRoot.querySelector(".select-selected");
    expect(selectedText.textContent.trim()).to.include("Option 2");
  });

  it("toggles dropdown when clicked", async () => {
    const selectElement = element.shadowRoot.querySelector(".select-selected");
    expect(element.open).to.be.false;

    selectElement.click();
    await element.updateComplete;
    expect(element.open).to.be.true;

    selectElement.click();
    await element.updateComplete;
    expect(element.open).to.be.false;
  });

  it("selects an option when clicked", async () => {
    // Open the dropdown
    element.shadowRoot.querySelector(".select-selected").click();
    await element.updateComplete;

    // Click on an option
    const option = element.shadowRoot.querySelectorAll(".select-item")[2]; // Option 2

    // Setup listener for the value-changed event
    const valueChangedPromise = oneEvent(element, "value-changed");

    // Click the option
    option.click();

    // Wait for the event
    const { detail } = await valueChangedPromise;

    // Check that the value was updated
    expect(element.value).to.equal("option2");
    expect(detail.value).to.equal("option2");
    expect(element.open).to.be.false;
  });

  it("applies block class when block property is true", async () => {
    element.block = true;
    await element.updateComplete;
    const selectContainer = element.shadowRoot.querySelector(".custom-select");
    expect(selectContainer.classList.contains("block")).to.be.true;
  });

  it("sets hidden input value", async () => {
    element.name = "test-select";
    element.value = "option3";
    await element.updateComplete;

    const hiddenInput = element.shadowRoot.querySelector(
      'input[type="hidden"]'
    );
    expect(hiddenInput.name).to.equal("test-select");
    expect(hiddenInput.value).to.equal("option3");
  });
});
