def((FormItem) => class extends FormItem {
  get template() {
    return `
      <div>
        <span ref="text"></span>
        <span ref="ctrl"></span>
      </div>
    `;
  }
  init() {
    this.didMount = () => {
      if ('floating' in this) return;
      this.element.parentNode.appendChild(document.createElement('br'));
      this.element.style.marginLeft = '2em';
    };
  }
  get styleSheet() {
    return `
      :scope {
        display: inline-block;
        > span {
          width: auto;
          display: inline-block;
        }
      }
    `;
  }
});
