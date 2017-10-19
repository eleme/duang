def((ListItem, Confirm, ErrorDialog) => class extends ListItem {

  init() {
    this.text = this.title || this.method;
    if (!this.checkPermissions()) this.element.style.display = 'none';
  }

  checkPermissions() {
    return this.checkRequire() && this.checkRequireField();
  }

  checkRequire() {
    if (!this.require) return true;
    let requireList = [].concat(this.require);
    if (requireList.length === 0) return true;
    let { session } = this.depot;
    let { permissions } = session;
    return requireList.some(code => permissions.includes(code));
  }

  checkRequireField() {
    if (!this.requireField) return true;
    let requireFieldList = [].concat(this.requireField);
    if (requireFieldList.length === 0) return true;
    return requireFieldList.some(fieldName => this.fieldMap[fieldName]);
  }

  onClick() {
    this.confirm ? Confirm.popup(this.confirm, this.depot).then(result => result && this.exec()) : this.exec();
  }
  get exec() { return this[this.method + 'Action'] || this.defaultAction; }

  goAction() {
    let { module, key, params, _blank, target, title, where, depot } = this;
    let data = Object.create(depot);
    for (let key in this.fieldMap) Object.defineProperty(data, key, { configurable: true, value: this.fieldMap[key] });
    params = refactor(params || {}, data);
    where = refactor(where || {}, data);
    if (_blank) target = '_blank';
    return depot.go({ args: { module, key, params, where }, target, title });
  }

  editAction() {
    let { depot } = this;
    this.module = 'editor';
    this.params = Object.assign({ '@id': '$.id' }, depot.params);
    this.key = depot.key;
    this.goAction();
  }

  readAction() {
    let { depot } = this;
    this.module = 'editor';
    this.params = Object.assign({ '@id': '$.id' }, depot.params, { readonly: true });
    this.key = depot.key;
    this.goAction();
  }

  copyAction() {
    let { depot } = this;
    this.module = 'editor';
    this.params = Object.assign({}, depot.params, { '@copy': '$.id' });
    this.key = depot.key;
    this.goAction();
  }

  openAction() {
    let { depot } = this;
    let { queryParams, resolvedKey } = depot;
    let url = api.resolvePath([ resolvedKey, this.href ]);
    open(`${url}?${queryParams}`);
  }

  defaultAction() {
    let { depot } = this;
    let path = [ depot.resolvedKey, this.fieldMap.id ];
    if ('api' in this) path.push(this.api);
    api(path, { method: this.method || 'POST' }).then(() => {
      depot.refresh();
    }, error => {
      ErrorDialog.popup({ error });
    });
  }

  get styleSheet() {
    return `
      :scope {
        margin-left: .5em;
        display: inline-block;
        color: #20a0ff;
        font-size: 12px;
        &:hover {
          color: #1d8ce0;
        }
      }
    `;
  }

});
