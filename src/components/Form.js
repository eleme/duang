def((FormSubmit, FormItemWithTable, Alert) => class extends Jinkela {

  get FormSubmit() { return FormSubmit; }

  get Alert() { return Alert; }

  beforeParse(params) {
    // 获取变量
    let { depot } = params;
    let { scheme, formMode } = depot;
    let { inputs = [], noSubmit } = scheme;
    // 设置属性
    this.listLength = inputs.length;
    this.noSubmit = noSubmit || depot.params.readonly;
    this.form = this;
    // 构建 this.list
    inputs = JSON.parse(JSON.stringify(inputs)).filter(item => item[formMode] !== 'none');
    // read 方式默认是只读的
    inputs.forEach((item) => {
      if (formMode === 'read' && item[formMode] === void 0) item[formMode] = 'readonly';
      if (item[formMode] === 'readonly') {
        if (!item.args) item.args = {};
        item.args.readonly = true;
      }
      if (item[formMode] === 'hidden') item.hidden = true;
    });
    this.list = FormItemWithTable.cast(inputs, { depot });
    // 将 this.list 包成 Promise
    this.$promise = Promise.all(this.list.map(item => item.$promise));
  }

  init() {
    let { depot } = this;
    let { scheme } = depot;
    let { columns } = scheme;
    // 渲染列表
    this.$promise.then(() => {
      this.list.forEach(item => item.to(this.table));
    });
    // 处理多列样式
    if (columns > 1) {
      this.columns.dataset.columns = columns;
      this.columns.style.columns = columns;
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
      let { value } = item;
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
            border-spacing: 1em;
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
        <h3 if-not="{listLength}">并没有什么东西可以编辑</h3>
        <jkl-form-submit nosubmit="{noSubmit}" depot="{depot}" form="{form}"></jkl-form-submit>
      </div>
    `;
  }

});
