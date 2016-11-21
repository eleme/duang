def((ListControlFiltersItem, Button, ButtonHollow) => {

  class ListControlFiltersButtonGroup extends Jinkela {
    get Button() { return Button; }
    get ButtonHollow() { return ButtonHollow; }
    apply() { this.element.dispatchEvent(new CustomEvent('apply', { bubbles: true })); }
    reset() { this.element.dispatchEvent(new CustomEvent('reset', { bubbles: true })); }
    get template() {
      return `
        <div>
          <jkl-button onclick="{apply}">筛选</jkl-button>
          <jkl-button-hollow onclick="{reset}">重置</jkl-button-hollow>
        </div>
      `;
    }
    get styleSheet() {
      return `
        :scope {
          margin-top: 1em;
          > :first-child {
            margin-right: 1em;
          }
        }
      `;
    }
  }

  return class extends Jinkela {
    get ListControlFiltersButtonGroup() { return ListControlFiltersButtonGroup; }
    init() {
      let { depot } = this;
      let { scheme } = depot;
      if (!scheme) return location.hash = '';
      let { filters = [] } = scheme;
      let $promise;
      if (filters.length) {
        this.list = ListControlFiltersItem.cast(filters, { depot });
        $promise = Promise.all(this.list.map(item => item.$promise));
      } else {
        this.element.style.display = 'none';
        $promise = Promise.resolve();
      }
      Object.defineProperty(this, '$promise', { value: $promise, configurable: true });
    }
    apply() {
      let { uParams, where } = this.depot;
      this.list.forEach(({ optional, checked, defaultValue, value, key, squash }) => {
        if (optional && !checked) {
          delete where[key];
        } else {
          if (squash === 'direct') {
            if (defaultValue) Object.keys(defaultValue).forEach(key => delete where[key]);
            where[key] = value[''];
            delete value[''];
            Object.assign(where, value);
          } else {
            where[key] = value;
          }
        }
      });
      uParams.where = JSON.stringify(where);
      location.hash = new UParams(uParams);
    }
    reset() {
      let { uParams, scheme } = this.depot;
      let { where = {} } = scheme;
      uParams.where = JSON.stringify(where);
      location.hash = new UParams(uParams);
    }
    get template() {
      return `
        <div on-apply="{apply}" on-reset="{reset}">
          <meta ref="list" />
          <jkl-list-control-filters-button-group></jkl-list-control-filters-button-group>
        </div>
      `;
    }
    get styleSheet() {
      return `
        :scope {
          text-align: left;
          margin-bottom: 1em;
          padding: 16px;
          margin-right: 16px;
          border: 1px solid #e0e6ed;
          border-radius: 4px;
        }
      `;
    }
  };
});
