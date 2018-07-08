def((Output, Item, TableRowActions, Caption) => {

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
      let { uParams } = this.depot;
      let { orderBy } = uParams;
      this.element.addEventListener('click', this.sort.bind(this));
      if (orderBy) {
        let [ , isDesc, key ] = /^(-?)(.*)$/.exec(orderBy);
        if (key === this.key) this.element.dataset.sign = isDesc;
      }
    }
    sort() {
      let orderBy = (this.element.dataset.sign === '-' ? '' : '-') + this.key;
      this.depot.update({ orderBy });
    }
  }

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

  class PromisedItem extends Item {
    get $promise() {
      let resolve, reject;
      let value = new Promise((...args) => { [ resolve, reject ] = args; });
      Object.defineProperty(value, 'resolve', { value: resolve, configurable: true });
      Object.defineProperty(value, 'reject', { value: reject, configurable: true });
      Object.defineProperty(this, '$promise', { value, configurable: true });
      return value;
    }
  }

  class Cell extends PromisedItem {
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
    init() {
      let { breakWord, width, nowrap, value, component, args, actions, scheme, fieldMap, depot } = this;
      if (width) this.element.style.width = width + 'px';
      if (nowrap) this.element.style.whiteSpace = 'nowrap';
      if (breakWord) this.element.style.wordBreak = 'break-all';
      switch (true) {
        case !!component: {
          let output = new Output({ component, args, value }).to(this);
          return output.$promise.then(() => {
            this.$promise.resolve(this);
          });
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

  class HeadCell extends Cell {
    init() {
      let { width, nowrap, title, align, sortable, key, depot } = this;
      if (width) this.element.style.width = width + 'px';
      if (align) this.element.style.textAlign = align;
      if (nowrap) this.element.style.whiteSpace = 'nowrap';
      if (title) Output.createAny(title).to(this);
      if (sortable) new Sortable({ key, depot }).to(this);
      this.$promise.resolve(this);
    }
    get tagName() { return 'td'; }
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

  class Row extends PromisedItem {
    get tagName() { return 'tr'; }
    remove() { this.element.remove(); }
    init() {
      let { scheme, params } = depot;
      // 处理 Checkbox
      let { listSelector } = scheme;
      if (listSelector) {
        this.checkbox = new CheckboxCell({
          handler: event => {
            event.stopPropagation();
            this.element.dispatchEvent(new CustomEvent('SelectRow', { bubbles: true, detail: this }));
          }
        }).to(this);
      }
      // 获取字段列表（过滤掉不需要的部分）
      let { fields } = scheme;
      if (!(fields instanceof Array)) {
        setTimeout(() => { throw new Error('scheme.fields 必须是数组'); });
        fields = [];
      }
      let visibleFields = params.fields;
      if (visibleFields instanceof Array) {
        fields = fields.filter(field => visibleFields.includes(field.key));
      } else {
        fields = fields.slice(0);
      }
      // 根据字段描述创建单元格
      let cells = fields.map(field => this.createCell(field));
      return Promise.all(cells.map(i => i.$promise)).then(cells => {
        cells.forEach(cell => cell.to(this));
        let action = this.createActionCell();
        if (action) action.to(this);
        this.$promise.resolve(this);
      }).catch(error => {
        setTimeout(() => { throw error; });
      });
    }
    get checked() { return this.checkbox && this.checkbox.checked; }
    set checked(value) {
      if (!this.checkbox) return;
      this.checkbox.checked = value;
    }
  }

  class TableRow extends Row {
    createCell(field) {
      let { depot = window.depot, fieldMap } = this;
      let value = fieldMap[field.key];
      return new NormalCell(field, { value, depot }, this);
    }
    createActionCell() {
      let { actions } = depot.scheme;
      if (actions && actions.length) {
        new NormalCell({ depot, actions, nowrap: true, width: 1 }, this).to(this);
      }
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

  class TableHead extends Row {
    createCell(field) {
      let { depot = window.depot } = this;
      return new HeadCell(field, { depot });
    }
    createActionCell() {
      let { actions } = depot.scheme;
      if (actions && actions.length) {
        return new HeadCell({ title: depot.getConst('操作'), nowrap: true, align: 'right', depot });
      }
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
      let rows = list.map(fieldMap => new TableRow({ fieldMap, depot }));
      if (rows.length === 0) return;
      let updating = Promise.all(rows.map(i => i.$promise)).then(rows => {
        if (this.updating !== updating) return;
        this.clear();
        this.rows = rows;
        rows.forEach(row => row.to(this.table));
        delete this.updating;
      });
      this.updating = updating;
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
