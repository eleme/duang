def((Item) => {

  class Proto extends Item {
    init() {
      if (this.icon) this.element.style.setProperty('--icon', 'url("' + this.icon + '")');
    }
    set active(value) {
      this.element.classList[value ? 'add' : 'remove']('active');
    }
    get styleSheet() {
      return `
        :scope {
          position: relative;
          font-size: 14px;
          line-height: 50px;
          letter-spacing: 0.02em;
          border-left: 3px solid transparent;
          list-style: none;
          white-space: nowrap;
          transition: background 200ms ease, border-left-color 200ms ease;
          color: #c0ccda;
          cursor: pointer;
          &::before {
            content: '';
            display: inline-block;
            vertical-align: middle;
            margin-left: -3px;
            width: 50px;
            height: 50px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: 18px 18px;
            background-image: var(--icon);
          }
        }
      `;
    }
  }

  class RowWithTriangle extends Proto {
    get template() {
      return `
        <h6 title="{title}">{title}</h6>
      `;
    }
    get styleSheet() {
      return `
        :scope {
          margin: 0;
          position: relative;
          font-size: 16px;
          font-weight: normal;
          --icon: url('https://fuss10.elemecdn.com/1/bf/b0d65297795c53b29ac11f285aaa6svg.svg');
          &:hover {
            opacity: .6;
            background: #1f2d3d;
            border-left-color: #20a0ff;
          }
          &.active {
            background: #1f2d3d;
            opacity: 1;
            border-left-color: #20a0ff;
            &::before {
              transform: rotate(90deg);
            }
          }
        }
      `;
    }
  }

  class RowAction extends Proto {
    get template() {
      return `
        <li title="{title}">{text}</li>
      `;
    }
    init() {
      if (this.currentKey !== void 0 && this.currentKey === this.key) this.element.classList.add('active');
      this.text = this.title || this.key.replace(/([^/]{2})[^/]{3,}\//g, '$1../');
    }
    async onClick() {
      let { href, target, module = 'list', key, where = {}, params = {} } = this;
      let tasks = [];
      if (this['@where']) tasks.push(api([ this.key, this['@where'] ]).then(result => (where = result)));
      if (this['@params']) tasks.push(api([ this.key, this['@params'] ]).then(result => (params = result)));
      await tasks;
      where = JSON.stringify(where);
      params = JSON.stringify(params);
      if (href) return open(href, target);
      return depot.go({ args: { module, key, params, where }, target });
    }
  }

  class RowWithDot extends RowAction {
    get styleSheet() {
      return `
        :scope {
          --icon: url('https://fuss10.elemecdn.com/9/12/017bdc919bb36dac8bb97014121absvg.svg');
          opacity: .8;
          &:hover {
            opacity: 1;
            color: #fff;
          }
          &.active {
            opacity: 1;
            color: #fff;
          }
        }
      `;
    }
  }

  class RowWithCircle extends RowAction {
    get styleSheet() {
      return `
        :scope {
          --icon: url('https://fuss10.elemecdn.com/1/8e/1ea628209b8e1905b9ca3ffd8e57bsvg.svg');
          &:hover {
            opacity: .6;
            background: #1f2d3d;
            border-left-color: #20a0ff;
          }
          &.active {
            background: #1f2d3d;
            opacity: 1;
            border-left-color: #20a0ff;
          }
        }
      `;
    }
  }

  class GroupItem extends Jinkela {
    get RowWithTriangle() { return RowWithTriangle; }
    get RowWithDot() { return RowWithDot; }
    get Menu() { return Menu; }
    get template() {
      return `
        <li data-active="{active}">
          <jkl-row-with-triangle title="{title}" active="{active}" on-click="{click}"></jkl-row-with-triangle>
          <jkl-menu ref="menu" itemproto="{RowWithDot}"></jkl-menu>
        </li>
      `;
    }
    add(...args) { return this.menu.add(...args); }
    update(...args) { return this.menu.update(...args); }
    click() {
      this.active = !this.active;
    }
    get styleSheet() {
      return `
        .folded :scope > ul { 
          position: absolute;
          visibility: hidden;
        }
        :scope {
          > ul {
            background: rgba(255,255,255,.1);
            line-height: 30px;
            max-height: 0;
            transition: max-height 500ms ease;
            overflow: hidden;
          }
          &[data-active=true] > ul {
            max-height: 2000px;
          }
        }
      `;
    }
  }

  class Menu extends Jinkela {
    get Item() { return this.itemproto || RowWithCircle; }
    get map() {
      let value = {};
      Object.defineProperty(this, 'map', { value, configurable: true });
      return value;
    }
    get items() {
      let value = [];
      Object.defineProperty(this, 'items', { value, configurable: true });
      return value;
    }
    clear() {
      while (this.element.firstChild) this.element.firstChild.remove();
    }
    add(scheme) {
      let { map, key } = this;
      let [ , groupTitle, title ] = scheme.title.match(/^(?:(.*?)\s*-\s*)?(.*)$/);
      if (groupTitle) {
        if (!(groupTitle in map)) map[groupTitle] = new GroupItem({ title: groupTitle }).to(this);
        map[groupTitle].add(Object.assign({}, scheme, { title }));
      } else {
        let item = new this.Item(scheme, { title, currentKey: key }).to(this);
        this.items.push(item);
      }
    }
    update(title) {
      let [ , headTitle, tailTitle ] = String(title || '').match(/^(?:(.*?)\s*-\s*)?(.*)$/);
      Object.keys(this.map).forEach(key => {
        this.map[key].update(key === headTitle && tailTitle);
        this.map[key].active = key === headTitle;
      });
      this.items.forEach(item => {
        item.active = !headTitle && item.title === tailTitle;
      });
    }
    get tagName() { return 'ul'; }
    get styleSheet() {
      return `
        :scope {
          list-style: none;
          margin: 0;
          padding: 0;
        }
      `;
    }
  }

  return Menu;

});
