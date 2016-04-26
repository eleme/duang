def((Scheme, Form, FormSubmit) => class extends Scheme {
  init() {
    let form = new Form({ scheme: this.scheme }).renderTo(this);
    new FormSubmit({ scheme: this.scheme, form }).renderTo(this);
  }
});
