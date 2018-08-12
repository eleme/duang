def((FatalError) => class extends Jinkela {

  get FatalError() { return FatalError; }

  init() {
    Object.defineProperty(this.depot, 'main', { configurable: true, value: this });
    console.log(this.depot);
    this.message = `找不到模块: ${this.depot.module}`;
  }

  get template() {
    return `
      <div>
        <jkl-fatal-error depot="{depot}" message="{message}"></jkl-fatal-error>
      </div>
    `;
  }

});
