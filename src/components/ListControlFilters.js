def((ListControlFiltersItem) => class extends Jinkela {
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
  init() {
    let { scheme } = depot;
    if (!scheme) return location.hash = '';
    let { filters = [] } = scheme;
    let list = ListControlFiltersItem.cast(filters).to(this);
    let $promise = Promise.all(list.map(item => item.$promise));
    Object.defineProperty(this, '$promise', { value: $promise, configurable: true });
    if (!filters.length) this.element.style.display = 'none';
  }
});
