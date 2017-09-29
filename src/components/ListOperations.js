def((Button, Confirm, ErrorDialog) => {

  class OperationsItem extends Button {
    init() {
      this.text = this.title;
    }
    onClick() {
      this.confirm ? Confirm.popup(this.confirm, this.depot).then(result => result && this.exec()) : this.exec();
    }
    get exec() { return this[this.method + 'Action'] || this.defaultAction; }
    goAction() {
      let { module, key, params, _blank, target, title, depot } = this;
      let { scheme, where } = depot;
      params = refactor(params, { params: depot.params, scheme, where });
      if (_blank) target = '_blank';
      return depot.go({ args: { module, key, params }, target, title });
    }
    createAction() {
      let { depot } = this;
      this.module = 'editor';
      this.key = depot.key;
      this.params = this.params || depot.params;
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
      let { scheme, queryParams, resolvedKey, main } = depot;
      let path = [ resolvedKey ];
      if ('api' in this) path.push(this.api);
      if (this.query) {
        if (scheme.listSelector) queryParams.selectedItems = JSON.stringify(main.table.selectedItems);
        path.push('?' + queryParams);
      }
      api(path, { method: this.method || 'POST' }).then(() => {
        depot.refresh();
      }, error => {
        ErrorDialog.popup({ error });
      });
    }
    get styleSheet() {
      return `
        :scope {
          display: inline-block;
          vertical-align: top;
          margin-left: 1em;
          min-width: 64px;
          min-height: 32px;
          &:first-child {
            margin-left: 0;
          }
        }
      `;
    }
  }

  return class extends Jinkela {

    get styleSheet() {
      return `
        :scope {
          text-align: right;
          overflow: hidden;
          flex: 1;
          padding-bottom: 1em;
        }
      `;
    }

    init() {
      let { depot } = this;
      let { scheme } = depot;
      let { operations } = scheme;
      if (!(operations instanceof Array)) operations = [];
      operations = operations.filter(item => this.checkPermissions(item));
      OperationsItem.cast(operations, { depot }).to(this);
      if (!operations.length) this.element.style.display = 'none';
    }

    checkPermissions(item) {
      if (!item.require) return true;
      let requireList = [].concat(item.require);
      if (requireList.length === 0) return true;
      let { session } = this.depot;
      let { permissions } = session;
      return requireList.some(code => permissions.includes(code));
    }

  };

});
