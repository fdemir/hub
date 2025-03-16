import { HubPagination } from "./HubPagination.js";
import { fixture, html, assert } from "@open-wc/testing";

suite("HubPagination", () => {
  test("renders with default properties", async () => {
    const el = await fixture(html`<hub-pagination></hub-pagination>`);

    assert.equal(el.currentPage, 1);
    assert.equal(el.totalPages, 1);
    assert.equal(el.visiblePages, 5);
    assert.isTrue(el.showPrevNext);
    assert.isFalse(el.disabled);
  });

  test("renders pagination buttons correctly", async () => {
    const el = await fixture(html`
      <hub-pagination .totalPages=${10} .currentPage=${5}></hub-pagination>
    `);

    const pageButtons = el.shadowRoot.querySelectorAll(".page-number");
    assert.equal(pageButtons.length, 6);
    assert.equal(pageButtons[0].textContent.trim(), "3");
    assert.equal(pageButtons[2].textContent.trim(), "5");
    assert.equal(pageButtons[4].textContent.trim(), "7");

    const activeButton = el.shadowRoot.querySelector(".page-number.active");
    assert.equal(activeButton.textContent.trim(), "5");
  });

  test("renders prev/next buttons when showPrevNext is true", async () => {
    const el = await fixture(html`
      <hub-pagination .totalPages=${5} .showPrevNext=${true}></hub-pagination>
    `);

    const navButtons = el.shadowRoot.querySelectorAll(
      ".page-button:not(.page-number)"
    );
    assert.equal(navButtons.length, 2);
  });

  test("does not render prev/next buttons when showPrevNext is false", async () => {
    const el = await fixture(html`
      <hub-pagination .totalPages=${5} .showPrevNext=${false}></hub-pagination>
    `);

    const navButtons = el.shadowRoot.querySelectorAll(
      ".page-button:not(.page-number)"
    );
    assert.equal(navButtons.length, 0);
  });

  test("disables prev button on first page", async () => {
    const el = await fixture(html`
      <hub-pagination .totalPages=${5} .currentPage=${1}></hub-pagination>
    `);

    const prevButton = el.shadowRoot.querySelector(
      ".page-button:not(.page-number)"
    );
    assert.isTrue(prevButton.disabled);
  });

  test("disables next button on last page", async () => {
    const el = await fixture(html`
      <hub-pagination .totalPages=${5} .currentPage=${5}></hub-pagination>
    `);

    const buttons = el.shadowRoot.querySelectorAll(
      ".page-button:not(.page-number)"
    );
    const nextButton = buttons[buttons.length - 1];
    assert.isTrue(nextButton.disabled);
  });

  test("shows ellipsis when needed", async () => {
    const el = await fixture(html`
      <hub-pagination
        .totalPages=${10}
        .currentPage=${5}
        .visiblePages=${3}
      ></hub-pagination>
    `);

    const ellipsis = el.shadowRoot.querySelector(".ellipsis");
    assert.exists(ellipsis);
  });

  test("dispatches page-change event when page button is clicked", async () => {
    const el = await fixture(html`
      <hub-pagination .totalPages=${5} .currentPage=${1}></hub-pagination>
    `);

    let eventFired = false;
    let eventDetail = null;

    el.addEventListener("page-change", (e) => {
      eventFired = true;
      eventDetail = e.detail;
    });

    const pageButtons = el.shadowRoot.querySelectorAll(".page-number");
    const page2Button = pageButtons[1]; // Second page button

    page2Button.click();

    assert.isTrue(eventFired);
    assert.deepEqual(eventDetail, { page: 2 });
    assert.equal(el.currentPage, 2);
  });

  test("handles disabled state correctly", async () => {
    const el = await fixture(html`
      <hub-pagination .totalPages=${5} .disabled=${true}></hub-pagination>
    `);

    const buttons = el.shadowRoot.querySelectorAll(".page-button");
    buttons.forEach((button) => {
      assert.isTrue(button.disabled);
    });

    let eventFired = false;
    el.addEventListener("page-change", () => {
      eventFired = true;
    });

    buttons[2].click(); // Try clicking a page button
    assert.isFalse(eventFired, "Event should not fire when disabled");
  });
});
