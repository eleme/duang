def((FormSubmit, FormItemWithTable, Alert) => class extends Jinkela {

  beforeParse(params) {
    this.depot = params.depot;
  }

  get FormSubmit() { return FormSubmit; }

  get listLength() { return this.depot.scheme.inputs && this.depot.scheme.inputs.length; }
  get nosubmit() { return this.depot.scheme.noSubmit || this.depot.params.readonly; }
  get form() { return this; }

  get list() {
    let { depot } = this;
    let { scheme, formMode } = depot;
    let { inputs = [] } = scheme;
    inputs = JSON.parse(JSON.stringify(inputs)); // inputs 消除引用
    inputs = inputs.filter(item => item[formMode] !== 'none'); // 过滤隐藏项
    inputs = inputs.filter(item => this.checkPermissions(item)); // 过滤权限
    inputs.forEach((item) => { // read 方式默认是只读的
      if (formMode === 'read' && item[formMode] === void 0) item[formMode] = 'readonly';
      if (item[formMode] === 'readonly') {
        if (!item.args) item.args = {};
        item.args.readonly = true;
      }
      if (item[formMode] === 'hidden') item.hidden = true;
    });
    let value = FormItemWithTable.cast(inputs, { depot });
    Object.defineProperty(this, 'list', { configurable: true, value });
    return value;
  }

  get $promise() {
    let value = Promise.all(this.list.map(item => item.$promise));
    Object.defineProperty(this, '$promise', { configurable: true, value });
    return value;
  }

  checkPermissions(item) {
    if (!item.require) return true;
    let requireList = [].concat(item.require);
    if (requireList.length === 0) return true;
    let { session } = this.depot || depot;
    let { permissions } = session;
    return requireList.some(code => permissions.includes(code));
  }

  ready() {
    this.list.forEach(item => item.to(this.table));
    this.hasReady = true;
  }

  init() {
    this.$promise.then(() => this.ready());
    // 处理多列样式
    if (this.columns > 1) {
      this.columns.dataset.columns = this.columns;
      this.columns.style.columns = this.columns;
    }
    // 这里 Alert（什么鬼）？？？
    if (depot.scheme.alert) {
      this.$promise.then(() => {
        new Alert(Object.assign({ form: this }, depot.scheme.alert)).to(this.notice);
      });
    }
  }

  set value(data) {
    if (!data) return;
    this.list.forEach(item => {
      switch (item.squash) {
        case 'direct':
          item.value = Object.assign({ '': data[item.key] }, data);
          break;
        default:
          item.value = data[item.key];
      }
    });
  }

  get value() {
    return this.list.reduce((result, item) => {
      let value;
      try {
        value = item.value;
      } catch (error) {
        throw new Error(item.text.textContent + error.message);
      }
      switch (item.squash) {
        case 'direct':
          result[item.key] = value[''];
          Object.keys(value).filter(key => key).forEach(key => (result[key] = value[key]));
          break;
        default:
          result[item.key] = value;
      }
      return result;
    }, Object.create(null));
  }

  get styleSheet() {
    return `
      :scope {
        padding: 2em;
        > [ref=columns] {
          > .table {
            border-spacing: var(--spacing);
            margin: -1em 0;
            width: 100%;
            font-size: inherit;
          }
        }
      }
    `;
  }

  get template() {
    return `
      <div>
        <div ref="notice"></div>
        <div ref="columns">
          <div ref="table" class="table"></div>
        </div>
        <div if-not="{hasReady}">加载中...</div>
        <h3 if-not="{listLength}">并没有什么东西可以编辑</h3>
        <jkl-form-submit nosubmit="{nosubmit}" depot="{depot}" form="{form}"></jkl-form-submit>
      </div>
    `;
  }

});
