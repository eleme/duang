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
    if (!depot.config.noFrame) {
      this.frameLogo = this.constructor.frameLogo;
      this.frameNav = this.constructor.frameNav;
      this.frameAside = this.constructor.frameAside;
    }
  }
  get main() { return this.$value; }
  set main(value) {
    if (this.$value) this.$value.element.remove();
    value.to(this.frameMain);
    this.$value = value;
  }
  get styleSheet() {
    let value = `
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
          overflow: hidden;
          flex-direction: column;
        }
        height: 100%;
      }
    `;
    if (/\bWindows\b/i.test(navigator.userAgent)) {
      value += `
        ::selection { background-color: rgba(0,0,0,.2); }
        ::-moz-selection { background-color: rgba(0,0,0,.2); }
        ::-webkit-scrollbar { width:10px; height: 10px; background: rgba(0,0,0,.2); }
        ::-webkit-scrollbar-thumb { background: rgba(0,0,0,.5); border-radius: 5px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,.8); }
        ::-webkit-scrollbar-corner { background: rgba(0,0,0,.2); }
        ::-webkit-color-swatch { border:none; }
      `;
    }
    return value;
  }
});
