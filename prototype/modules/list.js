def((Frame, Table, TableTip, Pager) => class extends Frame {
  get Main() {
    return class extends Jinkela {
      getScheme() {
        let { key } = new UParams();
        for (let i of config) {
          if (i.key === key) return i;
        }
      }
      load() {
        return co(function*() {
          let params = {};
          let { scheme } = this;
          if (scheme.pageSize) {
            params.limit = scheme.pageSize;
            params.offset = scheme.pageSize * (new UParams().page - 1 || 0);
          }
          let response = yield fetch(scheme.api + '?' + new UParams(params), { credentials: 'include' });
          let result = yield response.json();
          if (response.status >= 400) throw result;
          /**/ Object.keys(result).some(key => result[key] instanceof Array && (result = result[key]));
          return result.map(data => {
            let fields = scheme.fields.map(item => {
              item = Object.create(item);
              item.value = data[item.key];
              return item;
            });
            return { fields };
          });
        }.bind(this));
      }
      error(error) {
        alert(error.message || 'Unknown Error');
      }
      init() {
        let scheme = this.scheme = this.getScheme();
        this.$data = this.load();
        let table = new Table({ scheme }).renderTo(this);
        let tip = new TableTip().renderTo(this);
        this.$data.then(list => {
          table.render(list);
          tip.render(list);
          new Pager({ scheme, list }).renderTo(this);
        });
      }
    };
  }
});
