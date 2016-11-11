def((FrameHead, FrameBody) => class extends Jinkela {
  static get header() {
    let value = new FrameHead();
    Object.defineProperty(this, 'header', { value, configurable: true });
    return value;
  }
  init() {
    this.constructor.header.to(this);
    let { Main } = this;
    new FrameBody({ Main }).to(this);
  }
  get styleSheet() {
    return `
      body {
        margin: 0;
        font-size: 14px;
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
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
    `;
  }
});
