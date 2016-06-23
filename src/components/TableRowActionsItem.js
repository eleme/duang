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
    params = refactor(params, this.fieldMap);
    this.go('list', key, params, _blank);
  }
  editAction() {
    let { _blank } = this;
    let { params, key } = depot;
    params['@id'] = '$.id';
    this.go('editor', key, params, _blank);
  }
  defaultAction() {
    let path = [ depot.scheme.key, this.fieldMap.id ];
    if ('api' in this) path.push(this.api);
    api(path.join('/'), { method: this.method || 'POST' }).then(result => {
      depot.refresh();
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
