def(() => class extends Jinkela {
  init() {
    this.$promise = new this.Main().to(this).$promise;
  }
  get styleSheet() {
    return `
      :scope {
        flex: 1;
        overflow: auto;
        padding-bottom: 32px;
      }
    `;
  }
});
