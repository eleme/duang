def((ListItem, Confirm) => class extends ListItem {
  init() {
    this.text = this.title || this.method;
  }
  onClick() {
    this.confirm ? Confirm.popup(this.confirm).then(result => result && this.exec()) : this.exec();
  }
  get exec() { return this[this.method + 'Action'] || this.defaultAction; }
  go(module, key, params, _blank) {
    params = JSON.stringify(refactor(params, this.fieldMap));
    let hash = '#' + new UParams({ module, key, params });
    _blank ? open(location.href.replace(/(#.*)?$/, hash)) : location.hash = hash;
  }
  listAction() {
    let { key, params, _blank } = this;
    this.go('list', key, params, _blank);
  }
  editAction() {
    let { _blank } = this;
    this.go('editor', new UParams().key, { '@id': '$..id' }, _blank);
  }
  defaultAction() {
    let path = [ this.scheme.key, this.fieldMap.id ];
    if ('api' in this) path.push(this.api);
    api(path.join('/'), { method: this.method || 'POST' }).then(result => {
      init();
    }, error => {
      alert(error.message);
    });
  }
  get styleSheet() {
    return `
      :scope {
        margin-left: .5em;
        display: inline-block;
      }
    `;
  }
});
