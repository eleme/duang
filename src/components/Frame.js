def((FrameHead, FrameBody) => class extends Jinkela {
  static get header() {
    let value = new FrameHead();
    Object.defineProperty(this, 'header', { value, configurable: true });
    return value;
  }
  init() {
    this.constructor.header.renderTo(this);
    new FrameBody({ parent: this }).renderTo(this);
  }
  get Main() {
    return class extends Jinkela {
      init() {
        this.element.textContent = 'main';
      }
    };
  }
  get styleSheet() {
    return `
      html, body {
        margin: 0;
        font-size: 13px;
        font-family: Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;
      }
      a {
        text-decoration: none;
        color: inherit;
      }
      select {
        outline: none;
      }
      input {
        outline: none;
      }
      :scope {
        display: flex;
        flex-direction: column;
        height: 100vh;
      }
    `;
  }
});
