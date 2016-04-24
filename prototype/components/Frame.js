def((FrameHead, FrameBody) => class extends Jinkela {
  init() {
    new FrameHead({ parent: this }).renderTo(this);
    new FrameBody({ parent: this }).renderTo(this);
  }
  get Aside() {
    return class extends Jinkela {
      init() {
        this.element.textContent = 'aside';
      }
    };
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
      html, body { margin: 0; }
      :scope {
        display: flex;
        flex-direction: column;
        height: 100vh;
      }
    `;
  }
});
