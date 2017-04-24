def(() => {
  class Groups {
    constructor(raw, defaultGroupName) {
      const list = raw instanceof Array ? raw : Object.keys(raw).map(key => raw[key]);
      this.groups = {};
      this.defaultGroupName = defaultGroupName;
      list.forEach(this.build.bind(this));
      return this.groups;
    }
    build(city) {
      let { groupName } = city;
      groupName = groupName || this.defaultGroupName;
      Array.isArray(groupName)
        ? groupName.forEach(subGroupName => this.update(subGroupName, city))
        : this.update(groupName, city);
    }
    update(groupName, city) {
      let { name, id, alphabet } = city;
      alphabet = alphabet || '';
      this.groups[groupName] = this.groups[groupName] || {};
      const group = this.groups[groupName];
      if (!(alphabet in group)) group[alphabet] = [];
      group[alphabet].push({ id, name });
    }
  }

  class CityListItem extends Jinkela {
    init() {
      if (!this.href) this.href = 'Javascript:;';
      if ('data-key' in this) {
        this.element.setAttribute('data-key', this['data-key']);
      }
    }
    get styleSheet() {
      return `
        :scope {
          color: inherit;
          text-decoration: none;
        }
      `;
    }
    get template() {
      return '<li class="{className}"><a href="{href}" on-click="{onClick}" title="{title}">{title}</a></li>';
    }
  }

  class CitySelectorCollection extends Jinkela {
    init() {
      this.group.forEach(item => new CityListItem(item).to(this));
    }
    get tagName() { return 'ul'; }
    get styleSheet() {
      return `
        :scope {
          display: none;
          padding: 0;
          margin: 0;
          &.active { display: block; }
          > li {
            display: inline-block;
            margin: 15px 10px 0 10px;
          }
        }
      `;
    }
  }

  class CitySelectorSameInitialCityList extends Jinkela {
    init() {
      this.list.forEach(item => new CityListItem({
        title: item.name,
        'data-key': item.id
      }).to(this));
    }
    get tagName() { return 'ul'; }
    get styleSheet() {
      return `
        :scope {
          display: inline-block;
          padding: 0;
          margin: 0;
          > li {
            display: inline-block;
            margin: 0 5px;
            > a {
              color: inherit;
              display: inline-block;
              margin-right: 5px;
            }
          }
        }
      `;
    }
  }

  class CitySelectorAlphabetItem extends Jinkela {
    init() {
      let { char, list } = this;
      this.element.setAttribute('char', char);
      new CitySelectorSameInitialCityList({ list }).to(this);
    }
    get tagName() { return 'li'; }
    get styleSheet() {
      return `
        :scope {
          list-style: none;
          margin-top: 16px;
          &:before {
            display: inline-block;
            content: attr(char);
            width: 36px;
            font-family: Arial;
            color: #26a2ff;
          }
        }
      `;
    }
  }

  class CitySelectorAlphabet extends Jinkela {
    init() {
      Object.keys(this.group).forEach(char => {
        new CitySelectorAlphabetItem({ char, list: this.group[char] }).to(this);
      });
    }
    get tagName() { return 'ol'; }
    get styleSheet() {
      return `
        :scope {
          display: none;
          padding: 0;
          margin: 0;
          &.active { display: block; }
        }
      `;
    }
  }

  class CitySelectorTab extends Jinkela {
    init() { this.element.textContent = this.name; }
    onClick() {
      let active;
      active = document.evaluate('*[@class="active"]', this.element.parentNode, null, null, null).iterateNext();
      if (active) active.className = '';
      this.element.className = 'active';
      active = document.evaluate('*[@class="active"]', this.target.element.parentNode, null, null, null).iterateNext();
      if (active) active.className = '';
      this.target.element.className = 'active';
    }
    get template() { return '<a href="JavaScript:;" on-click="{onClick}"></a>'; }
    get styleSheet() {
      return `
        :scope {
          display: inline-block;
          margin-right: 5px;
          line-height: 36px;
          padding: 0 20px;
          text-align: center;
          text-decoration: none;
          color: inherit;
          &.active {
            border-bottom: 2px solid #1ca1fc;
            margin-bottom: -1px;
          }
        }
      `;
    }
  }

  return class CitySelector extends Jinkela {
    init() {
      this.defaultText = this.defaultText || '请选择城市';
      this.text = this.defaultText;
      this.defaultGroupName = this.defaultGroupName || '其他';
      this.$value = [];
      this.createTabs().then(() => {
        this.dt.firstChild.click();
        this.btn.addEventListener('click', () => {
          this.element.className = 'active';
        });
        this.element.addEventListener('click', ({ target }) => {
          if (this.element === target || this.element.contains(target)) return;
          this.element.className = '';
        });
        this.value.forEach(id => this.updateClass(`[data-key='${id}']`, 'active'));
      });
    }
    getGroups() {
      return api(this.api).then(raw => {
        if (!~['Array', 'Object'].indexOf(Object.prototype.toString.call(raw).slice(8, -1))) {
          throw new Error('接口返回必须是数组或键值对');
        }
        return new Groups(raw, this.defaultGroupName);
      });
    }
    updateClass(query, className) {
      Array.from(this.element.querySelectorAll(query))
        .forEach(item => (item.className = className));
    }
    get value() { return this.$value; }
    set value(value) {
      if (value instanceof Array) return value.forEach(item => (this.value = item));
      value = String(value);
      const index = this.$value.indexOf(value);
      if (index > -1) {
        this.updateClass(`[data-key='${value}']`, '');
        this.$value.splice(index, 1);
      } else {
        this.updateClass(`[data-key='${value}']`, 'active');
        this.$value.push(value);
      }
      api(this.api).then(raw => {
        if (!~['Array', 'Object'].indexOf(Object.prototype.toString.call(raw).slice(8, -1))) {
          throw new Error('接口返回必须是数组或键值对');
        }
        const cities = raw instanceof Array
          ? raw.filter(item => ~this.$value.indexOf(String(item.id)))
          : Object.keys(raw).filter(key => raw[key] && ~this.$value.indexOf(String(raw[key].id)));
        this.text = cities.length ? cities.map(city => city.name).join(', ') : this.defaultText;
      });
    }
    createTabs() {
      return this.getGroups().then(groups => {
        const groupsKeys = Object.keys(groups);
        const gIndex = groupsKeys.indexOf(this.defaultGroupName);
        if (gIndex > -1) {
          groupsKeys.push(groupsKeys[gIndex]);
          groupsKeys.splice(gIndex, 1);
        }
        groupsKeys.forEach((name) => {
          let group = groups[name];
          let target;
          if (group instanceof Array) {
            target = new CitySelectorCollection({ group }).to(this.dd);
          } else {
            target = new CitySelectorAlphabet({ group }).to(this.dd);
          }
          new CitySelectorTab({ name, target }).to(this.dt);
        });
      });
    }
    onClick({ target }) {
      let li = target.parentNode;
      if (li.hasAttribute('data-key')) {
        this.value = li.getAttribute('data-key');
        this.element.className = '';
        if (typeof this.onChange === 'function') this.onChange();
      }
    }
    get template() {
      return `
        <span on-click="{onClick}" on-mouseenter="{mouseenter}">
          <a href="JavaScript:" ref="btn">{text}</a>
          <dl ref="dl">
            <dt ref="dt"></dt>
            <dd ref="dd"></dd>
          </dl>
        </span>
      `;
    }
    mouseenter(event) {
      if (event.clientY > document.documentElement.clientHeight / 2) {
        this.dl.style.bottom = '100%';
      } else {
        this.dl.style.top = '100%';
      }
    }
    get styleSheet() {
      return `
        :scope {
          position: relative;
          display: inline-block;
          > a {
            color: #26a2ff;
            text-decoration: none;
            &:after {
              content: '';
              border: solid;
              position: relative;
              top: -2px;
              display: inline-block;
              margin-left: 6px;
              border-width: 6px 6px 0 6px;
              border-color: #fff transparent transparent transparent;
            }
          }
          &:hover {
            > a:after {
              border-width: 0 6px 6px 6px;
              border-color: transparent transparent #fff transparent;
            }
          }
          dl {
            margin: 0;
            border: 1px solid #1da4fc;
            padding: 24px;
            font-size: 14px;
            z-index: 10;
            position: absolute;
            min-width: 500px;
            max-height: 300px;
            overflow: auto;
            left: 0;
            display: none;
            background: #fff;
          }
          &:hover > dl { display: block; }
          [data-key].active { color: #26a2ff; }
          dt {
            padding: 0 32px;
            white-space: nowrap;
            border-bottom: 1px solid #dcddde;
          }
          dd {
            margin: 0;
          }
        }
      `;
    }
  };
});

