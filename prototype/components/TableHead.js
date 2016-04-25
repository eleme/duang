def((TableRow) => class extends Jinkela {
  get template() { return `<thead></thead>`; }
  init() {
    new TableRow({ fields: this.fields }).renderTo(this);
  }
});
