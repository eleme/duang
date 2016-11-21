def((Table) => {

  class OTable extends Table {
    get styleSheet() {
      return `
        :scope {
          margin: 1em 0;
          td {
            line-height: 2;
          }
        }
      `;
    }
  }

  return class extends Jinkela {
    get tagName() { return 'div'; }
    init() {
      let uParams = new UParams({ module: 'list', key: depot.key });
      let newDepot = depot.fork(uParams);
      let scheme = { fields: this.fields, key: depot.key, module: 'list' };
      Object.defineProperty(newDepot, 'scheme', { value: scheme, configurable: true });
      new OTable({ depot: newDepot, data: this.value }).to(this);
    }
  };

});
