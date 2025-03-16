import { HubNavbar } from "./HubNavbar.js";
import { fixture, html, assert } from "@open-wc/testing";

suite("HubNavbar", () => {
  test("renders with default properties", async () => {
    const el = await fixture(html`<hub-navbar></hub-navbar>`);

    assert.equal(el.title, "ING");
    assert.isFalse(el._mobileMenuOpen);
    assert.isArray(el.links);
    assert.equal(el.links.length, 2);
  });

  test("renders title correctly", async () => {
    const el = await fixture(
      html`<hub-navbar title="Test Title"></hub-navbar>`
    );

    assert.equal(el.title, "Test Title");
    const titleElement = el.shadowRoot.querySelector(".title");
    assert.equal(titleElement.textContent, "Test Title");
  });

  test("renders navigation links correctly", async () => {
    const el = await fixture(html`<hub-navbar></hub-navbar>`);

    const links = el.shadowRoot.querySelectorAll(".end a");
    assert.equal(links.length, 2);

    assert.equal(links[0].getAttribute("href"), "/");
    assert.include(links[0].textContent, "Employee");

    assert.equal(links[1].getAttribute("href"), "/add");
    assert.include(links[1].textContent, "Add New");
  });

  test("has correct logo and home link", async () => {
    const el = await fixture(html`<hub-navbar></hub-navbar>`);

    const homeLink = el.shadowRoot.querySelector(".home");
    assert.equal(homeLink.getAttribute("href"), "/");

    const logo = homeLink.querySelector("img");
    assert.equal(logo.getAttribute("src"), "/logo.svg");
    assert.equal(logo.getAttribute("alt"), "logo");
  });
});
