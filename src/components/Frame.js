def((Output, FrameNav, FrameAside, FrameMain) => {

  class FrameLogo extends Jinkela {
    init() {
      let { logo = 'Duang' } = config;
      if (typeof logo === 'string') logo = { component: 'HTML', args: { html: logo } };
      new Output(logo).to(this);
      this.element.addEventListener('click', () => depot.update({}, true));
    }
    get styleSheet() {
      return `
        .folded :scope {
          width: 50px;
          > * {
            transform: scale(0);
          }
        }
        @media (max-width: 600px) { :scope { display: none; } }
        :scope {
          white-space: nowrap;
          overflow: hidden;
          transition: width 200ms ease;
          height: 50px;
          width: 230px;
          line-height: 50px;
          text-align: center;
          background: #1d8ce0;
          color: #fff;
          font-weight: 500;
          cursor: pointer;
          > * {
            display: inline-block;
            transition: transform 200ms ease;
          }
          &:hover {
            opacity: .95;
          }
        }
      `;
    }
  }

  class MenuEntry extends Jinkela {
    click(event) {
      event.xIsFromAside = true;
      this.element.dispatchEvent(new CustomEvent('menutoggleclick', { bubbles: true }));
    }
    get template() {
      return `
        <div>
          <svg viewBox="0 0 20 20" on-click="{click}" width="20" height="20" fill="#ffffff">
            <rect x="0" y="0" width="20" height="3" />
            <rect x="0" y="7" width="20" height="3" />
            <rect x="0" y="14" width="20" height="3" />
          </svg>
        </div>
      `;
    }
    get styleSheet() {
      return `
        @media (min-width: 600px) { :scope { display: none; } }
        :scope {
          height: 50px;
          position: absolute;
          z-index: 1;
          > svg {
            cursor: pointer;
            position: absolute;
            margin: auto;
            left: 1em;
            top: 0;
            bottom: 0;
          }
        }
      `;
    }
  }

  return class extends Jinkela {
    get FrameMain() { return FrameMain; }
    static get frameLogo() {
      let value = [ new FrameLogo(), new MenuEntry() ];
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
    menuToggleClick() {
      this.element.classList.toggle('show-as-slide');
    }
    click(event) {
      if (event.xIsFromAside) return;
      this.element.classList.remove('show-as-slide');
    }
    get template() {
      return `
        <div on-menutoggleclick="{menuToggleClick}" on-click="{click}">
          <section class="aside">
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
          --spacing: 1.5em;
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
        @media (max-width: 600px) {
          :scope > .aside {
            height: 50px;
            min-width: 50px;
            position: absolute;
            overflow: visible;
            z-index: 2;
            transition: height 200ms ease;
          }
          :scope.show-as-slide > .aside {
            height: 100%;
          }
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
  };

});
