def((ListControlFilters, ListControlCaption) => class extends Jinkela {
  init() {
    let { scheme } = depot;
    let { caption, captionType } = scheme;
    if (captionType === 'control' && caption) new ListControlCaption().to(this);
    let filters = new ListControlFilters();
    filters.$promise.then(() => filters.to(this));
  }
  get styleSheet() {
    return `
      :scope {
        text-align: left;
        flex: 1;
      }
    `;
  }
});
