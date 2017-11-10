def((Button, Confirm, ErrorDialog) => {

  class OperationsItem extends Button {
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

  class FilterToggle extends OperationsItem {
    init() {
      this.updateState();
    }
    updateState() {
      let { params } = this.depot;
      let { filterState } = params;
      this.text = { folded: '展开筛选栏', unfolded: '折叠筛选栏' }[filterState];
      this.element.classList[filterState === 'folded' ? 'remove' : 'add']('hollow');
    }
    onClick() {
      let { params } = this.depot;
      params.filterState = { folded: 'unfolded', unfolded: 'folded' }[params.filterState];
      this.updateState();
      let args = Object.assign(this.depot.uParams, { params });
      this.depot.go({ args, target: 'soft' });
      this.element.dispatchEvent(new CustomEvent('filtertoggle', { bubbles: true }));
    }
  }

  class OperationsButton extends OperationsItem {
    init() {
      this.text = this.title;
    }
    onClick() {
      this.confirm ? Confirm.popup(this.confirm, this.depot).then(result => result && this.exec()) : this.exec();
    }
    get exec() {
      switch (this.method) {
        case 'go': return this.goAction;
        case 'create': return this.createAction;
        case 'open': return this.openAction;
        case void 0: case '': return () => {}; // noop
        default: return this.defaultAction;
      }
    }
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
  }

  return class extends Jinkela {

    get styleSheet() {
      return `
        :scope {
          text-align: right;
          overflow: hidden;
          flex: 1;
          padding-bottom: 1em;
          &:empty { display: none; }
        }
      `;
    }

    init() {
      let { depot } = this;
      let { scheme, params } = depot;
      let { operations } = scheme;
      if (!(operations instanceof Array)) operations = [];
      // 检查操作权限
      operations = operations.filter(item => this.checkPermissions(item));
      // 筛选器控制按钮
      if (params.filterState === 'folded' || params.filterState === 'unfolded') new FilterToggle({ depot }).to(this);
      // 渲染
      OperationsButton.from(operations.map(data => Object.assign({ depot }, data))).to(this);
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
