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

  class Cell extends Item {
    get styleSheet() {
      return `
        :scope {
          border: solid #e0e6ed;
          padding: 0 18px;
          line-height: 24px;
          height: 40px;
          border-width: 1px 0;
        }
      `;
    }
  }

  class NormalCell extends Cell {
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
  }

  class Sortable extends Jinkela {
    get styleSheet() {
      return `
        :scope {
          margin-left: 5px;
          width: 16px;
          height: 34px;
          position: relative;
          cursor: pointer;
          display: inline-block;
          vertical-align: middle;
          z-index: 1;
          &::before, &::after {
            content: '';
            position: absolute;
            left: 3px;
            content: '';
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
          }
          &::before {
            border-bottom: 5px solid #97a8be;
            top: 11px;
          }
          &::after {
            border-top: 5px solid #97a8be;
            bottom: 11px;
          }
          &[data-sign=""]::before { border-bottom-color: #48576a; }
          &[data-sign="-"]::after { border-top-color: #48576a; }
        }
      `;
    }
    init() {
      let { uParams } = this.depot || window.depot;
      let { orderBy } = uParams;
      this.element.addEventListener('click', this.sort.bind(this));
      if (orderBy) {
        let [ , isDesc, key ] = /^(-?)(.*)$/.exec(orderBy);
        if (key === this.key) this.element.dataset.sign = isDesc;
      }
    }
    sort() {
      let depot = this.depot || window.depot;
      let orderBy = (this.element.dataset.sign === '-' ? '' : '-') + this.key;
      depot.update({ orderBy });
    }
  }

  class HeadCell extends Cell {
    init() {
      let { width, nowrap, title, align, sortable, key, depot } = this;
      if (width) this.element.style.width = width + 'px';
      if (align) this.element.style.textAlign = align;
      if (nowrap) this.element.style.whiteSpace = 'nowrap';
      if (title) Output.createAny(title).to(this);
      if (sortable) new Sortable({ key, depot }).to(this);
    }
    get template() {
      return `
        <td>
        </td>
      `;
    }
    get styleSheet() {
      return `
        :scope {
          white-space: nowrap;
          font-weight: bold;
          color: #1f2d3d;
          > * {
            display: inline-block;
            vertical-align: middle;
          }
        }
      `;
    }
  }

  class CheckboxCell extends Cell {
    get template() {
      return `
        <td width="1">
          <jkl-checkbox text="" on-change="{handler}" ref="checkbox"></jkl-checkbox>
        </td>
      `;
    }
    get checked() { return this.checkbox.checked; }
    set checked(value) { this.checkbox.checked = value; }
  }

  class Row extends Item {
    get tagName() { return 'tr'; }
    init() {
      this.initCheckbox();
    }
    initCheckbox() {
      let { depot = window.depot } = this;
      let { scheme = {} } = depot;
      if (!scheme.listSelector) return;
      this.checkbox = new CheckboxCell({
        handler: event => {
          event.stopPropagation();
          this.element.dispatchEvent(new CustomEvent('SelectRow', { bubbles: true, detail: this }));
        }
      }).to(this);
    }
    get checked() {
      return this.checkbox && this.checkbox.checked;
    }
    set checked(value) {
      if (!this.checkbox) return;
      this.checkbox.checked = value;
    }
  }

  class TableRow extends Row {
    get $promise() {
      let resolve, reject;
      let value = new Promise((...args) => ([ resolve, reject ] = args));
      value.resolve = resolve;
      value.reject = reject;
      Object.defineProperty(this, '$promise', { value, configurable: true });
      return value;
    }
    init() {
      let { depot = window.depot, fieldMap } = this;
      let { scheme } = depot;
      let { fields = [], actions = [] } = scheme;
      let cells = [];
      cells.push(...fields.map(field => new NormalCell(field, { value: fieldMap[field.key] }, this)));
      Promise.all(cells.map(cell => cell.$promise)).then(cells => {
        cells.forEach(cell => cell.to(this));
        if (actions.length) new NormalCell({ depot, actions, nowrap: true, width: 1 }, this).to(this);
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
    remove() { this.element.remove(); }
  }

  class TableHead extends Row {
    init() {
      let { depot = window.depot } = this;
      let { scheme } = depot;
      let fields = (scheme.fields || []).slice(0);
      if (scheme.actions && scheme.actions.length) {
        fields.push({ title: depot.getConst('操作'), nowrap: true, align: 'right' });
      }
      HeadCell.from(fields).to(this);
    }
  }

  return class extends Jinkela {

    beforeParse(params) {
      this.depot = params.depot;
    }

    init() {
      this.initCaption();
      this.initHead();
      this.element.addEventListener('SelectRow', this.rowSelected.bind(this));
    }

    initCaption() {
      let { depot = window.depot } = this;
      let { scheme } = depot;
      let { captionType = 'table' } = scheme;
      if (captionType !== 'table' || !scheme.caption) return;
      new TableCaption({ depot }).to(this.table);
    }

    initHead() {
      if (this.isEmptyFields) return;
      let { depot = window.depot } = this;
      this.head = new TableHead({ depot }).to(this.table.createTHead());
    }

    rowSelected(event) {
      if (this.changing) return;
      this.changing = true;
      event.stopPropagation();
      let jinkela = event.detail;
      if (jinkela instanceof TableHead) {
        this.rows.forEach(row => {
          row.checked = jinkela.checked;
        });
      } else {
        this.head.checked = this.rows.every(row => row.checked);
      }
      this.changing = false;
    }

    get isEmptyFields() {
      let { depot } = this;
      let { scheme } = depot;
      return !(scheme.fields && scheme.fields.length);
    }

    clear() {
      if (this.rows instanceof Array) this.rows.forEach(item => item.remove());
    }

    set data(list) {
      if (!(list instanceof Array)) list = [];
      let { depot = window.depot } = this;
      let { orderBy } = depot.uParams;
      if (orderBy) {
        let [ , isDesc, key ] = /^(-?)(.*)$/.exec(orderBy);
        isDesc = !!isDesc;
        list = list.sort((current, next) => { // 这里的 sort 会影响原始数据，但是无所谓
          let value = current[key];
          let nextValue = next[key];
          if (value == null) return 1; // eslint-disable-line
          return (value > nextValue ^ isDesc) ? 1 : -1;
        });
      }
      Promise.all(list.map(fieldMap => new TableRow({ fieldMap, depot }).$promise)).then(rows => {
        this.clear();
        this.rows = rows;
        rows.forEach(row => row.to(this.table));
      });
    }

    get table() {
      let value = document.createElement('table');
      this.element.appendChild(value);
      Object.defineProperty(this, 'table', { value, configurable: true });
      return value;
    }

    get selectedItems() {
      return this.rows.filter(row => row.checked).map(row => row.fieldMap.id);
    }

    get styleSheet() {
      return `
        :scope {
          margin: 1em;
          width: calc(100% - 2em);
          overflow-x: auto;
          overflow-y: hidden;
          border: 1px solid #e0e6ed;
          box-sizing: border-box;
          &:empty { display: none; }
          > table {
            margin-bottom: -1px;
            color: #666;
            font-size: 14px;
            line-height: 40px;
            width: 100%;
            background: #fff;
            border-collapse: collapse;
            > thead > tr > td {
              border: 0;
              background: #eff2f7;
            }
          }
        }
      `;
    }

  };

});
