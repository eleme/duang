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
          margin-top: 10px;
          line-height: 44px;
        }
      `;
    }
    hashchange() {
      this.menu.update(depot.scheme && depot.scheme.title);
    }
    init() {
      addEventListener('hashchange', () => this.hashchange());
      let { session, schemes } = depot;
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
    beforeParse() {
      this.noToggle = !depot.config.noToggle;
    }
    get Toggle() { return Toggle; }
    get Container() { return Container; }
    click(event) {
      event.xIsFromAside = true;
    }
    get template() {
      return `
        <div on-click="{click}">
          <jkl-toggle if="{noToggle}"></jkl-toggle>
          <jkl-container></jkl-container>
        </div>
      `;
    }
    get styleSheet() {
      return `
        .folded :scope { width: 50px; }
        :scope {
          background: #324057;
          color: #fff;
          width: 230px;
          transition: width 200ms ease;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        @media (max-width: 600px) {
          .show-as-slide :scope { margin-left: 0; }
          :scope {
            transition: margin-left 200ms ease;
            margin-left: -250px;
            padding-top: 50px;
            height: 100%;
            box-shadow: 0 0 12px rgba(0,0,0,0.7);
          }
        }
      `;
    }
  }

  return Aside;

});
