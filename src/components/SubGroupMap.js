def((FormItemWithTable, FormItemWithDiv) => class extends Jinkela {

  set value(data) {
    if (!data) return;
    this.inputs.forEach(item => {
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
    return this.inputs.reduce((result, item) => {
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

  init() {
    let { group, depot, mode = 'table' } = this;
    let { formMode } = depot;
    group = JSON.parse(JSON.stringify(group)).filter(item => item[formMode] !== 'none');
    group.forEach((item) => {
      if (formMode === 'read' && item[formMode] === void 0) item[formMode] = 'readonly';
      if (item[formMode] === 'readonly') {
        if (!item.args) item.args = {};
        item.args.readonly = true;
      }
    });
    this.element.classList.add(mode);
    switch (mode) {
      case 'table':
        this.inputs = FormItemWithTable.cast(group).to(this);
        break;
      case 'line':
        this.inputs = FormItemWithDiv.cast(group).to(this);
        break;
    }
  }

  get styleSheet() {
    return `
      .table:scope {
        break-inside: avoid-column;
        border-spacing: 1em;
        margin: -1em;
        font-size: inherit;
        > div > span:first-child { width: 0; }
      }
      .line:scope {
        display: flex;
        margin-left: -1em;
        > * { margin-left: 1em; }
      }
    `;
  }

});
