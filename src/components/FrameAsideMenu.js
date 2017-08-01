def((Item) => {

  const UNIT_HEIGHT = 50;

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
          line-height: ${UNIT_HEIGHT}px;
          height: ${UNIT_HEIGHT}px;
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
      await Promise.all(tasks);
      where = JSON.stringify(where);
      params = JSON.stringify(params);
      if (href) return open(href, target);
      return depot.go({ args: { module, key, params, where }, target });
    }
  }

  class RowWithLeaf extends RowAction {
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
    get RowWithFolding() { return RowWithFolding; }
    get RowWithLeaf() { return RowWithLeaf; }
    get Menu() { return Menu; }

    get template() {
      return `
        <li>
          <jkl-row-with-folding title="{title}" active="{active}" on-click="{click}"></jkl-row-with-folding>
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

    get styleSheet() {
      return `
        .folded :scope > ul { 
          position: absolute;
          visibility: hidden;
        }
        :scope {
          > ul {
            background: rgba(255,255,255,.1);
          }
        }
      `;
    }
  }

  class Menu extends Jinkela {
    get Item() { return this.unit || RowWithCircle; }

    beforeParse() {
      Object.defineProperty(this, '$active', { value: true, configurable: true, writable: true });
      Object.defineProperty(this, 'map', { value: {}, configurable: true });
      Object.defineProperty(this, 'items', { value: [], configurable: true });
      Object.defineProperty(this, 'theoreticalHeight', { value: 0, configurable: true, writable: true });
    }

    init() {
      this.preventDoubleClickSelect();
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

    add(scheme) {
      let { map, key } = this;
      let [ , groupTitle, title ] = scheme.title.match(/^(?:(.*?)\s*-\s*)?(.*)$/);
      if (groupTitle) {
        if (!(groupTitle in map)) {
          this.theoreticalHeight += UNIT_HEIGHT;
          map[groupTitle] = new GroupItem({ parentMenu: this, title: groupTitle }).to(this);
        }
        map[groupTitle].add(Object.assign({}, scheme, { title }));
      } else {
        let item = new this.Item(scheme, { title, currentKey: key }).to(this);
        this.items.push(item);
        this.theoreticalHeight += UNIT_HEIGHT;
      }
      this.element.style.setProperty('--theoretical-height', this.theoreticalHeight + 'px');
    }

    update(title) {
      let [ , headTitle, tailTitle ] = String(title || '').match(/^(?:(.*?)\s*-\s*)?(.*)$/);
      this.updateItems(headTitle, tailTitle);
      // 如果动画正在执行则延迟到动画完成后再处理
      if (this.anime && this.anime.playState !== 'finished') {
        return this.anime.addEventListener('finish', () => this.updateSubGroups(headTitle, tailTitle));
      } else {
        this.updateSubGroups(headTitle, tailTitle);
      }
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
      // 下面这个动画效果也是有点神奇的，为了解决动画无法自适应高度的问题，对展开和收起执行不同的动画效果
      let options = { duration: 500, easing: 'ease', fill: 'forwards' };
      let startFrame = { maxHeight: this.element.offsetHeight + 'px' };
      if (value) {
        // 展开：动画从当前位置开始，但是目标帧高度只能通过通过计算得到，于是我们使用先前计算好的理论高度值
        // 这个理论高度值是当前菜单的所有子菜单的收缩时的高度
        // 并且需要在动画执行完成之后将这个理论高度设置为 auto，因为用户如果手动展开子菜单，那么实际高度会超出这个理论高度
        this.element.style.setProperty('--theoretical-height', this.theoreticalHeight + 'px');
        this.anime = this.element.animate([ startFrame, { maxHeight: 'var(--theoretical-height)' } ], options);
        this.anime.addEventListener('finish', () => this.element.style.setProperty('--theoretical-height', 'auto'));
      } else {
        // 收起：这时候比较简单，只要从当前位置收缩到 0 的位置即可
        this.anime = this.element.animate([ startFrame, { maxHeight: 0 } ], options);
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
        }
      `;
    }
  }

  return Menu;

});
