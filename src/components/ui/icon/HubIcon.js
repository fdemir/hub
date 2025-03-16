import { LitElement, html, css } from "lit";
import { iconList } from "./list";

class HubIcon extends LitElement {
  static properties = {
    name: { type: String },
    width: { type: String },
    height: { type: String },
  };

  constructor() {
    super();
  }

  render() {
    if (iconList[this.name]) {
      return iconList[this.name](this.width, this.height);
    }

    return null;
  }

  static styles = css`
    :host {
      display: inline-block;
    }
  `;
}

customElements.define("hub-icon", HubIcon);
