def((Output, Item, Confirm, ErrorDialog) => {

  class TableRowActionsItem extends Item {
    init() {
      Output.createAny(this.title || this.method).to(this);
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
      if (this.confirm) {
        return Confirm.popup(this.confirm, this.depot).then(result => result && this.exec());
      } else {
        return this.exec();
      }
    }
    get exec() { return this[this.method + 'Action'] || this.defaultAction; }

    goAction() {
      let { module, key, params, _blank, target, title, where, depot } = this;
      let data = Object.create(depot);
      for (let key in this.fieldMap) {
        Object.defineProperty(data, key, { configurable: true, value: this.fieldMap[key] });
      }
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
      return this.goAction();
    }

    readAction() {
      let { depot } = this;
      this.module = 'editor';
      this.params = Object.assign({ '@id': '$.id' }, depot.params, { readonly: true });
      this.key = depot.key;
      return this.goAction();
    }

    copyAction() {
      let { depot } = this;
      this.module = 'editor';
      this.params = Object.assign({}, depot.params, { '@copy': '$.id' });
      this.key = depot.key;
      return this.goAction();
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
      return api(path, { method: this.method || 'POST' }).then(result => doAction(result, depot)).then(() => {
        depot.refresh();
      }, error => {
        ErrorDialog.popup({ error });
      });
    }

    get template() {
      return `
        <li></li>
      `;
    }

    get styleSheet() {
      return `
        :scope {
          cursor: pointer;
          margin-left: .5em;
          display: inline-block;
          vertical-align: middle;
          color: #20a0ff;
          font-size: 12px;
          &:hover {
            color: #1d8ce0;
          }
        }
      `;
    }
  }

  return class extends Jinkela {
    init() {
      let { fieldMap } = this;
      TableRowActionsItem.cast(this.actions.filter(action => {
        return condition(action.conditions, fieldMap);
      }), this).to(this);
    }
    get tagName() { return 'ul'; }
    get styleSheet() {
      return `
        :scope {
          margin: 0;
          padding: 0;
          text-align: right;
          list-style: none;
        }
      `;
    }
  };

});
