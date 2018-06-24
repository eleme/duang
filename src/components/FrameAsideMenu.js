def((Item) => {

  const svg = code => {
    let svg = encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">${code}</svg>`);
    return `url('data:image/svg+xml,${svg}')`;
  };

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
          font-size: 16px;
          --unit-height: 50px;
          line-height: var(--unit-height);
          height: var(--unit-height);
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
            vertical-align: top;
            margin-left: -3px;
            width: 50px;
            height: 50px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: 18px 18px;
            background-image: var(--icon);
          }
        }
        ul :scope {
          --icon: ${svg('<circle cx="16" cy="16" r="14" stroke="#c0ccda" stroke-width="4" fill="none" />')};
        }
        ul ul :scope {
          --icon: ${svg('<circle cx="16" cy="16" r="10" stroke="#c0ccda" stroke-width="4" fill="none" />')};
          font-size: 14px;
        }
        ul ul ul :scope {
          --icon: ${svg('<circle cx="16" cy="16" r="10" stroke="none" stroke-width="4" fill="#c0ccda" />')};
        }
      `;
    }
  }

  class RowWithFolding extends Proto {
    get template() {
      return `
        <h6 title="{title}">{title}</h6>
      `;
    }
    set folded(value) { this.active = !value; }
    get folded() { return !this.active; }
    get styleSheet() {
      return `
        :scope {
          margin: 0;
          position: relative;
          font-weight: normal;
          &:hover {
            opacity: .6;
            background: #1f2d3d;
            border-left-color: #20a0ff;
          }
          &.active {
            background: #1f2d3d;
            opacity: 1;
            border-left-color: #20a0ff;
            &::after { transform: rotate(90deg); }
          }
          &::after {
            content: '';
            position: absolute;
            right: 0;
            top: 0;
            width: 50px;
            height: 50px;
            visibility: visible;
            opacity: 1;
            background-repeat: no-repeat;
            background-position: center;
            background-size: 18px 18px;
            background-image: ${svg('<polyline points="9,3 23,16 9,29" stroke="#c0ccda" stroke-width="6" stroke-linejoin="round" stroke-linecap="round" fill="none" />')};
            transition: transform 200ms ease, visibility 200ms ease, opacity 200ms ease;
          }
        }
        .folded :scope::after {
          visibility: hidden;
          opacity: 0;
        }
        ul ul :scope.active {
          background: hsl(211,33%,23%);
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

    onClick(event) {
      let { href, target, module = 'list', key, where = {}, params = {} } = this;
      let tasks = [];
      if (this['@where']) tasks.push(api([ this.key, this['@where'] ]).then(result => (where = result)));
      if (this['@params']) tasks.push(api([ this.key, this['@params'] ]).then(result => (params = result)));
      return Promise.all(tasks).then(() => {
        where = JSON.stringify(where);
        params = JSON.stringify(params);
        if (event.metaKey) target = '_blank';
        if (href) return open(href, target);
        return depot.go({ args: { module, key, params, where }, target });
      });
    }
  }

  class RowWithLeaf extends RowAction {
    get styleSheet() {
      return `
        :scope {
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

  class RowWithTop extends RowAction {
    get styleSheet() {
      return `
        :scope {
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
    get RowWithFolding() { return RowWithFolding; }
    get RowWithLeaf() { return RowWithLeaf; }
    get Menu() { return Menu; }

    get template() {
      return `
        <li>
          <jkl-row-with-folding ref="row" title="{title}" active="{active}" on-click="{click}"></jkl-row-with-folding>
          <jkl-menu ref="menu" unit="{RowWithLeaf}" active="{active}"></jkl-menu>
        </li>
      `;
    }

    beforeParse() {
      this.active = true;
    }

    add(...args) { return this.menu.add(...args); }
    update(...args) { return this.menu.update(...args); }

    click() {
      let { active } = this;
      this.parentMenu.update(); // 父菜单的所有子选项（包括当前）取消 active 状态
      this.active = !active;
    }

    updateScheme(scheme) {
      if (scheme.icon) this.row.element.style.setProperty('--icon', 'url("' + scheme.icon + '")');
    }

    get styleSheet() {
      return `
        :scope {
          > ul {
            background: rgba(255,255,255,.1);
          }
        }
      `;
    }
  }

  class Menu extends Jinkela {
    get Item() { return this.unit || RowWithTop; }

    beforeParse() {
      Object.defineProperty(this, '$active', { value: true, configurable: true, writable: true });
      Object.defineProperty(this, 'map', { value: {}, configurable: true });
      Object.defineProperty(this, 'items', { value: [], configurable: true });
    }

    init() {
      this.preventDoubleClickSelect();
      this.element.addEventListener('transitionend', event => {
        // 忽略掉冒泡上来的该事件
        if (event.target !== this.element) return;
        // 如果动画完成后是 active 状态就删除掉 height（默认 auto），因为子菜单需要撑开容器
        if (this.active) this.element.style.removeProperty('height');
      });
    }

    preventDoubleClickSelect() {
      let timer = null;
      this.element.addEventListener('click', () => {
        if (!getSelection().isCollapsed) return; // 如果已经有选区就放行，否则会导致已经选中的选区被取消
        this.element.style.userSelect = 'none'; // 临时阻止选中
        clearTimeout(timer); // 取消旧的计时器
        timer = setTimeout(() => this.element.style.removeProperty('user-select'), 500); // 500ms 后恢复
      }, true);
    }

    group(params) {
      params = Object.assign({ parentMenu: this }, params);
      if (params.title in this.map) {
        this.map[params.title].updateScheme(params);
      } else {
        this.map[params.title] = new GroupItem(params).to(this);
      }
      return this.map[params.title];
    }

    add(scheme) {
      let { key } = this;
      let [ , groupTitle, title ] = scheme.title.match(/^(?:(.*?)\s*-\s*)?(.*)$/);
      if (groupTitle) {
        this.group({ title: groupTitle }).add(Object.assign({}, scheme, { title }));
      } else if (!scheme.key && !scheme.href) {
        this.group(Object.assign({}, scheme, { title }));
      } else {
        let item = new this.Item(scheme, { title, currentKey: key }).to(this);
        this.items.push(item);
      }
    }

    update(title) {
      let [ , headTitle, tailTitle ] = String(title || '').match(/^(?:(.*?)\s*-\s*)?(.*)$/);
      this.updateItems(headTitle, tailTitle);
      this.updateSubGroups(headTitle, tailTitle);
    }

    updateSubGroups(headTitle, tailTitle) {
      for (let [ key, group ] of Object.entries(this.map)) {
        group.active = key === headTitle;
        group.update(key === headTitle && tailTitle);
      }
    }

    updateItems(headTitle, tailTitle) {
      for (let item of this.items) item.active = !headTitle && item.title === tailTitle;
    }

    set active(value) {
      value = !!value;
      if (this.$active === value) return;
      this.$active = value;
      if (value) {
        this.element.style.height = this.element.scrollHeight;
      } else {
        this.element.style.height = this.element.scrollHeight;
        void getComputedStyle(this.element).height; // 强制 CSS 引擎计算掉 height
        this.element.style.height = 0;
      }
    }

    get active() { return this.$active; }

    get tagName() { return 'ul'; }

    get styleSheet() {
      return `
        :scope {
          list-style: none;
          margin: 0;
          padding: 0;
          overflow: hidden;
          transition: height 300ms ease-in-out;
        }
      `;
    }
  }

  return Menu;

});
