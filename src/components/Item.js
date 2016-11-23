def(() => class extends Jinkela {
  init() {
    if (typeof this.onClick === 'function') {
      this.element.addEventListener('click', event => this.click(event));
    }
  }
  set onclick(handler) {
    if (this.onClick) return;
    this.onClick = handler;
  }
  static cast(list, ...args) {
    list = list.map(item => new this(item, ...args));
    list.to = target => {
      list.forEach(item => item.to(target));
      return list;
    };
    return list;
  }
  click() {
    if (this.element.classList.contains('busy')) return;
    if (typeof this.onClick !== 'function') return;
    this.element.classList.add('busy');
    let what = this.onClick(event);
    if (what && what.then) {
      what.catch(() => {}).then(() => {
        this.element.classList.remove('busy');
      });
    } else {
      this.element.classList.remove('busy');
    }
  }
});
