def((Input, Output, Item, Button, ButtonHollow) => {

  class FilterItem extends Item {
    init() {
      this.initTitle();
      this.initCheckbox();
      this.input = new Input(this, { onReady: () => this.ready() }).to(this);
    }
    initTitle() {
      if (typeof this.title === 'string') {
        new Output({ component: 'HTML', value: this.title }).to(this.label);
      } else if (typeof this.title === 'object') {
        new Output(this.title).to(this.lablel);
      }
    }
    initCheckbox() {
      let { key, depot, optional } = this;
      let { where } = depot;
      this.checkbox = document.createElement('input');
      this.checkbox.setAttribute('type', 'checkbox');
      this.checkbox.addEventListener('change', () => {
        this.element.dataset.checked = !!this.checked;
      });
      this.label.appendChild(this.checkbox);
      if (!optional) this.checkbox.setAttribute('disabled', 'disabled');
      this.checked = (optional && key in where) || !optional;
      this.element.dataset.checked = !!this.checked;
    }
    get $promise() { return this.input.$promise; }
    keydown({ keyCode, target }) {
      if (target.tagName !== 'TEXTAREA' && keyCode === 13) this.apply();
    }
    apply() { this.element.dispatchEvent(new CustomEvent('apply', { bubbles: true })); }
    ready() {
      let { key, squash, depot } = this;
      let { where } = depot;
      if (squash === 'direct') {
        this.value = Object.assign({ '': where[key] }, where);
      } else {
        this.value = where[key];
      }
      this.defaultValue = this.value;
    }
    get checked() { return this.checkbox.checked; }
    set checked(value) { this.checkbox.checked = value; }
    get value() { return this.input.value; }
    set value(value) { this.input.value = value; }
    get template() {
      return `
        <div on-keydown="{keydown}" data-optional="{optional}">
          <label ref="label"></label>
        </div>
      `;
    }
    get styleSheet() {
      return `
        :scope {
          &:first-child { margin-top: 0; }
          display: flex;
          margin-top: var(--spacing);
          line-height: 28px;
          > * {
            display: none;
            vertical-align: top;
          }
          > label {
            display: inline-block;
            min-width: 100px;
            > * {
              display: inline-block;
              vertical-align: middle;
            }
            > input[type=checkbox] {
              display: none;
              margin-left: 10px;
            }
          }
          &[data-optional=true] {
            > label {
              cursor: pointer;
              > input[type=checkbox] {
                display: inline-block;
              }
            }
          }
          &[data-checked=true] {
            > span {
              display: inline-block;
            }
          }
        }
      `;
    }
  }

  class FiltersButtonGroup extends Jinkela {
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
    get FiltersButtonGroup() { return FiltersButtonGroup; }
    init() {
      let { depot } = this;
      let { scheme } = depot;
      if (!scheme) return (location.hash = '');
      let { filters = [] } = scheme;
      let $promise;
      if (filters.length) {
        this.list = FilterItem.cast(filters, { depot });
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
          <jkl-filters-button-group></jkl-filters-button-group>
        </div>
      `;
    }
    get styleSheet() {
      return `
        :scope {
          text-align: left;
          margin-bottom: 1em;
          padding: var(--spacing);
          border: 1px solid #e0e6ed;
          border-radius: 4px;
        }
      `;
    }
  };
});
