def((FrameLogo, FrameNav, FrameAside, FrameMain) => class extends Jinkela {
  get FrameMain() { return FrameMain; }
  static get frameLogo() {
    let value = new FrameLogo();
    Object.defineProperty(this, 'frameLogo', { value, configurable: true });
    return value;
  }
  static get frameNav() {
    let value = new FrameNav();
    Object.defineProperty(this, 'frameNav', { value, configurable: true });
    return value;
  }
  static get frameAside() {
    let value = new FrameAside();
    Object.defineProperty(this, 'frameAside', { value, configurable: true });
    return value;
  }
  get template() {
    return `
      <div>
        <section>
          <meta ref="frameLogo" />
          <meta ref="frameAside" />
        </section>
        <section style="flex: 1;">
          <meta ref="frameNav" />
          <jkl-frame-main ref="frameMain"></jkl-frame-main>
        </section>
      </div>
    `;
  }
  init() {
    this.frameLogo = this.constructor.frameLogo;
    this.frameNav = this.constructor.frameNav;
    this.frameAside = this.constructor.frameAside;
  }
  get main() { return this.$value; }
  set main(value) {
    if (this.$value) this.$value.element.remove();
    value.to(this.frameMain);
    this.$value = value;
  }
  get styleSheet() {
    return `
      html { height: 100%; }
      body {
        height: 100%;
        margin: 0;
        color: #5e6d82;
        font-size: 14px;
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
      }
      a {
        text-decoration: none;
        color: inherit;
      }
      select { outline: none; }
      input { outline: none; }
      :scope {
        display: flex;
        > section {
          display: flex;
          flex-direction: column;
        }
        height: 100%;
      }
    `;
  }
});
