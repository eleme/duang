def((Form, FormSubmit) => class extends Jinkela {
  load() {
    let { params = '{}' } = new UParams();
    let { id } = JSON.parse(params) || {};
    if (!id) return Promise.resolve();
    return api(depot.scheme.key + '/' + id);
  }
  init() {
    this.load().then(value => {
      let form = new Form().renderTo(this);
      form.value = value;
    });
  }
});
