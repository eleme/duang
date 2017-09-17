def((Output, Item, TableRowActions, Caption) => {

  class TableCaption extends Caption {
    get tagName() { return 'caption'; }
    get styleSheet() {
      return `
        :scope {
          background: #eff2f7;
          border-bottom: 1px solid #e0e6ed;
          padding: 0 18px;
        }
      `;
    }
  }

  class TableCell extends Item {
    get tagName() { return 'td'; }
    get $promise() {
      let resolve, reject;
      let value = new Promise((...args) => ([ resolve, reject ] = args));
      value.resolve = resolve;
      value.reject = reject;
      Object.defineProperty(this, '$promise', { value, configurable: true });
      return value;
    }
    init() {
      let { breakWord, width, nowrap, value, component, args, actions, scheme, fieldMap, depot } = this;
      if (width) this.element.style.width = width + 'px';
      if (nowrap) this.element.style.whiteSpace = 'nowrap';
      if (breakWord) this.element.style.wordBreak = 'break-all';
      switch (true) {
        case !!component: {
          let output = new Output({ component, args, value }).to(this);
          return output.$promise.then(() => this.$promise.resolve(this));
        }
        case !!actions:
          new TableRowActions({ depot, actions, scheme, fieldMap }).to(this);
          return this.$promise.resolve(this);
        default:
          this.element.innerHTML = value;
          this.$promise.resolve(this);
      }
    }
    get styleSheet() {
      return `
        :scope {
          border: solid #e0e6ed;
          border-width: 1px 0;
          padding: 0 18px;
          line-height: 24px;
          height: 40px;
        }
      `;
    }
  }

  class TableHeadCell extends Item {
    init() {
      let { uParams } = depot;
      let { width, nowrap } = this;
      if (width) this.element.style.width = width + 'px';
      if (nowrap) this.element.style.whiteSpace = 'nowrap';
      if (uParams.orderBy) {
        let { orderBy } = uParams;
        let isDesc = (orderBy[0] === '-');
        let key = isDesc ? orderBy.slice(1) : orderBy;
        if (key === this.key) {
          this.sortIcon.setAttribute('orderBy', isDesc ? 'desc' : 'asc');
        }
      }
    }
    sort() {
      let orderBy = this.sortIcon.getAttribute('orderBy') === 'desc' ? '' : '-';
      this.element.dispatchEvent(new CustomEvent('sort', {
        bubbles: true,
        detail: orderBy + this.key
      }));
    }
    get template() {
      return `
        <td>
          <span>{title}</span>
          <div if="{sortable}" on-click="{sort}" ref="sortIcon" class="caret-wrapper">
            <i class="sort-caret ascend"></i>
            <i class="sort-caret descend"></i>
          </div>
        </td>
      `;
    }
    get styleSheet() {
      return `
        :scope {
          padding: 0 18px;
          line-height: 24px;
          height: 40px;
          white-space: nowrap;
          font-weight: bold;
          color: #1f2d3d;
          > .caret-wrapper {
            margin-left: 5px;
            width: 16px;
            height: 34px;
            position: relative;
            cursor: pointer;
            display: inline-block;
            vertical-align: middle;
            z-index: 1;
            > .sort-caret {
              position: absolute;
              left: 3px;
              content: '';
              border-left: 5px solid transparent;
              border-right: 5px solid transparent;
              &.ascend {
                border-bottom: 5px solid #97a8be;
                top: 11px;
              }
              &.descend {
                border-top: 5px solid #97a8be;
                bottom: 11px;
              }
            }
            &[orderBy=asc] {
              > .ascend { border-bottom-color: #48576a; }
            }
            &[orderBy=desc] {
              > .descend { border-top-color: #48576a; }
            }
          }
        }
      `;
    }
  }

  class TableRow extends Item {

    get tagName() { return 'tr'; }

    get $promise() {
      let resolve, reject;
      let value = new Promise((...args) => ([ resolve, reject ] = args));
      value.resolve = resolve;
      value.reject = reject;
      Object.defineProperty(this, '$promise', { value, configurable: true });
      return value;
    }

    init() {
      let { depot, fieldMap } = this;
      let { fields = [], actions = [] } = depot.scheme;
      let cells = fields.map(field => new TableCell(field, { value: fieldMap[field.key] }, this));
      Promise.all(cells.map(cell => cell.$promise)).then(cells => {
        cells.forEach(cell => cell.to(this));
        if (actions.length) new TableCell({ depot, actions, nowrap: true, width: 1 }, this).to(this);
        this.$promise.resolve(this);
      });
    }

    get styleSheet() {
      return `
        :scope:hover {
          background: #f9fafc;
          transition: background 200ms ease;
        }
      `;
    }

  }

  class TableHead extends Jinkela {
    get template() { return '<thead><tr ref="tr"></tr></thead>'; }
    init() {
      let { depot = window.depot } = this;
      let { scheme, uParams } = depot;
      let fields = (scheme.fields || []).slice(0);
      if (scheme.actions && scheme.actions.length) {
        fields.push({ title: depot.getConst('操作'), nowrap: true });
      }
      TableHeadCell.from(fields).to(this.tr);
      this.element.addEventListener('sort', e => {
        e.stopPropagation();
        uParams.orderBy = e.detail;
        location.hash = new UParams(uParams);
      });
    }
    get styleSheet() {
      return `
        :scope td {
          background: #eff2f7;
        }
      `;
    }
  }

  return class extends Jinkela {

    createCaption() {
      let { depot = window.depot } = this;
      let { scheme } = depot;
      let { captionType = 'table' } = scheme;
      let value;
      if (captionType === 'table' && scheme.caption) {
        return new TableCaption({ depot }).to(this.table);
      }
    }

    createHead() {
      let { depot = window.depot } = this;
      return new TableHead({ depot }).to(this.table);
    }

    set data(list) {
      if (!list) return;
      this.create();
      if (list === 'EMPTY_FIELDS') return;
      let { depot = window.depot } = this;
      let { orderBy } = depot.uParams;
      if (!(list instanceof Array)) return console.error(`返回结果必须是数组, ${ JSON.stringify(list) }`); // eslint-disable-line
      if (orderBy) {
        let isDesc = (orderBy[0] === '-');
        let key = isDesc ? orderBy.slice(1) : orderBy;
        list = list.sort((current, next) => {
          let value = current[key];
          let nextValue = next[key];
          if (value == null) return 1; // eslint-disable-line
          // sort => (value > nextValue) ? 1 : -1 是升序排序
          // 两个相同 boolean 进行 `^` 异或操作为 0, 否则为 1
          // 因此: 升序 ^ 降序(isDesc) = 0 && 升序 ^ 升序(!isDesc) = 1
          return (value > nextValue ^ isDesc) ? 1 : -1;
        });
      }
      let rows = list.map(fieldMap => new TableRow({ fieldMap, depot }));
      Promise.all(rows.map(row => row.$promise)).then(rows => {
        rows.forEach(row => row.to(this.table));
      });
    }

    create() {
      if (!this.caption) this.caption = this.createCaption();
      if (!this.head) this.head = this.createHead();
    }

    get template() {
      return `
        <div>
          <table ref="table"></table>
        </div>
      `;
    }

    get styleSheet() {
      return `
        :scope {
          margin: 1em;
          width: calc(100% - 2em);
          overflow: auto;
          border: 1px solid #e0e6ed;
          box-sizing: border-box;
          > table {
            margin-bottom: -1px;
            color: #666;
            font-size: 14px;
            line-height: 40px;
            width: 100%;
            background: #fff;
            border-collapse: collapse;
          }
        }
      `;
    }

  };

});
