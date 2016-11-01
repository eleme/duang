def((FrameHead, FrameBody, FrameAsideMenu) => class extends Jinkela {
  init() {
    new FrameHead({ parent: this }).renderTo(this);
    new FrameBody({ parent: this }).renderTo(this);
  }
  get Aside() {
    return class extends Jinkela {
      init() {
        new FrameAsideMenu().renderTo(this);
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
