def((ListControlFilters, ListControlCaption) => class extends Jinkela {
  init() {
    let { depot } = this;
    let { scheme } = depot;
    let { caption, captionType } = scheme;
    if (captionType === 'control' && caption) new ListControlCaption({ depot }).to(this);
    let filters = new ListControlFilters({ depot });
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
