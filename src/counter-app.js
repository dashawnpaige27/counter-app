import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class counterApp extends DDDSuper(LitElement) {

  static get tag() {
    return "counter-app";
  }

  constructor() {
    super();
    this.title = "";
    this.counter = 16;
    this.min = 10;
    this.max = 25;
  }

  static get properties() {
    return {
      title: { type: String },
      counter: { type: Number },
      min: { type: Number },
      max: { type: Number }
    };
  }

  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
        font-size: var(--counter-app-font-size, var(--ddd-font-size-s));
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      div {
        padding: 0;
        margin: 0;
        font-size: 25px;
      }
      button {
        padding: 0;
        margin: 10px;
        font-size: 16px;
        cursor: pointer;
        border: 2px;
        border-radius: 4px;
        background-color: white;
      }

      .button-space {
        display: block;
        margin: auto;

      }

      button:hover {
        color: white;
      }

      .min-reached { 
        color: red;
      }

      .max-reached {
        color: blue;
      }

      .num-reached { 
        color: green;
      }

      .one-reached {
        color: purple;
      }

    `];
  }


  updated(changedProperties) {
    if (changedProperties.has('counter')) {
      if (this.counter === 21) {
        this.makeItRain();
      }
    }
  }


increment(e) {
  if (this.counter < this.max) {
    this.counter++;
  }
}


decrement(e) {
  if (this.counter > this.min) {
   this.counter--;
  }
}

makeItRain() {
  import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(() => {
    setTimeout(() => {
      this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
       }, 0);
  
    });
  }

  render() {
    return html`
<div class="wrapper">
  <confetti-container id="confetti"></confetti-container>
  <div class="${this.ruleSet()}">${this.counter}</div>
  <div class="button-space">
  <button>@click="${this.increment}"
    ?disabled="${this.max === this.counter}">+</button>
  
  <button>@click="${this.decrement}"
    ?disabled="${this.min === this.counter}">-</button>
  </div>
  <slot></slot>
</div>`;
  }


  ruleSet() {
    if (this.counter === this.max) return 'max-reached';
    if (this.counter === this.min) return 'min-reached';
    if (this.counter === 18) return 'num-reached';
    if (this.counter === 21) return 'one-reached';
    return '';
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(counterApp.tag, counterApp);