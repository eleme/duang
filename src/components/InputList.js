def((Input, Button) => {

  class InternalListItem extends Jinkela {
    get tagName() { return 'li'; }
    beforeParse(params) {
      let { component, args, readonly } = params;
      args = Object.assign({ readonly }, args);
      this.input = new Input({ component, args, onReady: () => this.ready() });
    }
    ready() {
      this.element.style.display = 'block';
    }
    init() {
      this.input.to(this);
      if (!this.noDelete) new Button({ text: '-', onClick: () => this.dispatchRemoveEvent() }).to(this);
    }
    dispatchRemoveEvent() {
      this.element.dispatchEvent(new CustomEvent('remove', { detail: this, bubbles: true }));
    }
    remove() { this.element.remove(); }
    get styleSheet() {
      return `
        :scope {
          display: none;
          margin: 0;
          margin-top: 1em;
          &:first-child { margin-top: 0; }
          > * {
            margin-right: .5em;
          }
        }
      `;
    }
    get value() { return this.input.value; }
    set value(value) { this.input.value = value; }
  }

  class InternalList extends Jinkela {
    get tagName() { return 'ul'; }
    init() {
      this.items = [];
      this.element.addEventListener('remove', event => this.removeChild(event));
    }
    removeChild(event) {
      event.stopPropagation();
      let item = event.detail;
      let index = this.items.indexOf(item);
      if (~index) this.items.splice(index, 1);
      item.remove();
      this.countChange();
    }
    add(value) {
      let params = {};
      if (value !== void 0) params.value = value;
      this.items.push(new InternalListItem(this, params).to(this));
      this.countChange();
    }
    countChange() {
      this.element.dispatchEvent(new CustomEvent('countchange', { detail: this.items.length, bubbles: true }));
    }
    clear() {
      this.items.splice(0).forEach(item => item.remove());
    }
    get styleSheet() {
      return `
        :scope {
          &:empty {
            &::before {
              content: '无数据';
              display: inline-block;
              margin-right: .5em;
            }
          }
          display: inline-block;
          margin: 0;
          padding: 0;
          list-style: none;
        }
      `;
    }
    get value() { return this.items.map(item => item.value); }
    set value(value) {
      if (!(value instanceof Array)) value = [];
      this.clear();
      value.forEach(item => this.add(item));
    }
  }

  class InputList extends Jinkela {
    init() {
      this.list = new InternalList(this).to(this);
      if (!this.noAdd) this.button = new Button({ text: '+', onClick: () => this.add() }).to(this);
      this.element.addEventListener('countchange', event => this.countChange(event));
    }
    countChange(event) {
      event.stopPropagation();
      if (this.button) this.button.element.style.display = event.detail >= this.max ? 'none' : 'inline-block';
    }
    add() { this.list.add(); }
    get value() { return this.list.value; }
    set value(value) { this.list.value = value; }
  }

  return InputList;

});
