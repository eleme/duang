def((ListControlFiltersItem) => class extends Jinkela {
  get styleSheet() {
    return `
      :scope {
        text-align: left;
        margin-bottom: 1em;
        padding: 16px;
        margin-right: 16px;
        border: 1px solid #EFF2F7;
        border-radius: 4px;
      }
    `;
  }
  init() {
    let { scheme } = depot;
    if (!scheme) return location.hash = '';
    let { filters = [] } = scheme;
    ListControlFiltersItem.cast(filters).to(this);
    if (!filters.length) this.element.style.display = 'none';
  }
});
