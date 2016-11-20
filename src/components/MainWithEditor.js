def((Form, FormSubmit, PanelFailure) => class extends Jinkela {
  load() {
    let { id, resolvedKey } = this.depot || depot;
    if (!id) return Promise.resolve();
    return api([resolvedKey, id]);
  }
  init() {
    let depot = this.depot || window.depot;
    this.$promise = this.load().then(value => {
      let form = new Form({ depot }).to(this);
      form.value = value;
      return form.$promise;
    }, error => {
      let text = error.message || error.name;
      PanelFailure.popup({ text });
    });
  }
});
