def((FrameAsideMenu) => {

  class Toggle extends Jinkela {
    toggle() {
      document.body.classList.toggle('folded');
    }
    get template() {
      return `
        <h3 on-click="{toggle}"></h3>
      `;
    }
    get styleSheet() {
      return `
        :scope {
          cursor: pointer;
          &::after, &::before {
            content: '';
            display: inline-block;
            height: 10px;
            width: 4px;
            transition: opacity 200ms ease;
            opacity: .6;
          }
          &::before {
            border-left: 1px solid #fff;
            border-right: 1px solid #fff;
          }
          &::after {
            border-right: 1px solid #fff;
          }
          &:hover::after, &:hover::before {
            opacity: 1;
          }
          text-align: center;
          color: #ccc;
          background: #1f2d3d;
          padding: 12px;
          margin: 0;
          margin-bottom: 10px;
        }
      `;
    }
  }

  class Container extends Jinkela {
    get Menu() { return FrameAsideMenu; }
    get template() {
      return `
        <div>
          <jkl-menu ref="menu"></jkl-menu>
        </div>
      `;
    }
    get styleSheet() {
      return `
        :scope {
          flex: 1;
          overflow: auto;
          line-height: 44px;
        }
      `;
    }
    hashchange() {
      this.menu.update(depot.scheme && depot.scheme.title);
    }
    init() {
      addEventListener('hashchange', () => this.hashchange());
      let { session } = depot;
      let { schemes } = config;
      let { permissions = [] } = session;
      schemes.forEach(scheme => {
        if (/(?:^|\/):/.test(scheme.key)) return;
        if (scheme.hidden) return;
        if (!scheme.title) return;
        if (scheme.require && !scheme.require.some((dep => ~permissions.indexOf(dep)))) return;
        this.menu.add(scheme);
      });
      this.menu.update(depot.scheme && depot.scheme.title);
    }
  }

  class Aside extends Jinkela {
    get Toggle() { return Toggle; }
    get Container() { return Container; }
    get template() {
      return `
        <div>
          <jkl-toggle></jkl-toggle>
          <jkl-container></jkl-container>
        </div>
      `;
    }
    get styleSheet() {
      return `
        .folded :scope { width: 50px; }
        :scope {
          height: 100%;
          background: #324057;
          color: #fff;
          width: 230px;
          transition: width 200ms ease;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
      `;
    }
  }

  return Aside;

});
