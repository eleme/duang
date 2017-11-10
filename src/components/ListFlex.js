def(() => class extends Jinkela {

  createAnimation() {
    let maxHeight = -this.height + 'px';
    if (this.element.animate) { // 支持 animate
      return this.element.animate([
        { transform: 'scale(1)', opacity: 1, marginBottom: '-1em', marginTop: '1em' },
        { transform: 'scale(.001)', opacity: 0, marginBottom: maxHeight, marginTop: 0 }
      ], {
        duration: 300,
        fill: 'forwards'
      });
    } else { // 不支持 animate，降级处理
      let finish = () => {};
      let reverse = () => this.element.style.removeProperty('display');
      this.element.style.setProperty('display', 'none');
      return { finish, reverse };
    }
  }

  toggle() {
    if (this.element.classList.contains('hidden')) {
      this.element.classList.remove('hidden');
      this.toggleObject = this.createAnimation();
      this.toggleObject.finish();
    }
    if (this.toggleObject) {
      this.toggleObject.reverse();
      delete this.toggleObject;
    } else {
      this.toggleObject = this.createAnimation();
      return this.toggleObject;
    }
  }

  get height() {
    this.element.style.display = 'flex';
    this.element.style.position = 'absolute';
    let height = this.element.offsetHeight;
    this.element.style.removeProperty('display');
    this.element.style.removeProperty('position');
    return height;
  }

  init() {
    if (this['hidden-default']) this.element.classList.add('hidden');
  }

  get template() {
    return `
      <div>
        <meta ref="children" />
      </div>
    `;
  }

  get styleSheet() {
    return `
      :scope {
        &.hidden { display: none; }
        transform-origin: top;
        margin: 1em 1em -1em 1em;
        display: flex;
      }
    `;
  }

});
