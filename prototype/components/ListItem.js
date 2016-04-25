def(() => class extends Jinkela {
  static cast(list) {
    list = list.map(item => new this(item));
    list.renderTo = target => list.forEach(item => item.renderTo(target));
    return list;
  }
  get template() { return `<li><a href="{href}">{text}</a></li>`; }
});
