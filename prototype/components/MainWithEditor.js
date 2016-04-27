def((Scheme, Form, FormSubmit) => class extends Scheme {
  load() {
    let { id } = new UParams();
    if (!id) return Promise.resolve();
    let $response = fetch(this.scheme.api + '/' + id, { credentials: 'include' });
    return $response.then(response => response.json());
  }
  init() {
    this.load().then(value => {
      let form = new Form({ scheme: this.scheme }).renderTo(this);
      form.value = value;
      new FormSubmit({ scheme: this.scheme, form }).renderTo(this);
    });
  }
});
