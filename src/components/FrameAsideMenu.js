def((Item) => {

  class Proto extends Item {
    set active(value) {
      this.element.classList[value ? 'add' : 'remove']('active');
    }
    get styleSheet() {
      return `
        :scope {
          font-size: 12px;
          letter-spacing: 0.02em;
          border-left: 3px solid transparent;
          list-style: none;
          white-space: nowrap;
          transition: background 200ms ease, border-left-color 200ms ease;
          color: #c0ccda;
          cursor: pointer;
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
          &::before {
            content: '';
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 5px 0 6px 9px;
            border-top-color: transparent;
            border-right-color: transparent;
            border-bottom-color: transparent;
            display: inline-block;
            vertical-align: middle;
            margin: 0 10px 0 13px;
          }
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
      if (this.currentKey === this.key) this.element.classList.add('active');
      this.text = this.title || this.key.replace(/([^/]{2})[^/]{3,}\//g, '$1../');
    }
    onClick() {
      let { module = 'list', key, where = {}, params = {} } = this;
      let tasks = [];
      if (this['@where']) tasks.push(api([ this.key, this['@where'] ]).then(result => where = result));
      if (this['@params']) tasks.push(api([ this.key, this['@params'] ]).then(result => params = result));
      const done = () => {
        where = JSON.stringify(where);
        params = JSON.stringify(params);
        location.hash = '#' + new UParams({ module, key, where, params });
      };
      tasks.length ? Promise.all(tasks).then(done) : done();
    }
  }

  class RowWithDot extends RowAction {
    get styleSheet() {
      return `
        :scope {
          &::before {
            content: '';
            width: 0;
            height: 0;
            border: 5px solid;
            border-radius: 100%;
            display: inline-block;
            vertical-align: middle;
            margin: 1px 11px;
          }
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
          &::before {
            content: '';
            width: 12px;
            height: 12px;
            box-sizing: border-box;
            border: 2px solid;
            border-radius: 100%;
            display: inline-block;
            vertical-align: middle;
            margin: 0 10px;
          }
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
            max-height: 1000px;
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
    get template() {
      return `
        <ul>
        </ul>
      `;
    }
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
