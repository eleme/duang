def(() => class extends Jinkela {
  static cast(list, ...args) {
    list = list.map(item => new this(item, ...args));
    list.renderTo = target => list.forEach(item => item.renderTo(target));
    return list;
  }
});
