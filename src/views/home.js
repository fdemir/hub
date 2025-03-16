import { LitElement, html } from "lit";

export class Home extends LitElement {
  render() {
    return html` <hub-employee-list> </hub-employee-list> `;
  }
}

customElements.define("hub-home-view", Home);
