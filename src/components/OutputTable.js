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

    get value() { return this.$value; }
    set value(value = this.defaultValue) {
      if (this.oTable) this.oTable.data = value;
      this.$value = value;
      this.$hasValue = true;
    }

    init() {
      let uParams = new URLSearchParams({ module: 'list', key: depot.key });
      let newDepot = depot.fork(uParams);
      let scheme = { fields: this.fields, key: depot.key, module: 'list' };
      Object.defineProperty(newDepot, 'scheme', { value: scheme, configurable: true });
      this.oTable = new OTable({ depot: newDepot, data: this.value }).to(this);
      if (this.$hasValue) this.value = this.$value;
    }

  };

});
