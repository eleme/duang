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
      let { depot = window.depot } = this;
      let { uParams } = depot;
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
      let { depot = window.depot } = this;
      let { breakWord, width, nowrap, value, component, args, actions, scheme, fieldMap } = this;
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
      let { depot = window.depot } = this;
      let { width, nowrap, title, align, sortable, key } = this;
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

    get checked() { return this.checkbox && this.checkbox.checked; }
    set checked(value) {
      if (!this.checkbox) return;
      this.checkbox.checked = value;
    }

    init() {
      let { depot = window.depot, filteredFields } = this;
      let { scheme } = depot;
      let { listSelector } = scheme;

      // 处理 Checkbox
      if (listSelector) {
        this.checkbox = new CheckboxCell({
          handler: event => {
            event.stopPropagation();
            this.element.dispatchEvent(new CustomEvent('SelectRow', { bubbles: true, detail: this }));
          }
        }).to(this);
      }

      // 根据字段描述创建单元格组件
      let cells = filteredFields.map(field => this.createCell(field));

      // 等到所有单元格组件都初始化完毕
      return Promise.all(cells.map(i => i.$promise)).then(cells => {
        cells.forEach(cell => cell.to(this)); // 渲染这些单元格组件

        let action = this.createActionCell(); // 处理 actions
        if (action) action.to(this);

        this.$promise.resolve(this);
      }).catch(error => {
        setTimeout(() => { throw error; });
      });
    }
  }

  class TableRow extends Row {
    createCell(field) {
      let { depot = window.depot, fieldMap } = this;
      let value = fieldMap[field.key];
      return new NormalCell(field, { value, depot }, this);
    }
    createActionCell() {
      let { depot = window.depot } = this;
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
      let { depot = window.depot } = this;
      let { actions } = depot.scheme;
      if (actions && actions.length) {
        return new HeadCell({ title: depot.getConst('操作'), nowrap: true, align: 'right', depot });
      }
    }
  }

  return class extends Jinkela {
    beforeParse(params) {
      this.depot = params.depot || window.depot;
    }

    init() {
      this.initCaption();
      this.initHead();
      this.element.addEventListener('SelectRow', this.rowSelected.bind(this));
    }

    initCaption() {
      let { depot } = this;
      let { scheme } = depot;
      let { captionType = 'table' } = scheme;
      if (captionType !== 'table' || !scheme.caption) return;
      new TableCaption({ depot }).to(this.table);
    }

    initHead() {
      if (this.isEmptyFields) return;
      let { depot = window.depot, filteredFields } = this;
      this.head = new TableHead({ depot, filteredFields }).to(this.table.createTHead());
    }

    // 获取需要显示的字段列表（处理 params.fields 过滤掉不需要的部分）
    get filteredFields() {
      let { depot } = this;
      let { params, scheme } = depot;
      let { fields } = scheme;
      let visibleFields = params.fields;
      let value = fields instanceof Array ? fields.slice(0) : [];
      if (visibleFields instanceof Array) {
        value = value.filter(field => visibleFields.includes(field.key));
      }
      Object.defineProperty(this, 'filteredFields', { configurable: true, value });
      return value;
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

    // TODO: 确认下这个是不是 set once 的，如果是的话就不需要用 setter 了，直接在 init 里处理逻辑更清晰
    set data(list) {
      if (!(list instanceof Array)) list = [];
      let { depot, filteredFields } = this;
      let { uParams } = depot;
      let { orderBy } = uParams;

      // 处理排序
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

      // 在这里初始化所有行组件（可以考虑做个差异更新，然而代码并不好写）
      let rows = list.map((fieldMap, index) => {
        let nextFieldMap = list[index + 1];
        return new TableRow({ depot, fieldMap, nextFieldMap, filteredFields });
      });
      if (rows.length === 0) return;

      // 创建一个等待所有组件初始化的任务
      let optimisticLocking = Promise.all(rows.map(i => i.$promise));
      this.optimisticLocking = optimisticLocking;

      // 注册异步
      optimisticLocking.then(rows => {
        // 如果异步执行时乐观锁版本不匹配则放弃执行
        if (this.optimisticLocking !== optimisticLocking) return;
        this.clear();
        this.rows = rows;
        rows.forEach(row => row.to(this.table));
        delete this.optimisticLocking;
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
