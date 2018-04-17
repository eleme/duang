def((Output, Button, ButtonHollow) => class extends Jinkela {
  static popup(config, depot) {
    if (typeof config === 'string') config = { text: config };
    let ins = new this(config, { depot });
    if (config.autoCancel !== false) ins.then(dialog.cancel, dialog.cancel);
    dialog.once('dialogcancel', () => ins.resolve(false));
    dialog.once('transitionend', () => ins.focus());
    dialog.popup(ins);
    return Promise.resolve(ins);
  }
  init() {
    this.title = this.title || '操作确认';
    this.text = this.text || '确定要执行此操作吗？';
    Output.createAny(this.text).to(this.h5);
    if (this.onYes.action) this.onYes = doAction.bind(null, this.onYes, this.depot);
    if (this.onCancel.action) this.onCancel = doAction.bind(null, this.onCancel, this.depot);
    let onYes = () => {
      let promise = Promise.resolve().then(this.onYes);
      this.resolve(promise);
      return promise;
    };
    let onCancel = () => {
      let promise = Promise.resolve().then(this.onCancel);
      this.resolve(promise);
      return promise;
    };
    if (!this.yes) this.yes = '是的';
    this.yes = typeof this.yes === 'string' ? { text: this.yes } : this.yes;
    this.theYesButton = this.yesButton = new Button(this.yes, { onClick: onYes });

    if (!this.cancel) this.cancel = { text: '取消', color: '#D3DCE6' };
    this.cancel = typeof this.cancel === 'string' ? { text: this.cancel } : this.cancel;
    this.theCancelButton = this.cancelButton = new ButtonHollow(this.cancel, { onClick: onCancel });

    this.element.addEventListener('keydown', event => this.keydown(event));
  }
  keydown(event) {
    if (event.keyCode === 27) this.theCancelButton.click();
  }
  focus() {
    if (this.theYesButton && this.theYesButton.element && this.theYesButton.element.focus) this.theYesButton.element.focus();
  }
  get handlers() {
    let value = new Set();
    Object.defineProperty(this, 'handlers', { configurable: true, value });
    return value;
  }
  then(...handler) { this.handlers.add(handler); }
  resolve(arg) {
    let $result = Promise.resolve(arg);
    this.handlers.forEach(handler => {
      $result.then(...handler);
      this.handlers.delete(handler);
    });
  }
  onYes() { return true; }
  onCancel() { return false; }
  get template() {
    return `
      <div>
        <h5 ref="h5"></h5>
        <div>
          <meta ref="yesButton" />
          <meta ref="cancelButton" />
        </div>
      </div>
    `;
  }
  get styleSheet() {
    return `
      :scope {
        padding: 2em;
        > h5 {
          margin: 0 0 2em 0;
          font-size: 16px;
          font-weight: normal;
        }
        > div > button {
          margin: 0 1em;
        }
      }
    `;
  }
});
