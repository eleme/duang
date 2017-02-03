def(() => class extends Jinkela {
  init() {
    let { action } = this.form;
    if (this.conditions && !condition(this.conditions, this.form.value)) this.isHide = true;
    if (!this.status) this.status = 'info';
    this.value = action === 'edit'
      ? refactor(this.text, this.form.value)
      : this.text;
  }
  get template() {
    return `
      <div if-not="{isHide}" class="{status}">
        <strong if="{title}">{title}</strong>
        <p>{value}</p>
      </div>
    `;
  }
  get styleSheet() {
    return `
      :scope {
        text-align: left;
        margin: 15px 0;
        padding: 8px 16px;
        border-radius: 4px;
        color: #fff;
        > p { margin: 0; }
        &.success { background: #13ce66; }
        &.info { background: #50bfff; }
        &.warn { background: #f7ba2a; }
        &.error { background: #ff4949; }
      }
    `;
  }
});
