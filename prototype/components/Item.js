def(() => class extends Jinkela {
  init() {
    if (typeof this.onClick === 'function') {
      this.element.addEventListener('click', event => this.click(event));
    }
  }
  static cast(list, ...args) {
    list = list.map(item => new this(item, ...args));
    list.renderTo = target => {
      list.forEach(item => item.renderTo(target));
      return list;
    };
    return list;
  }
  click() {
    if (this.element.classList.contains('busy')) return;
    if (typeof this.onClick !== 'function') return;
    this.element.classList.add('busy');
    let that = this.onClick(event);
    if (that && that.then) {
      what.catch(() => {}).then(() => {
        this.element.classList.remove('busy');
      });
    } else {
      this.element.classList.remove('busy');
    }
  }
});
