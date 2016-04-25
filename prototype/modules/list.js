def((Frame, Table) => class extends Frame {
  get Main() {
    return class extends Jinkela {
      get scheme() {
        let { key } = new UParams();
        for (let i of config) {
          if (i.key === key) return i;
        }
      }
      init() {
        new Table({ scheme: this.scheme }).renderTo(this);
      }
    };
  }
});
