def((Output, ListFilters, ListCaption) => {

  class ListHeaders extends Jinkela {
    init() {
      let { depot } = this;
      let { scheme } = depot;
      let { headers } = scheme;
      if (!headers) headers = [ { component: 'Breadcrumbs' } ];
      [].concat(headers).forEach(raw => {
        Output.createAny(raw).to(this);
      });
    }
    get styleSheet() {
      return `
        :scope {
          flex-direction: column;
          display: flex;
          > * {
            margin-bottom: 1em;
          }
        }
      `;
    }
  }

  return class extends Jinkela {
    init() {
      let { depot } = this;
      let { scheme } = depot;
      let { caption, captionType } = scheme;
      if (captionType === 'control' && caption) new ListCaption({ depot }).to(this);
      new ListHeaders({ depot }).to(this);
      let filters = new ListFilters({ depot });
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
  };

});
