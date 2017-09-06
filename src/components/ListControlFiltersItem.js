def((Input, Output, Item) => class extends Item {
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
        margin-top: 1em;
        line-height: 36px;
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
});
