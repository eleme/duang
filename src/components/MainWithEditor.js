def((Form, FormSubmit, PanelFailure, ErrorDisplay) => class extends Jinkela {
  load() {
    let { id, resolvedKey, params } = this.depot || depot;
    id = id || params.copy;
    if (!id) return Promise.resolve();
    return api([resolvedKey, id]);
  }
  init() {
    Object.defineProperty(this.depot, 'main', { configurable: true, value: this });
    this.$promise = this.load().then(value => {
      let form = new Form({ depot: this.depot }).to(this);
      form.value = value;
      return form.$promise;
    }, error => {
      new ErrorDisplay({ error }).to(this);
    });
  }
});
