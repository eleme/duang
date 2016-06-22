def((Scheme, Form, FormSubmit) => class extends Scheme {
  load() {
    let { params = '{}' } = new UParams();
    let { id } = JSON.parse(params) || {};
    if (!id) return Promise.resolve();
    return api(this.scheme.key + '/' + id);
  }
  init() {
    this.load().then(value => {
      let form = new Form({ scheme: this.scheme }).renderTo(this);
      form.value = value;
    });
  }
});
