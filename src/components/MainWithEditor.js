def((Form, FormSubmit) => class extends Jinkela {
  load() {
    let { id, resolvedKey } = depot;
    if (!id) return Promise.resolve();
    return api([resolvedKey, id]);
  }
  init() {
    this.load().then(value => {
      let form = new Form().renderTo(this);
      form.value = value;
    });
  }
});
