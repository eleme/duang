def((Form, FormSubmit) => class extends Jinkela {
  load() {
    let { params, scheme } = depot;
    let { id } = params;
    let { key } = scheme;
    if (!id) return Promise.resolve();
    key = key.replace(/:([^/]+)/g, ($0, $1) => params[$1]);
    return api(key + '/' + id);
  }
  init() {
    this.load().then(value => {
      let form = new Form().renderTo(this);
      form.value = value;
    });
  }
});
