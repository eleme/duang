def((Output) => class extends Jinkela {
  get template() {
    return `
      <div>
        <h1><meta ref="h1Ref" /></h1>
        <h2><meta ref="h2Ref" /></h2>
      </div>
    `;
  }
  set h1(what) {
    this.h1Ref = Output.createAny(what);
  }
  set h2(what) {
    this.h2Ref = Output.createAny(what);
  }
  get styleSheet() {
    return `
      :scope {
        margin-top: 1em;
        display: flex;
        align-items: center;
        h1 {
          font-size: 1.5em;
          margin: 0;
        }
        h2 {
          font-size: 1em;
          font-weight: normal;
          margin: 0;
          margin-left: 1em;
        }
      }
      /* 黑科技 */
      .table > :first-child :scope {
        margin-top: 0em;
      }
    `;
  }
});
