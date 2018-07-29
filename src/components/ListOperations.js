def((Output, InputCheckbox, Button, ButtonHollow, Item, Confirm, ErrorDialog) => {

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

  /**
   * 字段选择器
  **/

  class FieldsControllerCheckbox extends Checkbox {
    get styleSheet() {
      return `
        :scope {
          display: inline-block;
          white-space: nowrap;
          text-align: left;
          margin: .25em 0;
          margin-right: 1em;
        }
      `;
    }
  }

  class FieldsController extends Item {
    get Button() { return Button; }
    get ButtonHollow() { return ButtonHollow; }
    get template() {
      return `
        <div on-click="{showPanel}">
          <svg viewBox="0 0 1024 1024" width="16" height="16">
            <path d="M961 171q0 23-12 43l-0 0q0 0-0 1t-0 1l-346 416v197q0 42-23 72t-65 29q-43
                     0-67-29t-24-72v-198l-342-413q-17-22-17-49 0-17 6-32t17-25 25-17 32-6h735q34
                     0 58 24t24 57z" />
          </svg>
          <div class="panel" ref="panel">
            <div class="container" ref="container"></div>
            <div class="controls">
              <jkl-button on-click="{apply}" small="true">应用</jkl-button>&nbsp;
              <jkl-button-hollow on-click="{cancel}" small="true">取消</jkl-button-hollow>
            </div>
          </div>
        </div>
      `;
    }
    get styleSheet() {
      return `
        :scope {
          background: #20a0ff;
          height: 32px;
          width: 32px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-align: left;
          border-radius: 100%;
          fill: #fff;
          color: inherit;
          position: relative;
          cursor: pointer;
          > .panel {
            cursor: default;
            filter: drop-shadow(0 0 3px rgba(0,0,0,.15));
            border-radius: 4px;
            margin-top: 1em;
            padding: .75em 1em;
            background: #fff;
            position: absolute;
            top: 100%;
            right: 0;
            width: 200px;
            visibility: hidden;
            opacity: 0;
            transition: 200ms;
            transition-delay: 100ms;
            > .container {
              display: flex;
              flex-wrap: wrap;
            }
            > .controls {
              margin-top: .5em;
              white-space: nowrap;
            }
            &::before {
              position: absolute;
              content: '';
              top: -14px;
              right: 8px;
              width: 0;
              height: 0;
              border: 7px solid;
              border-color: transparent transparent #fff transparent;
            }
          }
          &:hover {
            background: rgba(32,160,255,.8);
          }
          &.active {
            opacity: 1;
            > .panel {
              visibility: visible;
              opacity: 1;
            }
          }
        }
      `;
    }
    get busy() { return this.element.classList.contains('busy'); }
    set busy(value) { this.element.classList[value ? 'add' : 'remove']('busy'); }
    get active() { return this.element.classList.contains('active'); }
    set active(value) { this.element.classList[value ? 'add' : 'remove']('active'); }
    init() {
      let { depot } = this;
      let { scheme, params } = depot;
      let { fields } = scheme;
      this.list = fields.map(item => {
        let { title, key } = item;
        let text = Output.createAny(title);
        let checked = params.fields === 'all' || params.fields.includes(key);
        let checkbox = new FieldsControllerCheckbox({ key, text, checked }).to(this.container);
        return checkbox;
      });
    }
    showPanel(event) {
      if (!this.panel.contains(event.target)) this.active = true;
    }
    cancel() { this.active = false; }
    apply() {
      let { depot, list } = this;
      let { params } = depot;
      let fields = list.filter(item => item.checked).map(item => item.key);
      let newParams = Object.assign({}, params, { fields });
      depot.update({ params: JSON.stringify(newParams) });
    }
  }

  /**
   * 入口
  **/

  return class extends Jinkela {
    get styleSheet() {
      return `
        :scope {
          text-align: right;
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
      // 字段控制
      if (params.fields) new FieldsController({ depot }).to(this);
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
