def((TableRow, TableHead) => class extends Jinkela {
  get template() { return `<table></table>`; }
  init() {
    let { scheme } = this;
    new TableHead({ fields: scheme.fields }).renderTo(this);
    if (scheme.api) co(function*() {
      let params = {};
      if (scheme.pageSize) {
        params.limit = scheme.pageSize;
        params.offset = scheme.pageSize * (new UParams().page - 1 || 0);
      }
      let response = yield fetch(scheme.api + '?' + new UParams(params), { credentials: 'include' });
      let result = yield response.json();
      /**/ Object.keys(result).some(key => result[key] instanceof Array && (result = result[key]));
      result = result.map(data => {
        let fields = scheme.fields.map(item => {
          item = Object.create(item);
          item.value = data[item.key];
          return item;
        });
        return { fields };
      });
      TableRow.cast(result).renderTo(this);
    }.bind(this));
  }
  get styleSheet() {
    return `
      :scope {
        margin: 1em;
        width: calc(100% - 2em);
        border-collapse: collapse;
      }
    `;
  }
});
