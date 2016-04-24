def((Frame) => class extends Frame {
  init() {
    console.log(123);
  }
  get Main() {
    return class extends Jinkela {
      init() {
        this.element.textContent = 'abc main';
      }
    };
  }
});
