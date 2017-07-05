def((ListControlItem) => class extends Jinkela {

  get styleSheet() {
    return `
      :scope {
        text-align: right;
        margin-bottom: 1em;
        margin-left: 1em;
        overflow: hidden;
      }
    `;
  }

  init() {
    let { depot } = this;
    let { scheme } = depot;
    let { operations } = scheme;
    if (!(operations instanceof Array)) operations = [];
    operations = operations.filter(item => this.checkPermissions(item));
    ListControlItem.cast(operations, { depot }).to(this);
    if (!operations.length) this.element.style.display = 'none';
  }

  checkPermissions(item) {
    if (!item.require) return true;
    let requireList = [].concat(item.require);
    if (requireList.length === 0) return true;
    let { session } = this.depot;
    let { permissions } = session;
    return requireList.some(code => permissions.includes(code));
  }

});
